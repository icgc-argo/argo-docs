import React, { useState, createRef, useEffect } from 'react';
import { useTheme } from '@icgc-argo/uikit/ThemeProvider';

const MIN_ZOOM = 0.3;
const MAX_ZOOM = 1.5;
const ZOOM_STEP = 0.05;

export default ({ children, minZoom = MIN_ZOOM, maxZoom = MAX_ZOOM, zoomStep = ZOOM_STEP }) => {
  const [scaleFactor, setScaleFactor] = React.useState(1);
  const [position, setPosition] = React.useState({
    x: 0,
    y: 0,
  });
  const [mouseDownPosition, setMouseDownPosition] = React.useState({
    x: 0,
    y: 0,
  });
  const [objectLocalMousedownPosition, setObjectLocalMousedownPosition] = React.useState({
    x: 0,
    y: 0,
  });
  const [isDragging, setDragging] = React.useState(false);
  const theme = useTheme();

  const containerRef = React.createRef();
  const objectElementRef = React.createRef();
  React.useEffect(() => {
    const element = containerRef.current;
    const onScroll = e => {
      e.preventDefault();
      if (e.deltaY > 0) {
        setScaleFactor(Math.min(scaleFactor + zoomStep, maxZoom));
      } else {
        setScaleFactor(Math.max(scaleFactor - zoomStep, minZoom));
      }
    };
    element.addEventListener('mousewheel', onScroll);
    return () => {
      element.removeEventListener('mousewheel', onScroll);
    };
  });

  const onMouseDown = e => {
    const eventLocalX = e.pageX - containerRef.current.offsetLeft;
    const eventLocalY = e.pageY - containerRef.current.offsetTop;
    e.preventDefault();
    setDragging(true);
    setObjectLocalMousedownPosition({
      x: eventLocalX - position.x,
      y: eventLocalY - position.y,
    });
    setMouseDownPosition({
      x: eventLocalX,
      y: eventLocalY,
    });
  };
  React.useEffect(() => {
    const onMouseUp = e => {
      setDragging(false);
    };
    window.addEventListener('mouseup', onMouseUp);
    return () => window.removeEventListener('mouseup', onMouseUp);
  });
  React.useEffect(() => {
    const containerElement = containerRef.current;
    const objectElement = objectElementRef.current;
    const onMouseMove = e => {
      if (isDragging) {
        const eventLocalX = e.pageX - containerElement.offsetLeft;
        const eventLocalY = e.pageY - containerElement.offsetTop;
        const delta = {
          x: eventLocalX - mouseDownPosition.x,
          y: eventLocalY - mouseDownPosition.y,
        };
        const zoomOffset = {
          x: -0.5 * (1 - scaleFactor) * objectElement.clientWidth,
          y: -0.5 * (1 - scaleFactor) * objectElement.clientHeight,
        };
        setPosition({
          x: mouseDownPosition.x + zoomOffset.x - objectLocalMousedownPosition.x + delta.x,
          y: mouseDownPosition.y + zoomOffset.y - objectLocalMousedownPosition.y + delta.y,
        });
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  });

  return (
    <div
      ref={containerRef}
      style={{
        border: `solid 1px ${theme.colors.grey_2}`,
        height: '800px',
        overflow: 'hidden',
        transform: 'scale(1)',
        cursor: 'grab',
      }}
      onMouseDown={onMouseDown}
    >
      <div
        style={{
          zIndex: 1,
          position: 'absolute',
        }}
      >
        <input
          type="range"
          min={minZoom}
          max={maxZoom}
          step={zoomStep}
          value={scaleFactor}
          onChange={e => setScaleFactor(Number(e.target.value))}
          onMouseDown={e => e.stopPropagation()}
        />{' '}
        {scaleFactor}x
      </div>
      <div
        id="zoomer"
        ref={objectElementRef}
        style={{
          border: 'solid 2px green',
          transform: `scale(${scaleFactor})`,
          height: '100%',
          width: '100%',
          position: 'absolute',
          left: position.x,
          top: position.y,
        }}
      >
        {children}
      </div>
    </div>
  );
};

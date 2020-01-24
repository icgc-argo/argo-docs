import React, { useState, createRef, useEffect } from 'react';
import { useTheme } from '@icgc-argo/uikit/ThemeProvider';

const MIN_ZOOM = 0.3;
const MAX_ZOOM = 1.5;
const ZOOM_STEP = 0.05;

export default ({ children, minZoom = MIN_ZOOM, maxZoom = MAX_ZOOM, zoomStep = ZOOM_STEP }) => {
  const [zoom, setZoom] = React.useState(1);
  const [position, setPosition] = React.useState({
    x: 0,
    y: 0,
  });
  const [mouseDownPosition, setMouseDownPosition] = React.useState({
    x: 0,
    y: 0,
  });
  const theme = useTheme();

  const containerRef = React.createRef();
  React.useEffect(() => {
    const element = containerRef.current;
    const onScroll = e => {
      e.preventDefault();
      if (e.deltaY > 0) {
        setZoom(Math.min(zoom + zoomStep, maxZoom));
      } else {
        setZoom(Math.max(zoom - zoomStep, minZoom));
      }
    };
    element.addEventListener('mousewheel', onScroll);
    return () => {
      element.removeEventListener('mousewheel', onScroll);
    };
  });

  const onMouseDown = e => {
    // console.log(e);
  };
  const onMouseUp = e => {
    // console.log(e);
  };
  React.useEffect(() => {
    const onMouseMove = e => {
      // console.log(e);
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
      }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <input
        type="range"
        min={minZoom}
        max={maxZoom}
        step={zoomStep}
        value={zoom}
        style={{
          zIndex: 1,
          position: 'absolute',
        }}
        onChange={e => setZoom(Number(e.target.value))}
      />
      <div
        id="zoomer"
        style={{
          border: 'solid 2px green',
          transform: `scale(${zoom})`,
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

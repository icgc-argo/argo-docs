import React from 'react';
import { css } from 'emotion';
import { useTheme } from '@icgc-argo/uikit/ThemeProvider';
import debounce from 'lodash/debounce';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 1;
const ZOOM_STEP = 0.05;

export default ({
  children,
  minZoom = MIN_ZOOM,
  maxZoom = MAX_ZOOM,
  zoomStep = ZOOM_STEP,
  menu,
}) => {
  const theme = useTheme();
  const DEFAULT_SCALE = 1;
  const [sliderValue, setSliderValue] = React.useState(DEFAULT_SCALE);
  const onWheel = ({ scale }) => {
    setSliderValue(scale);
  };
  return (
    <div
      className={css`
        border: solid 1px ${theme.colors.grey_2};
        transform: scale(1);
        overflow: hidden;
      `}
    >
      <TransformWrapper
        defaultScale={DEFAULT_SCALE}
        defaultPositionX={0}
        defaultPositionY={0}
        doubleClick={{ disabled: true }}
        options={{
          minScale: minZoom,
          maxScale: maxZoom,
          limitToBounds: false,
          limitToWrapper: false,
        }}
        onWheel={onWheel}
        wheel={{
          step: 200,
        }}
      >
        {({ resetTransform, setScale }) => {
          const applySliderValue = debounce(value => {
            setScale(value);
          }, 500);
          const onResetClick = () => {
            setSliderValue(DEFAULT_SCALE);
            setTimeout(() => {
              // No idea wy but we need to push this to the next tick
              resetTransform();
            }, 0);
          };
          return (
            <React.Fragment>
              <div
                className="tools"
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  display: 'flex',
                }}
              >
                <input
                  type="range"
                  min={minZoom}
                  max={maxZoom}
                  step={zoomStep}
                  value={sliderValue}
                  onChange={e => {
                    const value = Number(e.target.value);
                    setSliderValue(value);
                    applySliderValue(value);
                  }}
                />
                <button onClick={onResetClick}>reset</button>
              </div>
              <TransformComponent>{children}</TransformComponent>
              <div>{menu({ resetTransform })}</div>
            </React.Fragment>
          );
        }}
      </TransformWrapper>
    </div>
  );
};

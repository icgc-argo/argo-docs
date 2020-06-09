/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of the GNU Affero General Public License v3.0.
 * You should have received a copy of the GNU Affero General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY                           
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES                          
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT                           
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,                                
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED                          
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;                               
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER                              
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN                         
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *  
 *
 */

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
        width: 100%;
        height: calc(100vh - 355px);

        .react-transform-component {
          height: 100%;
          width: 100%;
        }
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

import React, { MouseEvent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EditPanel } from './EditPanel';
import { clearCanvas, drawStroke, setCanvasSize } from './utils/canvasUtils';
import { currentStrokeSelector } from './selectors';
import { ColorPanel } from './shared/ColorPanel';
import { useCanvas } from './CanvasContext';
import { historyIndexSelector } from './modules/historyIndex/selectors';
import { RootState } from './utils/types';
import { strokesSelector } from './modules/strokes/selectors';
import { beginStroke, updateStroke } from './modules/currentStroke/slice';
import { endStroke } from './modules/sharedActions';
import { FilePanel } from './shared/FilePanel';
import { ModalLayer } from './ModalLayer';

const WIDTH = 1024;
const HEIGHT = 768;

function App() {
  const dispatch = useDispatch();
  const canvasRef = useCanvas();
  const historyIndex = useSelector<RootState, RootState['historyIndex']>(historyIndexSelector);
  const strokes = useSelector<RootState, RootState['strokes']>(strokesSelector);
  const currentStroke = useSelector<RootState, RootState['currentStroke']>(currentStrokeSelector);
  const isDrawing = !!currentStroke.points.length;

  const getCanvasWithContext = (canvas = canvasRef.current) => {
    return { canvas, context: canvas?.getContext('2d') };
  };

  const startDrawing = ({ nativeEvent }: MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    dispatch(beginStroke({ x: offsetX, y: offsetY }));
  };

  useEffect(() => {
    const { context } = getCanvasWithContext();
    if (!context) {
      return;
    }
    requestAnimationFrame(() => drawStroke(context, currentStroke.points, currentStroke.color));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStroke]);

  useEffect(() => {
    const { canvas, context } = getCanvasWithContext();
    if (!context || !canvas) {
      return;
    }
    requestAnimationFrame(() => {
      clearCanvas(canvas);
      strokes.slice(0, strokes.length - historyIndex).forEach((stroke) => {
        drawStroke(context, stroke.points, stroke.color);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyIndex, strokes]);

  const endDrawing = () => {
    if (isDrawing) {
      dispatch(endStroke({ stroke: currentStroke, historyIndex }));
    }
  };

  const draw = ({ nativeEvent }: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    dispatch(updateStroke({ x: offsetX, y: offsetY }));
  };

  useEffect(() => {
    const { canvas, context } = getCanvasWithContext();
    if (!canvas || !context) {
      return;
    }

    setCanvasSize(canvas, WIDTH, HEIGHT);

    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.lineWidth = 5;
    context.strokeStyle = 'black';

    clearCanvas(canvas);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='window'>
      <div className="title-bar">
        <div className="title-bar-text">Redux Paint</div>
        <div className="title-bar-controls">
          <button aria-label='Close' />
        </div>
      </div>
      <ColorPanel />
      <EditPanel />
      <FilePanel />
      <ModalLayer />
      <canvas onMouseDown={startDrawing} onMouseUp={endDrawing} onMouseOut={endDrawing} onMouseMove={draw} ref={canvasRef} />
    </div>
  );
}

export default App;

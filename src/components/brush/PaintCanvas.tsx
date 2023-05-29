import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import Button from '../button';
import MarginTop from '../marginTop';

interface CanvasProps {
  width?: number;
  height?: number;
}
// 마우스 좌표
interface Coordinate {
  x: number;
  y: number;
}

/** 그림판 컴포넌트 */
const PaintCanvas = ({ width = 400, height = 300 }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 마우스 이벤트 상태
  const [mousesPosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined
  );

  /** 현재 그리는 동작에 대한 상태 */
  const [isPainting, setIsPainting] = useState<Boolean>(false);

  /** slideBar 제어 부분 */
  const range = [
    {
      value: 5,
    },
  ];

  /** 라인의 굵기 값을 담은 상태 */
  const [sliderValue, setSliderValue] = useState<number>(range[0].value);

  /** 라인의 굵기를 제어하는 핸들러 */
  const updateSliderLineHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(e.target.value));
  };

  /** 색상 선택 클릭 이벤트 */
  const handleColorClick = (e: React.MouseEvent<HTMLButtonElement, any>) => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');
    const color = (e.target as HTMLButtonElement).style.backgroundColor;
    if (context) {
      context.strokeStyle = color;
    }
  };

  /** 현재 마우스의 위치 자표를 얻는 함수 */
  const getCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!canvasRef.current) return;

    const canvas: HTMLCanvasElement = canvasRef.current;
    return {
      x: e.pageX - canvas.offsetLeft,
      y: e.pageY - canvas.offsetTop,
    };
  };

  /** 마우스로 인한 캔버스 이벤트 시작 */
  const startPaint = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      const coordinates = getCoordinates(e);
      if (coordinates) {
        setIsPainting(true);
        setMousePosition(coordinates);
      }
    },
    []
  );

  /** 마우스로 인한 캔버스 이벤트 종료*/
  const exitPaint = useCallback(() => {
    setIsPainting(false);
  }, []);

  /** 터치로 캔버스 인식 */
  const touch = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    let touch = e.touches[0];
    let mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    canvas.dispatchEvent(mouseEvent);
  }, []);

  /** 터치로 캔버스 드로잉 시작 */
  const startTouch = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    let touch = e.touches[0];
    let mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    canvas.dispatchEvent(mouseEvent);
  }, []);

  /** 터치로 하는 캔버스 동작 정지 */
  const exitTouch = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();

    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    let mouseEvent = new MouseEvent('mouseup', {});
    canvas.dispatchEvent(mouseEvent);
  }, []);

  /** canvas에 라인을 그려줌 */
  const drawLine = useCallback(
    (originMousePosition: Coordinate, newMousePosition: Coordinate) => {
      if (!canvasRef.current) return;

      const canvas: HTMLCanvasElement = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        /** 그리는 선의 끝선 형태 */
        context.lineJoin = 'round';
        /** 라인의 굵기 */
        context.lineWidth = sliderValue;

        /**  새로운 경로를 만듭니다. 경로가 생성됬다면, 이후 그리기 명령들은 경로를 구성하고 만드는데 사용하게 됩니다. */
        context.beginPath();
        //펜(pen) 이동하기
        // 펜을 x와 y 로 지정된 좌표로 옮깁니다.
        // 캔버스가 초기화 되었거나 beginPath() 메소드가 호출되었을 때, 특정 시작점 설정을 위해 moveTo() 함수를 사용하는것이 좋습니다.
        // 또한 moveTo()  함수는 연결되지 않은 경로를 그리는데에도 사용 할 수 있습니다.
        context.moveTo(originMousePosition.x, originMousePosition.y);
        // 직선을 그리기 위해서는 lineTo() 메소드를 사용할 수 있습니다.
        // lineTo(x, y)
        // 현재의 드로잉 위치에서 x와 y로 지정된 위치까지 선을 그립니다.
        // 이 메소드는 선의 끝점의 좌표가 되는 x와 y의 두개의 인자가 필요합니다.
        //시작점은 이전에 그려진 경로에 의해 결정 되며, 이전 경로의 끝점이 다음 그려지는 경로의 시작점이 됩니다.
        //또한 시작점은 moveTo() 메소드를 통해 변경될 수 있습니다.
        context.lineTo(newMousePosition.x, newMousePosition.y);
        context.closePath(); // 현재 하위 경로의 시작 부분과 연결된 직선을 추가합니다.

        context.stroke(); //윤곽선을 이용하여 도형을 그립니다.
      }
    },
    [sliderValue]
  );

  /** 마우스의 이벤트를 감지 하는 함수 */
  const mouseMovePaint = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();
      if (isPainting) {
        const newMousePosition = getCoordinates(e);
        if (mousesPosition && newMousePosition) {
          drawLine(mousesPosition, newMousePosition);
          setMousePosition(newMousePosition);
        }
      }
    },
    [drawLine, isPainting, mousesPosition]
  );

  /** 컨버스 클리어 이벤트 */
  const clearCanvas = () => {
    if (!canvasRef.current) return;

    const canvas: HTMLCanvasElement = canvasRef.current;
    //clearRect() 특정 부분을 지우는 직사각형이며, 이 지워진 부분은 완전히 투명해집니다.
    canvas.getContext('2d')!!.clearRect(0, 0, canvas.width, canvas.height);
  };

  const renderButtonData = [
    { id: 1, color: 'black' },
    { id: 2, color: 'white' },
    { id: 3, color: 'red' },
    { id: 4, color: 'tomato' },
    { id: 5, color: 'yellow' },
    { id: 6, color: 'green' },
    { id: 7, color: 'blue' },
    { id: 8, color: 'navy' },
    { id: 9, color: 'Purple' },
  ];

  return (
    <Section>
      <CanvasBox
        onMouseDown={(e) => startPaint(e)}
        onMouseMove={(e) => mouseMovePaint(e)}
        onMouseUp={exitPaint}
        onMouseLeave={exitPaint}
        onTouchStart={(e) => startTouch(e)}
        onTouchMove={(e) => touch(e)}
        onTouchEnd={(e) => exitTouch(e)}
        ref={canvasRef}
        height={300}
        width={500}
      />
      <MarginTop margin={20} />
      <ControlBar>
        <RangeInput
          value={sliderValue}
          min={5}
          max={30}
          onChange={updateSliderLineHeight}
          type='range'
        />
        <MarginTop margin={20} />
        <BtnBox>
          {renderButtonData.map((item) => {
            return (
              <Button
                key={item.id}
                color={item.color}
                onClick={handleColorClick}
              />
            );
          })}
        </BtnBox>
        <MarginTop margin={10} />
        <DeleteBtn onClick={clearCanvas}>지우기</DeleteBtn>
      </ControlBar>
    </Section>
  );
};

export default React.memo(PaintCanvas);

const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 70vh;

  border-radius: 50px;
  align-items: center;
  justify-content: center;
  background-color: #aae181;
`;

const CanvasBox = styled.canvas`
  border-radius: 15px;
  background: #fff;
`;

const ControlBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const DeleteBtn = styled.button`
  width: 30%;
  border-radius: 10px;
  border: none;
  margin: 10px;
`;

const RangeInput = styled.input`
  width: 30%;
  margin: 10px;
`;

const BtnBox = styled.div`
  display: flex;
`;

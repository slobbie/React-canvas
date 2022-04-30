import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Button from './button';

interface CanvasProps {
  width: number;
  height: number;
}
// 마우스 좌표
interface Coordinate {
  x: number;
  y: number;
}
const Canvas = ({ width, height }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // 마우스 이벤트 상태
  const [mousesPosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined
  );
  const [isPainting, setIsPainting] = useState<Boolean>(false);

  // 펜 색상 변겅을 위한 dom
  const BtnColor = document.getElementsByClassName('CanvasColor');
  const handleColorClick = (e: any) => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');
    const color = e.target.style.backgroundColor;
    if (context) {
      context.strokeStyle = color;
    }
  };

  // 마우스 이벤트로 좌표를 얻는 함수
  const getCoordinates = (e: MouseEvent) => {
    if (!canvasRef.current) return;

    const canvas: HTMLCanvasElement = canvasRef.current;
    return {
      x: e.pageX - canvas.offsetLeft,
      y: e.pageY - canvas.offsetTop,
    };
  };

  // canvas에 선을 긋는 함수
  const drawLine = (
    originMousePosition: Coordinate,
    newMousePosition: Coordinate
  ) => {
    if (!canvasRef.current) return;

    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');
    // const color = colors.current.value;
    // console.log(color);
    if (context) {
      // context.strokeStyle = color; // 선 색상
      context.lineJoin = 'round'; // 끝선의 모양
      context.lineWidth = value; // 선의 굵기

      context.beginPath(); // 새로운 경로를 만듭니다. 경로가 생성됬다면, 이후 그리기 명령들은 경로를 구성하고 만드는데 사용하게 됩니다.
      //펜(pen) 이동하기
      // 펜을  x와 y 로 지정된 좌표로 옮깁니다.
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
  };
  // 마우스 이벤트 mousedown
  const startPaint = useCallback((e: MouseEvent) => {
    const coordinates = getCoordinates(e);
    if (coordinates) {
      setIsPainting(true);
      setMousePosition(coordinates);
    }
  }, []);

  // 마우스 이벤트  mousemove
  const piant = useCallback(
    (e: MouseEvent) => {
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
    [isPainting, mousesPosition]
  );
  // 그리기를 끝내는 함수  mouseup
  const exitPaint = useCallback(() => {
    setIsPainting(false);
  }, []);

  // 핸드폰 터치에도 반응하게 하는 함수

  const startTouch = useCallback((e: TouchEvent) => {
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

  const touch = useCallback((event: TouchEvent) => {
    event.preventDefault();
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    var touch = event.touches[0];
    var mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    canvas.dispatchEvent(mouseEvent);
  }, []);

  const exitTouch = useCallback((event: TouchEvent) => {
    event.preventDefault();

    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    var mouseEvent = new MouseEvent('mouseup', {});
    canvas.dispatchEvent(mouseEvent);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas: HTMLCanvasElement = canvasRef.current;
    // addEventListener()는
    // document의 특정요소(Id,class,tag 등등..)
    // event(ex - click하면 함수를 실행하라, 마우스를 올리면 함수를 실행하라 등등.. )를 등록할 때 사용합니다.

    canvas.addEventListener('mousedown', startPaint);
    canvas.addEventListener('mousemove', piant);
    canvas.addEventListener('mouseup', exitPaint);
    canvas.addEventListener('mouseleave', exitPaint);

    canvas.addEventListener('touchstart', startTouch);
    canvas.addEventListener('touchmove', touch);
    canvas.addEventListener('touchend', exitTouch);

    // 컬러변경 스타일 이벤트
    Array.from(BtnColor).forEach((color) =>
      color.addEventListener('click', handleColorClick)
    );

    return () => {
      canvas.removeEventListener('mousedown', startPaint);
      canvas.removeEventListener('mousemove', piant);
      canvas.removeEventListener('mouseup', exitPaint);
      canvas.removeEventListener('mouseleave', exitPaint);

      canvas.removeEventListener('touchstart', startTouch);
      canvas.removeEventListener('touchmove', touch);
      canvas.removeEventListener('touchend', exitTouch);
    };
  }, [startPaint, piant, exitPaint]);
  const clearCanvas = () => {
    if (!canvasRef.current) return;

    const canvas: HTMLCanvasElement = canvasRef.current;
    //clearRect() 특정 부분을 지우는 직사각형이며, 이 지워진 부분은 완전히 투명해집니다.
    canvas.getContext('2d')!!.clearRect(0, 0, canvas.width, canvas.height);
  };

  // slideBar 제어 부분
  const range = [
    {
      value: 5,
    },
  ];
  const [value, setValue] = useState<number>(range[0].value);
  const SliderOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  const ButtonData = [
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
      <CanvasBox ref={canvasRef} height={height} width={width} />
      <ControlBar>
        <RangeInput
          value={value}
          min={5}
          max={30}
          onChange={SliderOnChange}
          type='range'
        />
        <BtnBox>
          {ButtonData.map((btn) => {
            return <Button key={btn.id} color={btn.color} />;
          })}
        </BtnBox>
        <DeleteBtn onClick={clearCanvas}>지우기</DeleteBtn>
      </ControlBar>
    </Section>
  );
};

export default React.memo(Canvas);

Canvas.defaultProps = {
  width: 800,
  height: 600,
};

const Section = styled.section`
  display: flex;
  flex-direction: column;
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

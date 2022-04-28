import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

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

  // 마우스 이벤트로 좌표를 얻는 함수
  const getCoordinates = (e: MouseEvent) => {
    if (!canvasRef.current) {
      return;
    }
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
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');
    if (context) {
      context.strokeStyle = 'tomato'; // 선 색상
      context.lineJoin = 'round'; // 끝선의 모양
      context.lineWidth = 5; // 선의 굵기

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

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    // addEventListener()는
    // document의 특정요소(Id,class,tag 등등..)
    // event(ex - click하면 함수를 실행하라, 마우스를 올리면 함수를 실행하라 등등.. )를 등록할 때 사용합니다.

    canvas.addEventListener('mousedown', startPaint);
    canvas.addEventListener('mousemove', piant);
    canvas.addEventListener('mouseup', exitPaint);
    canvas.addEventListener('mouseleave', exitPaint);

    return () => {
      canvas.removeEventListener('mousedown', startPaint);
      canvas.removeEventListener('mousemove', piant);
      canvas.removeEventListener('mouseup', exitPaint);
      canvas.removeEventListener('mouseleave', exitPaint);
    };
  }, [startPaint, piant, exitPaint]);

  return (
    <Section>
      <CanvasBox ref={canvasRef} height={height} width={width} />
    </Section>
  );
};

export default Canvas;

Canvas.defaultProps = {
  width: 800,
  height: 600,
};

const Section = styled.section``;

const CanvasBox = styled.canvas`
  border-radius: 15px;
  background: lightgrey;
`;

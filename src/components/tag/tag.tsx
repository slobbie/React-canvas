import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RiDeleteBin6Line, RiPencilLine } from 'react-icons/ri';
import { BsTag } from 'react-icons/bs';
import tagimg from './화장품이미지.png';
import MarginTop from '../marginTop';
const Tag = () => {
  const [startMouse, setStartMouse] = useState<number[] | null[]>([null, null]);
  const [endMouse, setEndMouse] = useState<number[] | null[]>([null, null]);
  const [MouseUp, setMouseUp] = useState(true);
  const [dragged, setDragged] = useState<any>([]);
  const [resize, setResize] = useState<number[]>([0, 0]);

  // 로컬스트리지 데이터 명시
  const localStorageData = window.localStorage;

  // 그려지는 컨버스
  const drawCanvas: HTMLCanvasElement = document.getElementById(
    'draw'
  ) as HTMLCanvasElement;

  const drawCtx = drawCanvas?.getContext('2d');

  // 그려지는게 보일 컨버스
  const showCanvas: HTMLCanvasElement = document.getElementById(
    'show'
  ) as HTMLCanvasElement;

  const showCtx = showCanvas?.getContext('2d');

  const [canvasLocation, setCanvasLocation] = useState<number[]>([
    drawCanvas?.getBoundingClientRect().x,
    drawCanvas?.getBoundingClientRect().y,
  ]);

  //MouseDown (마우스 버튼을 누르고 있다가 땔 때 발생)
  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setStartMouse([
      e.clientX - canvasLocation![0],
      e.clientY - canvasLocation![1],
    ]);
    setEndMouse([null, null]);
    setMouseUp(false);
  };
  //onMouseMove  마우스 포인터가 대상요소내에 있을때 작동
  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    setEndMouse([
      e.clientX - canvasLocation![0],
      e.clientY - canvasLocation![1],
    ]);
  };
  // onMouseUp : 마우스 버튼이 클릭이 끝날 때 (왼쪽, 오른쪽 모두 해당)
  const onMouseUp = () => {
    setMouseUp(true);
    const Prompt = prompt('영역의 이름은 무엇인가요?', '');

    if (Prompt) {
      setDragged([
        ...dragged,
        {
          name: Prompt,
          position: [startMouse[0], startMouse[1], endMouse[0], endMouse[1]],
        },
      ]);
      drawCtx?.clearRect(0, 0, 800, 1000);
      localStorage.setItem(
        'canvasSetItem',
        JSON.stringify([
          ...dragged,
          {
            name: Prompt,
            position: [startMouse[0], startMouse[1], endMouse[0], endMouse[1]],
          },
        ])
      );
    } else {
      drawCtx?.clearRect(0, 0, 800, 1000);
    }
  };
  //onMouseLeave : 마우스 포인터가 바인딩된 요소를 벗어날 때. (자식요소 미포함)
  const onMouseLeave = () => {
    if (!MouseUp) {
      drawCtx?.clearRect(0, 0, 800, 1000);
    }
    setMouseUp(true);
  };

  const onResize = () => {
    setResize([window.innerWidth, window.innerHeight]);
  };

  // 로컬스토리에 저장된 데이터를 그려주는 코드
  useEffect(() => {
    if (showCtx) {
      showCtx.clearRect(0, 0, 800, 1000);
      dragged.forEach((list: any, idx: number) => {
        const [startX, startY, endX, endY] = list?.position;
        showCtx.lineWidth = 3;
        showCtx.fillStyle = 'rgb(221, 238, 193,0.2)';
        showCtx.strokeStyle = 'rgb(152, 226, 232)';
        showCtx.fillRect(startX, startY, endX - startX, endY - startY);
        showCtx.strokeRect(startX, startY, endX - startX, endY - startY);
      });
    }
  }, [dragged]);

  // canvas 그리기
  useEffect(() => {
    if (
      startMouse[0] &&
      startMouse[1] &&
      endMouse[0] &&
      endMouse[1] &&
      drawCtx &&
      !MouseUp
    ) {
      drawCtx.lineWidth = 3;
      drawCtx.fillStyle = 'rgb(255, 107, 107,0.2)';
      drawCtx.strokeStyle = 'rgb(223, 127, 173)';
      drawCtx.clearRect(0, 0, 800, 1000);
      drawCtx.fillRect(
        startMouse[0],
        startMouse[1],
        endMouse[0] - startMouse[0],
        endMouse[1] - startMouse[1]
      );
      drawCtx.strokeRect(
        startMouse[0],
        startMouse[1],
        endMouse[0] - startMouse[0],
        endMouse[1] - startMouse[1]
      );
    }
  }, [startMouse[0], startMouse[1], endMouse[0], endMouse[1]]);

  // canvas 위치 알아내기
  useEffect(() => {
    const drawCanvas: HTMLCanvasElement = document.getElementById(
      'draw'
    ) as HTMLCanvasElement;
    setCanvasLocation([
      drawCanvas?.getBoundingClientRect().x,
      drawCanvas?.getBoundingClientRect().y,
    ]);
  }, [resize]);
  // window resize 알아내기
  useEffect(() => {
    if (localStorage.getItem('canvasSetItem')) {
      const storeData = localStorage.getItem('canvasSetItem') as any;
      setDragged([...JSON.parse(storeData)]);
    }
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const onEdit = (idx: number, list: any) => {
    const target = dragged;
    const editName = prompt('수정한 영역의 이름은 무엇인가요?', `${list.name}`);
    target.splice(idx, 1, { name: editName, position: list.position });
    setDragged([...target]);
    localStorage.setItem('canvasSetItem', JSON.stringify([...target]));
  };

  const onDelete = (idx: number) => {
    const target = dragged;
    target.splice(idx, 1);
    setDragged([...target]);
    localStorage.setItem('canvasSetItem', JSON.stringify([...target]));
  };

  return (
    <Section>
      <MarginTop margin={70} />
      <Container>
        <Board>
          {dragged &&
            dragged.map((list: any, idx: number) => (
              <ItemBox key={idx}>
                <Item>
                  <BsTag className='Tagicon' />
                  {list.name}
                </Item>
                <RiPencilLine
                  className='editIcon'
                  onClick={() => onEdit(idx, list)}
                />
                <RiDeleteBin6Line
                  className='DeleteIcon'
                  onClick={() => onDelete(idx)}
                />
              </ItemBox>
            ))}
        </Board>
        <CanvasDraw
          width='800'
          height='1000'
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          id='draw'
        />
        <CanvasShow width='800' height='1000' id='show' />
        <Img src='https://sun-learning-ff8.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fe05a070d-6bea-420b-a14a-f4597f7b7f74%2Ffashion-unsplash.jpg?table=block&id=0ec0813e-4783-42d7-9ee8-a0bcb596671e&spaceId=06605955-0fd9-4614-ba9a-0812be412dbe&width=2000&userId=&cache=v2' />
        {dragged &&
          dragged.map((list: any, idx: number) => (
            <div
              key={idx}
              style={{
                position: 'absolute',
                top: `${
                  list.position[1] >= list.position[3]
                    ? list.position[3]
                    : list.position[1]
                }px`,
                left: `${
                  list.position[0] >= list.position[2]
                    ? list.position[2]
                    : list.position[0]
                }px`,
                zIndex: '200',
              }}
            >
              {list.name}
            </div>
          ))}
      </Container>
    </Section>
  );
};
export default Tag;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 20px;
  .homeIcon {
    width: 30px;
    height: 30px;
    margin-left: 20px;
    &:hover {
      fill: #4f79ff;
    }
  }
`;

const Container = styled.div`
  position: relative;
  max-width: 800px;
  width: 100%;
  height: 100vh;
`;
const CanvasDraw = styled.canvas`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 800px;
  height: 1000px;
  display: block;
  box-sizing: border-box;
  z-index: 100;
`;

const CanvasShow = styled.canvas`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 800px;
  height: 1000px;
  display: block;
  box-sizing: border-box;
  z-index: 50;
`;

const Img = styled.img`
  /* object-fit: cover; */
  width: 100%;
  height: 100vh;
`;

const Board = styled.ul`
  position: absolute;
  left: 10px;
  top: 10px;
  margin: 0;
  z-index: 250;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
`;

const ItemBox = styled.li`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
  input {
    margin-right: 10px;
  }
  .DeleteIcon {
    width: 15px;
    height: 15px;
    margin-left: 5px;
    cursor: pointer;
    &:hover {
      fill: #f83b3b;
    }
  }
  .editIcon {
    margin-left: 20px;
    cursor: pointer;
    &:hover {
      fill: #4f79ff;
    }
  }
`;

const Item = styled.div`
  .Tagicon {
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }
`;

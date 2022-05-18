## Canvas - Example

[배포 링크](https://slobbie.github.io/canvas-example/)

![스크린샷 2022-05-18 오후 10 35 45](https://user-images.githubusercontent.com/86298255/169051886-a555a182-e0f3-45e3-9072-e9a50a192848.png)

## 사용 스택

`Typescript` `React` `Styled-Components`

## what?

Interaction 의 이해도를 높이기 위하여 제작하였습니다.

## 주요기능

1. React 환경에서 canvas 사용
2. useRef를 이용한 Virtual dom 제어
3. customHook 사용

## custom Hook

useRef를 이용 하여 ref에서 전달 받은 값을 stata에 담아 상태 관리를 해주고
window.addEventListener 를 이용해 resize 가 일어날때 마다 새로운 값을 담아주도록 설계했습니다.

```
 const useClientWidthHeiht = (ref: RefObject<HTMLElement>) => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const setClientWidthHeight = () => {
      if (ref.current) {
        setWidth(ref.current.clientWidth);
        setHeight(ref.current.clientHeight);
      }
    };
    setClientWidthHeight();

    window.addEventListener('resize', setClientWidthHeight);

    return () => {
      window.removeEventListener('resize', setClientWidthHeight);
    };
  }, []);
  const clientReact = { width, height };

  return clientReact;
};
```

### Getting Started

1. `yarn` dependencies,

```
$ yarn
```

2. `start` the project,

```
$ yarn start
```

3. `Setting` prettier,

```
$ npx prettier --write .
```

### Commit Emoji

|   emoji    | commit message |       when to use it        |
| :--------: | :------------: | :-------------------------: |
|   :tada:   |     Start      |        프로젝트 시작        |
| :sparkles: |      Feat      |      새로운 기능 추가       |
|   :bug:    |      Fix       |          버그 수정          |
| :recycle:  |    Refactor    |        코드 리팩터링        |
| :lipstick: |     Style      |   스타일 추가 및 업데이트   |
| :package:  |     Chore      |   패키지 추가 및 업데이트   |
|  :books:   |      Docs      | 그 외 문서 추가 및 업데이트 |

### <br/>

###

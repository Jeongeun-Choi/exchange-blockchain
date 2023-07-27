# 환전 페이지

## 기술 스택

- React18
- zustand
- styled-component

## 폴더 구조

ㄴ components : 컴포넌트를 모아놓은 폴더. 역할에 따라 분리.
<br />ㄴ pages : 페이지 단위로 분리.
<br />ㄴ router : 기능별로 분리. ex) 메뉴바에서 사용되면 MenuRouter로 작성.
<br />ㄴ store : zustand의 store 파일을 저장하는 곳.
<br />ㄴ styles : 전체에 적용될 스타일 파일 저장. ex) colors.ts로 색상 관리
<br />ㄴ types: 전역으로 사용될만한 타입을 분리해둠.
<br />ㄴ types: 전역으로 사용될만한 유틸함수를 분리해둠.

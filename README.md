# 배민 문구사 🧸

<h6 align="center">

  <img alt="banner" src="README_image/team-title.png">

![License](https://img.shields.io/badge/License-MIT-red)
![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/woowa-techcamp-2021/store-2?color=green&label=Version)

</h6>

<h2 align="center">
  <a href="http://52.78.235.192">🎁 배민 문구사 웹 어플리케이션</a>
</h2>
  
<p align="center">우아한 테크캠프 <b>마지막</b> 프로젝트 - 배민 문구사</p>

## Contributors

| Contributor                              | Nickname | Introduce        |
| ---------------------------------------- | -------- | ---------------- |
| [박기덕](https://github.com/edegiil)     | 침착맨   | 개......발       |
| [서그림](https://github.com/Seogeurim)   | 매의눈   | 개발하다가 죽자! |
| [손원우](https://github.com/negu63)      | 끝판왕   | 메멘토 모리      |
| [윤민상](https://github.com/yoonminsang) | 강철체력 | 올해 취직!!      |

## Tech Stacks

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

## Project Structure

<h4 align="center">

![structure](https://user-images.githubusercontent.com/35324795/129206538-29c3a985-7a0e-4427-a6c9-8391b3c53fc6.png)

</h3>

```
🔥 client🔥
├─public
│ ├─index.html (기본 HTML)
│ └─favicon.ico (파비콘)
├─src
│ ├─assets (이미지, 폰트 등)
│ ├─constants (상수, 라우트 경로)
│ ├─styles (글로벌 스타일)
│ ├─lib (리액트 라우터, styled-components)
│ ├─components (컴포넌트 like view)
│ ├─containers (like vm)
│ ├─pages (페이지)
│ ├─store (redux 모듈)
│ ├─saga (saga 함수)
│ ├─types (ts 공통 타입, 인터페이스)
│ ├─hooks (커스텀 훅)
│ ├─utils (공통 유틸 함수)
│ │ └─api (api axios 요청)
│ ├─index.tsx
│ └─App.tsx
├─config
│ ├─webpack.common.js
│ ├─webpack.dev.js
│ └─webpack.prod.js
├─package.json
├─tsconfig.json
├─jest.config.js
├─.eslintrc.json
└─.prettierrc

🔥 server🔥
├── src
│ ├─config (db설정, dotenv 등)
│ ├─loaders (설정 불러오기)
│ ├─middlewares (미들웨어)
│ ├─routes (라우트)
│ ├─controllers (컨트롤러 / controller)
│ ├─services (데이터 가공 / service)
│ ├─repositories (쿼리문 / dao)
│ ├─models (모델 / dto)
│ ├─validation (req.body query parameter 값 검증)
│ ├─types (ts 공통 타입, 인터페이스)
│ ├─utils (공통되는 작은 함수)
│ │ └─error (에러 처리)
│ └─app.ts
├─package.json
├─tsconfig.json
├─.eslintrc.json
├─.prettierrc
└─.env
```

## Database ERD

![ERD](README_image/ERD.png)

## Getting Started

### Prerequisites

`server` 디렉토리의 `.mock.env` 파일을 참고하여 `.env` 파일을 생성해주세요. (개발 모드 : `.env.dev`)

### 웹 어플리케이션

```bash
# Development
$ cd client && yarn start

# Production
$ cd client && yarn run build
```

### API 서버

```bash
# Development
$ cd server && yarn start

# Production
$ cd server && yarn deploy
```

## Preview

### Main Page & Login

<img src="README_image/main-pc.png" width="49%" alt="preview" /> <img src="README_image/login-pc.png" width="49%" alt="preview" />

### Item Search

<img src="README_image/smartmenu-pc.png" width="49%" alt="preview" /> <img src="README_image/search-pc.png" width="49%" alt="preview" />

### Item Detail

<img src="README_image/detail-pc.png" width="32%" alt="preview" /> <img src="README_image/imageview-pc.png" width="32%" alt="preview" /> <img src="README_image/review-pc.png" width="32%" alt="preview" />

### My Page

<img src="README_image/address-pc.png" width="49%" alt="preview" /> <img src="README_image/orderlist-pc.png" width="49%" alt="preview" />

### Cart & Order

<img src="README_image/cart-pc.png" width="49%" alt="preview" /> <img src="README_image/order-pc.png" width="49%" alt="preview" />

### Mobile Also

<img src="README_image/main-mobile.png" width="19%" alt="mobile" /> <img src="README_image/search-mobile.png" width="19%" alt="mobile" /> <img src="README_image/detail-mobile.png" width="19%" alt="mobile" /> <img src="README_image/address-mobile.png" width="19%" alt="mobile" /> <img src="README_image/login-mobile.png" width="19%" alt="mobile" />

## See Also

- [WiKi](https://github.com/woowa-techcamp-2021/store-2/wiki)
- [Project Kanban Board](https://github.com/woowa-techcamp-2021/store-2/projects/1)
- [Figma](https://www.figma.com/file/MaID4DQs5auLz22DporlgL/%EB%B0%B0%EB%AF%BC-%EB%AC%B8%EB%B0%A9%EA%B5%AC?node-id=0%3A1)

## LICENSE

[MIT License](https://github.com/woowa-techcamp-2021/store-2/blob/main/LICENSE) © edegiil negu63 Seogeurim yoonminsang

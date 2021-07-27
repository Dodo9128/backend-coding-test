// express 프레임워크 사용
const express = require("express");
const router = require("./routes/route");

// .env를 활용한 전역 변수 사용
require("dotenv").config();

// req.body 사용하기 위한 bodyParser
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

// example database인 stores.json을 인식하기 위한 fs모듈 사용
const fs = require("fs");

// stores.json의 파일을 읽어오는 미들웨어
const storeDatabase = (req, res, next) => {
  //readFileSync는 절대경로로 지정, stores.json은 req.db에 할당해 놓는다
  req.db = fs.readFileSync("src/models/stores.json", "utf-8");
  next();
};

const app = express();

// fs모듈 미들웨어를 먼저 적용시킨다
app.use(storeDatabase);
app.use(jsonParser);

// 모듈화를 위한 라우팅
app.use("/", router);

const port = process.env.PORT;
app.listen(port, () => {
  // 서버 실행과 동시에 실행되었다는 console.log 출력
  console.log(`server is running on ${port}`);
});

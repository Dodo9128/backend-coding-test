const express = require("express");
const router = express.Router();
const controller = require("../controllers");

// 기본 url로 접속시 정상 작동임을 확인하기 위한 라우팅
router.get("/", (req, res) => {
  res.status(200).send(`capa API Server is running`);
});

// 전체 stores 목록 반환 라우팅
router.get("/get-all-list", controller.getalllist);

// 특정 store 정보 반환 라우팅
router.get("/get-specific", controller.getspecific);

// 우편번호에 따른 위도, 경도 반환 라우팅
router.get("/get-position", controller.getposition);

// 특정 우편번호의 지역 범위 내에 있는 store들의 목록 정렬 반환 라우팅
router.get("/get-radius-store", controller.getradiusstore);

module.exports = router;

// stores.json의 전체 stores 목록 반환
module.exports = async (req, res) => {
  try {
    // app.use로 전체 적용해 놓은 fs모듈(req.db)로 stores.json의 전체 목록 반환
    // 사용할 수 있는 데이터로 반환해 주기 위해 JSON.parse(req.db) 로 반환한다
    res.status(200).send(JSON.parse(req.db));
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: err });
  }
};

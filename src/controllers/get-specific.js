// stores.json 내부 특정 store 반환
module.exports = async (req, res) => {
  try {
    // 요청의 body 내부의 storeName의 인자로 들어오는 특정 store
    const reqStoreName = req.body.storeName;

    // 탐색 요청이 들어온 store를 데이터베이스에서 탐색 (반환은 해당하는 이름의 store 객체)
    // req.db로 불러온 stores.json은 배열이 아니기에 JSON.parse로 배열화 해 준다
    const specificStoreObj = JSON.parse(req.db).filter(
      (elem) => elem.name === reqStoreName
    );

    // 최종 리턴할 데이터 담을 변수 미리 선언
    let result;

    // 일치하는 데이터가 2개 이상일 때는 배열로 모든 데이터를 반환, 1개만 있을때는 해당 객체로 반환
    specificStoreObj.length > 1
      ? (result = specificStoreObj.slice())
      : (result = specificStoreObj.slice()[0]);

    // 결과물 담긴 result 반환
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: err });
  }
};

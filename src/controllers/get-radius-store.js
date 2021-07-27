// 특정 우편번호의 지역 범위 내에 있는 store들의 목록 정렬 반환

/**
 * 영국 우편번호 체계가 어떻게 되어 있는지를 검색해 우편번호 앞 2자리(영문)가 지역을 나타낸다는 것을 확인
 *
 * 앞 2자리를 인자로 받아서 stores.json에 조회해 해당 지역값을 가진 가게들로 이루어진 데이터 배열을 리턴하고
 * 해당 가게들을 api.postcodes.io에 조회해 northing 값이 큰 순서대로(값이 클수록 북쪽에 위치) 정렬해 리턴하면 될 것 같다
 */

// postcodes.io에 요청을 보낼 때 axios 요청을 하기 위한 axios 모듈
const axios = require("axios");

module.exports = async (req, res) => {
  try {
    // body에 담겨 온 우편번호의 앞 2자리를 변수로 정의
    const postcode = req.body.postcode.slice(0, 2);

    // stores.json 내부의 데이터들 중 postcode 변수와 같은 지역값을 가지고 있는 store들로 이루어진 배열
    // req.db로 불러온 stores.json은 배열이 아니기에 JSON.parse로 배열화 해 준다

    const filterStores = JSON.parse(req.db).filter(
      (elem) => elem.postcode.slice(0, 2) === postcode
    );

    // 데이터들을 북쪽에 위치한 순서대로 정렬하기 위한 새로운 배열 선언
    let sortStores = [];

    // filterStores 내부의 store들을 api.postcodes.io에 조회하기 위한 반복문
    for (let elem of filterStores) {
      const response = await axios.get(
        `https://api.postcodes.io/postcodes/${elem.postcode}`
      );
      // 정렬을 위해 northings를 추가한 데이터를 sortStores에 push한다
      sortStores.push({ ...elem, northings: response.data.result.northings });
    }

    // northings가 큰 순서대로 (북쪽 -> 남쪽 위치) 정렬
    // 위의 for문 내부에서 바로 처리할수도 있으나 불필요한 반복이 훨씬 많아지기에 모든 과정이 끝나고 난 후 일괄적으로 정렬 처리
    sortStores.sort(function (a, b) {
      return b.northings - a.northings;
    });

    // 정렬을 마치고 난 후 객체 내부 northings 값 삭제
    for (let elem of sortStores) {
      delete elem.northings;
    }

    // 지역에 따른 필터링 & 정렬 끝낸 데이터가 담긴 배열 리턴
    res.status(200).send(sortStores);
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: err });
  }
};

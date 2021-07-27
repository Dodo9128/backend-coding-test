// postcodes.io에 요청을 보낼 때 axios 요청을 하기 위한 axios 모듈
const axios = require("axios");

// 주어진 우편번호에 따른 위도, 경도 반환 라우팅
module.exports = async (req, res) => {
  try {
    // body에 담겨 온 위도, 경도를 구할 우편번호를 변수로 정의
    const postcode = req.body.postcode;

    // axios 요청이 끝난 후 해당 우편번호의 정보를 담을 변수 정의
    let postcodeInfo;

    // 우편번호가 제대로 담겨 왔을 때에만 API 요청 보냄
    if (postcode) {
      //postcodes.io에 axios 요청
      const response = await axios.get(
        `https://api.postcodes.io/postcodes/${postcode}`
      );
      // 미리 정의해 둔 변수에 axios 요청으로 반환된 정보(객체) 내부에서 위도, 경도만 뽑아내어 할당
      postcodeInfo = { longitude: response.data.result.longitude, latitude: response.data.result.latitude };
    }

    // 위도와 경도를 담은 객체 리턴
    res.status(200).send(postcodeInfo)
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: err });
  }
};

type LatLng = {
  lat: string;
  lng: string;
};
/** 주소를 입력받아 Promise를 반환하는 함수 성공시 위도, 경도 실패시 실패메시지 반환 */
export const getLatLng = (address: string): Promise<LatLng | string> => {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined") {
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(address, function (result, status) {
          if (status === window.kakao.maps.services.Status.OK) {
            const latlng = { lat: result[0].y, lng: result[0].x };
            resolve(latlng); // 비동기 작업 성공 시 결과 반환
          } else {
            alert("주소가 올바르게 입력되었는지 확인해주세요.");
            reject("주소 검색 실패"); // 비동기 작업 실패 시 오류 반환
          }
        });
      });
    } else {
      reject("window 객체가 정의되지 않음");
    }
  });
};

"use client";
import {} from "react-kakao-maps-sdk";

/* 주소를 입력해 위도 경도를 반환해주는 함수 */
export const getLagLng = (address: string) => {
  if (typeof window !== undefined) {
    kakao.maps.load(() => {
      const geocoder = new kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          return { lat: Number(result[0].y), lng: Number(result[0].x) };
        } else {
          alert("주소가 올바르게 입력되었는지 확인해주세요.");
        }
      });
    });
  }
};

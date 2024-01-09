import React from "react";
import { Map } from "react-kakao-maps-sdk";

export default function KakaoMap() {
  return (
    <Map
      style={{ width: "500px", height: "500px" }}
      center={{
        lat: 33.450701,
        lng: 126.570667
      }}
    ></Map>
  );
}

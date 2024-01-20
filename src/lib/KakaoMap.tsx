import { StoreWithStock } from "@/types/db";
import React from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";

interface Props {
  store: StoreWithStock;
}

export default function KakaoMap({ store: { address, id, lat, lng, name, stock } }: Props) {
  return (
    <Map
      style={{ width: "600px", height: "600px" }}
      center={{
        lat: Number(lat),
        lng: Number(lng)
      }}
    >
      <CustomOverlayMap position={{ lat: Number(lat), lng: Number(lng) }} xAnchor={0.45} yAnchor={2}>
        <div className="bg-white rounded-lg px-4 py-4 text-sm  ">
          <h1 className="font-semibold">{address}</h1>
        </div>
      </CustomOverlayMap>
      <MapMarker position={{ lat: Number(lat), lng: Number(lng) }}></MapMarker>
    </Map>
  );
}

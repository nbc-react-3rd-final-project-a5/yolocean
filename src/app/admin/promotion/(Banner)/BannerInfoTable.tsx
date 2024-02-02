import { Banner } from "@/types/db";
import React from "react";

interface Props {
  bannerList?: Banner[];
  setSelectBanner: React.Dispatch<
    React.SetStateAction<
      | {
          banner_link: string;
          banner_name: string;
          banner_url: string;
          id: string;
        }
      | undefined
    >
  >;
}

const BannerInfoTable = ({ bannerList, setSelectBanner }: Props) => {
  return (
    <table className="w-full  text-center border border-line">
      <thead className="border border-b-line bg-tc-light">
        <tr>
          <th className="px-2">index</th>
          <th className="px-2">배너 위치</th>
          <th className="px-2">배너 이동 링크</th>
        </tr>
      </thead>
      <tbody>
        {bannerList &&
          bannerList.map((banner, i) => {
            return (
              <tr
                key={banner.id}
                className="cursor-pointer hover:bg-point hover:text-white"
                onClick={() => {
                  setSelectBanner(banner);
                }}
              >
                <td className="border border-r-line">{i}</td>
                <td className="border border-r-line">{banner.banner_name}</td>
                <td>{banner.banner_link}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default BannerInfoTable;

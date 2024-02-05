import React from "react";

interface Props {
  list: {
    id: string;
    name?: string;
    link: string;
  }[];
  onClick?: (id: string) => void;
}

const BannerInfoTable = ({ list, onClick }: Props) => {
  return (
    <table className="w-full  text-center border border-line">
      <thead className="border border-b-line bg-tc-light">
        <tr>
          <th className="p-2">index</th>
          {list[0].name && <th className="p-2">배너 위치</th>}

          <th className="p-2">이동 링크</th>
        </tr>
      </thead>
      <tbody>
        {list &&
          list.map((item, i) => {
            return (
              <tr
                key={item.id}
                className="cursor-pointer hover:bg-point hover:text-white"
                onClick={() => {
                  onClick ? onClick(item.id) : null;
                }}
              >
                <td className="border border-r-line p-2">{i}</td>
                {list[0].name && <td className="border border-r-line p-2">{item.name}</td>}
                <td className="p-2">{item.link}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default BannerInfoTable;

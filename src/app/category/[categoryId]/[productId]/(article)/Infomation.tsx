import React from "react";
import CommonGuide from "../CommonGuide";

interface Props {
  info: string[];
}

const Infomation = ({ info }: Props) => {
  return (
    <div>
      <CommonGuide />
      <table className="w-full text-sm text-left border text-gray-500 ">
        <tbody>
          {info.map((item) => (
            <tr key={item.split("&")[0]} className="bg-white border-b ">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                {item.split("&")[0]}
              </th>
              <td className="px-6 py-4 text-center border-l">{item.split("&")[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Infomation;

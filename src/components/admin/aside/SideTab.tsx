import Link from "next/link";
import React from "react";
interface Props {
  title: string;
  link: string;
}
const SideTab = ({ title, link }: Props) => {
  return (
    <Link href={link}>
      <li className="h-[60px] flex items-center justify-center p-5 border-b border-line cursor-pointer hover:bg-point hover:text-white">
        {title}
      </li>
    </Link>
  );
};

export default SideTab;

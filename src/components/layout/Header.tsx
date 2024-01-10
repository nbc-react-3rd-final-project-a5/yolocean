import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div>
        <Link href={"/"}>YOLOCEAN</Link>
      </div>
      <div>
        <div>카테고리</div>
        <div>
          <div>검색창</div>
          <div>사람아이콘</div>
          <div>장바구니아이콘</div>
        </div>
      </div>
    </header>
  );
};

export default Header;

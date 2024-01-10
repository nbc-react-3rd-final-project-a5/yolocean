"use client";
import useProduct from "@/hooks/useProduct";
import { ProductProperties } from "@/types/db";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Modal from "@/components/Modal";
interface IProps {
  params: { productId: string };
}

const ProductDetail = ({ params: { productId } }: IProps) => {
  const { product, isLoading } = useProduct(productId);

  if (isLoading && product === undefined) {
    return <>로딩</>;
  }

  const {
    name,
    category: { category_name },
    thumbnail,
    price,
    info_img,
    info,
    original_price,
    view,
    stock: { count, store }
  } = product as ProductProperties;

  console.log(info);

  return (
    <section>
      {/* 조작 */}
      <div className="flex">
        <Image src={thumbnail} alt="product_info" width={300} height={300} />

        <div>
          <span>{category_name}</span>
          <h1>{name}</h1>
          <hr />
          <span>{price}</span>
          {/* <span>할인가격</span> */}
          <hr />
          <div className="flex">
            <label>날짜</label>
            <input type="date" />
          </div>
          <div className="flex">
            <label>위치</label>
            <input type="text" />
          </div>
          <div>
            <label>수량</label>
            <div>
              <button>-</button>
              <input type="number" />
              <button>+</button>
            </div>
          </div>
          <div className="flex">
            <button>장바구니 담기</button>
            <button>바로구매하기</button>
          </div>
        </div>
      </div>
      {/*  */}
      <nav>
        <ul>
          <Link href={"/"}>
            <li>상품설명</li>
          </Link>
          <Link href={"/"}>
            <li>상세정보</li>
          </Link>
          <Link href={"/"}>
            <li>후기</li>
          </Link>
          <Link href={"/"}>
            <li>제품문의</li>
          </Link>
        </ul>
      </nav>
      <article>
        <Image src={info_img} alt="product_info" width={300} height={300} />
      </article>
      <article>
        {info.map((item) => (
          <div key={item.split("&")[0]}>{item.split("&")[1]}</div>
        ))}
      </article>
    </section>
  );
};

export default ProductDetail;

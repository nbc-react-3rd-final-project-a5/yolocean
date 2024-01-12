"use client";
import Card from "@/components/Card";
import { useProduct } from "@/hooks";
import KakaoMap from "@/lib/KakaoMap";
import { openConfirm } from "@/store/confirmStore";
import { useModalStore } from "@/store/modalStore";
import { ProductProperties } from "@/types/db";
import Image from "next/image";
import Link from "next/link";

import React, { useState } from "react";

const ProductPage = () => {
  const { product, isLoading } = useProduct();
  const { openModal } = useModalStore();

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 max-w-[1200px] mx-auto">
        {!isLoading && (product as ProductProperties[]).map((product) => <Card product={product} key={product.id} />)}
        <button
          onClick={() => {
            openModal("카카오맵", <KakaoMap />);
          }}
        />
      </div>
    </div>
  );
};

export default ProductPage;

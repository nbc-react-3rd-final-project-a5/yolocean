"use client";
import { updateProduct } from "@/service/table";
import { useEffect } from "react";
interface Props {
  product: any;
}

const View = ({ product }: Props) => {
  useEffect(() => {
    const visitProduct = sessionStorage.getItem(product.id);
    if (visitProduct) return;
    sessionStorage.setItem(product.id, product.id);
    (async () => {
      await updateProduct({ productId: product.id, body: JSON.stringify({ view: Number(product.view) + 1 }) });
    })();
  }, [product.id, product.view]);

  return null;
};

export default View;

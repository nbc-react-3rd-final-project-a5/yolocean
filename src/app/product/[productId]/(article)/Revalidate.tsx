"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Revalidate = () => {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, [router]);

  return null;
};

export default Revalidate;

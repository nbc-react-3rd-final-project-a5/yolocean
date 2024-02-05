"use client";
import React from "react";
import { getAllRent } from "@/service/table";
import { useQuery } from "@tanstack/react-query";
import RentList from "./RentList";
import Spinner from "@/components/Spinner";

interface Props {
  searchParams: { [key: string]: any } | undefined;
}

const AdminRent = ({ searchParams }: Props) => {
  const page = searchParams?.["page"] || "1";
  const store = searchParams?.["store"] || "";
  const order = searchParams?.["order"] || "";

  const { data: rentData, isLoading: isRentLoading } = useQuery({
    queryFn: async () => await getAllRent({ page, storeId: store, order }),
    queryKey: ["rent", page, store, order]
  });

  console.log(rentData);

  return (
    <>
      {isRentLoading ? (
        <div className="min-h-[300px]">
          <Spinner />
        </div>
      ) : (
        <RentList rentList={rentData.rentlog} />
      )}
    </>
  );
};

export default AdminRent;

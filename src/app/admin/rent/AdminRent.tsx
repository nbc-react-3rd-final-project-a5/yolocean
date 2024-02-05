"use client";
import React from "react";
import { getAllRent } from "@/service/table";
import { useQuery } from "@tanstack/react-query";
import RentList from "./RentList";
import Spinner from "@/components/Spinner";
import Pagination from "@/components/Pagination";

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

  console.log(store);

  return (
    <>
      {isRentLoading ? (
        <div className="min-h-[300px]">
          <Spinner />
        </div>
      ) : (
        <>
          <RentList rentList={rentData.rentlog} />
          <Pagination
            maxPage={rentData.maxPage}
            limit={10}
            currentPage={page}
            articleName={"rent"}
            test={{ store: store }}
          />
        </>
      )}
    </>
  );
};

export default AdminRent;

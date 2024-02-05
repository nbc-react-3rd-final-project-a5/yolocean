"use client";
import React from "react";
import { getAllRent } from "@/service/table";
import { useQuery } from "@tanstack/react-query";
import RentList from "./RentList";
import Spinner from "@/components/Spinner";
import Pagination from "@/components/Pagination";
import SelectOrder from "@/components/admin/SelectOrder";
import SelectStore from "./SelectStore";

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

  return (
    <>
      {isRentLoading ? (
        <div className="min-h-[300px]">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="flex mt-[30px] space-x-[20px] ml-[65%]">
            <SelectOrder currentPage={page} article={"rent"} target={{ store: store }} order={order} />
            <SelectStore store={store} order={order} />
          </div>
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

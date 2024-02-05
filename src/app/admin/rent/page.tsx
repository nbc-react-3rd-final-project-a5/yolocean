import React from "react";
import AdminRent from "./AdminRent";

interface Props {
  searchParams: { [key: string]: any } | undefined;
}

const AdminRentPage = ({ searchParams }: Props) => {
  return <AdminRent searchParams={searchParams} />;
};

export default AdminRentPage;

import React from "react";

const getRentList = async (domain: string, userId: string) => {
  const res = await fetch(`http://${domain}/api/rent/${userId}`, { method: "GET" });
  const data = await res.json();
  return data;
};

const UserRentList = () => {
  return <div>UserRent</div>;
};

export default UserRentList;

//테스트 페이지
import Section from "@/components/layout/Section";
import React from "react";

import Receipt from "./Receipt";

const ReceiptPage = () => {
  return (
    <>
      <Section title={"결제완료"} isCenter={true}>
        <Receipt />
      </Section>
    </>
  );
};

export default ReceiptPage;

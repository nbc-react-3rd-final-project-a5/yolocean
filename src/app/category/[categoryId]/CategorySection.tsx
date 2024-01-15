import Section from "@/components/layout/Section";
import React from "react";

const CategorySection = ({ categoryName }: { categoryName: string }) => {
  return (
    <Section title={`${categoryName}`} isCenter={true}>
      <></>
    </Section>
  );
};

export default CategorySection;

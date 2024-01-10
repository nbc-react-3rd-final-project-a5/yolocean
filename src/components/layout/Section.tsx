import React from "react";

interface Props {
  title: string | null;
  children: React.ReactNode;
}

const Section = ({ title, children }: Props) => {
  return (
    <section className="mb-[200px]">
      <h1 className="font-bold text-[30px] mb-[60px]">{title}</h1>
      <div>{children}</div>
    </section>
  );
};

export default Section;

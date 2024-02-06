import React from "react";
interface Props {
  title: string | null;
  isCenter?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Section = ({ title, isCenter = false, className, children }: Props) => {
  return (
    <section className="mb-[200px] mobile:mb-[20px]">
      {title && (
        <h1
          className={`${
            isCenter && "text-center"
          } font-bold  text-[30px] mb-[60px] ${className} mobile:text-[25px] mobile:mb-[20px]`}
        >
          {title}
        </h1>
      )}
      <div>{children}</div>
    </section>
  );
};
export default Section;

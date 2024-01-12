import React from "react";
interface Props {
  title: string | null;
  isCenter?: boolean;
  className?: string;
  children: React.ReactNode;
}
<<<<<<< HEAD

=======
>>>>>>> c91919ece18d89c5abf105676887844219645fc7
const Section = ({ title, isCenter = false, className, children }: Props) => {
  return (
    <section className="mb-[200px]">
      {title && (
        <h1 className={`${isCenter && "text-center"} font-bold  text-[30px] mb-[60px] ${className}`}>{title}</h1>
      )}
      <div>{children}</div>
    </section>
  );
};
export default Section;

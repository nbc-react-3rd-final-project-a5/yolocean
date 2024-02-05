import React from "react";

interface Props {
  title: string | null;
  isCenter?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Article = ({ title, isCenter = false, className, children }: Props) => {
  return (
    <article className="mb-[30px] mobile:mb-[20px] border border-line rounded-md p-4">
      {title && (
        <h2 className={`${isCenter && "text-center"} font-bold  text-[24px] mb-[30px] ${className} mobile:text-[20px]`}>
          {title}
        </h2>
      )}
      <div>{children}</div>
    </article>
  );
};

export default Article;

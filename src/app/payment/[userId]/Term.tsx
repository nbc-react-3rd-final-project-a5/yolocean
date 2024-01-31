import React from "react";

interface Props {
  title: string;
  tables: {
    title: string;
    content: string[];
  }[];
  confirm: string;
}
const Term = (data: Props) => {
  return (
    <div className="p-7 max-w-[1200px] w-full flex flex-col gap-4">
      {data.tables.map((table) => {
        return (
          <div key={table.title} className="flex flex-col gap-2">
            <p className=" font-semibold">{table.title}</p>
            <p className="flex flex-col gap-2">
              {table.content.map((content, i) => (
                <p key={i}>{content}</p>
              ))}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Term;

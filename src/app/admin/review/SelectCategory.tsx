import React, { useEffect, useState } from "react";
import { getAllCategory } from "@/service/table";
import { useQuery } from "@tanstack/react-query";
import { CategoryTable } from "@/types/db";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  currentPage: number;
  category: string;
}

const SelectCategory = ({ currentPage, category: categoryId }: Props) => {
  const pathName = usePathname();

  //카테고리 읽어오기
  const { data: categoryList, isLoading: isCategoryLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => getAllCategory()
  });
  //카테고리 메뉴 열기
  const [openCate, setOpenCate] = useState(false);

  useEffect(() => {
    if (!openCate) return;
    const closeCate = () => setOpenCate(false);
    const closeCateTimer = setTimeout(() => {
      window.addEventListener("click", closeCate);
    }, 200);

    return () => {
      clearTimeout(closeCateTimer);
      window.removeEventListener("click", closeCate);
    };
  }, [openCate]);

  return (
    <div>
      <button
        id="selectCategory"
        data-dropdown-toggle="dropdown"
        onClick={() => setOpenCate(!openCate)}
        className="flex flex-row space-x-[10px]"
      >
        <p className="text-[14px] text-point font-medium leading-loose mobile:hidden">{"카테고리 선택하기"}</p>
      </button>
      <div
        id="dropdown"
        className={
          openCate
            ? "space-y-2 z-10 absolute p-2 bg-white rounded-sm shadow w-44  mobile:w-full mobile:left-0 mobile:text-center mobile:mt-7"
            : "hidden"
        }
      >
        {!isCategoryLoading && (
          <ul className="pb-2 text-sm  text-gray-700">
            {categoryList!.map((category: CategoryTable) => (
              <li key={category.id}>
                <Link
                  href={{
                    href: pathName,
                    query: { article: "review", page: 1, category: category.id }
                  }}
                  prefetch={false}
                >
                  {category.category_name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={{
                  href: pathName,
                  query: { article: "review", page: 1, category: "" }
                }}
                prefetch={false}
              >
                전체보기
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default SelectCategory;

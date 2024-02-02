import React, { useEffect, useState } from "react";
import { getAllCategory } from "@/service/table";
import { useQuery } from "@tanstack/react-query";
import { CategoryTable } from "@/types/db";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronDown } from "react-icons/fa6";

interface Props {
  currentPage: number;
  category: string;
  order: string;
}

const SelectCategory = ({ currentPage, category: categoryId, order }: Props) => {
  const pathName = usePathname();

  //카테고리 읽어오기
  const { data: categoryList, isLoading: isCategoryLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => getAllCategory()
  });

  const getCategoryName = () => {
    for (const cateItem of categoryList) {
      if (cateItem.id === categoryId) {
        return cateItem.category_name;
      }
    }
    return "전체";
  };

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
    <div className="flex">
      <button
        id="selectCategory"
        data-dropdown-toggle="dropdown"
        onClick={() => setOpenCate(!openCate)}
        className="flex flex-row space-x-[10px]"
      >
        <FaChevronDown className="text-[12px] text-point font-medium mt-[7px]" />
        {!isCategoryLoading && <p className="text-[14px] text-point font-medium leading-loose">{getCategoryName()}</p>}
      </button>
      <div
        id="dropdown"
        className={openCate ? "space-y-2 z-10 absolute p-2 bg-white rounded-sm shadow w-36 mt-[25px]" : "hidden"}
      >
        {!isCategoryLoading && (
          <ul className="pb-1 text-sm  text-gray-700">
            <li className="py-[8px] text-center hover:underline decoration-wavy decoration-point">
              <Link
                href={{
                  href: pathName,
                  query: { article: "review", page: 1, category: "", order: order }
                }}
                prefetch={false}
              >
                전체보기
              </Link>
            </li>
            {categoryList!.map((category: CategoryTable) => (
              <li key={category.id} className="py-[8px] text-center hover:underline decoration-wavy decoration-point">
                <Link
                  href={{
                    href: pathName,
                    query: { article: "review", page: 1, category: category.id, order: order }
                  }}
                  prefetch={false}
                >
                  {category.category_name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SelectCategory;

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  currentPage: number;
  category: string;
}

const SelectCategory = ({ currentPage, category: categoryId }: Props) => {
  const pathName = usePathname();

  //메뉴 열기
  const [openOrder, setOpenOrder] = useState(false);

  useEffect(() => {
    if (!openOrder) return;
    const closeOrder = () => setOpenOrder(false);
    const closeOrderTimer = setTimeout(() => {
      window.addEventListener("click", closeOrder);
    }, 200);

    return () => {
      clearTimeout(closeOrderTimer);
      window.removeEventListener("click", closeOrder);
    };
  }, [openOrder]);

  return (
    <div>
      <button
        id="selectOrder"
        data-dropdown-toggle="dropdown"
        onClick={() => setOpenOrder(!openOrder)}
        className="flex flex-row space-x-[10px]"
      >
        <p className="text-[14px] text-point font-medium leading-loose mobile:hidden">{"정렬순서 선택하기"}</p>
      </button>
      <div
        id="dropdown"
        className={
          openOrder
            ? "space-y-2 z-10 absolute p-2 bg-white rounded-sm shadow w-44  mobile:w-full mobile:left-0 mobile:text-center mobile:mt-7"
            : "hidden"
        }
      >
        <ul className="pb-2 text-sm  text-gray-700">
          <li>
            <Link
              href={{
                href: pathName,
                query: { article: "review", page: 1, category: categoryId, order: false }
              }}
              prefetch={false}
            >
              최신순
            </Link>
          </li>
          <li>
            <Link
              href={{
                href: pathName,
                query: { article: "review", page: 1, category: categoryId, order: true }
              }}
              prefetch={false}
            >
              오래된순
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SelectCategory;

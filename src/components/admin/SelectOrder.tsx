import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronDown } from "react-icons/fa6";

interface Props {
  currentPage: number;
  article: string;
  target: any;
  order: string;
}

const SelectCategory = ({ currentPage, article, target, order }: Props) => {
  const pathName = usePathname();

  const selectedOrder = order === "false" ? "최신순" : "오래된순";
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
    <>
      <div className="flex min-w-[60px]">
        <button
          id="selectOrder"
          data-dropdown-toggle="dropdown"
          onClick={() => setOpenOrder(!openOrder)}
          className="flex flex-row space-x-[10px]"
        >
          <FaChevronDown className="text-[12px] text-point font-medium mt-[7px]" />

          <p className="text-[14px] text-point font-medium leading-loose">{selectedOrder}</p>
        </button>
        <div
          id="dropdown"
          className={openOrder ? "space-y-2 z-10 absolute p-2 bg-white rounded-sm shadow w-28 mt-[25px]" : "hidden"}
        >
          <ul className="pb-1 text-sm  text-gray-700">
            <Link
              href={{
                href: pathName,
                query: { article: "review", page: 1, ...target, order: false }
              }}
              prefetch={false}
            >
              <li className="py-[8px] text-center hover:underline decoration-wavy decoration-point">최신순</li>
            </Link>

            <Link
              href={{
                href: pathName,
                query: { article: "review", page: 1, ...target, order: true }
              }}
              prefetch={false}
            >
              <li className="py-[8px] text-center hover:underline decoration-wavy decoration-point">오래된순 </li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SelectCategory;

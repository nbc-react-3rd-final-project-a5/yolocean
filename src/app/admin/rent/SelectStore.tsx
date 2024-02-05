import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getAllStore } from "@/service/table";
import { FaChevronDown } from "react-icons/fa6";
import { Store } from "@/types/db";

interface Props {
  store: string;
  order: string;
}

const SelectStore = ({ store: storeId, order }: Props) => {
  const pathName = usePathname();

  //지점목록 읽어오기
  const { data: storeList, isLoading: isStoreLoading } = useQuery({
    queryKey: ["store"],
    queryFn: async () => getAllStore()
  });

  const getStoreName = () => {
    for (const store of storeList) {
      if (store.id === storeId) {
        return store.name;
      }
    }
    return "전체보기";
  };

  //지점 메뉴 열기
  const [openStore, setOpenStore] = useState(false);
  useEffect(() => {
    if (!openStore) return;
    const closeStore = () => setOpenStore(false);
    const closeStoreTimer = setTimeout(() => {
      window.addEventListener("click", closeStore);
    }, 200);

    return () => {
      clearTimeout(closeStoreTimer);
      window.removeEventListener("click", closeStore);
    };
  }, [openStore]);
  return (
    <>
      <div className="flex min-w-[110px]">
        <button
          id="selectStore"
          data-dropdown-toggle="dropdown"
          onClick={() => setOpenStore(!openStore)}
          className="flex flex-row space-x-[10px]"
        >
          <FaChevronDown className="text-[12px] text-point font-medium mt-[7px]" />
          {!isStoreLoading && <p className="text-[14px] text-point font-medium leading-loose">{getStoreName()}</p>}
        </button>
        <div
          id="dropdown"
          className={
            openStore ? "space-y-2 z-10 absolute p-2 bg-white rounded-sm shadow w-36 mt-[25px] min-w-[250px]" : "hidden"
          }
        >
          {!isStoreLoading && (
            <ul className="pb-1 text-sm  text-gray-700 ">
              <li className="py-[8px] text-center hover:underline decoration-wavy decoration-point">
                <Link
                  href={{
                    href: pathName,
                    query: { article: "rent", page: 1, store: "", order: order }
                  }}
                  prefetch={false}
                >
                  전체보기
                </Link>
              </li>
              {storeList!.map((store: Store) => (
                <li key={store.id} className="py-[8px] text-center hover:underline decoration-wavy decoration-point">
                  <Link
                    href={{
                      href: pathName,
                      query: { article: "rent", page: 1, store: store.id, order: order }
                    }}
                    prefetch={false}
                  >
                    {store.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default SelectStore;

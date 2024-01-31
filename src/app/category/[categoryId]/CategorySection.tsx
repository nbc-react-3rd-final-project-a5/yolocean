import CardLists from "@/components/CardLists";
import Section from "@/components/layout/Section";
import CardPulse from "@/components/pulse/CardPulse";
import { getAllCategoryProduct } from "@/service/table";
import React, { Suspense } from "react";

const CategorySection = async ({ categoryName, categoryId }: { categoryName: string; categoryId: string }) => {
  const products = await getAllCategoryProduct({ categoryId });

  // 지점 과 일치하는지 까지 필터하는 코드
  // const { data, isLoading, refetch } = useQuery({
  //   queryFn: async () => {
  //     const res = await fetch(`/api/products/${categoryId}`);
  //     const result = await res.json();
  //     return result;
  //     // if (office.id) {
  //     //   const res = await fetch(`/api/products/${categoryId}`);
  //     //   const result = await res.json();
  //     //   const Product = result.filter((item: any) => {
  //     //     return item.stock.find((store: any) => {
  //     //       if (store["store_id"] === office.id) {
  //     //         return true;
  //     //       } else return false;
  //     //     });
  //     //   });
  //     //   return Product;
  //     // } else {
  //     //   const res = await fetch(`/api/products/${categoryId}`);
  //     //   const result = await res.json();
  //     //   return result;
  //     // }
  //   },
  //   queryKey: office.id ? ["products", categoryId] : ["products", categoryId, office.id]
  // });

  // 스토어가 변경될때 리랜더링 해야했지만 현재는 무한재고 무한지점으로 필요없어짐
  // useEffect(() => {
  //   refetch();
  // }, [office, refetch]);

  return (
    <Section title={`${categoryName}`} isCenter={true}>
      <Suspense
        fallback={
          <div className="grid grid-cols-4  mobile:grid-cols-2 gap-y-5 tablet:grid-cols-3">
            {Array.from({ length: 6 }).map((e, i) => (
              <CardPulse key={i} />
            ))}
          </div>
        }
      >
        <CardLists cardLists={products} />
      </Suspense>
    </Section>
  );
};

export default CategorySection;

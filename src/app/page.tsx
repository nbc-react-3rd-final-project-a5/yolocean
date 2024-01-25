import Banner from "@/components/Banner";
import CardLists from "@/components/CardLists";
import Section from "@/components/layout/Section";
import { getAllProduct, getFixedReview } from "@/service/table";
import { ExtendFixedReview, ProductProperties } from "@/types/db";
import getPath from "@/utils/getPath";
import Link from "next/link";

const Home = async () => {
  const items = await getAllProduct();
  const reviews = await getFixedReview();

  const discountFilteredItems = items
    .filter((item: ProductProperties) => item.percentage_off !== 0)
    .sort((a: ProductProperties, b: ProductProperties) => {
      if (a.percentage_off! < b.percentage_off!) {
        return 1;
      }
      if (a.percentage_off! > b.percentage_off!) {
        return -1;
      }
      return 0;
    })
    .slice(0, 8);

  const viewSortedItems = items
    .sort((a: ProductProperties, b: ProductProperties) => {
      if (a.view! < b.view!) {
        return 1;
      }
      if (a.view! > b.view!) {
        return -1;
      }
      return 0;
    })
    .slice(0, 8);

  return (
    <div className="flex flex-col ">
      <div className=" bg-slate-300 w-[1200px] h-[450px] mb-[200px]">케러셀</div>
      <Section title="욜루오션 BIG SALE 👍" isCenter={false}>
        <CardLists cardLists={discountFilteredItems} />
      </Section>
      <Banner url={""} />
      <Section title="욜루오션 HOT 아이템 ❤️" isCenter={false}>
        <CardLists cardLists={viewSortedItems} />
      </Section>
      <Banner url={""} />
      <Section title="재밌게 즐기구 돌아왔션 ✌️" isCenter={false}>
        <div className="grid grid-cols-4 gap-[13px]">
          {reviews.map((fixedReview: any) => (
            <Link key={fixedReview.id} href={`/product/${fixedReview.review.product_id}#후기`}>
              <img className="w-[291px] h-[291px]" src={fixedReview.review.url[0]} />
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Home;

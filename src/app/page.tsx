import CardLists from "@/components/CardLists";
import Section from "@/components/layout/Section";
import { ProductProperties } from "@/types/db";
import getPath from "@/utils/getPath";

const getData = async (): Promise<ProductProperties[]> => {
  const { domain } = getPath();
  const result = await fetch(`http://${domain}/api/product`, { method: "GET" });
  if (!result.ok) {
    throw new Error("카테고리 데이터 불러오기 실패");
  }
  return result.json();
};

const Home = async () => {
  const items = await getData();

  const discountFilteredItems = items
    .filter((item) => item.percentage_off !== 0)
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
      <div className="bg-slate-300 w-[1200px] h-[280px] mb-[200px]">베너</div>
      <Section title="욜루오션 HOT 아이템 ❤️" isCenter={false}>
        <CardLists cardLists={viewSortedItems} />
      </Section>
      <div className="bg-slate-300 w-[1200px] h-[280px] mb-[200px]">베너</div>
      <Section title="재밌게 즐기구 돌아왔션 ✌️" isCenter={false}>
        <div></div>
      </Section>
    </div>
  );
};

export default Home;

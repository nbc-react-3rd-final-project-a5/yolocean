import { headers } from "next/headers";

/**
 * 서버 컴포넌트 작업 시 url을 다룰 때
 * @returns 필요한 URL
 */
const getPath = () => {
  const headersList = headers();
  const domain = headersList.get("host")!;
  const currentURL = headersList.get("referer")!;
  const path = headersList.get("next-url")!;

  return { domain, currentURL, path };
};

export default getPath;

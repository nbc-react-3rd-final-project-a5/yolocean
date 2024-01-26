// DB에 저장된 timestamp with time zone 예시 => 2024-01-16T03:26:20.349122+00:00
// TODO : DAYJS 로 변경하기
export const convertTime = (created_at: string, joinString: string = ".") => {
  const date = new Date(created_at);
  const dateComponents = {
    year: String(date.getFullYear()),
    shortYear: String(date.getFullYear()).slice(2, 4),
    month: String(date.getMonth() + 1).padStart(2, "0"),
    day: String(date.getDate()).padStart(2, "0")
  };

  const shortDateFormat = [dateComponents.shortYear, dateComponents.month, dateComponents.day].join(joinString);
  const fullDateFormat = [dateComponents.year, dateComponents.month, dateComponents.day].join(joinString);
  return { date, dateComponents, shortDateFormat, fullDateFormat };
};

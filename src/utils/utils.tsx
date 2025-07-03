export function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear(); // 获取年份
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 获取月份 (从 0 开始，需要加 1)，并补零
  const day = String(date.getDate()).padStart(2, "0"); // 获取日期，并补零
  return `${year}-${month}-${day}`;
}

export const getDateRange = (yearSpan: number): [string, string] => {
  // 获取当前日期
  const currentDate = new Date();

  // 计算起始日期（当前日期减去年份跨度）
  const startDate = new Date(currentDate);
  startDate.setFullYear(currentDate.getFullYear() - yearSpan);

  // 返回格式化后的日期范围
  return [formatDateToYYYYMMDD(startDate), formatDateToYYYYMMDD(currentDate)];
};

export const date2str = (date: Date) => {
  // 現在からの乖離時間を計算（単位は hours)
  const todayNow = new Date().getTime();
  const diff_hours = (todayNow - date.getTime()) / 1000.0 / 3600.0;
  if (diff_hours * 60 < 1) {
    return "最近";
  }
  if (diff_hours < 1) {
    return `${Math.floor(diff_hours * 60)}分`;
  }
  if (diff_hours < 24) {
    return `${Math.floor(diff_hours)}時間`;
  }
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

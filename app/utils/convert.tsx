export const formatToVietnamTime = (isoString: string) => {
  const date = new Date(isoString);

  // Chuyển sang múi giờ Việt Nam (Asia/Ho_Chi_Minh)
  const options: any = {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour12: false,
    timeZone: "Asia/Ho_Chi_Minh",
  };

  // Trả về dạng "HH:mm DD/MM/YYYY"
  const formatted = date.toLocaleString("vi-VN", options);
  return formatted.replace(",", ""); // bỏ dấu phẩy giữa giờ và ngày
};

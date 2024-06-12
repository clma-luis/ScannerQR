import dayjs from "dayjs";

export const DDMMYYYY_FORMAT = "DD/MM/YYYY";

export const formatDate = (date: string, format = DDMMYYYY_FORMAT) => {
  if (!date) return "-";

  const value = dayjs(date).format(format);

  return value;
};

export const isJSON = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

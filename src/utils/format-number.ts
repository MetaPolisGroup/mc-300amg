export const replaceDotToComma = (text: string) => {
  return text.replace(".", ",");
};

export const toFixedEtherNumber = (num: string | number, toFixed: number) => {
  return Number(num).toFixed(toFixed);
};

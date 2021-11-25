export const Round2 = (num) => {
  return Math.round(num * 100 + Number.EPSILON) / 100;
};

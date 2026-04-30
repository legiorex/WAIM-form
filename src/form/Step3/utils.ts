import { COUNT_MARKS } from "./constants";

export const calculateMarkStep = (
  max: number,
  min: number,
  prefix: string = "",
) => {
  const range = max - min;
  const markStep = range / (COUNT_MARKS - 1);

  const marks = Array.from(
    {
      length: COUNT_MARKS,
    },
    (_, i) => {
      const value = min + i * markStep;
      return { value, label: `${prefix}${value}` };
    },
  );
  return marks;
};

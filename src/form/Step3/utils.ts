import BigNumber from "bignumber.js";
import { COUNT_MARKS } from "./constants";

export const centsToUSD = (cents: string): BigNumber => {
  return new BigNumber(cents).dividedBy(100);
};

export const formatUSD = (cents: string): string => {
  return centsToUSD(cents).toFixed(2);
};

export const formatUSDWithSymbol = (cents: string): string => {
  return `$${formatUSD(cents)}`;
};

export const calculateMarkStep = (
  max: string,
  min: string,
  prefix: string = "",
) => {
  const maxBN = new BigNumber(max);
  const minBN = new BigNumber(min);
  const range = maxBN.minus(minBN);
  const markStep = range.dividedBy(COUNT_MARKS - 1);

  const marks = Array.from(
    {
      length: COUNT_MARKS,
    },
    (_, i) => {
      const valueBN = minBN.plus(markStep.multipliedBy(i));
      const value = valueBN.toNumber();
      const label = prefix
        ? `${prefix}${formatUSD(valueBN.toFixed(0))}`
        : String(value);
      return { value, label };
    },
  );
  return marks;
};

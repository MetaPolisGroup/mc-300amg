/**
 * * Define common function to usesable
 */

import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn
 * * Concat multiple custome class in tailwindcss
 * !DO NOT DELETE THIS FUNCTION
 * @param tailwind classname arr
 */

export const cn = (...input: ClassValue[]) => {
  return twMerge(clsx(input));
};

/**
 * * format input only number
 * @param event InputHTML
 * @returns
 */
export const formatInputField = (event: any) => {
  const digitPeriodRegExp = new RegExp("\\d|\\.");
  if (
    event.ctrlKey || // (A)
    event.altKey || // (A)
    typeof event.key !== "string" || // (B)
    event.key.length !== 1
  ) {
    // (C)
    return;
  }

  if (!digitPeriodRegExp.test(event.key)) {
    console.log(1);
    event.preventDefault();
  }
};
<<<<<<< HEAD
=======

import { debounce } from "lodash";

export const debounceInput = debounce(
  (text: string, onChangeText?: (text: string) => void) => {
    onChangeText?.(text);
  },
  200
);
>>>>>>> main

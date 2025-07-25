import type { To } from "react-router";

import { dayjs } from "./dayjs";

type GetLocalizedLinkParams = {
  to: To;
};

export const getLocalizedLink = ({ to }: GetLocalizedLinkParams) => {
  const [error, result] = runSafe(() => {
    if (typeof to === "string") {
      return to.startsWith("/") ? to : `/${to}`;
    }

    if (!to.pathname) {
      return to;
    }

    return `${to.pathname}${to.search ?? ""}${to.hash ?? ""}`;
  });

  if (error) {
    console.error("Error generating link for:", to, error);
    return to;
  }

  return result;
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export type AsyncRunSafeResult<T> = Promise<
  readonly [Error] | readonly [null, Awaited<T>]
>;

export const asyncRunSafe = async <T = unknown>(
  fn: (() => Promise<T>) | Promise<T> | undefined
): AsyncRunSafeResult<T> => {
  if (!fn) {
    return [new Error("No function provided")] as const;
  }

  try {
    if (typeof fn === "function") {
      return [null, await fn()] as const;
    }

    return [null, await fn] as const;
  } catch (e) {
    if (e instanceof Error) {
      return [e] as const;
    }

    return [new Error("Unknown error")] as const;
  }
};

export type RunSafeResult<T> = readonly [Error] | readonly [null, T];

export const runSafe = <T = unknown>(
  fn: (() => T) | undefined
): RunSafeResult<T> => {
  if (!fn) {
    return [new Error("No function provided")] as const;
  }

  try {
    return [null, fn()] as const;
  } catch (e) {
    if (e instanceof Error) {
      return [e] as const;
    }

    return [new Error("Unknown error")] as const;
  }
};

export const convertTimestampToDate = (timestamp?: number | string): Date => {
  if (!timestamp) {
    return new Date();
  }

  const parsedTimestamp =
    typeof timestamp === "string" ? Number.parseInt(timestamp, 10) : timestamp;

  if (Number.isNaN(parsedTimestamp)) {
    return new Date();
  }

  return new Date(parsedTimestamp * 1000);
};

export const convertTimestampToDateString = (
  timestamp?: number | string
): string => {
  return dayjs(convertTimestampToDate(timestamp)).format("DD/MM/YYYY");
};

export const formatNumber = (number?: number) => {
  if (
    number === null ||
    number === undefined ||
    !String(number).match(/[0-9]/g)
  )
    return "";
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

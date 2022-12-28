import pino from "pino";

export let logger: any;

export const initLogger = function (logLevel: string) {
  logger = pino({
    level: logLevel,
  });
  return logger;
};

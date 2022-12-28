import pino from "pino";

export let logger: any;

export const initLogger = function (logLevel: string) {
  logger = pino({
    level: logLevel,
    // #TODO: conditionally add based on environment
    // transport: {
    //   target: "pino-pretty",
    // },
  });
  return logger;
};

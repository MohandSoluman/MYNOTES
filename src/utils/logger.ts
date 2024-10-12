import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

class Logger {
  private logger: winston.Logger;

  constructor() {
    const logFormat = winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    });

    // Read file paths from environment variables
    const infoLogPath = process.env.INFO_LOG_PATH || "./logs/app-info.log";
    const errorLogPath = process.env.ERROR_LOG_PATH || "./logs/app-error.log";
    const exceptionLogPath =
      process.env.EXCEPTION_LOG_PATH || "./logs/exceptions.log";
    const rejectionLogPath =
      process.env.REJECTION_LOG_PATH || "./logs/rejections.log";

    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.errors({ stack: true }),
        logFormat
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(winston.format.colorize(), logFormat),
        }),
        new DailyRotateFile({
          filename: infoLogPath,
          datePattern: "YYYY-MM-DD",
          maxFiles: "1d", // Keep logs for 30 days
          level: "info",
        }),
        new DailyRotateFile({
          filename: errorLogPath,
          datePattern: "YYYY-MM-DD",
          maxFiles: "1d",
          level: "error",
        }),
      ],
    });

    // Handle uncaught exceptions and unhandled rejections
    this.logger.exceptions.handle(
      new winston.transports.File({
        filename: exceptionLogPath,
      })
    );
    this.logger.rejections.handle(
      new winston.transports.File({
        filename: rejectionLogPath,
      })
    );
  }

  info(message: string, id?: number | string): void {
    this.logger.info(message);
  }

  error(message: string, error?: Error): void {
    this.logger.error(message, error ? { error: error.stack } : {});
  }

  debug(message: string): void {
    this.logger.debug(message);
  }

  warn(message: string, id?: number): void {
    this.logger.warn(message);
  }
}

export const logger = new Logger();

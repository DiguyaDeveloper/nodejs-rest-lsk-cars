import {
  createLogger,
  format,
  Logger as WinstonLogger,
  LoggerOptions,
  transports,
} from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { env } from './../env';
import { INCLUDE_FILENAME, MAX_FILENAME_LENGTH } from './constants.config';
import { basename } from 'path';
import { Logger as TypeOrmLogger, QueryRunner } from 'typeorm';
import path from 'path';
import fs from 'fs';

enum Env {
  dev = 'dev',
  test = 'test',
  prod = 'prod',
}

const { combine, errors, timestamp, printf, colorize } = format;

let dir = env.log.dir;
if (!dir) dir = path.resolve('logs');

// create directory if it is not present
if (!fs.existsSync(dir)) {
  // Create the directory if it does not exist
  fs.mkdirSync(dir);
}

export function getLogger(filePath: string): WinstonLogger {
  let fileName = basename(filePath);
  fileName =
    fileName.length > MAX_FILENAME_LENGTH
      ? fileName.slice(0, MAX_FILENAME_LENGTH)
      : fileName.padEnd(MAX_FILENAME_LENGTH, ' ');

  const customFormat = printf((info) => {
    const level = `[${info.level.toUpperCase()}]`.padEnd(9, ' ');
    const source = INCLUDE_FILENAME ? fileName + ' ' : '';
    const log = `${info.timestamp} ${source}${level}${info.message}`;
    return info.stack ? `${log}\n${info.stack}` : log;
  });

  const options: LoggerOptions = {
    level: env.log.level,
    format: combine(errors({ stack: true }), timestamp()),
  };

  if (env.node !== Env.test) {
    options.transports = [
      new transports.File({
        filename: env.log.dir + '/%DATE%.log',
        maxsize: 10000000,
        format: customFormat,
        zippedArchive: true,
        handleExceptions: true,
      }),
      new transports.Console({
        format: combine(customFormat, colorize({ all: true })),
      }),
    ];

    const daily = {
      file: {
        level: env.log.level,
        filename: env.log.dir + '/%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        timestamp: true,
        handleExceptions: true,
        humanReadableUnhandledException: true,
        prettyPrint: true,
        json: true,
        maxSize: '20m',
        colorize: true,
        maxFiles: '14d',
      },
    };
    options.exceptionHandlers = [new DailyRotateFile(daily.file)];
  }

  return createLogger(options);
}

export class CustomTypeOrmLogger implements TypeOrmLogger {
  private logger = getLogger('TypeOrm');

  log(
    level: 'log' | 'info' | 'warn',
    message: any,
    queryRunner?: QueryRunner
  ): any {
    this.logger.log(level, message);
  }

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    this.logger.debug(`Query: ${query}`);
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner
  ): any {
    this.logger.warn(`The query "${query}" executed slowly in ${time}ms`);
  }

  logQueryError(
    error: string,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner
  ): any {
    let message = error;
    message += `\n\tWith query: ${query}`;
    if (parameters && parameters.length > 0) {
      message += `\n\tWith params: ${parameters}`;
    }
    this.logger.error(message);
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner): any {
    this.logger.info(message);
  }

  logMigration(message: string, queryRunner?: QueryRunner): any {
    this.logger.info(message);
  }
}

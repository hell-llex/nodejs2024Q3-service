import { Injectable } from '@nestjs/common';
import { ILogger } from './logger.interface';
import { createWriteStream, WriteStream } from 'fs';
import * as path from 'path';

@Injectable()
export class FileLoggerService implements ILogger {
  private logStream: WriteStream;
  private readonly logLevels = ['error', 'warn', 'info', 'debug'];
  private currentLevel: string;

  constructor() {
    this.currentLevel = process.env.LOG_LEVEL || 'info';
    this.initializeLogStream();
  }

  private initializeLogStream() {
    const logFile = path.join(process.cwd(), 'logs', 'app.log');
    this.logStream = createWriteStream(logFile, { flags: 'a' });
  }

  error(message: string, meta?: any) {
    this.log('error', message, meta);
  }

  warn(message: string, meta?: any) {
    this.log('warn', message, meta);
  }

  info(message: string, meta?: any) {
    this.log('info', message, meta);
  }

  debug(message: string, meta?: any) {
    this.log('debug', message, meta);
  }

  private log(level: string, message: string, meta?: any) {
    if (this.shouldLog(level)) {
      const logEntry = {
        timestamp: new Date().toISOString(),
        level,
        message,
        meta,
      };

      this.writeLog(JSON.stringify(logEntry) + '\n');
    }
  }

  private shouldLog(level: string): boolean {
    return (
      this.logLevels.indexOf(level) <= this.logLevels.indexOf(this.currentLevel)
    );
  }

  private writeLog(entry: string) {
    this.logStream.write(entry);
  }
}

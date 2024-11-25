import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  appendFileSync,
  createWriteStream,
  existsSync,
  mkdirSync,
  WriteStream,
} from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingService {
  private currentLogFile: string;
  private currentFileSize = 0;
  private readonly maxFileSize: number;
  private readonly logLevels = ['error', 'warn', 'info', 'debug'];
  private readonly currentLevel: string;
  private writeStream: WriteStream;
  private lastLoggedFile: string;
  private lastUpdateTime = 0;
  private readonly UPDATE_INTERVAL = 10000;
  private isFirstLog = true;

  constructor(private configService: ConfigService) {
    this.maxFileSize =
      this.configService.get<number>('LOG_FILE_SIZE_KB', 1024) * 1024;
    this.currentLevel = this.configService.get<string>('LOG_LEVEL', 'info');
    this.initializeLogFile();
  }

  private initializeLogFile() {
    // const logsDir = path.join(process.cwd(), 'logs');
    // Добавляем проверку на Docker окружение
    const baseDir = process.env.NODE_ENV === 'production' ? '.' : process.cwd();
    const logsDir = path.join(baseDir, 'logs');

    if (!existsSync(logsDir)) {
      mkdirSync(logsDir);
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    this.currentLogFile = path.join(logsDir, `app-${timestamp}.log`);
    this.writeStream = createWriteStream(this.currentLogFile, {
      flags: 'a',
    });
  }

  private rotateLogFileIfNeeded() {
    if (this.currentFileSize >= this.maxFileSize) {
      this.initializeLogFile();
    }
  }

  private log(level: string, message: string, meta?: any) {
    if (this.shouldLog(level)) {
      const logEntry =
        JSON.stringify({
          timestamp: new Date().toISOString(),
          level,
          message,
          meta,
        }) + '\n';

      const currentTime = Date.now();
      this.rotateLogFileIfNeeded();

      if (this.isFirstLog) {
        process.stdout.write(
          `\nStarted logging at ${new Date().toLocaleString()}: ${
            this.currentLogFile
          }\n`,
        );
        this.isFirstLog = false;
        this.lastUpdateTime = currentTime;
      } else if (currentTime - this.lastUpdateTime >= this.UPDATE_INTERVAL) {
        process.stdout.write(
          `\nLog file updated at ${new Date().toLocaleString()}: ${
            this.currentLogFile
          }\n`,
        );
        this.lastUpdateTime = currentTime;
      }

      appendFileSync(this.currentLogFile, logEntry);
      this.currentFileSize += Buffer.byteLength(logEntry);
      this.lastLoggedFile = this.currentLogFile;
    }
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

  private shouldLog(level: string): boolean {
    return (
      this.logLevels.indexOf(level) <= this.logLevels.indexOf(this.currentLevel)
    );
  }
}

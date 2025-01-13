export enum LogLevel {
  "log" = "log",
  "error" = "error",
  "warn" = "warn",
  "debug" = "debug",
  "verbose" = "verbose",
  "fatal" = "fatal",
}

const LOG_LEVEL_VALUES: Record<LogLevel, number> = {
  verbose: 0,
  debug: 1,
  log: 2,
  warn: 3,
  error: 4,
  fatal: 5,
};

export class Logger {
  static logLevel: LogLevel | false = LogLevel.verbose;

  constructor(private readonly prefix: string) {}

  static setLogLevel(logLevel: LogLevel | false) {
    Logger.logLevel = logLevel;
  }

  log(message: string, ...args: unknown[]) {
    if (!this.isLogLevelEnabled(LogLevel.log)) return;
    this.writeMessage("log", message, ...args);
  }

  warn(message: string, ...args: unknown[]) {
    if (!this.isLogLevelEnabled(LogLevel.warn)) return;
    this.writeMessage("warn", message, ...args);
  }

  verbose(message: string, ...args: unknown[]) {
    if (!this.isLogLevelEnabled(LogLevel.verbose)) return;
    this.writeMessage("info", message, ...args);
  }

  debug(message: string, ...args: unknown[]) {
    if (!this.isLogLevelEnabled(LogLevel.debug)) return;
    this.writeMessage("debug", message, ...args);
  }

  error(message: string, ...args: unknown[]) {
    if (!this.isLogLevelEnabled(LogLevel.error)) return;
    this.writeMessage("log", message, ...args);
  }

  writeMessage(method: "log" | "debug" | "error" | "warn" | "info", message: string, ...args: unknown[]) {
    return console[method](`[${this.prefix}]: ${message}`, ...args);
  }

  /**
   * Checks if target level is enabled.
   * @param targetLevel target level
   * @param logLevels array of enabled log levels
   */
  private isLogLevelEnabled(targetLevel: LogLevel): boolean {
    if (Logger.logLevel === false) return false;

    const enabledLogLevelValue = LOG_LEVEL_VALUES[Logger.logLevel];
    const targetLogLevelValue = LOG_LEVEL_VALUES[targetLevel];

    return targetLogLevelValue >= enabledLogLevelValue;
  }
}

declare global {
  const figmaPluginsEnv: { [key: string]: string };

  type LoggerType = 'ERROR' | 'WARNING' | 'INFO' | 'DEBUG';
  type LoggerSource = 'UI' | 'CODE';
  type Loggable = string | Record<string, unknown> | number | undefined;
  type LogMethod = (message: Loggable) => void;
  namespace NodeJS {
    interface Global {
      logD: LogMethod;
      logI: LogMethod;
      logW: LogMethod;
      logE: LogMethod;
    }
  }
  const { logD, logI, logW, logE } = global;
}

export {};

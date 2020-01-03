import Debug from 'debug';

import { name as packageName } from '../../package.json';

const pluginName = (packageName as string).replace(/-([a-z])/g, substring =>
  substring[1].toUpperCase(),
);

const PLUGIN_NAME = (packageName as string).replace(/-/g, '_').toUpperCase();

const NODE_ENV =
  figmaPluginsEnv && figmaPluginsEnv[pluginName] ? figmaPluginsEnv[pluginName] : 'production';

const log = (logType: LoggerType, logSource: LoggerSource, logColor: string): LogMethod => {
  const debugInstance = Debug(`${PLUGIN_NAME}:${logType}:${logSource}`);
  debugInstance.color = logColor;
  // disable DEBUG logger type on production
  debugInstance.enabled = NODE_ENV !== 'production' || logType !== 'DEBUG';
  return debugInstance as LogMethod;
};

export const registerLogger = (logSource: LoggerSource): void => {
  global.logE = log('ERROR', logSource, 'red');
  global.logW = log('WARNING', logSource, 'orange');
  global.logI = log('INFO', logSource, 'green');
  global.logD = log('DEBUG', logSource, 'blue');
};

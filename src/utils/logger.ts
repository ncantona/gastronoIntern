const isDev = import.meta.env.DEV;

export const log = {
  info: (...args: any[]) => isDev && console.info('[INFO]', ...args),
  warn: (...args: any[]) => isDev && console.warn('[WARN]', ...args),
  error: (...args: any[]) => console.error('[ERROR]', ...args), // Fehler immer loggen
  debug: (...args: any[]) => isDev && console.info('[DEBUG]', ...args) //in console.debug ändern (LIVE)
};
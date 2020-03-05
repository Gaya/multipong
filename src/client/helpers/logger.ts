/* eslint-disable no-console */

type LogMessage = string | number | boolean | LogMessage[] | { [property: string]: LogMessage };

export function info(...message: LogMessage[]): void {
  console.info(...message);
}

export function log(...message: LogMessage[]): void {
  console.log(...message);
}

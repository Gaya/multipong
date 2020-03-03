type LogMessage = string | number | boolean | LogMessage[] | { [property: string]: LogMessage };

export function info(...message: LogMessage[]) {
  console.info(...message);
}

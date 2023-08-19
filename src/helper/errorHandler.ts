export function errorHandler(err: unknown, action: string, item: string) {
  if (err instanceof Error) throw new Error(`Error ${action}: ${err.message}`);
  throw new Error(`Unknown error ${action} ${item}`);
}

export function debugPrint(...args) {
  if (isDebug) {
    console.log(...args);
  }
}

export function isDebug() {
  return !process.env.NODE_ENV || process.env.NODE_ENV === "development";
}

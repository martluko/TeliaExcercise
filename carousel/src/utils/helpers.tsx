
export function debounce(callback: Function, wait: number, timeoutId?: number): Function {
    return (...args) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        callback.apply(null, args);
      }, wait);
    };
  }
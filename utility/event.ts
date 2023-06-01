export function dispatch() {
  window.dispatchEvent(new CustomEvent("local-changed"));
}

export function onLocalStorageChange(callback: (event: Event) => void) {
  window.addEventListener("local-changed", callback);
  return () => window.removeEventListener("local-changed", callback);
}

export function dispatchManualChange() {
  function handleChange(event: StorageEvent) {
    if (event.storageArea === localStorage) {
      dispatch();
    }
  }

  window.addEventListener("storage", handleChange);
  return () => window.removeEventListener("storage", handleChange);
}

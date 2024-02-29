import { useSyncExternalStore } from "react";

const useLocalStorage = () => {
  const item = useSyncExternalStore(subscribe, getSnapshot, () => undefined);
  const value = typeof item === "string" ? JSON.parse(item) : null;

  const setValue = (country) => {
    localStorage.setItem("location", JSON.stringify(country));
    window.dispatchEvent(new StorageEvent("update-country"));
  };

  return [value, setValue];
};

function subscribe(callback) {
  window.addEventListener("update-country", callback);
  return () => {
    window.removeEventListener("update-country", callback);
  };
}

function getSnapshot() {
  return localStorage.getItem("location");
}

export default useLocalStorage;

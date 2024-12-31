import { useSyncExternalStore } from "react";

const useLocalStorage = () => {
    const item = useSyncExternalStore(subscribe, getSnapshot, () => setValue);

    // const value = typeof item === "string" ? JSON.parse(item) : null;
    let value = null;
    if (typeof item === "string") {
        try {
            value = JSON.parse(item);
        } finally {
        }
    }

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

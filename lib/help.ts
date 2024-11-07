export const isBrowser = (): boolean => {
    return typeof window !== "undefined" && typeof document !== "undefined";
};

export const startAutoFetch = (fun: () => void) => {
    fun();
    const intervalId = setInterval(() => {
        return fun();
    }, 10000);
    return () => clearInterval(intervalId);
};

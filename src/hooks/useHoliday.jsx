import useSWR from "swr";
import { useState, useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const useHoliday = () => {
    const [location] = useLocalStorage();
    const [params, setParams] = useState({
        year: new Date().getFullYear(),
        country: null,
    });

    useEffect(() => {
        getClientLocation();
    }, []);

    useEffect(() => {
        handleCountry(location);
    }, [location?.country]);

    const { data, error, isLoading, mutate } = useSWR(
        () =>
            params.country ? `/api/holiday?YEAR=${params.year}&COUNTRY=${params.country}` : null,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    const getClientLocation = () => {
        if (location) {
            if (location !== params.country) {
                setParams((params) => ({ ...params, country: location }));
            }
        }
    };

    const handleCountry = (newCountry) => {
        if (newCountry) {
            const originalyear = new Date().getFullYear();
            setParams({ year: originalyear, country: newCountry.country });
        }
    };

    const handleNextData = async () => {
        const nextYear = params.year + 1;
        setParams((params) => ({ ...params, year: nextYear }));
    };

    return {
        data: data,
        isLoading,
        isError: error,
        handleNextData,
        handleCountry,
    };
};

export default useHoliday;

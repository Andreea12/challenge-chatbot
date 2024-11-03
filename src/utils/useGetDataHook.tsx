import { useEffect, useState } from "react";
import { Exchange } from "../types";

export const useGetDataHook = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Exchange[]>([]);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    fetch("data/stocks.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length) {
          setData(data);
        } else {
          setError("no data found");
        }
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  return { isLoading, data, error };
};

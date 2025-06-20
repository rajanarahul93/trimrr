import { useState } from "react";

const useFetch = (fn) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (params) => {
    // params passed when calling
    setLoading(true);
    setError(null);
    try {
      const result = await fn(params);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn: execute };
};

export default useFetch;
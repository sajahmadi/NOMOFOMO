import { useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig";

const useAxios = ({ url, method, body = null, refetch }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);

  const fetchData = () => {
    axiosInstance[method](url, JSON.parse(body))
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [method, url, body, refetch]);

  return { response, error, loading };
};

export default useAxios;

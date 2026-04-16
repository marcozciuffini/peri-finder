import { ApiResponse, create } from "apisauce";

import { ApiResult, Restaurant, RestaurantsResponse } from "@/types/apiResponseTypes";

const nandosApi = create({
  baseURL: "https://storage.googleapis.com/nandos-engineering-public/coding-challenge-rn",
  timeout: 8000,
});

const getErrorMessage = (problem: string | null = null): string => {
  switch (problem) {
    case "TIMEOUT_ERROR":
      return "Request timed out";
    case "NETWORK_ERROR":
    case "CONNECTION_ERROR":
      return "No network connection";
    case "SERVER_ERROR":
      return "Server error";
    case "CLIENT_ERROR":
      return "Client error";
    default:
      return "Unknown error";
  }
};

const handleResponse = <T>(res: ApiResponse<T>): ApiResult<T> => {
  const { ok, status, problem, data } = res;

  if (ok) {
    return { ok: true, status, data: data as T };
  }

  return {
    ok: false,
    status,
    message: getErrorMessage(problem),
  };
};

export const fetchRestaurants = async (): Promise<ApiResult<Restaurant[]>> => {
  const res = await nandosApi.get<RestaurantsResponse>("/restaurantlist.json");
  const result = handleResponse(res);

  if (result.ok) {
    return { ok: true, status: result.status, data: result.data.data.restaurant.items };
  }

  return result;
};

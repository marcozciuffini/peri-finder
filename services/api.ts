import i18n from "@/i18n";
import { ApiResponse, create } from "apisauce";

import { ApiResult, Restaurant, RestaurantsResponse } from "@/types/apiResponseTypes";

const nandosApi = create({
  baseURL: "https://storage.googleapis.com/nandos-engineering-public/coding-challenge-rn",
  timeout: 8000,
});

const getErrorMessage = (problem: string | null = null): string => {
  switch (problem) {
    case "TIMEOUT_ERROR":
      return i18n.t("errors.timeout");
    case "NETWORK_ERROR":
    case "CONNECTION_ERROR":
      return i18n.t("errors.network");
    case "SERVER_ERROR":
      return i18n.t("errors.server");
    case "CLIENT_ERROR":
      return i18n.t("errors.client");
    default:
      return i18n.t("errors.unknown");
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
  
  const res = await nandosApi.get<RestaurantsResponse>("/restaurantlist.json", {}, { headers: { 'Cache-Control': 'no-cache' } });
  const result = handleResponse(res);

  if (result.ok) {
    return { ok: true, status: result.status, data: result.data.data.restaurant.items };
  }

  return result;
};

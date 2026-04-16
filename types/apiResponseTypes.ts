type ApiSuccess<T> = {
  ok: true;
  status?: number;
  data: T;
  message?: never;
};

type ApiError = {
  ok: false;
  status?: number;
  message: string;
  data?: never;
};

export type ApiResult<T> = ApiSuccess<T> | ApiError;

export type RestaurantsResponse = {
  data: {
    restaurant: {
      items: Restaurant[];
    };
  };
};

export type Restaurant = {
  name: string;
  url: string;
  geo: {
    address: {
      streetAddress: string;
      addressLocality: string;
      postalCode: string;
    };
  };
};

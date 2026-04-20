import { fetchRestaurants } from '../api';

const mockGet = jest.fn();

jest.mock('apisauce', () => ({
  create: () => ({ get: (...args: any[]) => mockGet(...args) }),
}));

jest.mock('@/i18n', () => ({
  __esModule: true,
  default: { t: (key: string) => key },
}));

const sellyOak = {
  name: "Nando's Selly Oak",
  url: 'https://www.nandos.co.uk/restaurants/selly-oak',
  geo: { address: { streetAddress: 'The Triangle, Bristol Road', addressLocality: 'Selly Oak', postalCode: 'B29 6BJ' } },
};

const bullring = {
  name: "Nando's Birmingham Bullring",
  url: 'https://www.nandos.co.uk/restaurants/birmingham-bullring',
  geo: { address: { streetAddress: 'The Bullring', addressLocality: 'Birmingham', postalCode: 'B5 4BE' } },
};

const apiSuccess = (items: any[]) => ({
  ok: true,
  status: 200,
  problem: null,
  data: { data: { restaurant: { items } } },
});

const apiError = (problem: string, status = 500) => ({
  ok: false,
  status,
  problem,
  data: null,
});

describe('fetchRestaurants', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns restaurant items from nested response on success', async () => {
    mockGet.mockResolvedValue(apiSuccess([sellyOak]));

    const result = await fetchRestaurants();

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data).toHaveLength(1);
      expect(result.data[0].name).toBe("Nando's Selly Oak");
    }
  });

  it('returns all items when multiple restaurants exist', async () => {
    mockGet.mockResolvedValue(apiSuccess([sellyOak, bullring]));

    const result = await fetchRestaurants();

    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data).toHaveLength(2);
  });

  it('returns ok false on timeout', async () => {
    mockGet.mockResolvedValue(apiError('TIMEOUT_ERROR'));

    const result = await fetchRestaurants();

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.message).toBe('errors.timeout');
  });

  it('returns network error message for NETWORK_ERROR', async () => {
    mockGet.mockResolvedValue(apiError('NETWORK_ERROR'));

    const result = await fetchRestaurants();

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.message).toBe('errors.network');
  });

  it('returns network error message for CONNECTION_ERROR', async () => {
    mockGet.mockResolvedValue(apiError('CONNECTION_ERROR'));

    const result = await fetchRestaurants();

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.message).toBe('errors.network');
  });

  it('returns server error message for SERVER_ERROR', async () => {
    mockGet.mockResolvedValue(apiError('SERVER_ERROR'));

    const result = await fetchRestaurants();

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.message).toBe('errors.server');
  });

  it('returns client error message for CLIENT_ERROR', async () => {
    mockGet.mockResolvedValue(apiError('CLIENT_ERROR', 404));

    const result = await fetchRestaurants();

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.message).toBe('errors.client');
  });

  it('returns unknown error message for unrecognised problem', async () => {
    mockGet.mockResolvedValue(apiError('CANCEL_ERROR'));

    const result = await fetchRestaurants();

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.message).toBe('errors.unknown');
  });
});

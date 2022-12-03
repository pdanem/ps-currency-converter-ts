// https://exchangeratesapi.io/
// const BASE_URL = 'http://api.exchangeratesapi.io/v1';
const BASE_URL = 'https://api.apilayer.com/exchangerates_data';
const API_KEY = 'mDaQu4Rj25eHH0Hx9moMsIkOU1pk6oTh'

// TODO: what is the response type in the Promise? We should avoid using 'any'
type API = (params: {
  endpoint: string,
  params: {
    base?: string,
  },
}) => Promise<any>;

const api: API = ({ endpoint, params = {} }) => {
  const searchParams = new URLSearchParams(params);
  // searchParams.append('apiKey', API_KEY);
  const queryString = searchParams.toString();

  const headers = new Headers();
  headers.append('apiKey', API_KEY)

  const requestOptions = {
    method: 'GET',
    redirect: 'follow' as RequestRedirect,
    headers: headers
  };


  return fetch(`${BASE_URL}${endpoint}?${queryString}`, requestOptions);
};

export const fetchRates = async (baseCurrency: string) => {
  try {
    const response = await api({ endpoint: '/latest', params: { base: baseCurrency } });
    const responseText = await response.text();
    const { rates, error } = JSON.parse(responseText);

    if (error) {
      throw new Error(error);
    }

    if (!rates || !Object.keys(rates).length) {
      throw new Error('Could not fetch rates.');
    }

    return rates;
  } catch (errorResponse) {
    throw errorResponse;
  }
};

/*
 * Replaced the original endpoint with
 * what seems to be a more appropriate currency
 * conversion endpoint provided by the API
 * 
 * Reference: https://apilayer.com/marketplace/exchangerates_data-api 
 */

const BASE_URL = 'https://api.apilayer.com/exchangerates_data';
const API_KEY = 'c5zBN2N6gfeHRRfzBdYAvwltABnX3Oqz'

// TODO: what is the response type in the Promise? We should avoid using 'any'
type API<T> = (params: {
  endpoint: string,
  params?: T,
}) => Promise<Response>;

type ApiParams = Record<string, string>

interface ConvertParams extends ApiParams {
  from: string,
  to: string,
  amount: string
}

interface SymbolParams extends ApiParams {}

const api: API<ApiParams> = ({ endpoint, params = {} }) => {
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

export const convertCurrency = async (fromCurrency: string, toCurrency: string, amount: string) => {
  try {
    const response = await (api as API<ConvertParams>)({ endpoint: '/convert',
      params: {
        from: fromCurrency,
        to: toCurrency,
        amount: amount
      }
    });
    const responseText = await response.text();
    const { result, success, error } = JSON.parse(responseText);

    if (error) {
      throw new Error(error.code);
    }

    if (!success || !result) {
      throw new Error('Could not convert currency.');
    }

    return result;
  } catch (errorResponse: any) {
    if (errorResponse.message === 'invalid_to_currency') {
      throw new Error(`Target '${toCurrency}' is not supported.`)
    }
    if (errorResponse.message === 'invalid_from_currency') {
      throw new Error(`Base '${fromCurrency}' is not supported.`)
    }

    throw errorResponse;
  }
};

export const fetchSymbols = async () => {
  try {
    const response = await (api as API<SymbolParams>)({ endpoint: '/symbols' });
    const responseText = await response.text();
    const { symbols, success, error } = JSON.parse(responseText);
    const symbolsArray = Object.keys(symbols);

    if (error) {
      throw new Error(error);
    }

    if (!success || symbolsArray.length === 0) {
      throw new Error('Could not fetch symbols.');
    }

    return symbols;
  } catch (errorResponse: any) {
    throw errorResponse;
  }
};
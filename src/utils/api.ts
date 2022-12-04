/*
 * Replaced the original endpoint with
 * what seems to be a more appropriate currency
 * conversion endpoint provided by the API
 * 
 * Reference: https://apilayer.com/marketplace/exchangerates_data-api 
 */

const BASE_URL = 'https://api.apilayer.com/exchangerates_data';
const API_KEY = 'mDaQu4Rj25eHH0Hx9moMsIkOU1pk6oTh'

// TODO: what is the response type in the Promise? We should avoid using 'any'
type API = (params: {
  endpoint: string,
  params: {
    from: string,
    to: string,
    amount: string
  },
}) => Promise<Response>;

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

export const convertCurrency = async (fromCurrency: string, toCurrency: string, amount: string) => {
  try {
    const response = await api({ endpoint: '/convert',
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

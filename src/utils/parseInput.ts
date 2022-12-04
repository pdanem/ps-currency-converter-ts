type ParseInput = (input: string) => {
  fromAmount: number;
  fromCurrency: string;
  toCurrency: string
}

const throwInvalidInputError = () => {
  throw new Error("Invalid input structure");
}

export const parseInput: ParseInput = (input) => {
  // expected input: 1 EUR to USD
  // TODO: parse or tokenize the input string
  const initialRegexp = /^\d*(\.\d*){0,1}\s+([a-z])+\s+to\s([a-z])+/ig;
  const matchesFormat = initialRegexp.test(input);
  if (!matchesFormat) {
    throwInvalidInputError();
  }

  const [fromAmount, fromCurrency, , toCurrency] = input.split(/\s/g);

  return {
    fromAmount: +fromAmount,
    fromCurrency: fromCurrency.toUpperCase(),
    toCurrency: toCurrency.toUpperCase(),
  };
};

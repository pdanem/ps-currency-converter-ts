export const verifyInputCurrency = (currency: string, validCurrencies: string[]) => {
	return validCurrencies.includes(currency.toUpperCase());
}
import InputField from './components/InputField';
import ResultsField from './components/ResultsField';

import './App.css';

import Alert from '@mui/material/Alert/Alert';
import Grid from '@mui/material/Grid/Grid';
import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import { ConversionResult } from './types/conversionResults';
import { convertCurrency, fetchSymbols } from './utils/api';
import { parseInput } from './utils/parseInput';


const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [conversionResult, setConversionResult] = useState<ConversionResult>();
  const [conversionLoading, setConversionLoading] = useState(false);
  const [symbols, setSymbols] = useState<Record<string, string>>();
  const [symbolsLoading, setSymbolsLoading] = useState(true);
  const disableUserInputs = useMemo(() => conversionLoading || symbolsLoading, [conversionLoading, symbolsLoading])

  useEffect(() => {
    setSymbolsLoading(true);
    (async () => {
      const symbols = await fetchSymbols();
      setSymbols(symbols);
      setSymbolsLoading(false);
    })()
  }, [setSymbolsLoading])

  const handleSubmit = async () => {
    setConversionLoading(true);
    await processUserInput(inputValue);
    setConversionLoading(false);
  };

  const processUserInput = async (userInputString: string) => {
    try {
      const inputToken = parseInput(userInputString);
      const result = await convertCurrency(
        inputToken.fromCurrency,
        inputToken.toCurrency,
        inputToken.fromAmount.toString()
      );

      setErrorMessage('')
      setConversionResult({
        convertedAmount: result,
        baseAmount: inputToken.fromAmount,
        baseName: symbols?.[inputToken.fromCurrency.toUpperCase()] ?? inputToken.fromCurrency,
        targetName: symbols?.[inputToken.toCurrency.toUpperCase()] ?? inputToken.toCurrency,
        baseSymbol: inputToken.fromCurrency,
        targetSymbol: inputToken.toCurrency
      });
    } catch (e: any) {
      setErrorMessage(e.message);
    }

  }

  const handleReversal = async () => {
      setConversionLoading(true);
      const { baseSymbol, convertedAmount, targetSymbol } = conversionResult as ConversionResult;
      const reversedInputString = `${Number(convertedAmount).toFixed(2)} ${targetSymbol} to ${baseSymbol}`
      setInputValue(reversedInputString);
      await processUserInput(reversedInputString);
      setConversionLoading(false);
  }

  return (
    <div className="app">
      <div className="app__content">
        <Grid container direction="column" rowSpacing={2}>
          <Grid item>
            <Header />
          </Grid>
          <Grid item>
            <InputField
              value={inputValue}
              handleChange={setInputValue}
              handleSubmit={handleSubmit}
              disabled={disableUserInputs}/>
          </Grid>
          {
            errorMessage &&
            <Grid item>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
          }
          {
            (conversionResult && !errorMessage) &&
            <Grid item>
              <ResultsField result={conversionResult} handleReversal={handleReversal} disabled={disableUserInputs}/>
            </Grid>
          }
        </Grid>
      </div>
    </div>
  );
};

export default App;

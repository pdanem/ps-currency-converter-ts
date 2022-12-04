import InputField from './components/InputField';
import ResultsField from './components/ResultsField';

import './App.css';

import Alert from '@mui/material/Alert/Alert';
import Grid from '@mui/material/Grid/Grid';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import { ConversionResult } from './types/conversionResults';
import { convertCurrency, fetchSymbols } from './utils/api';
import { parseInput } from './utils/parseInput';


const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [conversionResult, setConversionResult] = useState<ConversionResult>();
  const [symbols, setSymbols] = useState<Record<string, string>>();
  const [symbolsLoading, setSymbolsLoading] = useState(true);

  useEffect(() => {
    setSymbolsLoading(true);
    (async () => {
      const symbols = await fetchSymbols();
      setSymbols(symbols);
      setSymbolsLoading(false);
    })()
  }, [setSymbolsLoading])

  const handleSubmit = async () => {
    try {
      const inputToken = parseInput(inputValue);
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
      });
    } catch (e: any) {
      setErrorMessage(e.message);
    }
  };

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
              handleSubmit={handleSubmit}/>
          </Grid>
          {
            errorMessage &&
            <Grid item>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
          }
          {
            conversionResult &&
            <Grid item>
              <ResultsField result={conversionResult}/>
            </Grid>
          }
        </Grid>
      </div>
    </div>
  );
};

export default App;

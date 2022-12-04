import InputField from './components/InputField';

import './App.css';

import Alert from '@mui/material/Alert/Alert';
import Grid from '@mui/material/Grid/Grid';
import { useState } from 'react';
import Header from './components/Header';
import { convertCurrency } from './utils/api';
import { parseInput } from './utils/parseInput';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [conversionResult, setConversionResult] = useState();

  const handleSubmit = async () => {
    try {
      const inputToken = parseInput(inputValue);
      const result = await convertCurrency(
        inputToken.fromCurrency,
        inputToken.toCurrency,
        inputToken.fromAmount.toString()
      );

      setErrorMessage('')
      setConversionResult(result);
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
          <Grid item>
            {conversionResult}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default App;

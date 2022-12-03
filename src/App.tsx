import InputField from './components/InputField';

import './App.css';

import { useState } from 'react';
import Header from './components/Header';
import { fetchRates } from './utils/api';

const App = () => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async () => {
    try {
      const rates = await fetchRates('EUR');
      console.log(rates);
    } catch (e: any) {
      console.error(e.message);
    }
  };

  return (
    <div className="app">
      <div className="app__content">
        <Header />
        <InputField value={inputValue} handleChange={setInputValue}/>
        <button onClick={handleSubmit}>get rates</button>
      </div>
    </div>
  );
};

export default App;

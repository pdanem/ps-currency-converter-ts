import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl/FormControl';
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput/OutlinedInput";
import React, { ChangeEvent } from "react";

interface InputFieldProps {
  value?: string;
  handleChange?: (newValue: string) => void;
}

const PLACEHOLDER_TEXT = 'e.g. 1 AUD to USD';

const InputField: React.FC<InputFieldProps> = ({
  value = '',
  handleChange
}) => {

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleChange?.(event.target.value ?? '');
  }

	return (
		<FormControl fullWidth sx={{ m: 1 }}>
        <OutlinedInput
            id="outlined-adornment-amount"
            value={value}
            onChange={handleInputChange}
            placeholder={PLACEHOLDER_TEXT}
            endAdornment={<InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>}
        />
    </FormControl>
	)
}

export default InputField;
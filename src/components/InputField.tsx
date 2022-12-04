import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import FormControl from '@mui/material/FormControl/FormControl';
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput/OutlinedInput";
import React, { ChangeEvent, FormEvent } from "react";

interface InputFieldProps {
  value?: string;
  handleChange?: (newValue: string) => void;
  handleSubmit?: VoidFunction;
  disabled?: boolean
}

const PLACEHOLDER_TEXT = 'e.g. 1 AUD to USD';

const InputField: React.FC<InputFieldProps> = ({
  value = '',
  handleChange,
  handleSubmit,
  disabled
}) => {

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!disabled) {
      handleChange?.(event.target.value ?? '');
    }
  }

	return (
		<FormControl
      component="form"
      fullWidth
      onSubmit={
        (event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          event.stopPropagation();
          if (!disabled) {
            handleSubmit?.();
          }
        }
      }
      disabled={disabled}
    >
        <OutlinedInput
            value={value}
            onChange={handleInputChange}
            placeholder={PLACEHOLDER_TEXT}
            fullWidth
            endAdornment={<InputAdornment position="end">
              <IconButton type="submit" disabled={disabled}>
                  <SearchIcon />
              </IconButton>
            </InputAdornment>}
        />
    </FormControl>
	)
}

export default InputField;
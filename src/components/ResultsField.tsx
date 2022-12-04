import { SwapVert } from '@mui/icons-material';
import { Card, Grid, IconButton, Typography } from '@mui/material';
import React from "react";
import { ConversionResult } from '../types/conversionResults';

interface ResultsFieldProps {
  result: ConversionResult,
  handleReversal?: VoidFunction,
  disabled?: boolean
}

const ResultsField: React.FC<ResultsFieldProps> = ({
  result,
  handleReversal,
  disabled
}) => {
  const {baseAmount, baseName, convertedAmount, targetName} = result;

  const handleClick = () =>{
    if(!disabled) {
      handleReversal?.();
    }
  }

	return (
    <Grid container component={Card} variant="outlined" alignItems="center" direction="row" justifyContent="space-between" sx={{ p: 2 }}>
      <Grid container item direction="column" xs={8}>
        <Grid item component={Typography} variant="caption">{`${Number(baseAmount).toFixed(2)} ${baseName} equals`}</Grid>
        <Grid item component={Typography} variant="body1" fontWeight={600}>{`${Number(convertedAmount).toFixed(2)} ${targetName}`}</Grid>
      </Grid>
      <Grid item>
        <IconButton onClick={handleClick} disabled={disabled}>
          <SwapVert />
        </IconButton>
      </Grid>
    </Grid>
	)
}

export default ResultsField;
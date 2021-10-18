import React from 'react';
import { FormControl, TextField } from '@material-ui/core';
import './_style.scss';

export default function StringInput ({
  state_name,
  label,
  placeholder,
  outline_error,
  values,
  onChange_alpha,
}) {
  return (
    <FormControl className="form-control">
      <TextField
        className="text-field"
        label={label}
        error={outline_error.includes(state_name)}
        value={values[state_name]}
        onChange={onChange_alpha}
        variant="outlined"
        id={state_name}
        placeholder={placeholder}
      />
    </FormControl>
  )
}
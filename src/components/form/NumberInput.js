import React from 'react';
import { FormControl, TextField } from '@material-ui/core';
import './_style.scss';

export default function NumberInput ({
  state_name,
  label,
  placeholder,
  outline_error,
  values,
  onChange_num,
}) {
  return (
    <FormControl className="form-control">
      <TextField
        label={label}
        type="number"
        className="number-field"
        error={outline_error.includes(state_name)}
        value={values[state_name]}
        onChange={onChange_num}
        variant="outlined"
        id={state_name}
        placeholder={placeholder}
        onKeyDown={e => (e.keyCode === 69 || e.keyCode === 189 || e.keyCode === 187) && e.preventDefault()}
      />
    </FormControl>
  )
}

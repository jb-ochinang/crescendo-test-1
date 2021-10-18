import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { IconButton, FormControl, TextField } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import './_style.scss';

function IngredientsForm({
  inputList,
  setInputList
}) {

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { uuid: uuidv4(), name: '', amount: '', measurement: '' }]);
  };

  return (
    <>
      {inputList.map((x, i) => {
        return (
          <div className="box" key={x.uuid}>
            <div className="repeat">
              <FormControl className="form-control">
                <TextField
                  className="text-field"
                  label="Name"
                  variant="outlined"
                  name="name"
                  value={x.name}
                  onChange={e => handleInputChange(e, i)}
                />
              </FormControl>
              <FormControl className="form-control">
                <TextField
                  className="text-field"
                  label="Amount"
                  variant="outlined"
                  name="amount"
                  value={x.amount}
                  onChange={e => handleInputChange(e, i)}
                />
              </FormControl>
              <FormControl className="form-control">
                <TextField
                  className="text-field"
                  label="Measurement"
                  variant="outlined"
                  name="measurement"
                  value={x.measurement}
                  onChange={e => handleInputChange(e, i)}
                />
              </FormControl>
              <div className="remove-btn-container">
                {inputList.length !== 1 && <IconButton color="primary" className="btn-remove" onClick={() => handleRemoveClick(i)}><RemoveIcon /></IconButton>}
              </div>
            </div>

            {inputList.length - 1 === i && <IconButton color="secondary" className="btn-add" onClick={handleAddClick}><AddIcon /></IconButton>}
          </div>
        );
      })}
    </>
  );
}

export default IngredientsForm;
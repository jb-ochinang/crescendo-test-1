import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { IconButton, Switch, FormGroup, FormControlLabel, FormControl, TextField } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import './_style.scss';

function DirectionsForm({
  inputList,
  setInputList
}) {

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleSwitchChange = (e, index) => {
    const { name, checked } = e.target;
    const list = [...inputList];
    list[index][name] = checked;
    setInputList(list);
  };

  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { uuid: uuidv4(), instructions: '', optional: false }]);
  };

  return (
    <>
      {inputList.map((x, i) => {
        return (
          <div className="box" key={x.uuid ? x.uuid : i}>
            <div className="repeat">
              <FormControl className="form-control">
                <TextField
                  className="text-field"
                  label="Instructions"
                  variant="outlined"
                  name="instructions"
                  value={x.instructions}
                  onChange={e => handleInputChange(e, i)}
                />
              </FormControl>
              <FormGroup>
                <FormControlLabel
                  label="Optional"
                  control={
                    <Switch
                      disableRipple
                      classes={{
                        root: "root-switch",
                        switchBase: "switch-base",
                        thumb: "thumb",
                        track: "track",
                        checked: "checked",
                      }}
                      checked={x.optional}
                      name="optional"
                      onChange={e => handleSwitchChange(e, i)}
                    />
                  }
                />
              </FormGroup>
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

export default DirectionsForm;
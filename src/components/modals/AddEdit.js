import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { Modal, Backdrop, Zoom, IconButton, Button, Fade, FormControl } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import FadedContainer from '../../components/faded-container/FadedContainer';
import CloseIcon from '@material-ui/icons/Close';
import IngredientsForm from '../form/IngredientsForm';
import DirectionsForm from '../form/DirectionsForm';
import StringInput from '../form/StringInput';
import NumberInput from '../form/NumberInput';
import Loader from '../../components/loader/Loader';
import axios from 'axios';
import { BASE_URL } from '../../config/config';
import { DropzoneArea } from 'material-ui-dropzone';
import './_style.scss';
import './AddEdit.scss';

const DEFUALT_STATE = {
  title: '',
  description: '',
  servings: '',
  prepTime: '',
  cookTime: '',
}

const AddEditModal = ({
  open,
  onClose,
  data,
  mode
}) => {

  let isEdit = mode === 'edit';
  const [values, setValues] = useState(DEFUALT_STATE)
  const [ingredient_values, set_ingredient_values] = useState([{ uuid: uuidv4(), name: '', amount: '', measurement: '' }])
  const [directions_values, set_directions_values] = useState([{ uuid: uuidv4(), instructions: '', optional: false }])
  // IMAGE
  const [imageVal, setImageVal] = useState([]);
  const [initial_image, set_initial_file] = useState([]);
  const [image_remove, set_image_remove] = useState(false);
  const [image_loaded, set_image_loaded] = useState(false);
  const on_image_load = () => {
    setTimeout(() => {
      set_image_loaded(true);
    }, 200)
  }
  const onChangeImage = (file) => {
    remove_errors('avatar')
    setImageVal(file)
  }

  // LOADER
  const [loading, setLoading] = useState(false);

  // ERROR
  const [err_message, set_err_message] = useState('');
  const [outline_error, set_outline_error] = useState([]);

  // FUNCTIONS
  const remove_errors = (target) => {
    set_err_message('')
    let update_outline_error = outline_error.filter(id => id !== target)
    set_outline_error(update_outline_error)
  }

  const onChange_alpha = (e) => {
    remove_errors(e.target.id)
    setValues({ ...values, [e.target.id]: e.target.value })
  }

  const onChange_num = (e) => {
    const decimals = e.target.value.split('.')[1] || '';
    remove_errors(e.target.id)

    if (decimals.length <= 4) {
      setValues({ ...values, [e.target.id]: e.target.value })
    }
  }

  const onClose_modal = () => {
    onClose();
    setTimeout(() => {
      setValues(DEFUALT_STATE)
      set_err_message('')
      set_outline_error([])
      set_initial_file([])
      set_image_loaded(false)
      set_image_remove(false)
      set_ingredient_values([{ uuid: uuidv4(), name: '', amount: '', measurement: '' }])
      set_directions_values([{ uuid: uuidv4(), instructions: '', optional: false }])
    }, 400)
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    let { title, description, servings, prepTime, cookTime } = values;
    let required_fields = title && description && servings && prepTime && cookTime;

    if (required_fields) {
      setTimeout(() => {
        executeAdd()
      }, 3000)
    } else {
      let err_arr = [];
      if (!title) err_arr.push('title')
      if (!description) err_arr.push('description')
      if (!servings) err_arr.push('servings')
      if (!prepTime) err_arr.push('prepTime')
      if (!cookTime) err_arr.push('cookTime')

      set_outline_error(err_arr)
      set_err_message('Please provide the required info!')
      setLoading(false)
    }
  }

  const executeAdd = (e) => {
    setLoading(true)
    let remove_blank_directions = directions_values.filter(i => i.instructions !== '');
    let remove_blank_ingredients = directions_values.filter(i => i.instructions !== '');

    let data_to_submit = {
      uuid: uuidv4(),
      title: values.title,
      description: values.description,
      servings: values.servings,
      prepTime: values.prepTime,
      cookTime: values.cookTime,
      postDate: moment(new Date()).format("DD/MM/YYYY HH:mm:ss A"),
      ingredients: remove_blank_ingredients,
      directions: remove_blank_directions,
    }

    axios({
      method: 'post',
      url: `${BASE_URL}/recipes`,
      data: data_to_submit,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(result => {
      console.log(result)
      setLoading(false)
      if (result.data.error) {
        console.log(result.data)
        console.log(result.data.message)
        if (result.data.message) {
          set_err_message(result.data.message)
        } else {
          set_err_message(`Something went wrong.`)
        }
      } else {
        onClose_modal()
        setTimeout(() => {
          window.location.reload()
        }, 600)
      }
    }).catch(error => {
      setLoading(false)
      set_err_message(`Something went wrong.`)
      console.log(error)
      console.log(error.response)
    });
  }

  useEffect(() => {
    if(open){
      if (isEdit) {
        set_image_loaded(false)
      } else {
        set_image_loaded(true)
      }
    }
  }, [open, data])

  return (
    <div>
      <Modal
        aria-labelledby={`${isEdit === 'edit' ? 'edit' : 'add'}-title`}
        aria-describedby={`${isEdit === 'edit' ? 'edit' : 'add'}-desc`}
        className={`${isEdit === 'edit' ? 'edit' : 'add'}-modal common-modal`}
        open={open}
        onClose={() => onClose_modal()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        disableBackdropClick
        disableEscapeKeyDown
        BackdropProps={{
          timeout: 500,
        }}>
        <Zoom in={open}>
          <div className="paper-wrapper">
            <div className="paper">
              <div className="modal-header">
                <h2>{isEdit ? 'Edit' : 'Add'} Recipe</h2>
                <IconButton
                  onClick={() => onClose_modal()}
                  className="close-btn">
                  <CloseIcon />
                </IconButton>
              </div>
              <div className="modal-body">
                <form onSubmit={onSubmit}>
                  <StringInput
                    label="Title"
                    state_name="title"
                    outline_error={outline_error}
                    values={values}
                    onChange_alpha={onChange_alpha}
                  />
                  <StringInput
                    label="Description"
                    state_name="description"
                    outline_error={outline_error}
                    values={values}
                    onChange_alpha={onChange_alpha}
                  />
                  <NumberInput
                    label="Servings"
                    state_name="servings"
                    outline_error={outline_error}
                    values={values}
                    onChange_num={onChange_num}
                  />

                  <FormControl className="form-control upload-form">
                    <img src={initial_image} className="d-none" onLoad={on_image_load} alt="no-preview" />
                    <FadedContainer
                      loading={!image_loaded}
                      duration={.2}
                      delay={.2}
                      loader={
                        <Loader appear={true} width="30" thick />
                      }>

                      <div className="dropzone-wrapper">
                        <DropzoneArea
                          maxFileSize={100000000}
                          initialFiles={initial_image}
                          dropzoneClass={`drop-image ${outline_error.includes("image") ? 'error' : ''}`}
                          previewGridClasses={{
                            container: "priview-container",
                            item: "priview-item",
                          }}
                          filesLimit={1}
                          acceptedFiles={['image/*']}
                          dropzoneText={`Drag and drop an image here or click`}
                          onChange={(file) => onChangeImage(file)}
                          getFileAddedMessage={() => `Image successfully attached.`}
                          getDropRejectMessage={(file_data, accepted_file, max_file) => {
                            if(file_data.size > max_file){
                              return 'File was rejected. File is too big. Size limit is 100 megabytes.'
                            } else {
                              return 'File was rejected. File type not supported.'
                            }
                          }}
                          getFileRemovedMessage={() => {
                            set_image_remove(true)
                            return `Image removed.`
                          }}
                        />
                      </div>
                    </FadedContainer>
                  </FormControl>

                  <p className="group-label">Time</p>
                  <div className="time-inputs">
                    <NumberInput
                      label="Preperation Time"
                      state_name="prepTime"
                      placeholder="Enter time in minutes"
                      outline_error={outline_error}
                      values={values}
                      onChange_num={onChange_num}
                    />
                    <NumberInput
                      label="Cook Time"
                      state_name="cookTime"
                      placeholder="Enter time in minutes"
                      outline_error={outline_error}
                      values={values}
                      onChange_num={onChange_num}
                    />
                  </div>

                  <p className="group-label">Ingredients</p>
                  <div className="ingredients-inputs">
                    <IngredientsForm inputList={ingredient_values} setInputList={set_ingredient_values} />
                  </div>

                  <p className="group-label">Directions</p>
                  <div className="directions-inputs">
                    <DirectionsForm inputList={directions_values} setInputList={set_directions_values} />
                  </div>

                  <div className="action-group">
                    <Button
                      className="btn-submit"
                      variant="contained"
                      color="secondary"
                      type="submit"
                      disableElevation
                      disabled={loading ? true : false}>
                      <span className="text">Save</span>
                      <Loader
                        appear={loading}
                        timeout={1000}
                        thick
                        width="22"
                        coloredBg
                        svgProps={{
                          absolute: true,
                          direction: "right",
                          negative: true,
                        }}
                      />
                    </Button>
                    <Button onClick={() => onClose_modal()} variant="contained" disableElevation>Cancel</Button>
                  </div>
                </form>

                {err_message &&
                  <Fade className="error-message" in={err_message ? true : false} timeout={500} >
                    <Alert severity="error" variant="outlined">{err_message}</Alert>
                  </Fade>
                }
              </div>
            </div>
          </div>
        </Zoom>
      </Modal>
    </div>
  )
}

export default AddEditModal;
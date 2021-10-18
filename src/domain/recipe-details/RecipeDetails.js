import React, { useContext, useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { Card, Grid, Button } from '@material-ui/core';
import CardBlock from '../../components/card/CardBlock';
import { RecipeContext } from '../../context/RecipeContext';
import StarOutlined from '@material-ui/icons/StarOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import { BASE_URL } from '../../config/config';
import SpecialModal from '../../components/modals/Special';
import ConditionalModal from '../../components/modals/Conditional';
import './RecipeDetails.scss'

const RecipeDetails = () => {
  let history = useHistory();
  const { id } = useParams();
  const { recipeState, dispatch } = useContext(RecipeContext);
  let data = recipeState.recipe_data.filter(i => i.uuid === id.replace("recipe-", ""))

  const { uuid, images, ingredients, directions } = data[0] || {};

  // FOR RESPONSIVE
  const [mediumView, setMediumView] = useState(false);
  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 1280
        ? setMediumView(true)
        : setMediumView(false)
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  // GET SPECIAL
  const [special_data, set_special_data] = useState([]);

  const fetch_specials = () => {
    dispatch({ type: 'API_LOADING', payload: true })
    axios.get(BASE_URL + "/specials")
      .then((data) => {
        set_special_data(data.data)
        setTimeout(() => {
          dispatch({ type: 'API_LOADING', payload: false })
        }, 2200)
      })
      .catch((error) => {
        console.log('error get specials: ', error)
      })
  }

  useEffect(() => {
    fetch_specials();
  }, [])

  // MODAL SPECIAL
  const [open_modal, set_open_modal] = useState(false);
  const [active_special, set_active_special] = useState();
  const on_open_modal = (data) => {
    set_open_modal(true)
    set_active_special(data)
  }
  const on_close_modal = () => {
    set_open_modal(false)
    set_active_special()
  }

  // DELETE
  const [delete_alert, set_delete_alert] = useState(false);
  const [delete_id, set_delete_id] = useState()
  const onClose_delete_alert = () => set_delete_alert(false);
  const onOpen_delete_alert = (id) => {
    set_delete_alert(true)
    set_delete_id(id)
  };

  const onAccept_delete = () => {
    axios
      .delete(`${BASE_URL}/recipes/${delete_id}`)
      .then((res) => {
        history.push('/');
        setTimeout(() => {
          window.location.reload()
        }, 400)
      })
      .catch((error) => {
        console.log('error delete: ', error)
      });
  }

  const onDenied_delete = () => {
    set_delete_alert(false)
    set_delete_id()
  }

  return (
    <div className="page-container recipe-details-page">
      {data.length
        ? <>
          <Grid container spacing={3}>
            <Grid item md={12} lg={6}>
              <CardBlock item={data[0]} image={images ? images.full : ''} switch_content={mediumView} />
            </Grid>
            <Grid item md={12} lg={6}>
              <Card className="card-block full-details">
                <div className="ingredients-area">
                  <h3>Ingredients</h3>
                  <p className="note">Grab our special deals. Checkout ingredients on sale!</p>
                  {ingredients && ingredients.length
                    ? <table className="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Amount</th>
                          <th>Measurement</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ingredients.map(i => {
                          let with_special = special_data.filter(s => s.ingredientId === i.uuid)[0]
                          let btn_special = <>
                            <Button
                              className="btn-special"
                              onClick={() => on_open_modal(with_special)}>
                              <StarOutlined />
                              {i.name}
                            </Button>
                          </>

                          return (
                            <tr key={i.uuid}>
                              <td>
                                {with_special
                                  ? btn_special
                                  : i.name
                                }
                              </td>
                              <td>{i.amount}</td>
                              <td>{i.measurement}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                    : <p className="empty">No ingredients available</p>
                  }
                </div>

                <div className="directions-area">
                  <h3>Directions</h3>
                  <p className="note">Bullet(s) in color red are optional.</p>
                  {directions && directions.length
                    ? <ul>
                      {directions.map((i, index) => (
                        <li key={`direction-${index + 1}`} className={`${i.optional ? 'optional' : ''}`}>{i.instructions}</li>
                      ))}
                    </ul>
                    : <p className="empty">No directions available</p>
                  }
                </div>
              </Card>
            </Grid>
          </Grid>
          <div className="delete-container">
            <Button className="btn-delete" onClick={() => onOpen_delete_alert(uuid)} variant="contained" ><DeleteIcon /> Delete</Button>
          </div>
        </>
        : <>
          <p className="empty">Sorry this recipe is unavailable. Please checkout the other recipes.</p>
        </>
      }

      <SpecialModal
        open={open_modal}
        onClose={on_close_modal}
        data={active_special}
      />

      <ConditionalModal
        description="Are you sure you want to delete this recipe?"
        open={delete_alert}
        onClose={onClose_delete_alert}
        onAccept={onAccept_delete}
        onDenied={onDenied_delete}
      />
    </div>
  );
}

export default RecipeDetails;
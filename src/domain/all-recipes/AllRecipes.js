import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { Grid, InputBase, Button } from '@material-ui/core';
import CardBlock from '../../components/card/CardBlock';
import { RecipeContext } from '../../context/RecipeContext';
import SearchIcon from '@material-ui/icons/Search';
import AddEditModal from '../../components/modals/AddEdit';
import './AllRecipes.scss'


const AllRecipes = () => {
  const { recipeState } = useContext(RecipeContext);
  const { recipe_data } = recipeState;
  const [search_val, set_search_val] = useState('');
  const [search_focus, set_search_focus] = useState(false);

  // MODAL ADD
  const [open_modal, set_open_modal] = useState(false);
  const on_open_modal = () => {
    set_open_modal(true)
  }
  const on_close_modal = () => {
    set_open_modal(false)
  }

  return (
    <div className="page-container all-recipes-page">

      <div className="action-group">
        <div className={`search-bar ${search_focus ? 'focus' : ''}`}>
          <div className="search-icon">
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search recipe…"
            classes={{
              root: "input-root",
              input: "input-input",
            }}
            value={search_val}
            onBlur={() => set_search_focus(false)}
            onFocus={() => set_search_focus(true)}
            onChange={(e) => set_search_val(e.target.value)}
          />
        </div>
        <div className="button-group">
          <Button onClick={on_open_modal} variant="outlined" disableElevation color="primary" className="btn-common btn-add">Add Recipe</Button>
          {/* <Button onClick={on_open_modal} variant="outlined" disableElevation color="primary" className="btn-common btn-special">Add Special</Button> */}
        </div>
      </div>

      <Grid container spacing={3}>
        {recipe_data.length
          ? recipe_data.map((item) => (
            <Grid key={item.uuid} item xs={12} sm={6} md={6} lg={4}>
              <Link to={`/recipe-${item.uuid}`}>
                <CardBlock item={item} all_recipe={true} />
              </Link>
            </Grid>
          )).filter(
            (child) => !search_val || child.props.children.props.children.props.item.title.toLowerCase().includes(search_val.toLowerCase())
          )
          : <Grid item xs={12}>
            <div className="empty">No recipe available. Go a head and put some drooling recipes.</div>
          </Grid>
        }
      </Grid>

      <AddEditModal
        open={open_modal}
        onClose={on_close_modal}
      />
    </div>
  );
}

export default AllRecipes;
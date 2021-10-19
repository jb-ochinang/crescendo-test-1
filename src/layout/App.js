import React, { useState, useContext, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AllRecipes from '../domain/all-recipes/AllRecipes';
import RecipeDetails from '../domain/recipe-details/RecipeDetails';
import gif_loader from '../assets/images/loader.gif';
import axios from 'axios';
import { BASE_URL } from '../config/config';
import { RecipeContext } from '../context/RecipeContext';
import TopNav from '../components/top-nav/TopNav';


const App = () => {
  const { recipeState, dispatch } = useContext(RecipeContext);
  const { api_loading } = recipeState;

  const fetch_recipes = () => {
    dispatch({ type: 'API_LOADING', payload: true })
    axios.get(BASE_URL + "/recipes")
      .then((data) => {
        dispatch({ type: 'GET_RECIPES', payload: data.data })
        setTimeout(() => {
          dispatch({ type: 'API_LOADING', payload: false })
        }, 2200)
      })
      .catch((error) => {
        console.log('error get recipes: ', error)
        dispatch({ type: 'API_LOADING', payload: false })
      })
  }

  useEffect(() => {
    fetch_recipes();
  }, [])

  return (
    <div className="wrapper">
      <AnimatePresence exitBeforeEnter>
        {api_loading && <PlaceholderContent key={api_loading} unique_key={api_loading} />}
      </AnimatePresence>

      <TopNav />

      <div className="main-area max-container">
        <Switch>
          <Route exact path="/" render={(props) => (
            <AllRecipes {...props} />
          )} />
          <Route path="/:id" component={RecipeDetails} />
          <Route path="*">
            <Redirect from="/" to="/" />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

const animateGenerate = {
  initial: {
    opacity: 1
  },
  visible: {
    opacity: 1
  },
  exit: {
    opacity: 0,
  }
}

const PlaceholderContent = ({ unique_key }) => {
  const [loaded, set_loaded] = useState(false)

  return (
    <motion.div
      className="lazy-load"
      key={unique_key}
      variants={animateGenerate}
      initial="initial"
      animate="visible"
      exit="exit"
    >
      <img
        className="img-fluid"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity .4s ease-in-out'
        }}
        src={gif_loader}
        alt="Recipe Book"
        onLoad={() => set_loaded(true)} />
    </motion.div>
  )
}

export default App;

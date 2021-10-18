import * as React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Box } from '@material-ui/core';
import { BASE_URL } from '../../config/config';
import servingsIcon from '../../assets/icons/servings.png';
import prepIcon from '../../assets/icons/preparation-time.png';
import cookIcon from '../../assets/icons/cooking-time.png';
import TodayOutlined from '@material-ui/icons/TodayOutlined';
import EditOutlined from '@material-ui/icons/EditOutlined';
import placeholder from '../../assets/images/placeholder.jpeg';
import './CardBlock.scss'

export default function CardBlock({ item, all_recipe, image, switch_content }) {
  const { title, description, images, servings, prepTime, cookTime, postDate, editDate } = item;

  let Content_content = <>
    <CardContent className="card-content">
      <Typography gutterBottom variant="h2" component="h2" className="title">
        {title}
      </Typography>
      <p className="description">
        {description}
      </p>
      <Grid container spacing={1} className="other-details">
        <Grid item xs={4}>
          <Box>
            <img className="img-fluid" src={servingsIcon} alt="Servings" />
            <label>Servings</label>
            {servings && <span>{servings}</span>}
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <img className="img-fluid" src={prepIcon} alt="Servings" />
            <label>Preparation Time</label>
            {prepTime && <span>{prepTime}m</span>}
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <img className="img-fluid" src={cookIcon} alt="Servings" />
            <label>Cooking Time</label>
            {cookTime && <span>{cookTime}m</span>}
          </Box>
        </Grid>
      </Grid>
    </CardContent>
  </>

  return (
    <Card className={`card-block ${all_recipe ? 'all-recipe' : ''} ${switch_content ? 'switch' : ''}`}>
      {switch_content && Content_content}

      <div className="card-image">
        <CardMedia
          component="img"
          image={image
            ? BASE_URL + image
            : images
              ? BASE_URL + images.medium
              : placeholder
          }
          alt={title}
        />
        {!all_recipe &&
          <div className="dates">
            {postDate && <p className="posted" aria-label="date-posted" ><TodayOutlined /><span>{postDate}</span></p>}
            {editDate && <p className="edited" aria-label="date-updated" ><EditOutlined /><span>{editDate}</span></p>}
          </div>
        }
      </div>

      {!switch_content && Content_content}
    </Card>
  );
}
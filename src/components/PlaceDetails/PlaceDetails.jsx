import React from "react";

import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./styles.js";

function PlaceDetails({ item, selected, refProp }) {
  const classes = useStyles();

  if(selected) refProp?.current?.scrollIntoView({behavior: "smooth", block: "start"})
  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={
          item.photo
            ? item.photo.images.large.url
            : "https://edit.myhelsinki.fi/sites/default/files/styles/hero_image/public/2017-09/demo.jpg?h=484cbc2e&itok=VebqSi6O"
        }
        title={item.name}
      />
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {item.name}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Rating size="small" value={Number(item.rating)} readOnly />
          <Typography gutterBottom variant="subtitle1">
            out of {item.num_reviews} reviews
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {item.price ? item.price : item.price_level}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography
            gutterBottom
            variant="subtitle1"
            style={{ textAlign: "right" }}
          >
            {item.ranking}
          </Typography>
        </Box>
        {item?.awards?.map((award, index) => {
          return (
            <Box my={1} key={index} display="flex" justifyContent="space-between">
              <img src={award.images.small} alt={award.display_name} />
              <Typography
                gutterBottom
                variant="subtitle2"
                color="textSecondary"
                style={{ textAlign: "right" }}
              >
                {award.display_name}
              </Typography>
            </Box>
          );
        })}
        {item?.cuisine?.map(({name}, index) => {
          return <Chip key={index} size="small" label={name} className={classes.chip} />
        })}
        {item?.address && (
          <Typography variant="subtitle2" gutterBottom color="textSecondary" className={classes.subtitle}>
            <LocationOnIcon /> {item.address}
          </Typography>
        )}
        {item?.phone && (
          <Typography variant="subtitle2" gutterBottom color="textSecondary" className={classes.subtitle}>
            <PhoneIcon /> <a href={`tel:${item.phone}`}>{item.phone}</a> 
          </Typography>
        )}
        <CardActions>
          <Button size="small" color="primary" onClick={() => window.open(item.web_url, '_blank')}>
            Trip Advisor
          </Button>
          <Button size="small" color="primary" onClick={() => window.open(item.website, '_blank')}>
            Website
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}

export default PlaceDetails;

import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import {Rating} from "@material-ui/lab";

import useStyles from "./styles.js";
import { LocalActivityOutlined } from "@material-ui/icons";
function Map({ setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData }) {
  const classes = useStyles();
  const Desktop = useMediaQuery("(min-width: 600px)");
  console.log(weatherData);
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => {setChildClicked(child)}}
      >
        {places?.map((place, index) => (
          <div
            key={index}
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
          >
            {!Desktop ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  className={classes.typography}
                  variant="subtitle2"
                  gutterBottom
                >
                  {place.name}
                </Typography>
                <img
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https://edit.myhelsinki.fi/sites/default/files/styles/hero_image/public/2017-09/demo.jpg?h=484cbc2e&itok=VebqSi6O"
                  }
                  className={classes.pointer}
                  alt={place.name}
                />
                <Rating size="small" value={Number(place.rating)} readOnly />
              </Paper>
            )}
          </div>
        ))}
        {weatherData?.list?.map((data, index) => (
          <div key={index} lat={data.coord.lat} lng={data.coord.lon}>
            <img src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="weather" />
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
}

export default Map;

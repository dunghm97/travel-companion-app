import axios from "axios";

export const getPlacesData = async (type, sw, ne) => {
  try {
    //Request
      const {
        data: { data },
      } = await axios.get(
        `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
        {
          params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
          },
          headers: {
            "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
            "x-rapidapi-key":
            process.env.REACT_APP_RAPIDAPI_TRAVEL_API_KEY,
          },
        }
      );
      return data;
  } catch (err) {
    console.log(err);
  }
};

export const getWeatherData = async (lat, lng, places) => {
  try {
    if(places) {
      const { data } = await axios.get(
        "https://community-open-weather-map.p.rapidapi.com/find",
        {
          params: {
            lat: lat,
            lon: lng,
            q: places[0].location_string
          },
          headers: {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key":
              process.env.REACT_APP_RAPIDAPI_WEATHER_API_KEY,
          },
        }
      );
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};

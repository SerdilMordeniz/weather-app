const axios = require("axios");
const { UserInputError } = require("apollo-server");

const WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.KEY}`;
const GROUP_API = `https://api.openweathermap.org/data/2.5/group?appid=${process.env.KEY}`;
//https://api.openweathermap.org/data/2.5/onecall?lat=47.5584&lon=7.5733&exclude=current,minutely,hourly,alerts&appid=${process.env.KEY}
const WEATHER_FORECAST_API = `https://api.openweathermap.org/data/2.5/onecall?appid=${process.env.KEY}`;

const resolvers = {

  Query: {

    getWeatherForecast: async (obj, args, context, info) => {
      // Coordinates (lat, lon) are required | config is optional
      const { coordinates, config, excludes } = args;
      let url = `${WEATHER_FORECAST_API}&lat=${coordinates.lat}&lon=${coordinates.lon}`;

      // Add config and/or excludes if possible
      if (config && config.units) url = url + `&units=${config.units}`;
      if (config && config.lang) url = url + `&lang=${config.lang}`;
      if (excludes.length > 0) url = `${url}&exclude=${excludes.join(',')}`;

      try {
        const { data } = await axios.get(url);
        const forecastList = data.daily.map(day => {
          return {
            timestamp: day.dt,
            daytemp: day.temp.day,
            feelsLike: day.feels_like.day,
            min: day.temp.min,
            max: day.temp.max,
            description: day.weather[0].description,
            icon: day.weather[0].icon
          }
        });
        return forecastList;
      } catch (e) {
        return null;
      }
    },

    getCityByName: async (obj, args, context, info) => {
      // name is required | country and config are optional
      const { name, country, config } = args;
      let url = `${WEATHER_API}&q=${name}`;

      // Add other fields if possible
      if (country) url = url + `,${country}`;
      if (config && config.units) url = url + `&units=${config.units}`;
      if (config && config.lang) url = url + `&lang=${config.lang}`;

      try {
        const { data } = await axios.get(url);

        // By default, any invalid country code is ignored by the API
        // In this case, the API returns data for any city that matches the name
        // To prevent false positives, an error is thrown if country codes don't match
        if (country && country.toUpperCase() !== data.sys.country) {
          throw new UserInputError("Country code was invalid", {
            invalidArgs: { country: country },
          });
        }

        return {
          id: data.id,
          name: data.name,
          country: data.sys.country,
          coord: data.coord,
          weather: {
            summary: {
              title: data.weather[0].main,
              description: data.weather[0].description,
              visibility: data.visibility,
              humidity: data.main.humidity,
              pressure: data.main.pressure,
              sunrise: data.sys.sunrise,
              sunset: data.sys.sunset,
              icon: data.weather[0].icon,
            },
            temperature: {
              actual: data.main.temp,
              feelsLike: data.main.feels_like,
              min: data.main.temp_min,
              max: data.main.temp_max,
            },
            wind: {
              speed: data.wind.speed,
              deg: data.wind.deg,
            },
            clouds: {
              all: data.clouds.all,
            },
            timestamp: data.dt,
          },
        };
      } catch (e) {
        return null;
      }
    },

    getCityById: async (obj, args, context, info) => {
      // id is required (can be string or array) | config is optional
      const { id, config } = args;
      let url = `${GROUP_API}&id=${id.join(",")}`;

      // Add other fields if possible
      if (config && config.units) url = url + `&units=${config.units}`;
      if (config && config.lang) url = url + `&lang=${config.lang}`;

      try {
        const { data } = await axios.get(url);
        const cityList = data.list.map((city) => {
          return {
            id: city.id,
            name: city.name,
            country: city.sys.country,
            coord: city.coord,
            weather: {
              summary: {
                title: city.weather[0].main,
                description: city.weather[0].description,
                visibility: city.visibility,
                humidity: city.main.humidity,
                icon: city.weather[0].icon,
              },
              temperature: {
                actual: city.main.temp,
                feelsLike: city.main.feels_like,
                min: city.main.temp_min,
                max: city.main.temp_max,
              },
              wind: {
                speed: city.wind.speed,
                deg: city.wind.deg,
              },
              clouds: {
                all: city.clouds.all,
              },
              timestamp: city.dt,
            },
          };
        });
        return cityList;
      } catch (e) {
        return null;
      }
    },

  },

};

module.exports = {
  resolvers,
};

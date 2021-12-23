import React, { useEffect } from "react";
import Head from "next/head";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import { City, Forecast } from "../__generated__/types";
import MultiLineChart from "../component/MultiLineChart";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import WeatherInfo from "../component/WeatherInfo";
import { Container } from "@mui/material";
import Item from "../component/Item";
import LocationMap from "./api/LocationMap";
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

// This gets called on every request. Fetching only the necessary data
export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query getWeatherInfoBasel {
        getCityByName(name: "Basel", config: { units: metric, lang: en }) {
          name
          country
          coord {
            lon
            lat
          }
          weather {
            summary {
              description
              humidity
              pressure
              sunrise
              sunset
            }
            temperature {
              actual
              min
              max
            }
            wind {
              speed
            }
            timestamp
          }
        }
      }
    `,
  });

  //Using graphql
  const dataForecast = await client.query({
    query: gql`
      query getWeatherForecast {
        getWeatherForecast(
          coordinates: { lat: 47.5584, lon: 7.5733 }
          config: { units: metric, lang: en }
          excludes: [current, minutely, hourly, alerts]
        ) {
          timestamp
          min
          max
          description
        }
      }
    `,
  });

  // Pass data to the page via props
  return {
    props: {
      data: data.getCityByName,
      dataForecast: dataForecast.data.getWeatherForecast,
    },
  };
}

/**
 * This is the Homepage. Can acess it with www.localhost/3000/
 */
const Home = ({data, dataForecast,}: {data: City; dataForecast: [Forecast];}) => {

  return (
    <div>
      <Head>
        <title>Weather Forecast {data.name}</title>
        <meta name="description" content="Simple weather forecast" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <React.Fragment>
        <CssBaseline />
        <Container>
          <Box sx={{ flexGrow: 1, height: "100vh" }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 12, sm: 12, md: 12 }}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={12} md={4}>
                <Item>
                  <h1>
                    Weather Forecast {data.name}, {data.country}
                  </h1>

                  <WeatherInfo data={data} />
                </Item>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
              >
                <LocationMap lon={data.coord?.lon} lat={data.coord?.lat} />
              </Grid>
              <Grid item>
                <div className="container">
                  <MultiLineChart dataForecast={dataForecast} />
                </div>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </React.Fragment>
    </div>
  );
};

export default Home;

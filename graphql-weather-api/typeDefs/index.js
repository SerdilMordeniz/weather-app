const { gql } = require("apollo-server");

const typeDefs = gql`
  type City {
    id: ID
    name: String
    country: String
    coord: Coordinates
    weather: Weather
  }

  type Coordinates {
    lon: Float
    lat: Float
  }

  type Summary {
    title: String
    description: String
    visibility: Int
    humidity: Int
    pressure: Int
    sunrise: Int
    sunset: Int
    icon: String
  }

  type Temperature {
    actual: Float
    feelsLike: Float
    min: Float
    max: Float
  }

  type Wind {
    speed: Float
    deg: Int
  }

  type Clouds {
    all: Int
  }

  type Weather {
    summary: Summary
    temperature: Temperature
    wind: Wind
    clouds: Clouds
    timestamp: Int
  }

  type Forecast {
    timestamp: Int
    daytemp: Float
    feelsLike: Float
    min: Float
    max: Float
    description: String
    icon: String
  }

  input ConfigInput {
    units: Unit
    lang: Language
  }

  input CoordinatesInput {
    lat: Float
    lon: Float
  }


  type Query {
    getWeatherForecast(coordinates: CoordinatesInput!, config: ConfigInput, excludes: [exclude]): [Forecast]
    getCityByName(name: String!, country: String, config: ConfigInput): City
    getCityById(id: [String!], config: ConfigInput): [City]
  }

  enum exclude {
    current
    minutely
    hourly
    daily
    alerts
  }

  enum Unit {
    metric
    imperial
    kelvin
  }

  enum Language {
    af
    al
    ar
    az
    bg
    ca
    cz
    da
    de
    el
    en
    eu
    fa
    fi
    fr
    gl
    he
    hi
    hr
    hu
    id
    it
    ja
    kr
    la
    lt
    mk
    no
    nl
    pl
    pt
    pt_br
    ro
    ru
    sv
    se
    sk
    sl
    sp
    es
    sr
    th
    tr
    ua
    uk
    vi
    zh_cn
    zh_tw
    zu
  }
`;

module.exports = {
  typeDefs,
};
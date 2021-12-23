// This file was generted with graphql-codegen

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type City = {
  __typename?: 'City';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  coord?: Maybe<Coordinates>;
  weather?: Maybe<Weather>;
};

export type Coordinates = {
  __typename?: 'Coordinates';
  lon?: Maybe<Scalars['Float']>;
  lat?: Maybe<Scalars['Float']>;
};

export type Summary = {
  __typename?: 'Summary';
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  visibility?: Maybe<Scalars['Int']>;
  humidity?: Maybe<Scalars['Int']>;
  pressure?: Maybe<Scalars['Int']>;
  sunrise?: Maybe<Scalars['Int']>;
  sunset?: Maybe<Scalars['Int']>;
  icon?: Maybe<Scalars['String']>;
};

export type Temperature = {
  __typename?: 'Temperature';
  actual?: Maybe<Scalars['Float']>;
  feelsLike?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  max?: Maybe<Scalars['Float']>;
};

export type Wind = {
  __typename?: 'Wind';
  speed?: Maybe<Scalars['Float']>;
  deg?: Maybe<Scalars['Int']>;
};

export type Clouds = {
  __typename?: 'Clouds';
  all?: Maybe<Scalars['Int']>;
};

export type Weather = {
  __typename?: 'Weather';
  summary?: Maybe<Summary>;
  temperature?: Maybe<Temperature>;
  wind?: Maybe<Wind>;
  clouds?: Maybe<Clouds>;
  timestamp?: Maybe<Scalars['Int']>;
};

export type Forecast = {
  __typename?: 'Forecast';
  timestamp?: Maybe<Scalars['Int']>;
  daytemp?: Maybe<Scalars['Float']>;
  feelsLike?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  max?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
};

export type ConfigInput = {
  units?: InputMaybe<Unit>;
  lang?: InputMaybe<Language>;
};

export type CoordinatesInput = {
  lat?: InputMaybe<Scalars['Float']>;
  lon?: InputMaybe<Scalars['Float']>;
};

export type Query = {
  __typename?: 'Query';
  getWeatherForecast?: Maybe<Array<Maybe<Forecast>>>;
  getCityByName?: Maybe<City>;
  getCityById?: Maybe<Array<Maybe<City>>>;
};


export type QueryGetWeatherForecastArgs = {
  coordinates: CoordinatesInput;
  config?: InputMaybe<ConfigInput>;
  excludes?: InputMaybe<Array<InputMaybe<Exclude>>>;
};


export type QueryGetCityByNameArgs = {
  name: Scalars['String'];
  country?: InputMaybe<Scalars['String']>;
  config?: InputMaybe<ConfigInput>;
};


export type QueryGetCityByIdArgs = {
  id?: InputMaybe<Array<Scalars['String']>>;
  config?: InputMaybe<ConfigInput>;
};

export enum Exclude {
  Current = 'current',
  Minutely = 'minutely',
  Hourly = 'hourly',
  Daily = 'daily',
  Alerts = 'alerts'
}

export enum Unit {
  Metric = 'metric',
  Imperial = 'imperial',
  Kelvin = 'kelvin'
}

export enum Language {
  Af = 'af',
  Al = 'al',
  Ar = 'ar',
  Az = 'az',
  Bg = 'bg',
  Ca = 'ca',
  Cz = 'cz',
  Da = 'da',
  De = 'de',
  El = 'el',
  En = 'en',
  Eu = 'eu',
  Fa = 'fa',
  Fi = 'fi',
  Fr = 'fr',
  Gl = 'gl',
  He = 'he',
  Hi = 'hi',
  Hr = 'hr',
  Hu = 'hu',
  Id = 'id',
  It = 'it',
  Ja = 'ja',
  Kr = 'kr',
  La = 'la',
  Lt = 'lt',
  Mk = 'mk',
  No = 'no',
  Nl = 'nl',
  Pl = 'pl',
  Pt = 'pt',
  PtBr = 'pt_br',
  Ro = 'ro',
  Ru = 'ru',
  Sv = 'sv',
  Se = 'se',
  Sk = 'sk',
  Sl = 'sl',
  Sp = 'sp',
  Es = 'es',
  Sr = 'sr',
  Th = 'th',
  Tr = 'tr',
  Ua = 'ua',
  Uk = 'uk',
  Vi = 'vi',
  ZhCn = 'zh_cn',
  ZhTw = 'zh_tw',
  Zu = 'zu'
}

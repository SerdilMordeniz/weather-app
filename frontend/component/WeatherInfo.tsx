import React, {useState} from 'react'
import { City } from "../__generated__/types";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ToggleButton from "@mui/material/ToggleButton";

/**
 * Responsible for displaying the correct weather information and toggle functionality.
 */
function WeatherInfo({data}: {data: City}) {
  // State for the toggle functionality
    const [selected, setSelected] = useState(false);
    return (
        <div>
            <div>
            Weather Description for today: {data.weather?.summary?.description}
          </div>
          <div>
            Current Temperature: {data.weather?.temperature?.actual?.toFixed()}
            °C
          </div>
          <div>
            Today's highest temperature:{" "}
            {data.weather?.temperature?.max?.toFixed()}°C
          </div>
          <div>
            Today's lowest temperature:{" "}
            {data.weather?.temperature?.min?.toFixed()}°C
          </div>
          <div>
            {!selected && (
              <ToggleButton
              value="check"
              selected={selected}
              onChange={() => {
                setSelected(!selected);
              }}
            >
              <AddCircleOutlineIcon />
            </ToggleButton>
            )}
          </div>
          {selected && (
            <>
              <div>Wind Speed: {data.weather?.wind?.speed} m/s</div>
              <div>Humidity: {data.weather?.summary?.humidity}%</div>
              <div>
                Atmospheric Pressure: {data.weather?.summary?.pressure} hPa
              </div>
              <div>
                Sunrise Today:&nbsp;
                {
                  // Checking if data exists for typescript.
                  data.weather?.summary?.sunrise &&
                    new Date(data.weather?.summary?.sunrise * 1000)
                      .toTimeString()
                      .split(" ")[0]
                }
              </div>
              <div>
                Sunrise Today:&nbsp;
                {
                  // Checking if data exists for typescript.
                  data.weather?.summary?.sunset &&
                    new Date(data.weather?.summary?.sunset * 1000)
                      .toTimeString()
                      .split(" ")[0]
                }
              </div>
              {selected && (
              <ToggleButton
              value="check"
              selected={selected}
              onChange={() => {
                setSelected(!selected);
              }}
            >
              <AddCircleOutlineIcon />
            </ToggleButton>
            )}
            </>
          )}
        </div>
    )
}

export default WeatherInfo

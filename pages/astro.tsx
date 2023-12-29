import { Autocomplete, createFilterOptions, Paper, TextField, Typography } from "@mui/material";
import { Origin, Horoscope } from "circular-natal-horoscope-js";
import { useEffect, useState } from "react";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import cities from "../lib/data/cities";
import dynamic from "next/dynamic";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";


const rotateArray = <T extends any>(arr: T[], n: number) => {
  const copy = [...arr];
  for (let i = 0; i < n; i++) {
    copy.unshift(copy.pop()!);
  }
  return copy;
};


const mountId = "astrochart-mount";


const AstroChart = ({ horoscope }: { horoscope: Horoscope }) => {
  useEffect(() => {
    import('@astrodraw/astrochart').then(
      ({ Chart }) => {
        const mount = document.getElementById(mountId);
        if (mount) {
          mount.innerHTML = "";
          const chart = new Chart(mountId,
            600,
            600
          );
          const data = {
            "planets": {
              "Sun": [horoscope.CelestialBodies.sun.ChartPosition.Ecliptic.DecimalDegrees],
              "Moon": [horoscope.CelestialBodies.moon.ChartPosition.Ecliptic.DecimalDegrees],
              "Mercury": [horoscope.CelestialBodies.mercury.ChartPosition.Ecliptic.DecimalDegrees],
              "Venus": [horoscope.CelestialBodies.venus.ChartPosition.Ecliptic.DecimalDegrees],
              "Mars": [horoscope.CelestialBodies.mars.ChartPosition.Ecliptic.DecimalDegrees],
              "Jupiter": [horoscope.CelestialBodies.jupiter.ChartPosition.Ecliptic.DecimalDegrees],
              "Saturn": [horoscope.CelestialBodies.saturn.ChartPosition.Ecliptic.DecimalDegrees],
              "Uranus": [horoscope.CelestialBodies.uranus.ChartPosition.Ecliptic.DecimalDegrees],
              "Neptune": [horoscope.CelestialBodies.neptune.ChartPosition.Ecliptic.DecimalDegrees],
              "Pluto": [horoscope.CelestialBodies.pluto.ChartPosition.Ecliptic.DecimalDegrees],
            },
            "cusps": rotateArray(horoscope.ZodiacCusps.reverse(), 1).map(
              cusp => cusp.ChartPosition.Horizon.DecimalDegrees
            ),
          };
          chart.radix(data);
        }
      }
    );


  }, [horoscope]);
  return <div id={mountId} style={{
    display: 'flex',
    justifyContent: 'center',
  }} />;
};


type OriginData = {
  year: number,
  month: number,
  date: number,
  hour: number,
  minute: number,
  latitude: number,
  longitude: number,
}

const partialToWhole = <T extends Object,>(partial: Partial<T>, keys: (keyof T)[]): T | undefined => {
  const whole = {} as T;
  for (const key of keys) {
    if (partial[key] === undefined) {
      return undefined;
    }
    whole[key] = partial[key];
  }
  return whole;
};



const Astro = () => {
  const [partialOrigin, setPartialOrigin] = useState<Partial<OriginData>>({});
  const totalOrigin = partialToWhole(partialOrigin, ["year", "month", "date", "hour", "minute", "latitude", "longitude"]);
  const horoscope = totalOrigin && new Horoscope({
    origin: new Origin(totalOrigin),
    houseSystem: "placidus",
    zodiac: "tropical",
    aspectPoints: ['bodies', 'points', 'angles'],
    aspectWithPoints: ['bodies', 'points', 'angles'],
    aspectTypes: ["major", "minor"],
    customOrbs: {},
    language: 'en'
  });

  /*
    Object.assign({}, ...Object.values(horoscope.CelestialBodies).map((body as any) => [
      {
        [body.name]: {
          sign: body.sign,
          degree: body.degree,
        }
    ])),
  */



  console.log(partialOrigin);
  console.log(horoscope);
  (window as any).horoscope = horoscope;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <Paper sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "1rem",
          gap: "1rem",
        }}>
          <Typography variant="h5">Astrocharts</Typography>
          <DateTimePicker
            label="Birth Date and Time (Local)"
            onChange={
              (newValue: any) => {
                setPartialOrigin({
                  ...partialOrigin,
                  year: newValue.year(),
                  month: newValue.month(),
                  date: newValue.date(),
                  hour: newValue.hour(),
                  minute: newValue.minute(),
                });
              }
            }
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={cities}
            getOptionLabel={(city) => `${city.name}, ${city.country}`}
            filterOptions={
              createFilterOptions({
                limit: 10,
              })
            }
            onChange={(event, newValue) => {
              setPartialOrigin({
                ...partialOrigin,
                latitude: newValue?.lat,
                longitude: newValue?.lng,
              });
            }}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Birth Location" />}
          />

        </Paper>
        {
          horoscope && <AstroChart horoscope={horoscope} />
        }

      </div>
    </LocalizationProvider>
  );
};

export default dynamic(() => Promise.resolve(Astro), {
  ssr: false,
});

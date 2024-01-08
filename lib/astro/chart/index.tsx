import { Horoscope } from 'circular-natal-horoscope-js';
import { useEffect } from 'react';

const mountId = "astrochart-mount";

const rotateArray = <T extends any>(arr: T[], n: number) => {
  const copy = [...arr];
  for (let i = 0; i < n; i++) {
    copy.unshift(copy.pop()!);
  }
  return copy;
};



const Chart = ({ horoscope }: { horoscope: Horoscope }) => {
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

export default Chart;
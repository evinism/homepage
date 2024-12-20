import styles from "./yacalendar.module.css";

const currentDate = {
  month: 13,
  day: 27,
};

const months = [
  {
    number: 13,
    name: "Astralis",
    animal: "Gelatinous Ooze",
    description: "Inscrutable motives, not of this earth.",
    inclination: "Nature",
  },
  {
    number: 1,
    name: "Auris",
    animal: "Will o' the Wisp",
    description: "Reclusive, quiet, starving artist",
    inclination: "Head",
  },
  {
    number: 2,
    name: "Griffus",
    animal: "Hippogriff",
    description: "Sees all sides of everything, highly conflicted",
    inclination: "Head",
  },
  {
    number: 3,
    name: "Perytis",
    animal: "Peryton",
    description: "Flights of fancy, in their own head",
    inclination: "Head",
  },
  {
    number: 4,
    name: "Roccus",
    animal: "Roc",
    description: "Analytical, even-headed, logical",
    inclination: "Head",
  },
  {
    number: 5,
    name: "Marus",
    animal: "Nightmare",
    description: "An emotional wreck",
    inclination: "Heart",
  },
  {
    number: 6,
    name: "Malus",
    animal: "Basilisk",
    description: "Bull-headed, stubborn",
    inclination: "Heart",
  },
  {
    number: 7,
    name: "Pontus",
    animal: "Strider",
    description: "Laid back, not driven to do much",
    inclination: "Heart",
  },
  {
    number: 8,
    name: "Chimeris",
    animal: "Chimera",
    description: "Justice-oriented",
    inclination: "Heart",
  },
  {
    number: 9,
    name: "Serpens",
    animal: "Coatl",
    description: "Social Butterfly",
    inclination: "Hand",
  },
  {
    number: 10,
    name: "Petris",
    animal: "Xorn",
    description: "Into material possessions",
    inclination: "Hand",
  },
  {
    number: 11,
    name: "Nyalmus",
    animal: "Yeti",
    description: "Delvers, divers",
    inclination: "Hand",
  },
  {
    number: 12,
    name: "Hydris",
    animal: "Hydra",
    description: "Master of spinning plates.",
    inclination: "Hand",
  },
];

const days = [
  {
    number: 1,
    cyclic: "Pauper's Cyclic",
    modality: "Chaos (-)",
    group: "Common",
  },
  {
    number: 2,
    cyclic: "Diplomat's Cyclic",
    modality: "Order (+)",
    group: "Gentile",
  },
  {
    number: 3,
    cyclic: "Smithy's Cyclic",
    modality: "Order (+)",
    group: "Common",
  },
  {
    number: 4,
    cyclic: "Merchant's Cyclic",
    modality: "Chaos (-)",
    group: "Gentile",
  },
  {
    number: 5,
    cyclic: "Smithy's Cyclic",
    modality: "Order (+)",
    group: "Common",
  },
  {
    number: 6,
    cyclic: "Smithy's Cyclic",
    modality: "Order (+)",
    group: "Common",
  },
  {
    number: 7,
    cyclic: "Smithy's Cyclic",
    modality: "Order (+)",
    group: "Common",
    moon: "🌓",
  },
  {
    number: 8,
    cyclic: "Smithy's Cyclic",
    modality: "Order (+)",
    group: "Common",
  },
  {
    number: 9,
    cyclic: "Merchant's Cyclic",
    modality: "Chaos (-)",
    group: "Gentile",
  },
  {
    number: 10,
    cyclic: "Smithy's Cyclic",
    modality: "Order (+)",
    group: "Common",
  },
  {
    number: 11,
    cyclic: "Diplomat's Cyclic",
    modality: "Order (+)",
    group: "Gentile",
  },
  {
    number: 12,
    cyclic: "Pauper's Cyclic",
    modality: "Chaos (-)",
    group: "Common",
  },
  {
    number: 13,
    cyclic: "Sovereign's Cyclic",
    modality: "Order (+)",
    group: "Court",
  },
  {
    number: 14,
    cyclic: "Pauper's Cyclic",
    modality: "Chaos (-)",
    group: "Common",
    moon: "🌕",
  },
  {
    number: 15,
    cyclic: "Jester's Cyclic",
    modality: "Chaos (-)",
    group: "Court",
  },
  {
    number: 16,
    cyclic: "Pauper's Cyclic",
    modality: "Chaos (-)",
    group: "Common",
  },
  {
    number: 17,
    cyclic: "Merchant's Cyclic",
    modality: "Chaos (-)",
    group: "Gentile",
  },
  {
    number: 18,
    cyclic: "Smithy's Cyclic",
    modality: "Order (+)",
    group: "Common",
  },
  {
    number: 19,
    cyclic: "Merchant's Cyclic",
    modality: "Chaos (-)",
    group: "Gentile",
  },
  {
    number: 20,
    cyclic: "Smithy's Cyclic",
    modality: "Order (+)",
    group: "Common",
  },
  {
    number: 21,
    cyclic: "Smithy's Cyclic",
    modality: "Order (+)",
    group: "Common",
    moon: "🌗",
  },
  {
    number: 22,
    cyclic: "Merchant's Cyclic",
    modality: "Chaos (-)",
    group: "Gentile",
  },
  {
    number: 23,
    cyclic: "Smithy's Cyclic",
    modality: "Order (+)",
    group: "Common",
  },
  {
    number: 24,
    cyclic: "Merchant's Cyclic",
    modality: "Chaos (-)",
    group: "Gentile",
  },
  {
    number: 25,
    cyclic: "Pauper's Cyclic",
    modality: "Chaos (-)",
    group: "Common",
  },
  {
    number: 26,
    cyclic: "Jester's Cyclic",
    modality: "Chaos (-)",
    group: "Court",
  },
  {
    number: 27,
    cyclic: "Pauper's Cyclic",
    modality: "Chaos (-)",
    group: "Common",
  },
  {
    number: 28,
    cyclic: "Sovereign's Cyclic",
    modality: "Order (+)",
    group: "Court",
    moon: "🌑",
  },
];

const silveredEves = [6, 20]; // the nights of the 6th and 20th of each month

const iconForCyclic = {
  "Pauper's Cyclic": "𓀦",
  "Diplomat's Cyclic": "𓁩",
  "Smithy's Cyclic": "𓀑",
  "Merchant's Cyclic": "𓀬",
  "Sovereign's Cyclic": "𓁈",
  "Jester's Cyclic": "𓀡",
};

const iconForModality = {
  "Chaos (-)": "⊖",
  "Order (+)": "⊕",
};

// const titleForWeek = {
//   0: "Stable",
//   1: "Balanced",
//   3: "Unstable",
// };

const datesOfNote = [
  {
    month: 13,
    day: 2,
    description: "Del's Birthday",
  },
  // This is weird -- i feel like i need to retcon some stuff.
  // {
  //   month: 13,
  //   day: 22,
  //   description: "Nara's Birthday",
  // },
  {
    month: 9,
    day: 2,
    description: "Mars's Birthday",
  },
  {
    month: 8,
    day: 15,
    description: "Artemnisia's Birthday",
  },
  {
    month: 4,
    day: 7,
    description: "Spring Equinox",
  },
  {
    month: 7,
    day: 14,
    description: "Summer Solstice",
  },
  {
    month: 10,
    day: 21,
    description: "Fall Equinox",
  },
  // Game Events
  // ---
  {
    month: 11, //
    day: 13,
    description: "acid footprints in the woods.",
  },
  {
    month: 13, //
    day: 18,
    description: "felix goes missing from caravan",
  },
  {
    month: 13, //
    day: 19,
    description: "muriel goes missing",
  },
  {
    month: 13, //
    day: 20,
    description: "winston + sharma go missing from caravan",
  },
  {
    month: 13, //
    day: 21,
    description: "Caravan arrives in mogdhuna, ",
  },
  {
    month: 13, //
    day: 22,
    description: "Conv with korrin",
  },
  {
    month: 13, //
    day: 23,
    description: "Honor, reggie, and vulture go missing, this night",
  },
  {
    month: 13,
    day: 25,
    description: <>We dive under the mog.</>,
  },
  {
    month: 13,
    day: 26,
    description: <>When we agreed to animal messenger.</>,
  },
  {
    month: 13,
    day: 27,
    description: <>Big Dinner!</>,
  },
  {
    month: 13,
    day: 27,
    description: <>Big festival, play, and celebration!</>,
  },
];

const DndCalendar = () => {
  const daysInGroupsOfSeven = days.reduce((acc, day, i) => {
    const index = Math.floor(i / 7);
    if (!acc[index]) {
      acc[index] = [];
    }
    acc[index].push(day);
    return acc;
  }, []);

  return (
    <div className={styles.app}>
      <div>
        Stellurgy doc{" "}
        <a href="https://docs.google.com/document/d/1-ONQ_x6J-FUYNoy1WolYmuJsS5PxwVlFovkMrx_v8cc">
          here.
        </a>
      </div>
      {months.map((month) => (
        <div key={month.number} className={styles.month} id={month.name}>
          <h2>
            {month.name} ({month.number})
          </h2>
          <div className={styles.monthSubHeader}>
            <span>{month.animal}</span>
            <span>{month.description}</span>
            <span> Inclination: {month.inclination}</span>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
                <th>Sunday</th>
              </tr>
            </thead>
            <tbody>
              {daysInGroupsOfSeven.map((week, i) => (
                <>
                  <tr key={i}>
                    {week.map((day) => (
                      <td
                        key={day.number}
                        className={
                          (silveredEves.includes(day.number) &&
                            styles.silvered) +
                          " " +
                          (currentDate.month === month.number &&
                            currentDate.day === day.number &&
                            styles.current)
                        }
                        id={`month-${month.number}-day-${day.number}`}
                      >
                        <div
                          className={
                            styles.tdinner +
                            " " +
                            (silveredEves.includes(day.number) &&
                              styles.silvered)
                          }
                        >
                          <div className={styles.header}>
                            <h3>{day.number}</h3>
                            {day.moon && <div>{day.moon}</div>}
                          </div>
                          <div>
                            {datesOfNote
                              .filter(
                                (date) =>
                                  date.month === month.number &&
                                  date.day === day.number
                              )
                              .map((date) => (
                                <div>{date.description}</div>
                              ))}
                          </div>
                          <div className={styles.footer}>
                            <div
                              className={styles.modalityIcon}
                              title={day.modality}
                            >
                              {iconForModality[day.modality]}
                            </div>
                            <div
                              className={styles.cyclicIcon}
                              title={day.cyclic}
                            >
                              {iconForCyclic[day.cyclic]}
                            </div>
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default DndCalendar;

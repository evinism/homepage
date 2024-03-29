import dynamic from "next/dynamic";
import { useState } from "react";

import styles from "./honeyheist.module.css";

const totalPoints = 6;

const usePersistentState = <T extends unknown>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] => {
  const [state, setState] = useState<T>(() => {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    } else {
      return defaultValue;
    }
  });
  const setPersistentState = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    setState(value);
  };
  return [state, setPersistentState];
};

const CriminalBearChart = () => {
  const [position, setPosition] = usePersistentState<number>(
    "criminalBearChart",
    0
  );
  const bearAmount = totalPoints / 2 - position;
  const criminalAmount = totalPoints / 2 + position;
  const toCrime = () => {
    if (position < totalPoints / 2) {
      setPosition(position + 1);
    }
  };
  const toBear = () => {
    if (position > -totalPoints / 2) {
      setPosition(position - 1);
    }
  };
  const bears = Array(totalPoints)
    .fill(undefined)
    .map((_, index) => {
      if (index < bearAmount) {
        return <div className={`${styles.slot} ${styles.bear}`}></div>;
      } else {
        return <div className={styles.slot}></div>;
      }
    });
  const criminals = Array(totalPoints)
    .fill(undefined)
    .map((_, index) => {
      if (index < criminalAmount) {
        return <div className={`${styles.slot} ${styles.crime}`}></div>;
      } else {
        return <div className={styles.slot}></div>;
      }
    });

  const slots = bears.reverse().concat(criminals);

  let bearCrimeOverlay = null;
  if (position === -totalPoints / 2) {
    bearCrimeOverlay = (
      <div className={`${styles.innerDiagramOverlay} ${styles.bear}`}>
        <h1>Feral!</h1>
      </div>
    );
  } else if (position === totalPoints / 2) {
    bearCrimeOverlay = (
      <div className={`${styles.innerDiagramOverlay} ${styles.crime}`}>
        <h1>Betrayal!</h1>
      </div>
    );
  }

  const rollForBear = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    if (roll <= bearAmount) {
      window.alert(
        `You rolled a ${roll} and succeeded! Amazing Bear! (needed ${bearAmount} or below)`
      );
    } else {
      window.alert(
        `You rolled a ${roll} and failed! Drat! (needed ${bearAmount} or below)`
      );
    }
  };

  const rollForCrime = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    if (roll <= criminalAmount) {
      window.alert(
        `You rolled a ${roll} and succeeded! Crime Pays! (needed ${criminalAmount} or below)`
      );
    } else {
      window.alert(
        `You rolled a ${roll} and failed! Drat! (needed ${criminalAmount} or below)`
      );
    }
  };

  const rollForBearAdvantage = () => {
    const roll1 = Math.floor(Math.random() * 6) + 1;
    const roll2 = Math.floor(Math.random() * 6) + 1;
    const roll = Math.min(roll1, roll2);
    if (roll <= bearAmount) {
      window.alert(
        `You rolled a ${roll1} and a ${roll2}, taking the lower (${roll}), and succeeded! Amazing Bear! (needed ${bearAmount} or below)`
      );
    } else {
      window.alert(
        `You rolled a ${roll1} and a ${roll2}, taking the lower (${roll}), and failed! Drat! (needed ${bearAmount} or below)`
      );
    }
  };

  const rollForCrimeAdvantage = () => {
    const roll1 = Math.floor(Math.random() * 6) + 1;
    const roll2 = Math.floor(Math.random() * 6) + 1;
    const roll = Math.min(roll1, roll2);
    if (roll <= criminalAmount) {
      window.alert(
        `You rolled a ${roll1} and a ${roll2}, taking the lower (${roll}), and succeeded! Crime Pays! (needed ${criminalAmount} or below)`
      );
    } else {
      window.alert(
        `You rolled a ${roll1} and a ${roll2}, taking the lower (${roll}), and failed! Drat! (needed ${criminalAmount} or below)`
      );
    }
  };

  return (
    <div className={styles.bearCrimeChartBlock}>
      <div>Bear Crime Chart</div>
      <div className={styles.bearCrimeOuterDiagram}>
        <div className={styles.bearCrimeMiddleRow}>
          <button onClick={toBear}>MORE BEAR</button>
          <div className={styles.bearCrimeInnerDiagram}>
            {slots}
            {bearCrimeOverlay}
          </div>
          <button onClick={toCrime}>MORE CRIME</button>
          <div className={styles.bearCrimeLabels}>
            <div>Bear Stat: {bearAmount} / 6</div>
            <div>Crime Stat: {criminalAmount} / 6</div>
          </div>
        </div>
      </div>
      <div>Dice Rollers!</div>
      <div className={styles.rollItems}>
        <button onClick={rollForBear}>Roll For Bear</button>
        <button onClick={rollForBearAdvantage}>
          Roll For Bear (Advantage)
        </button>
        <button onClick={rollForCrime}>Roll For Crime</button>
        <button onClick={rollForCrimeAdvantage}>
          Roll For Crime (Advantage)
        </button>
      </div>
    </div>
  );
};

const descriptor = [
  "Rookie",
  "Washed-Up",
  "Retired",
  "Unhinged",
  "Slick",
  "Incompetent",
];

const bearTypes = [
  "Grizzly Bear",
  "Polar Bear",
  "Panda Bear",
  "Black Bear",
  "Sun Bear",
  "Honey Badger",
  "Primordial Bear",
  "Space Bear",
];

const skills = {
  "Grizzly Bear": "Terrify",
  "Polar Bear": "Swim",
  "Panda Bear": "Eat anything that looks like bamboo.",
  "Black Bear": "Climb",
  "Sun Bear": "Sense Honey",
  "Honey Badger": "Carnage",
  "Primordial Bear": "History",
  "Space Bear": "Astral Sight, a fancy name for darkvision",
};

const roles = [
  "Muscle",
  "Driver",
  "Hacker",
  "Brains",
  "Face",
  "Thief",
  "Demolitions Expert",
  "Wild Card",
];

const hats = [
  "Trilby",
  "Top Hat",
  "Bowler",
  "Flat-Cap",
  "Cowboy",
  "Fez",
  "Crown",
  "Beanie",
  "Fedora",
  "Beret",
  "Sombrero",
  "Sun Hat",
  "Baseball Cap",
];

const pullRandomly = <T extends unknown>(array: T[]): T => {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};

interface Character {
  descriptor: string;
  bearType: string;
  role: string;
  hat: string;
}

const generateCharacter = (): Character => {
  return {
    descriptor: pullRandomly(descriptor),
    bearType: pullRandomly(bearTypes),
    role: pullRandomly(roles),
    hat: pullRandomly(hats),
  };
};

const characterToDescription = (character: Character): string => {
  return `Your bear is a ${character.descriptor} ${
    character.bearType
  } who is the ${character.role} of the group! They wear a ${
    character.hat
  } on their head. As a ${character.bearType}, your special ability is "${
    skills[character.bearType]
  }".`;
};

const initStateForDescription =
  "[ describe your bear, or generate a random one ]";

const InfoPanel = () => {
  const [name, setName] = usePersistentState<string>(
    "bearName",
    "[ what is your bear named ]"
  );
  const [description, setDescription] = usePersistentState<string>(
    "bearDescription",
    initStateForDescription
  );
  return (
    <div className={styles.infoPanel}>
      <div className={styles.infoPanelRow}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={styles.infoPanelRow}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {description === initStateForDescription ? (
          <button
            onClick={() => {
              setDescription(characterToDescription(generateCharacter()));
            }}
          >
            Auto-generate a character!
          </button>
        ) : null}
      </div>
    </div>
  );
};

const clearLocalStorage = () => {
  if (confirm("Are you sure you want to clear local storage?")) {
    localStorage.clear();
    location.reload();
  }
};

const HoneyHeist = () => {
  return (
    <div className={styles.page}>
      <h1>Honey Heist Bearachter Sheet</h1>
      <InfoPanel />
      <CriminalBearChart />
      <button
        className={styles.clearLocalStorageButton}
        onClick={clearLocalStorage}
      >
        Clear Local Storage
      </button>
    </div>
  );
};

export default dynamic(() => Promise.resolve(HoneyHeist), { ssr: false });

import { FormEvent, useState } from "react";
import { usePersistentState } from "../hooks";
import { Input, Button } from "@material-ui/core";
import styles from "../dmtools.module.css";

interface DieCast {
  sides: number;
}

interface DiceQuery {
  dice: DieCast[];
  modifier: number;
}

interface DieRoll extends DieCast {
  result: number;
}

interface DiceResult {
  dice: DieRoll[];
  modifier: number;
}

function castDice({ dice, modifier }: DiceQuery): DiceResult {
  return {
    dice: dice.map(({ sides }) => {
      return {
        sides,
        result: Math.ceil(Math.random() * sides),
      };
    }),
    modifier,
  };
}

function splitToRawTerms(input: string): string[] {
  const rawTerms = [];
  let buffer = "";
  for (let i = 0; i < input.length; i++) {
    const cur = input[i];
    if (cur === "-" || cur === "+") {
      rawTerms.push(buffer);
      buffer = "";
    }
    buffer += cur;
  }
  rawTerms.push(buffer);
  // Remove the first because uhh okay.
  return rawTerms.slice(1);
}

function parseToQuery(input: string): DiceQuery {
  input = input.replace(/[\s]+/g, "");
  if (!["-", "+"].includes(input[0])) {
    input = "+" + input;
  }

  const terms = splitToRawTerms(input).map((rawTerm) => ({
    sign: rawTerm[0],
    term: rawTerm.substr(1),
  }));
  let dice: DieCast[] = [];
  let modifier = 0;
  terms.forEach(({ term, sign }) => {
    if (term.match(/^[1-9][0-9]*d[1-9][0-9]*$/)) {
      if (sign === "-") {
        throw new Error(
          "Can't subtract dice rolls! Bug me if this is an inconvenience."
        );
      }
      const [first, second] = term.split("d");
      const newDice = Array(parseInt(first, 10))
        .fill(0)
        .map(() => ({
          sides: parseInt(second, 10),
        }));
      dice = dice.concat(newDice);
    } else if (term.match(/^[1-9][0-9]*$/)) {
      const int = parseInt(term, 10);
      if (sign === "-") {
        modifier += -int;
      } else {
        modifier += int;
      }
    } else {
      throw new Error("Invalid term " + term + ". Check your formatting.");
    }
  });
  return {
    dice,
    modifier,
  };
}

function DicePage() {
  const [previousRolls, setPreviousRolls] = usePersistentState<
    Array<[string, DiceResult]>
  >("diceRolls", []);
  const [inputValue, setInputValue] = useState<string>("");

  const isValidQuery = (() => {
    let result = true;
    try {
      parseToQuery(inputValue);
    } catch (err) {
      result = false;
    }
    return result;
  })();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let parsed: DiceQuery;
    try {
      parsed = parseToQuery(inputValue);
    } catch (err) {
      alert(err.message);
      return;
    }
    const rolled = castDice(parsed);
    const newRolls = previousRolls.slice();
    newRolls.unshift([inputValue, rolled]);
    setPreviousRolls(newRolls);
    setInputValue("");
  };

  const renderedRolls = previousRolls.map(([query, { dice, modifier }]) => {
    const total = [modifier, ...dice.map(({ result }) => result)].reduce(
      (a, b) => a + b,
      0
    );
    let modifierText: string = "";
    if (modifier) {
      if (modifier >= 0) {
        modifierText = `+ ${modifier} (modifier)`;
      } else {
        modifierText = `- ${-modifier} (modifier)`;
      }
    }
    return (
      <div className={styles.diceLineItem}>
        <div className={styles.diceQuery} onClick={() => setInputValue(query)}>
          {query}
        </div>
        <div className={styles.diceResult}>
          {dice.map(({ sides, result }) => (
            <span className={styles.castDie}>
              <span className={styles.castDieResult}>{result}</span>
              <span className={styles.castDieSides}>d{sides}</span>
            </span>
          ))}{" "}
          {modifierText} = {total}
        </div>
      </div>
    );
  });

  return (
    <>
      <h2>What dice to roll?</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="dice-input">Input: (format like "2d6+1d8+5")</label>
        </div>
        <Input
          id="dice-input"
          className={"valid-query-" + isValidQuery}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          error={!isValidQuery && inputValue.length > 0}
        />
        <Input type="submit" disabled={!isValidQuery} value="Roll" />
      </form>
      <div className={styles.clearButton}>
        <Button onClick={() => setPreviousRolls([])} variant="outlined">
          Clear previous rolls
        </Button>
      </div>
      {renderedRolls}
    </>
  );
}

export default DicePage;

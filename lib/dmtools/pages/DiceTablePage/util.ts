import { DiceTable } from "../../data";

type Outcomes = DiceTable["outcomes"];

export const textToOutcomes = (text: string): Outcomes =>
  text.split("\n").map((entry) => {
    const regex = /^\(\s*([1-9][0-9]*)x\s*\)\s*/;
    const match = entry.match(regex);
    if (match) {
      return {
        portion: parseInt(match[1], 10),
        result: entry.replace(regex, ""),
      };
    } else {
      return {
        portion: 1,
        result: entry,
      };
    }
  });

export const outcomesToText = (outcomes: Outcomes): string =>
  outcomes
    .map((outcome) => {
      let prefix = "";
      if (outcome.portion !== 1) {
        prefix = `(${outcome.portion.toString()}x) `;
      }
      return prefix + outcome.result;
    })
    .join("\n");

export const chooseFromTable = (table: DiceTable) => {
  const sum = table.outcomes.reduce((sum, { portion }) => sum + portion, 0);
  let randScore = Math.random() * sum;
  for (let i = 0; i < table.outcomes.length; i++) {
    const cur = table.outcomes[i];
    if (randScore < cur.portion) {
      return cur.result;
    } else {
      randScore -= cur.portion;
    }
  }
  throw new Error("How did i get here?");
};

export const dumpTables = (tables: DiceTable[]): string => {
  return tables
    .map(
      (table) =>
        `[table]\n[name] ${table.name}\n[tags] ${table.tags.join(", ")}\n` +
        outcomesToText(table.outcomes)
    )
    .join("\n");
};

export const loadTables = (data: string): DiceTable[] => {
  // Remove comments and reduce newlines to single tokens
  data = data.replace(/#.*\n/g, "\n");
  data = data.replace(/\s*\n\s*/g, "\n");

  const tableTexts = data
    .split("[table]\n")
    .map((table) => table.trim())
    .filter((t) => t.length);

  return tableTexts.map((text) => {
    const split = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length);
    const name = split[0].replace(/^\[name\]\s*/, "");
    const tags = split[1].replace(/^\[tags\]\s*/, "").split(/,\s*/);
    const outcomes = textToOutcomes(split.slice(2).join("\n"));
    return {
      name,
      outcomes,
      tags,
    };
  });
};

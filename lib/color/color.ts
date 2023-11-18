export const parseHSL = (hsl: string) => {
  const [h, s, l] = hsl
    .replace("hsl(", "")
    .replace(")", "")
    .split(",")
    .map((s) => s.trim());
  return { h: parseInt(h), s: parseInt(s), l: parseInt(l) };
};

export const chooseRandomColor = () => {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.pow(Math.random(), 0.5) * 100);
  const l = Math.floor(Math.pow(Math.random(), 0.5) * 100);
  return `hsl(${h}, ${s}%, ${l}%)`;
};

export const naturalColorSort = (a: string, b: string) => {
  const { h: h1, s: s1, l: l1 } = parseHSL(a);
  const { h: h2, s: s2, l: l2 } = parseHSL(b);
  const hueDiff = (h1 - h2) / 360;
  const satDiff = (s1 - s2) / 100;
  const lumDiff = (l1 - l2) / 100;
  return hueDiff * 10 + satDiff + lumDiff;
};


import { naturalColorSort, parseHSL } from "./color";
import { ColorScore, ColorScores } from "./type";
import styles from "./app.module.css";
import { Divider } from "@material-ui/core";

interface UpDownGraphProps {
  bucketer: (score: ColorScore) => number;
  numBuckets?: number;
  max?: number;
  min?: number;
  bucketWidthPx?: number;
  scores: ColorScores<'natural'>;
}


const UpDownGraph = ({
  bucketer,
  numBuckets = 10,
  max,
  min,
  scores: { scores },
}: UpDownGraphProps) => {
  const bucketWidthPx = 15;
  const bucketed = scores.map(bucketer);
  max = max ?? Math.max(...bucketed);
  min = min ?? Math.min(...bucketed);
  const bucketSize = (max - min) / numBuckets;
  // Split into buckets, with above and below
  const buckets: { all: ColorScore[], above: ColorScore[], below: ColorScore[] }[] = Array(numBuckets).fill(null).map(() => ({
    all: [],
    above: [],
    below: [],
  }));
  bucketed.forEach((bucketValue, i) => {
    const bucket = Math.floor((bucketValue - min!) / bucketSize);
    const score = scores[i];
    buckets[bucket].all.push(score);
    if (score.score > 0) {
      buckets[bucket].above.push(score);
    } else {
      buckets[bucket].below.push(score);
    }
  });
  // Sort the buckets into first by score, then by natural sort
  buckets.forEach(bucket => {
    bucket.above.sort((a, b) => (a.score - b.score) * 2 + naturalColorSort(a.color, b.color));
    bucket.below.sort((a, b) => (b.score - a.score) * 2 + naturalColorSort(a.color, b.color));
  });
  // Render the buckets
  return (
    <div className={styles.UpDownGraph} style={{
      width: `${bucketWidthPx * numBuckets}px`,
    }}>
      <div className={styles.UpDownGraphBucketsAbove}>
        {buckets.map((bucket) => (
          <div className={styles.UpDownGraphBucketAbove} style={{
            width: `${bucketWidthPx}px`,
          }}>
            {bucket.above.map(({ color }) => (
              <div
                className={styles.UpDownGraphColor}
                key={color}
                style={{
                  backgroundColor: color,
                  width: `${bucketWidthPx}px`,
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className={styles.UpDownGraphCenterline}>
        {buckets.map((bucket, i) => {
          const averageScoreForBucket = bucket.all.length ? bucket.all.reduce((acc, { score }) => acc + score, 0) / bucket.all.length : 0;
          return <div className={styles.UpDownGraphAveragePip} style={{
            position: 'absolute',
            left: `${bucketWidthPx * (i + 0.5)}px`,
            bottom: `${averageScoreForBucket * 10 - 0.5}px`,
          }}>
          </div>
        })}
      </div>
      <div className={styles.UpDownGraphBucketsBelow}>
        {buckets.map((bucket) => (
          <div className={styles.UpDownGraphBucketBelow} style={{
            width: `${bucketWidthPx}px`,
          }}>
            {bucket.below.map(({ color }) => (
              <div
                className={styles.UpDownGraphColor}
                key={color}
                style={{
                  backgroundColor: color,
                  width: `${bucketWidthPx}px`,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpDownGraph;

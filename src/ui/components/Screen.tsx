import cx from "classnames";

interface ScreenProps {
  output: string;
  off?: boolean;
}

const Screen = ({ output, off }: ScreenProps) => {
  return (
    <div className="multiplier1">
      <div className="multiplier2">
        <div className="screen-wrapper">
          <div className={cx("screen", { off })}>
            <pre>
              {output}
              <span className="cursor"> </span>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screen;

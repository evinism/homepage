import AutolinkerWrapper from "react-autolinker-wrapper";
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
              <AutolinkerWrapper
                text={output}
                tagName="span"
                options={{
                  urls: { tldMatches: false },
                  stripPrefix: false,
                  stripTrailingSlash: false,
                }}
              />
              <span className="cursor"> </span>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screen;

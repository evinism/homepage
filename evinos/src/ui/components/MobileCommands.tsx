import styles from "./MobileCommands.module.scss";
import Pipe from "../../shared/pipe";

interface MobileCommandsProps {
  keyPipe: Pipe<[string, boolean]>;
}

const MobileCommands = ({ keyPipe }: MobileCommandsProps) => {
  return (
    <div className={styles.container}>
      <button onClick={() => keyPipe.fire(["", true])}>Send EOF</button>
      <button onClick={() => keyPipe.fire(["\t", false])}>Send Tab</button>
    </div>
  );
};
export default MobileCommands;

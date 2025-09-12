import FretDiagram from "../components/FretDiagram";
import styles from "./dmitry.module.css";

const Dmitry = () => {
  return (
    <article className={styles.dmArticle}>
      <h2>Mando Chords for Dmitry!</h2>
      <hr />
      <h3>CAGED chords</h3>
      <h4>C</h4>
      <p>Basic is this, which has the 3rd on the top.</p>
      <FretDiagram shape={[0, 2, 3, 0]} numFrets={8} />
      <p>
        A good 80% of the time, I opt to not have the 3rd on top, instead doing:
      </p>
      <FretDiagram shape={[0, 2, 3, 0]} numFrets={8} />
      <h4>A</h4>
      <p>2 versions. First with a 3rd:</p>
      <FretDiagram shape={[2, 2, 4, 0]} numFrets={8} />
      <p>
        Second, this one has no 3rd and is often very useful and drives hard in
        A tunes.
      </p>
      <FretDiagram shape={[2, 2, 0, 0]} numFrets={8} />
      <p>I'm generally pretty evenly split between these.</p>
      <h4>G</h4>
      <p>Open position looks like this:</p>
      <FretDiagram shape={[0, 0, 2, 3]} numFrets={8} />
      <p>
        Closed "chop" chord looks like, which you'll use a lot in bluegrassy
        type tunes. Nice and movable:
      </p>
      <FretDiagram shape={[7, 5, 2, 3]} numFrets={8} />
      <h4>E</h4>
      <p>The standard one you'll see is this:</p>
      <FretDiagram shape={[1, 2, 2, 0]} numFrets={8} />
      <p>
        The above a little weird with the 3 on bottom, so even though it's a
        root chord I sometimes avoid it and opt for the 3rd-less version:
      </p>
      <FretDiagram shape={[4, 2, 2, 0]} numFrets={8} />
      <h4>D</h4>
      <p>Basic open one is:</p>
      <FretDiagram shape={[2, 0, 0, 2]} numFrets={8} />
      <p>The closed version that I find easiest to play is:</p>
      <FretDiagram shape={[2, 4, 5, 5]} numFrets={8} />
      <p>
        Timbre of the open one is bright and cheery because of the 3rd on top,
        so I'll play each of these about 50% of the time.
      </p>
      <hr />
      <h3>3 finger closed chords (e.g. the magic sauce)</h3>
      <p>
        I'll do these "anchored" on the 5th fret. I'm not sure what it means for
        it to be "anchored" on any fret (maybe it's because the root lands on
        that fret?) but it's how I think about them so you'll have to deal. None
        of them are the actual chord I have listed, e.g. the c-like shape isn't
        C at all, haha.
      </p>
      <p>
        I actually think there are only 3 of them (which I then modify
        relentlessly based on context)
      </p>
      <h4>C-like shape:</h4>
      <p>(In this offset, actually a D chord)</p>
      <FretDiagram shape={[2, 4, 5, undefined]} numFrets={8} />
      <p>Minor:</p>
      <FretDiagram shape={[2, 3, 5, undefined]} numFrets={8} />
      <p>Often modified to a C7-like shape (omitting the root)</p>
      <FretDiagram shape={[2, 4, 3, undefined]} numFrets={8} />
      <h4>A-like shape:</h4>
      <p>(In this offset, actually a C chord)</p>
      <FretDiagram shape={[5, 5, 7, undefined]} numFrets={8} />
      <p>Minor:</p>
      <FretDiagram shape={[5, 5, 6, undefined]} numFrets={8} />
      <p>Often modified to a A7-like shape via</p>
      <FretDiagram shape={[5, 8, 7, undefined]} numFrets={8} />
      <p>Like the open A chord, I often omit the 3rd, going for: </p>
      <FretDiagram shape={[5, 5, 3, undefined]} numFrets={8} />
      <h4>E-like shape</h4>
      <p>In this offset, actually a G chord.</p>
      <FretDiagram shape={[4, 5, 5, undefined]} numFrets={8} />
      <p>Minor:</p>
      <FretDiagram shape={[3, 5, 5, undefined]} numFrets={8} />
      <p>Often, like above, modified to the rootless dominant chord:</p>
      <FretDiagram shape={[4, 3, 5, undefined]} numFrets={8} />
    </article>
  );
};

export default Dmitry;

import styles from "./antarctica.module.css";
import Image from "next/image";
import professionalPic from "../assets/images/professional.jpg";

const Antarctica = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>I really want a job in Antarctica</h1>
        <Image
          className={styles.selfImage}
          src={professionalPic}
          alt="Image description"
          width={200}
        />
        <p>
          Hi, my name is{" "}
          <a href="https://www.linkedin.com/in/evin-sellin-80143392/">
            <b>Evin Sellin</b>
          </a>
          , and I'm looking for a job in Antarctica.
        </p>
        <h2>
          It's a shot in the dark, but shots in the dark are worth taking.
        </h2>
        <p>
          I'm not sure how I'm going to make working in Antarctica happen. So
          I'm advertising exclusively to Antarctica in the hopes that the right
          person sees this. Are you the right person?
        </p>
        <h2>I'm good at computers.</h2>
        <p>
          I have a strong resume in a mostly unrelated technical field (Machine
          Learning Infrastructure). I've worked at <b>Google</b>, <b>Discord</b>
          , and a few other shops. I assume y'all aren't trying to train ML
          models down south, which makes it difficult to slot into standard IT
          roles and am likely filtered out by the system. Despite this, I've got
          a strong background in computing, am used to learning on the fly, and
          have the technical know-how to handle unexpected and
          out-of-the-ordinary problems. I can even add a number or two if the
          need arises.
        </p>
        <h2>I'm a maker at heart.</h2>
        <p>
          I can design and repair analog and digital electronics. I recently
          built 2 Tesla Coils, and am starting work on a third. I can weld. I
          can do basic fabrication. I've taken classes in milling and lathing,
          and am an amateur blacksmith. I love to learn new things, and am eager
          to pick up any skills, trades, or crafts that are needed.
        </p>
        <h2>I will work for peanuts.</h2>
        <p>
          No job is too small for me. You want someone to manually copy cells
          between excel sheets for minimum wage? I'm your guy. You want someone
          to crimp a bajillion ethernet cables for 12 hours a day over the
          austral winter? Let me at it. I WANT to be there. I WANT to contribute
          in the best way I can. Whatever that ends up being, I'm ready to do.
        </p>
        <h2>Thank you so much for your attention.</h2>
        <p>
          Let me know what I can do to get a job in Antarctica. Email me. Text
          me. Tweet at me. Send me snail mail if you have to. Thank you so much
          for your time and attention.
        </p>
        <p>- Evin Sellin</p>
        <ul className={styles.linkList}>
          <li>
            <a href="https://github.com/evinism/cv/blob/main/resume.pdf">
              Resume
            </a>
          </li>
          <li>
            <a href="https://github.com/evinism/">Github</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/evin-sellin-80143392/">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="https://twitter.com/evinism">Twitter</a>
          </li>
          <li>
            <a href="mailto:evinism@gmail.com">Email</a>
          </li>
        </ul>
      </main>
    </div>
  );
};

export default Antarctica;

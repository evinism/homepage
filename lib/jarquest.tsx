import { useState } from "react";

import { useEffect, useRef } from "react";

type Delay = number | null;
type TimerHandler = (...args: any[]) => void;

const useInterval = (callback: TimerHandler, delay: Delay) => {
  const savedCallbackRef = useRef<TimerHandler>();

  useEffect(() => {
    savedCallbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (...args: any[]) => savedCallbackRef.current!(...args);

    if (delay !== null) {
      const intervalId = setInterval(handler, delay);
      return () => clearInterval(intervalId);
    }
  }, [delay]);
};

type InventoryItem = [string, number];

const shovel = ["shovel", 1];
const furnace = ["furnace", 1];
const autoscooper = ["autoscooper", 1];

const JarQuest = () => {
  const [inventory, setInventory] = useState([]);
  const [sandKgs, setSandKgs] = useState(0);
  const [money, setMoney] = useState(0);
  const [basicJars, setBasicJars] = useState(0);
  const [deluxeJars, setDeluxeJars] = useState(0);
  const [brains, setBrains] = useState(0);
  const [jarsBroken, setJarsBroken] = useState(0);
  const [shopOpenForBusiness, setShopOpenForBusiness] = useState(false);
  const [learnedAboutJars, setLearnedAboutJars] = useState(false);

  useInterval(() => {
    if (inventory.includes(autoscooper)) {
      setSandKgs(sandKgs + 1);
    }
    if (shopOpenForBusiness && basicJars > 0) {
      if (Math.random() > 0.8) {
        setBasicJars(basicJars - 1);
        setMoney(money + 1);
      }
    }
    if (shopOpenForBusiness && deluxeJars > 0) {
      if (Math.random() > 0.8) {
        setBasicJars(deluxeJars - 1);
        setMoney(money + 10);
      }
    }
  }, 100);

  const canMakeBasicJar = sandKgs >= 10 && inventory.includes(furnace);
  const makeBasicJar = () => {
    if (canMakeBasicJar) {
      setSandKgs(sandKgs - 10);
      setBasicJars(basicJars + 1);
    }
  };

  const canMakeDeluxeJar =
    sandKgs >= 10 && inventory.includes(furnace) && learnedAboutJars;
  const makeDeluxeJar = () => {
    if (canMakeBasicJar) {
      setSandKgs(sandKgs - 10);
      setDeluxeJars(deluxeJars + 1);
    }
  };

  return (
    <article>
      <h1>Jar Quest</h1>
      <div>
        {inventory.length === 0 && (
          <button onClick={() => setInventory([shovel])}>
            Steal your dad's shovel
          </button>
        )}
        {inventory.includes(shovel) && (
          <button onClick={() => setSandKgs(sandKgs + 1)}>
            Scoop some Sand
          </button>
        )}
        {!inventory.includes(furnace) && sandKgs >= 10 && (
          <button
            onClick={() => {
              setInventory([...inventory, furnace]);
              setSandKgs(sandKgs - 10);
            }}
          >
            Build a Furnace out of Sand
          </button>
        )}
        {canMakeBasicJar && (
          <button onClick={makeBasicJar}>Make a Basic Jar</button>
        )}
        {basicJars && (
          <button
            onClick={() => {
              setBasicJars(basicJars - 1);
              setJarsBroken(jarsBroken + 1);
            }}
          >
            Break a jar because it's not good enough.
          </button>
        )}
        {basicJars >= 5 && (
          <button onClick={() => setShopOpenForBusiness(true)}>
            Incorporate JarCo and open for business.
          </button>
        )}
        {jarsBroken > 100 && !learnedAboutJars && (
          <button onClick={() => setLearnedAboutJars(true)}>
            By breaking jars, they yield their secrets to you. Learn from your
            jars.
          </button>
        )}
        {money > 10 && !inventory.includes(autoscooper) && (
          <button
            onClick={() => {
              setMoney(money - 10);
              setInventory([...inventory, autoscooper]);
            }}
          >
            Buy an Autoscooper
          </button>
        )}
        {canMakeDeluxeJar && (
          <button onClick={makeDeluxeJar}>Make a Deluxe Jar</button>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {sandKgs && (
            <tr>
              <td>Sand</td>
              <td>{sandKgs}</td>
            </tr>
          )}
          {basicJars && (
            <tr>
              <td>Basic Jars</td>
              <td>{basicJars}</td>
            </tr>
          )}
          {deluxeJars && (
            <tr>
              <td>Deluxe Jars</td>
              <td>{deluxeJars}</td>
            </tr>
          )}
          {brains && (
            <tr>
              <td>Brains</td>
              <td>{brains}</td>
            </tr>
          )}
          {money && (
            <tr>
              <td>Money</td>
              <td>{money}</td>
            </tr>
          )}
          {jarsBroken && (
            <tr>
              <td>Jars Broken</td>
              <td>{jarsBroken}</td>
            </tr>
          )}
        </tbody>
        <tbody>
          {inventory
            .filter(([_, q]) => q > 0)
            .map(
              ([item, quantity]) =>
                quantity && (
                  <tr key={item}>
                    <td>{item}</td>
                    <td>{quantity}</td>
                  </tr>
                )
            )}
        </tbody>
      </table>
    </article>
  );
};

export default JarQuest;

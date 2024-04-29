import { useState, useEffect } from "react";

let oldTotal = 0;
let currentTotal = 0;
let currentCPS = 0;

export default function App() {
  // what if I want to do local storage? STRETCH GOAL
  const [cookies, setCookies] = useState(0);
  const [cps, setCps] = useState(1); // CPS = Cookies Per Second
  const [displayTotal, setDisplayTotal] = useState(0);

  useEffect(() => {
    currentCPS = cps;
  }, [cps]);

  useEffect(() => {
    currentTotal = cookies;
  }, [cookies]);

  useEffect(() => {
    // maybe you want to do some maths here for the 1000/cps etc
    // a timer to be created when the page loads to increase cookies by cps every second
    const myInterval = setInterval(() => {
      addCookie();
    }, 1000);
    oldTotal = currentTotal
    const displayInterval = setInterval(() => {
      const diff = ((currentTotal-oldTotal)/4)
      oldTotal += diff
      setDisplayTotal(Math.floor(oldTotal))
    }, 100);

    // to clean up my timer when I rerun the useEffect to i don't end up with a billion timers
    return () => {
      clearInterval(myInterval);
      clearInterval(displayInterval)
    };
  }, []);

  function addCookie() {
    // because this runs in a timer, we need to be more explicit about the previous value of the state variable
    setCookies((currentCookies) => {
      // what if I want to do local storage? STRETCH GOAL
      return currentCookies + currentCPS;
    });
  }

  function buyUpgrade() {
    setCps((cps) => (cps+1));
  }

  return (
    <div>
      <h1>Cookie Clicker</h1>
      <button onClick={addCookie}>I am a cookie</button>
      <button onClick={buyUpgrade}>Buy upgrade</button>
      <p>I have {displayTotal} cookies</p>
      <p>I get {cps} cookies per second</p>
      <p>difference of {cookies-displayTotal}</p>
    </div>
  );
}

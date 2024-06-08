import { useState, useEffect, useRef } from "react";

export default function App() {
  // what if I want to do local storage? STRETCH GOAL
  const [cookies, setCookies] = useState(0);
  const [cps, setCps] = useState(1); // CPS = Cookies Per Second
  const [displayTotal, setDisplayTotal] = useState(0);
  const refAddCookie = useRef();
  const refUpdateTotal = useRef();

  useEffect(() => {
    refAddCookie.current = addCookie;
    refUpdateTotal.current = updateTotal;
  });

  useEffect(() => {
    // maybe you want to do some maths here for the 1000/cps etc
    // a timer to be created when the page loads to increase cookies by cps every second
    const myInterval = setInterval(() => {
      refAddCookie.current();
    }, 1000);

    // oldTotal = currentTotal; //set initial variable on first setup this is to avoid a catchup if using localstorage
    const displayInterval = setInterval(() => {
      refUpdateTotal.current();
    }, 100);

    // to clean up my timer when I rerun the useEffect to i don't end up with a billion timers
    return () => {
      clearInterval(myInterval);
      clearInterval(displayInterval);
    };
  }, []);

  function addCookie() {
    // because this runs in a timer, we need to be more explicit about the previous value of the state variable
    setCookies((currentCookies) => {
      // what if I want to do local storage? STRETCH GOAL
      return currentCookies + cps;
    });
  }

  function updateTotal() {
    const updatedTotal =
      cookies < displayTotal //check if we have spent
        ? cookies // if we have jump to current total
        : displayTotal + Math.ceil((cookies - displayTotal) / 4); // if not move 25% of the difference
    /*Note if the difference is 100, this equates to on each tick of (rounding up):
          1) (100/4) = 25 :- 75 remaining
          2) (75/4) = 19 :- 56 remaining
          3) (56/4) = 14 :- 42 remaining
          4) (42/4) = 11 :- 31 remaining
          5) (31/4) = 8 :- 23 remaining
          6) (23/4) = 6 :- 17 remaining
          7 (17/4) = 5 :- 12 remaining
          8 (12/4) = 3 :- 9 remaining
          9 (9/4) = 3 :- 6 remaining
          10 (6/4) = 2 : 4 remaining
          Next tick happens here if you look at difference on page at 100cps you will see it briefly say 104
          as you can see we never actually get to the total before the next cps ticks up but we get close

          */
    setDisplayTotal(Math.ceil(updatedTotal)); //updated state variable to display the calculated variable
  }

  function buyUpgrade() {
    setCps((cps) => cps + 1);
  }

  return (
    <div>
      <h1>Cookie Clicker</h1>
      <button onClick={addCookie}>I am a cookie</button>
      <button onClick={buyUpgrade}>Buy upgrade</button>
      <p>I have {displayTotal} cookies</p>
      <p>I get {cps} cookies per second</p>
      <p>difference of {cookies - displayTotal}</p>
    </div>
  );
}

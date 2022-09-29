import {useCallback, useEffect, useState, useMemo} from 'react';

/*
We created our own custom hook for reusability.
This also allows us to test the hook in isolation.
Also, it's good practice to separate the concern of state management and the view rendered by React Native
*/

export const useTimer = () => {
  //State to store the number of seconds that have elapsed since timer started
  const [secondsPassed, setSecondsPassed] = useState(0);

  //State to store if the timer is currently running or not
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // We save the interval in a variable so that we can clear it up after the effect has run; This prevents memory leaks
    let interval;

    // If the timer is active, run the setInterval every second, and update the number of seconds passed
    if (isActive) {
      // We use the callback method to set the state as opposed to the value based one since setInterval is asyncronous
      interval = setInterval(() => setSecondsPassed(prev => prev + 1), 1000);
    }

    //Return a cleanup function that clears the interval; prevents memory leaks
    return () => clearInterval(interval);
  }, [isActive]); //Only run the effect when the timer is toggled

  /*
  We use `useCallback` hook to make sure the functions arent redefined every time our custom hook runs, or every time the component re-renders
  */

  //Toggle function to start, stop the timer
  const toggle = useCallback(() => setIsActive(!isActive));

  //Reset function to set timer back to zero
  const reset = useCallback(() => {
    setIsActive(false);
    setSecondsPassed(0);
  });

  // Calculate the minutes and seconds which have passed, and format the result.
  // We use useMemo to make sure the calculation and formatting only happens when the secondsPassed state changes
  const {minutes, seconds} = useMemo(() => {
    const minutes = Math.floor(secondsPassed / 60);
    const seconds = secondsPassed % 60;

    return {
      minutes: `0${minutes}`.slice(-2), // We pad the minutes with a zero in case it's a single digit
      seconds: `0${seconds}`.slice(-2), // We pad the seconds with a zero in case it's a single digit
    };
  }, [secondsPassed]);

  // Return the values we need from our custom hook, including the toggle and reset functions
  return {
    minutes,
    seconds,

    toggle,
    reset,
  };
};

import { useEffect, useState } from "react";
import Countdown, { zeroPad, CountdownRenderProps } from "react-countdown";

type Props = {
  seconds: number;
  onComplete: () => void;
  onStart: () => void;
  restartKey?: unknown;
};

const countdownView = ({
  minutes,
  seconds,
  milliseconds,
}: CountdownRenderProps) => (
  <span>
    {zeroPad(minutes * 60 + seconds)}:{zeroPad(milliseconds, 3)}
  </span>
);

function CountdownTimer({ seconds, onComplete, onStart, restartKey }: Props) {
  const [initialTimer, setInitialTimer] = useState(Date.now() + seconds * 1000);

  useEffect(() => {
    setInitialTimer(Date.now() + seconds * 1000);
  }, [seconds, restartKey]);

  return (
    <Countdown
      key={initialTimer}
      onComplete={onComplete}
      onStart={onStart}
      date={initialTimer}
      precision={3}
      intervalDelay={0}
      renderer={countdownView}
    />
  );
}

export default CountdownTimer;

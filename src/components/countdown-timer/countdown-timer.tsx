import { useMemo } from "react";
import Countdown, { zeroPad, CountdownRenderProps } from "react-countdown";

type Props = {
  seconds: number;
  onComplete: () => void;
  onStart: () => void;
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

function CountdownTimer({ seconds, onComplete, onStart }: Props) {
  const initialTimer = useMemo(() => Date.now() + seconds * 1000, [seconds]);

  return (
    <Countdown
      onComplete={onComplete}
      onStart={onStart}
      date={initialTimer}
      autoStart
      precision={3}
      intervalDelay={0}
      renderer={countdownView}
    />
  );
}

export default CountdownTimer;

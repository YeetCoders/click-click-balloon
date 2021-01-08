import { SyntheticEvent, useCallback, useState } from "react";
import {
  Button,
  Divider,
  Segment,
  TransitionablePortal,
  Modal,
  Header,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { HOME_PATH } from "../../routes/paths";
import "./play-page.scss";
import CountdownTimer from "../countdown-timer/countdown-timer";

const duration = 30;

function PlayPage() {
  const [isTimerActive, setTimerActive] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isCompleted, setCompleted] = useState(false);
  const { width, height } = useWindowSize();

  const updateClickCount = useCallback(() => {
    if (!isTimerActive) {
      return;
    }

    setClickCount((_clickCount) => _clickCount + 1);
  }, [isTimerActive]);

  const onComplete = useCallback(() => {
    setTimerActive(false);
    setCompleted(true);
  }, []);

  const onStart = useCallback(() => setTimerActive(true), []);

  return (
    <div className="play-page">
      {isCompleted && (
        <Confetti
          height={height}
          width={width}
          numberOfPieces={1000}
          gravity={0.2}
          tweenDuration={10000}
        />
      )}

      <Segment vertical>
        <Button
          as={Link}
          to={HOME_PATH}
          color="black"
          content="Back"
          icon="angle left"
        />
      </Segment>

      <Segment vertical textAlign="center">
        <div className="meta-data-container">
          <h1>
            <CountdownTimer
              seconds={duration}
              onComplete={onComplete}
              onStart={onStart}
            />
          </h1>
          <Divider />

          <h1>Click count: {clickCount}</h1>
        </div>

        <Segment
          placeholder
          onContextMenu={(e: SyntheticEvent) => e.preventDefault()}
          onClick={updateClickCount}
        >
          <h2>Click here</h2>
        </Segment>
      </Segment>

      <TransitionablePortal
        open={isCompleted}
        transition={{ animation: "fade down" }}
      >
        <Modal
          open
          onClose={() => setCompleted(false)}
          size="tiny"
          dimmer={<Modal.Dimmer style={{ backgroundColor: "transparent" }} />}
        >
          <Modal.Header
            as={Header}
            textAlign="center"
            content={<h1>Congratulations</h1>}
          />
          <Modal.Content>
            <h3>Challenge duration: {duration} seconds</h3>
            <h3>Click count: {clickCount}</h3>
            <h3>
              Click speed: {Math.round((clickCount * 100) / duration) / 100}{" "}
              clicks/second
            </h3>
          </Modal.Content>
        </Modal>
      </TransitionablePortal>
    </div>
  );
}

export default PlayPage;

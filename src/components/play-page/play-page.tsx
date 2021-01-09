import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import {
  Button,
  Divider,
  Segment,
  TransitionablePortal,
  Modal,
  Header,
  Image,
} from "semantic-ui-react";
import { Link, useHistory, useParams } from "react-router-dom";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { HOME_PATH } from "../../routes/paths";
import CountdownTimer from "../countdown-timer/countdown-timer";
import balloonImage from "./assets/balloon.png";
import { parseCategoryToDuration } from "../../utils";
import { ChallengeCategory } from "../../types";
import "./play-page.scss";

function PlayPage() {
  const history = useHistory();
  const { category } = useParams<{ category: string }>();
  const [totalDuration, setTotalDuration] = useState(
    parseCategoryToDuration(ChallengeCategory.Easy),
  );
  const [isTimerActive, setTimerActive] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isCompleted, setCompleted] = useState(false);
  const { width, height } = useWindowSize();
  const [restartKey, setRestartKey] = useState(false);

  useEffect(() => {
    if (!(Object.values(ChallengeCategory) as string[]).includes(category)) {
      history.push(HOME_PATH);
      return;
    }

    setTotalDuration(parseCategoryToDuration(category as ChallengeCategory));
  }, [category, history]);

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

  const onReset = useCallback(() => {
    setRestartKey((_restartKey) => !_restartKey);
    setClickCount(0);
    setCompleted(false);
  }, []);

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
        <div className="action-buttons-container">
          <Button
            as={Link}
            to={HOME_PATH}
            color="black"
            content="Back"
            icon="angle left"
          />

          <Button
            icon="refresh"
            color="blue"
            content="Reset"
            onClick={onReset}
          />
        </div>
      </Segment>

      <Segment className="gameplay-container" vertical textAlign="center">
        <div>
          <h1>
            <CountdownTimer
              seconds={totalDuration}
              onComplete={onComplete}
              onStart={onStart}
              restartKey={restartKey}
            />
          </h1>

          <Divider />

          <h1>Click count: {clickCount}</h1>
        </div>

        <div className="balloon-container">
          <Image
            className="balloon"
            src={balloonImage}
            onClick={updateClickCount}
            onContextMenu={(e: SyntheticEvent) => {
              e.preventDefault();
              updateClickCount();
            }}
            style={{
              height: `${Math.min(
                height * 0.6,
                30 + (height * clickCount) / 500,
              )}px`,
            }}
          />
        </div>
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
            <h3>Challenge duration: {totalDuration} seconds</h3>
            <h3>Click count: {clickCount}</h3>
            <h3>
              Click speed:{" "}
              {Math.round((clickCount * 100) / totalDuration) / 100}{" "}
              clicks/second
            </h3>
          </Modal.Content>
        </Modal>
      </TransitionablePortal>
    </div>
  );
}

export default PlayPage;

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Dropdown,
  Segment,
  StrictDropdownProps,
} from "semantic-ui-react";
import { useLocalStorage } from "react-use";
import { Link } from "react-router-dom";
import { LEADERBOARD_PATH, PLAY_PATH } from "../../routes/paths";
import { ChallengeCategory } from "../../types";
import "./home-page.scss";

const dropdownOptions: StrictDropdownProps["options"] = Object.entries(
  ChallengeCategory,
).map(([name, value]) => ({
  text: `${name} (${value})`,
  value,
}));

function HomePage() {
  const [cachedChallengeCategory, setCachedChallengeCategory] = useLocalStorage(
    "category",
    ChallengeCategory.Easy,
  );

  const [
    selectedChallengeCategory,
    setSelectedChallengeCategory,
  ] = useState<ChallengeCategory>(
    cachedChallengeCategory &&
      (Object.values(ChallengeCategory) as string[]).includes(
        cachedChallengeCategory,
      )
      ? cachedChallengeCategory
      : ChallengeCategory.Easy,
  );

  useEffect(() => {
    setCachedChallengeCategory(selectedChallengeCategory);
  }, [selectedChallengeCategory, setCachedChallengeCategory]);

  return (
    <div className="home-page">
      <Segment vertical textAlign="center">
        <h1>Click Click Balloon</h1>
      </Segment>
      <Segment
        className="action-buttons-container vertical-space-margin"
        vertical
        textAlign="center"
      >
        <div className="horizontal-space-margin">
          <strong>Challenge category:</strong>

          <Dropdown
            selection
            options={dropdownOptions}
            onChange={(e, data) =>
              setSelectedChallengeCategory(data.value as ChallengeCategory)
            }
            value={selectedChallengeCategory}
          />

          <Button
            as={Link}
            to={PLAY_PATH.replace(":category", selectedChallengeCategory)}
            icon="gamepad"
            color="blue"
            content="Play"
          />
        </div>
        <Button
          as={Link}
          to={LEADERBOARD_PATH}
          icon="trophy"
          color="teal"
          content="Leaderboard"
        />
      </Segment>
    </div>
  );
}

export default HomePage;

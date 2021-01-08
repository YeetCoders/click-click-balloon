import { Link } from "react-router-dom";
import { Segment, Button } from "semantic-ui-react";
import { HOME_PATH } from "../../routes/paths";
import "./leaderboard-page.scss";

function LeaderboardPage() {
  return (
    <div className="leaderboard-page">
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
        <div />
      </Segment>
    </div>
  );
}

export default LeaderboardPage;

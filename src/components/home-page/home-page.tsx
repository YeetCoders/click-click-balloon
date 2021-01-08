import { Button, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { PLAY_PATH } from "../../routes/paths";

function HomePage() {
  return (
    <div>
      <Segment vertical textAlign="center">
        <h1>Click Click Balloon</h1>
      </Segment>
      <Segment vertical textAlign="center">
        <Button as={Link} to={PLAY_PATH} color="blue" content="Play" />
      </Segment>
    </div>
  );
}

export default HomePage;

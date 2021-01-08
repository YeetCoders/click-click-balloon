import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import HomePage from "../components/home-page";
import PlayPage from "../components/play-page";
import { HOME_PATH, PLAY_PATH } from "./paths";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact strict path={HOME_PATH}>
          <HomePage />
        </Route>

        <Route exact strict path={PLAY_PATH}>
          <PlayPage />
        </Route>

        <Route>
          <Redirect to={HOME_PATH} />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;

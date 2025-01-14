import React, {FC} from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router";
import Login from "./Routes/Login";
import Signup from "./Routes/Signup";
import SearchPage from "./Routes/SearchPage";
import FavoritePage from "./Routes/SearchPage";

const App: FC<any> = (props:any) => {
  const [verified, setVerified] = React.useState<boolean>(false);
  const verifiedHandler = () => {
    setVerified(true);
  }
  const checkLoggedin = () => {
    fetch('login/verify', {
      method: 'GET',
    })
    .then((response:any) => response.json)
    .then((data: any) => {
      if(data.verified)
        verifiedHandler();
        <Redirect to='/SearchPage'/>
    })
  }

  checkLoggedin();

  return (
    <Router>
        {verified ? <Redirect to= '/SearchPage' /> : <Redirect to="/login" />}
      <Switch>
        <Route exact path="/login" component={() => <Login verifiedHandler={verifiedHandler} checkLoggedin={checkLoggedin}/>}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/SearchPage" component={SearchPage}/>
        <Route exact path="/FavoritePage" component={FavoritePage}/>
      </Switch>

    </Router>
  )
}

export default App;
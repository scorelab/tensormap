import { withStyles } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import PropTypes from "prop-types";
import * as React from "react";
import { Route } from "react-router-dom";
import { Home } from "./scenes/home";
import { A } from "./scenes/a";
import { B } from "./scenes/b";
import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";
import { AddData } from "../adddata";
import { ViewData } from "../viewdata";
import { VisualizeData } from "../visualizedata";
import styles from "./Dashboard.styles";
import { Error404 } from "../error404";
import * as ENDPOINT from "../../constants/URLs";

class Dashboard extends React.Component {
  componentWillMount() {
    var obj = { user_id: "1", experimet_type: "regression" };
    var data = JSON.stringify(obj);
    console.log(data);
    const URI = ENDPOINT.BACKEND_BASE_URL + ENDPOINT.CREATE_EXPERIMENT_URL;
    fetch( URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: data
    })
      .then(response => {
        return response.text();
      })
      .then(response => {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const { classes } = this.props;
    console.log(window.location.href);
    var url_ = new URL(window.location.href);
    console.log(url_);
    return (
      <div className={classes.root}>
        <CssBaseline />
        {url_.pathname !== ENDPOINT.NEURAL_NET_URL && <Header />}
        <Sidebar />
        <main className={classes.content}>
          {url_.pathname !== ENDPOINT.NEURAL_NET_URL && (
            <div className={classes.toolbar} />
          )}

          <Route exact path={ENDPOINT.HOME_URL} component={Home} />
          <Route exact path={ENDPOINT.NEURAL_NET_URL} component={A} />
          <Route exact path={ENDPOINT.DATA_URL} component={B} />
          <Route exact path={ENDPOINT.ADD_DATA_URL} component={AddData} />
          <Route exact path="/visualize/:id" component={VisualizeData} />
          <Route exact path={ENDPOINT.VIEW_DATA_URL} component={ViewData} />
          <Route component={Error404} />
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Dashboard);

import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import * as React from "react";
import styles from "./Error404.styles";
import { Link } from "react-router-dom";
import GitHubIcon from "../../components/GitHubicon.svg";
class Error404 extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          justifyContent: "center"
        }}
      >
        <div>
          <h1>Error : 404</h1>
          <br />
          <h3>The page you requested could not be found</h3>
          <hr />
          <div style={{ display: "flex" }}>
            <h4>Go to </h4>{" "}
            <Link to="/home">
              <h4 style={{ marginLeft: "4px" }}> Home</h4>
            </Link>
          </div>
          <br />
          <div style={{ display: "flex" }}>
            <h5>Contribute at:{"    "}</h5>
            <a href="https://github.com/scorelab/TensorMap">
              <img
                src={GitHubIcon}
                style={{ height: "30px", marginLeft: "10px" }}
              />
              <span style={{ marginLeft: "10px" }}>Github</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

Error404.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Error404);

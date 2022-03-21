import { withStyles, Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import * as React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.styles";
import GitHubIcon from "../../../../components/GitHubicon.svg";
import CreateIcon from "../../../../components/new.png";
import UploadIcon from "../../../../components/upload.png";

class Home extends React.Component {
  render() {
    const classes = this.props;
    return (
      <div className={classes.root}>
        <Grid justify="center">
          <Grid xs={6} className={classes.title}>
            <h2 style={{ margin: "20px" }}>TensorMap</h2>
          </Grid>
        </Grid>

        <hr />
        <div style={{ fontSize: "20px", color: "grey" }}>
          <div
            style={{
              alignContent: "center",
              paddingLeft: "30px",
              width: "1000px"
            }}
          >
            Tensormap is a web application that enables you to create deep
            learning models using a graphical interface without having to know
            how to code. <span>It is an open-source application</span>
            <br />
            <strong>Contribute at:{"         "}</strong>
            <a href="https://github.com/scorelab/TensorMap">
              <img src={GitHubIcon} style={{ height: "30px" }} />
              <span style={{ marginLeft: "10px" }}>Github</span>
            </a>
          </div>
          <hr />
          <div style={{ margin: "50px" }}>
            You can
            <ul>
              <li>Upload Data for Preprocessing.</li>
              <li>Make Neural Network Models using Drag and Drop Feature.</li>
              <li>Visualise uploaded Data</li>
              <li>Change Data Columns,Rows etc.</li>
              <li>Get Generated Code for Neural Network Model Made.</li>
            </ul>
          </div>
        </div>
        <hr />
        <div
          style={{
            display: "flex",
            marginLeft: "50px",
            justifyContent: "space-around"
          }}
        >
          <div>
            <Link to="/neuralnet">
              <img
                src={CreateIcon}
                style={{
                  height: "100px",
                  marginLeft: "40px",
                  color: "black"
                }}
              />
              <h4>Create New Project </h4>
            </Link>
          </div>
          <div>
            <Link to="/adddata">
              <img
                src={UploadIcon}
                style={{ height: "100px", marginLeft: "10px" }}
              />
              <h4>Uplaod Data </h4>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Home);

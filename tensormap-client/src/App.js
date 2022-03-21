import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./containers/Home/Home";
import DataUpload from "./containers/DataUpload/DataUpload";
import DataProcess from "./containers/DataProcess/DataProcess";
import DeepLearning from "./containers/DeepLearning/DeepLearning";
import * as urls from './constants/Urls';

function App() {
  return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path={urls.HOME_URL} exact component={Home} />
            <Route path={urls.DATA_UPLOAD_URL} exact component={DataUpload} />
            <Route path={urls.DATA_PROCESS_URL} exact component={DataProcess} />
            <Route path={urls.DEEP_LEARN_URL} exact component={DeepLearning} />
            <Redirect from='/' to={urls.HOME_URL} />
          </Switch>
        </Layout>
      </BrowserRouter>
  );
}

export default App;

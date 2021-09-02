import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
//import a components to load
import Example from './pages/Example';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Example}/>
        {/* <Route exact path="/" component={component to load} /> */}
      </Switch>
    </Router>
  );
};

export default App;

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import {
  Navbar,
  Nav,
  Icon,
} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import AllInvestments from './components/AllInvestments';
import InvestmentForm from './components/InvestmentForm';

function App() {
  return (
    <Router>
      <Navbar appearance="inverse">
        <Navbar.Header>
          <a href="#" style={{ padding: '18px 20px', display: 'inline-block' }}>EARNR</a>
        </Navbar.Header>
        <Navbar.Body>
          <Nav>
            <Link to="/">
              <Nav.Item icon={<Icon icon="plus" />}>
                Make an investment
              </Nav.Item>
            </Link>
            <Link to="/investments">
              <Nav.Item icon={<Icon icon="eye" />} >
                See investments
              </Nav.Item>
            </Link>
          </Nav>
        </Navbar.Body>
      </Navbar>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <div style={{ marginLeft: '30px' }}>
              <h2>Make a new Investment</h2>
              <InvestmentForm />
            </div>
          </Route>
          <Route path="/investments">
            <AllInvestments />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

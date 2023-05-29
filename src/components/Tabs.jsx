import { Tabs, Tab } from '@mui/material';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import EmployeeCreate from './EmployeeCreate';
import EmployeeList from './EmployeeList';

function App() {
  return (
    <Router>
      <Tabs>
        <Tab label="Create Employee" to="/create" component={Link} />
        <Tab label="Employee List" to="/list" component={Link} />
      </Tabs>
      <Switch>
        <Route path="/create">
          <EmployeeCreate />
        </Route>
        <Route path="/list">
          <EmployeeList />
        </Route>
      </Switch>
    </Router>
  );
}
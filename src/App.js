import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import Registrasi from './components/auth/Registrasi';
import './index.css';

import ListAnnual from './components/partials/Annual/ListAnnual';
import FormAnnual from './components/partials/Annual/FormAnnual';
import AnnualRequest from './components/partials/Annual/AnnualRequest';
import Dashboard from './components/partials/Dashboard/Dashboard';
import Employee from './components/partials/Employee/Employee';
import EmployeeForm from './components/partials/Employee/EmployeeForm';
import EmployeeUpdateForm from './components/partials/Employee/EmployeeUpdateForm';
import ProfileUpdateForm from './components/partials/Employee/ProfileUpdateForm';
import ReportAnnual from './components/partials/Reporting/ReportAnnual';
import ReportAttendee from './components/partials/Reporting/ReportAttendee';
import Libur from './components/partials/TimeSheet/Libur';
import Project from './components/partials/TimeSheet/Project';
import Shift from './components/partials/TimeSheet/Shift';
import Attendee from './components/partials/Attendee/Attendee';
import FaceRegister from './components/partials/Attendee/FaceRegister';
import Forbidden from './components/auth/Forbidden';
import DetailAnnual from './components/partials/Annual/DetailAnnual';
import Position from './components/partials/Position/Position';
import PositionForm from './components/partials/Position/PositionForm';
import EditPosition from './components/partials/Position/EditPosition';
import ListNotifications from './components/partials/ListNotifications/ListNotifications';

import { PrivateRoute, AdminRoute, SuperAdminRoute, ErrorRoute } from './components/_security/PrivateRoute';
import { LoginPage } from './components/auth/LoginPage';
import { history } from './components/_helpers';
import { alertActions } from './components/_actions';

class App extends React.Component {
  constructor(props) {
      super(props);

      history.listen((location, action) => {
          // clear alert on location change
          this.props.clearAlerts();
      });
  }

  render(){
    return (
      <div>
            <div className="App">
              {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
              }
              <Router history={history}>
                <div className="route">
                  <Switch>
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/registrasi" component={Registrasi} />
                    <Route exact path="/logout" component={LoginPage} />
                    <PrivateRoute exact path="/" component={Dashboard} />
                    <PrivateRoute exact path="/annual/list" component={ListAnnual} />
                    <PrivateRoute exact path="/annual/form" component={FormAnnual} />
                    <PrivateRoute exact path="/annual/request" component={AnnualRequest} />
                    <PrivateRoute exact path="/annual/detail" component={DetailAnnual} />
                    <PrivateRoute exact path="/employee" component={Employee} />
                    <PrivateRoute exact path="/employee/form" component={EmployeeForm} />
                    <PrivateRoute exact path="/employee/update" component={EmployeeUpdateForm} />
                    <PrivateRoute exact path="/profile/edit" component={ProfileUpdateForm} />
                    <PrivateRoute exact path="/report/annual" component={ReportAnnual} />
                    <PrivateRoute exact path="/report/attendee" component={ReportAttendee} />
                    <PrivateRoute exact path="/timesheet/Libur" component={Libur} />
                    <PrivateRoute exact path="/timesheet/Project" component={Project} />
                    <PrivateRoute exact path="/timesheet/Shift" component={Shift} />
                    <PrivateRoute exact path="/position" component={Position} />
                    <PrivateRoute exact path="/position/form" component={PositionForm} />
                    <PrivateRoute exact path="/position/form-edit" component={EditPosition} />
                    <PrivateRoute exact path="/notifications" component={ListNotifications} />
                    <PrivateRoute exact path="/attendee/absen" component={Attendee} />
                    <AdminRoute exact path="/attendee/register" component={FaceRegister} />
                    <ErrorRoute exact path="/forbidden" component={Forbidden} />
                  </Switch>
                </div>
              </Router>
            </div>
      </div>
  );
  }
}

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear
};

export default connect(mapState, actionCreators)(App);
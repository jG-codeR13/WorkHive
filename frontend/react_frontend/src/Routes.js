import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LogInPage } from "./pages/LogInPage";
import { SignUpPageV2 } from "./pages/SignUpPageV2";
import { UserInfoDashboard } from "./pages/UserInfoDashboard";
import { MyRewardsPage } from "./pages/MyRewardsPage";
import { PrivateRoute } from "./auth/PrivateRoute";
import { AdminRoute } from "./auth/AdminRoute";
import { EmployeeDashboard } from "./pages/EmployeeDashboard";
import { MyBookingsPage } from "./pages/MyBookingsPage";
import HotelListPage from "./pages/HotelListPage";
import RoomListPage from "./pages/RoomListPage";
import CheckOutPage from "./pages/CheckOutPage";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <UserInfoDashboard />
        </Route>
        <AdminRoute path="/admin" exact>
          <EmployeeDashboard />
        </AdminRoute>
        <Route path="/login">
          <LogInPage />
        </Route>
        <PrivateRoute path="/rewards">
          <MyRewardsPage />
        </PrivateRoute>
        <PrivateRoute path="/bookings">
          <MyBookingsPage />
        </PrivateRoute>
        <Route path="/signup">
          <SignUpPageV2 />
        </Route>
        <Route path="/hotels">
          <HotelListPage />
        </Route>
        <Route path="/rooms">
          <RoomListPage />
        </Route>
        <Route path="/checkout">
          <CheckOutPage />
        </Route>
      </Switch>
    </Router>
  );
};

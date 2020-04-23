import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import Home from "../../routes/home/Home";

// Hotels components
import HotelsList from '../../routes/hotels/HotelsList';

// Human resources components

import HumanResources from "../../routes/humanResources/HumanResources";
import StaffList from "../../routes/humanResources/staff/StaffList";
import StaffDetail from '../../routes/humanResources/staff/StaffDetail';
import PositionsList from "../../routes/humanResources/positions/PositionsList";

// Comercial components
import Comercial from "../../routes/comercial/Comercial";
import RatesList from "../../routes/comercial/rates/RatesList";
import RateUpdatesList from "../../routes/comercial/rates/RateUpdatesList";
import RateDetail from "../../routes/comercial/rates/RateDetail";
import NewRate from '../../routes/comercial/rates/NewRate';
import Clients from '../../routes/comercial/clients/ClientList';

const MainContent = () => {

  const location = useLocation();
  const noPaddingHomeStyle = {
    padding: "0"
  };


  return (
    <div className="main_content" style={location.pathname === "/home" || location.pathname === "/" ? noPaddingHomeStyle : {}}>
      <Switch>
        {/* Hotels routes */}
        <Route path="/hotels/" component={HotelsList}></Route>

        {/* Human resources routes */}
        <Route exact path="/humanResources" component={HumanResources}></Route>
        <Route exact path="/humanResources/staff" component={StaffList}></Route>
        <Route path={`/humanResources/staff/:id`} component={StaffDetail} ></Route>
        <Route exact path="/humanResources/positions/" component={PositionsList}></Route>

        {/* Comercial routes */}
        <Route exact path="/comercial/" component={Comercial}></Route>
        <Route exact path="/comercial/hotels-rates/" component={RatesList}></Route>
        <Route exact path="/comercial/rates/" component={RateUpdatesList}></Route>
        <Route exact path="/comercial/rates/new-rate" component={NewRate}></Route>
        <Route exact path="/comercial/rates/:id" component={RateDetail}></Route>
        <Route exact path="/comercial/clients/" component={Clients}></Route>
        <Route path={["/home", "/"]} component={Home}></Route>
      </Switch>
    </div>
  );
};

export default MainContent;

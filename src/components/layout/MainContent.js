import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../../routes/home/Home";

// Hotels components
import Hotels from '../../routes/hotels/Hotels';

// Human resources components

import HumanResources from "../../routes/humanResources/HumanResources";
import StaffList from "../../routes/humanResources/Staff/StaffList";
import StaffDetail from '../../routes/humanResources/Staff/StaffDetail';
import PositionsList from "../../routes/humanResources/Positions/PositionsList";

// Comercial components
import Comercial from "../../routes/comercial/Comercial";
import Tariffs from "../../routes/comercial/Tariffs";
import Channels from "../../routes/comercial/Channels";

const MainContent = () => {
  return (
    <div className="main_content">
      <Switch>
        <Route exact path={["/home", "/"]} component={Home}></Route>
        {/* Hotels routes */}
        <Route path="/hotels/" component={Hotels}></Route>

        {/* Human resources routes */}
        <Route exact path="/humanResources" component={HumanResources}></Route>
        <Route exact path="/humanResources/staff" component={StaffList}></Route>
        <Route path={`/humanResources/staff/:id`} component={StaffDetail} ></Route>
        <Route exact path="/humanResources/positions/" component={PositionsList}></Route>

        {/* Comercial routes */}
        <Route exact path="/comercial/" component={Comercial}></Route>
        <Route exact path="/comercial/tariffs/" component={Tariffs}></Route>
        <Route exact path="/comercial/channels/" component={Channels}></Route>
      </Switch>
    </div>
  );
};

export default MainContent;

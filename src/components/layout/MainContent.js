import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import Home from "../../routes/home/Home";

// Hotels components
import Hotels from '../../routes/hotels/Hotels';

// Human resources components

import HumanResources from "../../routes/humanResources/HumanResources";
import StaffList from "../../routes/humanResources/staff/StaffList";
import StaffDetail from '../../routes/humanResources/staff/StaffDetail';
import PositionsList from "../../routes/humanResources/positions/PositionsList";

// Comercial components
import Comercial from "../../routes/comercial/Comercial";
import Tariffs from "../../routes/comercial/tariffs/TariffsList";
import PetitionsList from "../../routes/comercial/petitions/PetitionsList";
import Agreements from '../../routes/comercial/agreements/AgreementsList';

const MainContent = () => {

  const location = useLocation();
  const noPaddingHomeStyle = {
    padding: "0"
  };

  return (
    <div className="main_content" style={location.pathname === "/home" ? noPaddingHomeStyle : {}}>
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
        <Route exact path="/comercial/petitions/" component={PetitionsList}></Route>
        <Route exact path="/comercial/agreements/" component={Agreements}></Route>
      </Switch>
    </div>
  );
};

export default MainContent;

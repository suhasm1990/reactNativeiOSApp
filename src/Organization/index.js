import React, { Component } from "react";
import Search from "./OrganizationSearch.js";
import OrgList from "./OrganizationList.js";
import OrgDetails from "./OrganizationDetails.js";
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
  OrganizationSearch: { screen: Search },
  OrganizationList: { screen: OrgList },
  OrganizationDetails: { screen: OrgDetails }
}));

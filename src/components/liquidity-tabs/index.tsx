/**
 * This file is part of zdex-app.
 * Copyright (c) 2018 - present Timelock, LLC
 *
 * zdex-app is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 *
 * zdex-app is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * zdex-app.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, { useState } from 'react';
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Form, Row, Col } from 'reactstrap';

import './style.css';

import AddLiquidity from '../add-liquidity';
import RemoveLiquidity from '../remove-liquidity';

const ADD_LIQUIDITY_TAB = '0';
const REMOVE_LIQUIDITY_TAB = '1';

const AccessTabs: React.FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState(ADD_LIQUIDITY_TAB);
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <div>
      <Card>
        <div className="pb-5 access-tabs">
          <Row>
            <Col xs={10} sm={10} md={8} lg={7} className="mr-auto ml-auto">
              <div className="text-center">
                <h2 className="pt-5 pb-4">
                  <b>{'Manage Liquidity'}</b>
                </h2>
              </div>
              <div>
                <Nav tabs={true}>
                  <NavItem>
                    <NavLink
                      className={`cursor-pointer ${classnames({
                        active: activeTab === ADD_LIQUIDITY_TAB
                      })}`}
                      onClick={() => toggle(ADD_LIQUIDITY_TAB)}
                    >
                      {'Add Liquidity'}
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={`cursor-pointer ${classnames({
                        active: activeTab === REMOVE_LIQUIDITY_TAB
                      })}`}
                      onClick={() => {
                        toggle(REMOVE_LIQUIDITY_TAB);
                      }}
                    >
                      {'Remove Liquidity'}
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId={ADD_LIQUIDITY_TAB}>
                    <AddLiquidity />
                  </TabPane>
                  <TabPane tabId={REMOVE_LIQUIDITY_TAB}>
                    <RemoveLiquidity />
                  </TabPane>
                </TabContent>
              </div>
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
};

export default AccessTabs;

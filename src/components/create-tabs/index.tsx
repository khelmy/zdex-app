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

import CreateMarket from '../create-market';
import ApproveToken from '../approve-token';

const CREATE_MARKET_TAB = '0';
const APPROVE_TOKEN_TAB = '1';

const AccessTabs: React.FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState(CREATE_MARKET_TAB);
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
                  <b>{'Perform a Swap'}</b>
                </h2>
              </div>
              <div>
                <Nav tabs={true}>
                  <NavItem>
                    <NavLink
                      className={`cursor-pointer ${classnames({
                        active: activeTab === CREATE_MARKET_TAB
                      })}`}
                      onClick={() => toggle(CREATE_MARKET_TAB)}
                    >
                      {'Create Market'}
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={`cursor-pointer ${classnames({
                        active: activeTab === APPROVE_TOKEN_TAB
                      })}`}
                      onClick={() => {
                        toggle(APPROVE_TOKEN_TAB);
                      }}
                    >
                      {'Approve Token'}
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId={CREATE_MARKET_TAB}>
                    <CreateMarket />
                  </TabPane>
                  <TabPane tabId={APPROVE_TOKEN_TAB}>
                    <ApproveToken />
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

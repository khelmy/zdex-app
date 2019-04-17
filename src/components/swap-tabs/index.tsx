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

import SwapZilToToken from '../swap-zil-to-token';
import SwapTokenToZil from '../swap-token-to-zil';
import AuthorizeTokenToZil from '../authorize-token-to-zil';

const ZIL_TO_TOKEN_TAB = '0';
const TOKEN_TO_ZIL_TAB = '1';
const AUTHORIZE_TOKEN_TO_ZIL_TAB = '2';

const AccessTabs: React.FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState(ZIL_TO_TOKEN_TAB);
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
                        active: activeTab === ZIL_TO_TOKEN_TAB
                      })}`}
                      onClick={() => toggle(ZIL_TO_TOKEN_TAB)}
                    >
                      {'Zil to Token Swap'}
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={`cursor-pointer ${classnames({
                        active: activeTab === TOKEN_TO_ZIL_TAB
                      })}`}
                      onClick={() => {
                        toggle(TOKEN_TO_ZIL_TAB);
                      }}
                    >
                      {'Token to Zil Swap'}
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={`cursor-pointer ${classnames({
                        active: activeTab === AUTHORIZE_TOKEN_TO_ZIL_TAB
                      })}`}
                      onClick={() => {
                        toggle(AUTHORIZE_TOKEN_TO_ZIL_TAB);
                      }}
                    >
                      {'Authorize Token to Zil'}
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId={ZIL_TO_TOKEN_TAB}>
                    <SwapZilToToken />
                  </TabPane>
                  <TabPane tabId={TOKEN_TO_ZIL_TAB}>
                    <SwapTokenToZil />
                  </TabPane>
                  <TabPane tabId={AUTHORIZE_TOKEN_TO_ZIL_TAB}>
                    <AuthorizeTokenToZil />
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

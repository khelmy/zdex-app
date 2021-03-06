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

import React from 'react';
import Layout from '../components/layout';
import { NODE_URL, CHAIN_ID, MSG_VERSION } from '../constants';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import { MdSecurity, MdBeenhere } from 'react-icons/md';
import Disclaimer from '../components/disclaimer';

const Home: React.FunctionComponent = () => {
  return (
    <div>
      <Layout>
        <div className="zdex-header-container text-center">
          <div className="zdex-header-bg">
            <div className="zdex-header">
              <h1>ZDEX</h1>
              <p className="pt-2">
                ZDEX is a decentralized exchange for fungible tokens on Zilliqa.
              </p>
            </div>
          </div>
        </div>
        <div className="text-secondary text-center text-fade-in">
          <small>{`Chain ID: ${CHAIN_ID}`}</small>
          {' | '}
          <small>{`Msg Ver: ${MSG_VERSION}`}</small>
          {' | '}
          <small>{`Node URL: ${NODE_URL}`}</small>
        </div>
        <div className="container">
          <Row className="pt-4">
            <Col xs={6} sm={6} md={6} lg={6} className="ml-auto mr-auto text-center">
              <Disclaimer />
            </Col>
          </Row>
          <Row className="pt-5">
            <Col xs={6} sm={6} md={6} lg={4} className="ml-auto mr-auto text-center">
              <MdSecurity size={50} className="text-zdex" />
              <div className="text-secondary text-center pt-3">
                <b>
                  We do not store your private key on our servers or transmit it over the network at
                  any time
                </b>
                <br />
                <p className="pt-1">
                  <small>
                    ZDEX is free and open-source. Keystore encryption and decryption are handled on
                    your computer only.
                  </small>
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </Layout>
    </div>
  );
};

export default Home;

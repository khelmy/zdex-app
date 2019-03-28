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

// @ts-ignore
import React, { Suspense } from 'react';
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Home from './containers/HomeContainer';
import CreateContainer from './containers/CreateContainer';
import LiquidityContainer from './containers/LiquidityContainer';
import SwapContainer from './containers/SwapContainer';
import Spinner from './components/spinner';

export const paths = {
  liquidity: '/liquidity',
  swap: '/swap',
  create: '/create',
  home: '/home'
};

export const RouterNode = () => (
  <Router>
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route exact={true} path={paths.home} component={Home} />
        <Route exact={true} path={paths.create} component={CreateContainer} />
        <Route exact={true} path={paths.liquidity} component={LiquidityContainer} />
        <Route exact={true} path={paths.swap} component={SwapContainer} />
        <Redirect from="/" to={paths.home} />
      </Switch>
    </Suspense>
  </Router>
);

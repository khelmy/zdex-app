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
import Sidebar from '../sidebar';
import Header from '../header';
import Footer from '../footer';
import './style.css';

interface IProps {
  children: React.ReactNode;
}

const Layout: React.SFC<IProps> = (props) => {
  return (
    <div>
      <Header />
      <div className="layout">
        <Sidebar />
        <div className="content-section">
          {props.children}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;

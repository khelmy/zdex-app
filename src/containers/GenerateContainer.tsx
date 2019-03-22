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
import GenerateForm from '../components/generate-form';
import * as H from 'history';

interface IProps {
  history: H.History;
  location: H.Location;
}

const CreateContainer: React.FunctionComponent<IProps> = (props) => {
  return (
    <div>
      <Layout>
        <div className="p-4">
          <span className="pl-1 text-secondary">Create New Wallet</span>
          <GenerateForm />
        </div>
      </Layout>
    </div>
  );
};

export default CreateContainer;

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
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { BN, units } from '@zilliqa-js/util';
import Button from '../button';

import { MdRefresh } from 'react-icons/md';

interface IProps {
  address: string;
  balanceInQa: string;
  getBalance: () => void;
  isUpdatingBalance: boolean;
}

export const AccountInfo: React.SFC<IProps> = (props) => {
  const { isUpdatingBalance, balanceInQa, address } = props;
  const balanceInZil = units.fromQa(new BN(balanceInQa), units.Units.Zil); // Sending an amount measured in Zil, converting to Qa.

  return (
    <div>
      <div className="px-4">
        <h5>
          <b>{'Account Info'}</b>
        </h5>
        <div className="d-flex">
          <div className="py-2">
            {address ? <Jazzicon diameter={100} seed={jsNumberForAddress(address)} /> : null}
          </div>
          <div className="px-4 text-left text-secondary">
            <small>
              <b>{'Address'}</b>
              <p className="pt-1 font-monospace">{`0x${address}`}</p>
              <b>
                {'Balance'}
                <Button
                  type="tertiary"
                  text={''}
                  before={<MdRefresh />}
                  onClick={props.getBalance}
                  disabled={isUpdatingBalance}
                  ariaLabel={'Update Balance'}
                  className="mb-1 py-0 px-1"
                />
              </b>
              <p>{isUpdatingBalance ? 'loading...' : `${balanceInZil} ZIL`}</p>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

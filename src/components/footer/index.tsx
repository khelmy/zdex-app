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
import { FaGithub, FaGitter, FaTwitter } from 'react-icons/fa';
import './style.css';
const copyright: string = 'Copyright © 2019 Timelock, LLC';

const Footer: React.SFC = () => (
  <footer data-testid="footer" className={'footer'}>
    <div className="text-center py-2">
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <a
            className="text-secondary nav-link"
            href="https://github.com/khelmy/zdex"
            target="_blank"
            rel="noreferrer"
            aria-label={'ZDEX GitHub'}
          >
            <FaGithub />
          </a>
        </li>
      </ul>
      <span className="text-secondary copyright">{copyright}</span>
    </div>
  </footer>
);

export default Footer;

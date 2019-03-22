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
import { CAPTCHA_SITE_KEY } from '../../constants';
import ReCAPTCHA from 'react-google-recaptcha';

const Recaptcha: React.SFC<{ onChange: (token: string) => void }> = ({ onChange }) => (
  <div className="recaptcha">
    <ReCAPTCHA sitekey={CAPTCHA_SITE_KEY} onChange={onChange} badge="inline" />
  </div>
);

export default Recaptcha;

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

import * as React from 'react';
import { storiesOf, setAddon } from '@storybook/react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import chaptersAddon from 'react-storybook-addon-chapters';

import Button from '.';
import Spinner from '../spinner';

const options = {
  showSource: false,
  showPropTables: false,
  allowPropTablesToggling: false
};

setAddon(chaptersAddon);
storiesOf('component.Button', module)
  // @ts-ignore
  .addWithChapters('Button', {
    chapters: [
      {
        title: 'Types of button',
        info: '3 types: primary, secondary, and tertiary.',
        sections: [
          {
            options,
            sectionFn: () => (
              <div>
                <Button
                  type="primary"
                  text={'primary'}
                  onClick={() => console.log('click')}
                  ariaLabel={'primary button'}
                />{' '}
                <Button
                  type="primary"
                  text={'primary'}
                  onClick={() => console.log('click')}
                  ariaLabel={'disabled primary button'}
                  disabled={true}
                />{' '}
                <Button
                  type="secondary"
                  text={'secondary'}
                  onClick={() => console.log('click')}
                  ariaLabel={'secondary button'}
                />{' '}
                <Button
                  type="secondary"
                  text={'secondary'}
                  onClick={() => console.log('click')}
                  ariaLabel={'disabled secondary button'}
                  disabled={true}
                />{' '}
                <Button
                  type="tertiary"
                  text={'tertiary'}
                  onClick={() => console.log('click')}
                  ariaLabel={'tertiary button'}
                />{' '}
                <Button
                  type="tertiary"
                  text={'tertiary'}
                  onClick={() => console.log('click')}
                  ariaLabel={'tertiary button'}
                  disabled={true}
                />{' '}
              </div>
            )
          }
        ]
      },
      {
        title: 'Sizes of button',
        info: '3 sizes: sm, md, and lg.',
        sections: [
          {
            options,
            sectionFn: () => (
              <div>
                <Button
                  type="secondary"
                  text={'sm'}
                  size="sm"
                  onClick={() => console.log('click')}
                  ariaLabel={'small button'}
                />{' '}
                <Button
                  type="secondary"
                  text={'md'}
                  size="md"
                  disabled={false}
                  onClick={() => console.log('click')}
                  ariaLabel={'medium button'}
                />{' '}
                <Button
                  type="secondary"
                  text={'lg'}
                  size="lg"
                  onClick={() => console.log('click')}
                  ariaLabel={'large button'}
                />
              </div>
            )
          }
        ]
      },
      {
        title: 'Composition',
        info: '3 possible compositions: before, after, and both',
        sections: [
          {
            options,
            sectionFn: () => (
              <div>
                <Button
                  before={
                    <span className="pr-1">
                      <Spinner size="small" />
                    </span>
                  }
                  type="primary"
                  text={'loading...'}
                  onClick={() => console.log('click')}
                  ariaLabel={'icon before Button'}
                />{' '}
                <Button
                  before={<FaArrowLeft />}
                  type="secondary"
                  text={'before'}
                  onClick={() => console.log('click')}
                  ariaLabel={'icon before Button'}
                />{' '}
                <Button
                  after={<FaArrowRight />}
                  type="secondary"
                  text={'after'}
                  onClick={() => console.log('click')}
                  ariaLabel={'icon after Button'}
                />{' '}
                <Button
                  before={<FaArrowLeft />}
                  after={<FaArrowRight />}
                  type="secondary"
                  text={'before and after'}
                  onClick={() => console.log('click')}
                  ariaLabel={'icon before and after Button'}
                />{' '}
              </div>
            )
          }
        ]
      }
    ]
  });

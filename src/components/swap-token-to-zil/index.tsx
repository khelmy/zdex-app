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

import React, { useState, useEffect } from 'react';
import { Card, Label, Input, FormGroup, Form, Row, Col, FormFeedback } from 'reactstrap';
import { BN, units } from '@zilliqa-js/util';
import Button from '../button';
import * as zilActions from '../../redux/zil/actions';
import { connect } from 'react-redux';
import { getInputValidationState, formatSendAmountInZil } from '../../utils';
import ConfirmTokenToZilModal from '../confirm-token-to-zil-modal';
import { AccountInfo } from '../account-info';
import { requestStatus } from '../../constants';

interface IProps {
  tokenToZilSwap: (tokenAddress, tokensSold, minZil, gasPrice) => void;
  clear: () => void;
  getMinGasPrice: () => void;
  minGasPriceInQa: string;
  getMinGasPriceStatus?: string;
  getBalance: () => void;
  balanceInQa: string;
  getBalanceStatus?: string;
  tokenToZilSwapStatus?: string;
  publicKey: string;
  address: string;
  network: string;
  tokenToZilSwapId?: string;
}

interface IState {
  tokenAddress: string;
  tokenAddressValid: boolean;
  tokenAddressInvalid: boolean;
  tokensSold: string;
  minZil: string;
  isSendingTx: boolean;
  gasPrice: string;
  gasPriceInQa: string;
  isUpdatingGasPrice: boolean;
  isModalOpen: boolean;
}

const initialState: IState = {
  isModalOpen: false,
  tokenAddress: '',
  tokenAddressValid: false,
  tokenAddressInvalid: false,
  tokensSold: '',
  minZil: '',
  isSendingTx: false,
  gasPrice: '0',
  gasPriceInQa: '0',
  isUpdatingGasPrice: false
};

const TokenToZilSwapForm: React.FunctionComponent<IProps> = (props) => {
  const {
    address,
    tokenToZilSwapStatus,
    tokenToZilSwapId,
    getBalance,
    balanceInQa,
    getBalanceStatus,
    minGasPriceInQa,
    getMinGasPriceStatus,
    getMinGasPrice
  } = props;

  const [isModalOpen, setIsModalOpen] = useState(initialState.isModalOpen);
  const [tokenAddress, setTokenAddress] = useState(initialState.tokenAddress);
  const [tokenAddressValid, setTokenAddressValid] = useState(initialState.tokenAddressValid);
  const [tokenAddressInvalid, setTokenAddressInvalid] = useState(initialState.tokenAddressInvalid);
  const [tokensSold, setTokensSold] = useState(initialState.tokensSold);
  const [minZil, setMinZil] = useState(initialState.minZil);

  const isUpdatingBalance = getBalanceStatus === requestStatus.PENDING;
  useEffect(
    () => {
      if (getBalanceStatus === undefined) {
        getBalance();
      }
    },
    [balanceInQa]
  );

  const isUpdatingMinGasPrice = getMinGasPriceStatus === requestStatus.PENDING;
  const minGasPriceInZil = units.fromQa(new BN(minGasPriceInQa), units.Units.Zil);

  useEffect(
    () => {
      if (getMinGasPriceStatus === undefined) {
        getMinGasPrice();
      }
    },
    [minGasPriceInQa]
  );

  const closeModal = () => {
    setIsModalOpen(false);
    setTokenAddress('');
    setTokenAddressValid(false);
    setTokenAddressInvalid(false);
    setMinZil('');
  };

  const changeTokenAddress = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const value = e.target.value;
    const key = 'tokenAddress';
    const validationResult: any = getInputValidationState(key, value, /^0x[a-fA-F0-9]{40}$/);
    setTokenAddress(value);
    setTokenAddressValid(validationResult.tokenAddressValid);
    setTokenAddressInvalid(validationResult.tokenAddressInvalid);
  };

  const changeTokensSold = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    if (e.target.value === '' || /^\d*\.?\d*$/.test(e.target.value)) {
      setTokensSold(e.target.value);
    }
  };

  const changeMinZil = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    if (e.target.value === '' || /^\d*\.?\d*$/.test(e.target.value)) {
      setMinZil(e.target.value);
    }
  };

  const formatMinZil = (): void => {
    if (minZil !== initialState.minZil) {
      const minZilInZil: string = parseFloat(minZil).toFixed(3);
      const balanceInZil: string = units.fromQa(new BN(balanceInQa), units.Units.Zil);
      const minZilFormattedInZil = formatSendAmountInZil(
        minZilInZil,
        balanceInZil,
        minGasPriceInZil
      );
      setMinZil(minZilFormattedInZil);
    }
  };

  const isBalanceInsufficient = new BN(balanceInQa).lte(new BN(minGasPriceInQa));
  const isSendButtonDisabled =
    tokenAddressInvalid ||
    tokenAddress === initialState.tokenAddress ||
    tokensSold === initialState.tokensSold ||
    minZil === initialState.minZil ||
    isBalanceInsufficient;
  const sendButtonText = 'Send';

  return (
    <div>
      <AccountInfo
        address={address}
        balanceInQa={balanceInQa}
        getBalance={getBalance}
        isUpdatingBalance={isUpdatingBalance}
      />
      <div className="pt-4">
        <Card>
          <div className="py-5">
            <div className="px-4 text-center">
              <h2 className="pb-2">
                <b>{'Swap Tokens for Zil'}</b>
              </h2>
              <Row>
                <Col xs={12} sm={12} md={12} lg={8} className="mr-auto ml-auto">
                  <Form className="mt-4 text-left" onSubmit={(e) => e.preventDefault()}>
                    <FormGroup>
                      <Label for="Address">
                        <small>
                          <b>{'Token Address'}</b>
                        </small>
                      </Label>
                      <Input
                        id="tokenAddress"
                        type="text"
                        name="tokenAddress"
                        data-testid="to-address"
                        value={tokenAddress}
                        onChange={changeTokenAddress}
                        valid={tokenAddressValid}
                        invalid={tokenAddressInvalid}
                        placeholder="Enter the Token Address"
                        maxLength={42}
                      />
                      <FormFeedback>{'invalid address'}</FormFeedback>
                      <FormFeedback valid={true}>{'valid address'}</FormFeedback>
                    </FormGroup>
                    <br />
                    <FormGroup>
                      <Label for="tokensSold">
                        <small>
                          <b>{'Tokens Sold'}</b>
                        </small>
                      </Label>
                      <Input
                        id="tokensSold"
                        type="tel"
                        name="tokensSold"
                        maxLength={10}
                        data-testid="tokensSold"
                        value={tokensSold}
                        onChange={changeTokensSold}
                        placeholder="Number of Tokens to Sell"
                        disabled={isUpdatingBalance || isUpdatingMinGasPrice}
                      />
                    </FormGroup>
                    <br />
                    <FormGroup>
                      <Label for="minZil">
                        <small>
                          <b>{'Minimum ZIL to Receive'}</b>
                        </small>
                      </Label>
                      <Input
                        id="minZil"
                        type="tel"
                        name="minZil"
                        maxLength={10}
                        data-testid="minZil"
                        value={minZil}
                        onChange={changeMinZil}
                        placeholder="Minimum ZIL Received"
                        onBlur={formatMinZil}
                        disabled={isUpdatingBalance || isUpdatingMinGasPrice}
                      />
                    </FormGroup>
                    <small className="text-secondary">
                      Gas Price: {isUpdatingMinGasPrice ? 'loading...' : `${minGasPriceInZil} ZIL`}
                    </small>
                    <br />
                    <div className="py-5 text-center">
                      <Button
                        text={sendButtonText}
                        type="primary"
                        ariaLabel={'sendButtonText'}
                        onClick={() => setIsModalOpen(true)}
                        disabled={isSendButtonDisabled}
                      />
                    </div>
                    {isBalanceInsufficient && !isUpdatingBalance ? (
                      <p className="text-center text-danger">
                        <small>
                          {'Your balance is not sufficient to send transaction.'}
                          <br />
                          {`Minimum Gas Price: ${minGasPriceInZil} ZIL`}
                        </small>
                      </p>
                    ) : null}
                  </Form>
                </Col>
              </Row>
            </div>
          </div>
        </Card>
      </div>
      {isModalOpen ? (
        <ConfirmTokenToZilModal
          tokenToZilSwapId={tokenToZilSwapId}
          tokenToZilSwapStatus={tokenToZilSwapStatus}
          tokenAddress={tokenAddress}
          tokensSold={tokensSold}
          minZil={minZil}
          gasPrice={minGasPriceInZil}
          isModalOpen={isModalOpen}
          tokenToZilSwap={props.tokenToZilSwap}
          closeModal={closeModal}
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  balanceInQa: state.zil.balanceInQa,
  getBalanceStatus: state.zil.getBalanceStatus,
  minGasPriceInQa: state.zil.minGasPriceInQa,
  getMinGasPriceStatus: state.zil.getMinGasPriceStatus,
  tokenToZilSwapStatus: state.zil.tokenToZilSwapStatus,
  tokenToZilSwapId: state.zil.tokenToZilSwapId,
  network: state.zil.network,
  address: state.zil.address,
  publicKey: state.zil.publicKey,
  zilliqa: state.zil.zilliqa
});

const mapDispatchToProps = (dispatch) => ({
  tokenToZilSwap: (tokenAddress, tokensSold, minZil) =>
    dispatch(zilActions.tokenToZilSwap(tokenAddress, tokensSold, minZil)),
  clear: () => dispatch(zilActions.clear()),
  getBalance: () => dispatch(zilActions.getBalance()),
  getMinGasPrice: () => dispatch(zilActions.getMinGasPrice())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TokenToZilSwapForm);

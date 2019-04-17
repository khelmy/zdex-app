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
import ConfirmRemoveLiquidityModal from '../confirm-remove-liquidity-modal';
import { AccountInfo } from '../account-info';
import { requestStatus } from '../../constants';

interface IProps {
  removeLiquidity: (tokenAddress, amount, minZil, minTokens, gasPrice) => void;
  clear: () => void;
  getMinGasPrice: () => void;
  minGasPriceInQa: string;
  getMinGasPriceStatus?: string;
  getBalance: () => void;
  balanceInQa: string;
  getBalanceStatus?: string;
  removeLiquidityStatus?: string;
  publicKey: string;
  address: string;
  network: string;
  removeLiquidityId?: string;
}

interface IState {
  tokenAddress: string;
  tokenAddressValid: boolean;
  tokenAddressInvalid: boolean;
  amount: string;
  minZil: string;
  minTokens: string;
  recipientAddress: string;
  recipientAddressValid: boolean;
  recipientAddressInvalid: boolean;
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
  amount: '',
  minZil: '',
  minTokens: '',
  recipientAddress: '',
  recipientAddressValid: false,
  recipientAddressInvalid: false,
  isSendingTx: false,
  gasPrice: '0',
  gasPriceInQa: '0',
  isUpdatingGasPrice: false
};

const RemoveLiquidityForm: React.FunctionComponent<IProps> = (props) => {
  const {
    address,
    removeLiquidityStatus,
    removeLiquidityId,
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
  const [amount, setAmount] = useState(initialState.amount);
  const [minZil, setMinLiquidity] = useState(initialState.minZil);
  const [minTokens, setMinTokens] = useState(initialState.minTokens);
  const [recipientAddress, setRecipientAddress] = useState(initialState.recipientAddress);
  const [recipientAddressValid, setRecipientAddressValid] = useState(
    initialState.recipientAddressValid
  );
  const [recipientAddressInvalid, setRecipientAddressInvalid] = useState(
    initialState.recipientAddressInvalid
  );

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
    setAmount('');
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

  const changeAmount = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    if (e.target.value === '' || /^\d*\.?\d*$/.test(e.target.value)) {
      setAmount(e.target.value);
    }
  };

  const changeMinLiquidity = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    if (e.target.value === '' || /^\d*\.?\d*$/.test(e.target.value)) {
      setMinLiquidity(e.target.value);
    }
  };

  const changeMinTokens = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    if (e.target.value === '' || /^\d*\.?\d*$/.test(e.target.value)) {
      setMinTokens(e.target.value);
    }
  };

  const changeRecipientAddress = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const value = e.target.value;
    const key = 'recipientAddress';
    const validationResult: any = getInputValidationState(key, value, /^0x[a-fA-F0-9]{40}$/);
    setRecipientAddress(value);
    setRecipientAddressValid(validationResult.recipientAddressValid);
    setRecipientAddressInvalid(validationResult.recipientAddressInvalid);
  };

  const formatAmount = (): void => {
    if (amount !== initialState.amount) {
      const amountInZil: string = parseFloat(amount).toFixed(3);
      const balanceInZil: string = units.fromQa(new BN(balanceInQa), units.Units.Zil);
      const amountFormattedInZil = formatSendAmountInZil(
        amountInZil,
        balanceInZil,
        minGasPriceInZil
      );
      setAmount(amountFormattedInZil);
    }
  };

  const isBalanceInsufficient = new BN(balanceInQa).lte(new BN(minGasPriceInQa));
  const isSendButtonDisabled =
    tokenAddressInvalid ||
    tokenAddress === initialState.tokenAddress ||
    amount === initialState.amount ||
    minZil === initialState.minZil ||
    minTokens === initialState.minTokens ||
    recipientAddressInvalid ||
    recipientAddress === initialState.recipientAddress ||
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
                <b>{'Remove Liquidity from a Market'}</b>
              </h2>
              <Row>
                <Col xs={12} sm={12} md={12} lg={8} className="mr-auto ml-auto">
                  <Form className="mt-4 text-left" onSubmit={(e) => e.preventDefault()}>
                    <FormGroup>
                      <Label for="tokenAddress">
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
                      <Label for="amount">
                        <small>
                          <b>{'Amount of Liquidity Withdrawn'}</b>
                        </small>
                      </Label>
                      <Input
                        id="amount"
                        type="tel"
                        name="amount"
                        maxLength={10}
                        data-testid="amount"
                        value={amount}
                        onChange={changeAmount}
                        placeholder="Enter the Amount"
                        onBlur={formatAmount}
                        disabled={isUpdatingBalance || isUpdatingMinGasPrice}
                      />
                    </FormGroup>
                    <br />
                    <FormGroup>
                      <Label for="minZil">
                        <small>
                          <b>{'Minimum ZIL Received'}</b>
                        </small>
                      </Label>
                      <Input
                        id="minZil"
                        type="tel"
                        name="minZil"
                        maxLength={10}
                        data-testid="minZil"
                        value={minZil}
                        onChange={changeMinLiquidity}
                        placeholder="Minimum ZIL to Receive"
                        disabled={isUpdatingBalance || isUpdatingMinGasPrice}
                      />
                    </FormGroup>
                    <br />
                    <FormGroup>
                      <Label for="minTokens">
                        <small>
                          <b>{'Minimum Tokens to Receive'}</b>
                        </small>
                      </Label>
                      <Input
                        id="minTokens"
                        type="tel"
                        name="minTokens"
                        maxLength={10}
                        data-testid="minTokens"
                        value={minTokens}
                        onChange={changeMinTokens}
                        placeholder="Maximum Tokens Sent"
                        disabled={isUpdatingBalance || isUpdatingMinGasPrice}
                      />
                    </FormGroup>
                    <br />
                    <FormGroup>
                      <Label for="recipientAddress">
                        <small>
                          <b>{'Recipient Address'}</b>
                        </small>
                      </Label>
                      <Input
                        id="recipientAddress"
                        type="text"
                        name="recipientAddress"
                        data-testid="to-address"
                        value={recipientAddress}
                        onChange={changeRecipientAddress}
                        valid={recipientAddressValid}
                        invalid={recipientAddressInvalid}
                        placeholder="Liquidity Recipient Address"
                        maxLength={42}
                      />
                      <FormFeedback>{'invalid address'}</FormFeedback>
                      <FormFeedback valid={true}>{'valid address'}</FormFeedback>
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
        <ConfirmRemoveLiquidityModal
          removeLiquidityId={removeLiquidityId}
          removeLiquidityStatus={removeLiquidityStatus}
          tokenAddress={tokenAddress}
          amount={amount}
          minZil={minZil}
          minTokens={minTokens}
          recipientAddress={recipientAddress}
          gasPrice={minGasPriceInZil}
          isModalOpen={isModalOpen}
          removeLiquidity={props.removeLiquidity}
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
  removeLiquidityStatus: state.zil.removeLiquidityStatus,
  removeLiquidityId: state.zil.removeLiquidityId,
  network: state.zil.network,
  address: state.zil.address,
  publicKey: state.zil.publicKey,
  zilliqa: state.zil.zilliqa
});

const mapDispatchToProps = (dispatch) => ({
  removeLiquidity: (tokenAddress, amount, minZil, minTokens, recipientAddress) =>
    dispatch(zilActions.removeLiquidity(tokenAddress, amount, minZil, minTokens, recipientAddress)),
  clear: () => dispatch(zilActions.clear()),
  getBalance: () => dispatch(zilActions.getBalance()),
  getMinGasPrice: () => dispatch(zilActions.getMinGasPrice())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RemoveLiquidityForm);

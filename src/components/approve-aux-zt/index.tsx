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
import ConfirmApproveAuxZTModal from '../confirm-approve-aux-zt-modal';
import { AccountInfo } from '../account-info';
import { requestStatus } from '../../constants';

interface IProps {
  approveAuxZT: (tokenAddress, amount, gasPrice) => void;
  clear: () => void;
  getMinGasPrice: () => void;
  minGasPriceInQa: string;
  getMinGasPriceStatus?: string;
  getBalance: () => void;
  balanceInQa: string;
  getBalanceStatus?: string;
  approveAuxZTStatus?: string;
  publicKey: string;
  address: string;
  network: string;
  approveAuxZTId?: string;
}

interface IState {
  tokenAddress: string;
  tokenAddressValid: boolean;
  tokenAddressInvalid: boolean;
  amount: string;
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
  isSendingTx: false,
  gasPrice: '0',
  gasPriceInQa: '0',
  isUpdatingGasPrice: false
};

const ApproveAuxZTForm: React.FunctionComponent<IProps> = (props) => {
  const {
    address,
    approveAuxZTStatus,
    approveAuxZTId,
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

  const isBalanceInsufficient = new BN(balanceInQa).lte(new BN(minGasPriceInQa));
  const isSendButtonDisabled =
    tokenAddressInvalid ||
    tokenAddress === initialState.tokenAddress ||
    amount === initialState.amount ||
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
                <b>{'Allow Hub to use ZilToToken'}</b>
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
                        placeholder="Address of Token"
                        maxLength={42}
                      />
                      <FormFeedback>{'invalid address'}</FormFeedback>
                      <FormFeedback valid={true}>{'valid address'}</FormFeedback>
                    </FormGroup>
                    <br />
                    <FormGroup>
                      <Label for="amount">
                        <small>
                          <b>{'Quantity (Tokens)'}</b>
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
                        placeholder="Enter the Amount to Approve"
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
        <ConfirmApproveAuxZTModal
          approveAuxZTId={approveAuxZTId}
          approveAuxZTStatus={approveAuxZTStatus}
          tokenAddress={tokenAddress}
          amount={amount}
          gasPrice={minGasPriceInZil}
          isModalOpen={isModalOpen}
          approveAuxZT={props.approveAuxZT}
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
  approveAuxZTStatus: state.zil.approveAuxZTStatus,
  approveAuxZTId: state.zil.approveAuxZTId,
  network: state.zil.network,
  address: state.zil.address,
  publicKey: state.zil.publicKey,
  zilliqa: state.zil.zilliqa
});

const mapDispatchToProps = (dispatch) => ({
  approveAuxZT: (tokenAddress, amount) => dispatch(zilActions.approveAuxZT(tokenAddress, amount)),
  clear: () => dispatch(zilActions.clear()),
  getBalance: () => dispatch(zilActions.getBalance()),
  getMinGasPrice: () => dispatch(zilActions.getMinGasPrice())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApproveAuxZTForm);

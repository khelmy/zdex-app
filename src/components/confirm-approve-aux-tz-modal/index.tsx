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
import Button from '../button';
import { Modal, ModalHeader, Row, Col } from 'reactstrap';
import { requestStatus, EXPLORER_URL } from '../../constants';
import SpinnerWithCheckMark from '../spinner-with-check-mark';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Disclaimer from '../disclaimer';

interface IProps {
  approveAuxTZ: (tokenAddress, amount, gasPrice) => void;
  isModalOpen: boolean;
  tokenAddress: string;
  amount: string;
  gasPrice: string;
  approveAuxTZStatus?: string;
  closeModal: () => void;
  approveAuxTZId?: string;
}

interface IState {
  isSubmitting: boolean;
  isComplete: boolean;
  isFailed: boolean;
  isDisclaimerChecked: boolean;
  prevApproveAuxTZStatus?: string;
}

const initialState: IState = {
  isSubmitting: false,
  isComplete: false,
  isFailed: false,
  isDisclaimerChecked: false,
  prevApproveAuxTZStatus: undefined
};

const ApproveAuxTZModal: React.FunctionComponent<IProps> = (props) => {
  const {
    tokenAddress,
    amount,
    gasPrice,
    isModalOpen,
    approveAuxTZId,
    closeModal,
    approveAuxTZ,
    approveAuxTZStatus
  } = props;

  const [isSubmitting, setIsSubmitting] = useState(initialState.isSubmitting);
  const [isComplete, setIsComplete] = useState(initialState.isComplete);
  const [isFailed, setIsFailed] = useState(initialState.isFailed);
  const [isDisclaimerChecked, setIsDisclaimerChecked] = useState(initialState.isDisclaimerChecked);
  const [prevApproveAuxTZStatus, setPrevApproveAuxTZStatus] = useState(
    initialState.prevApproveAuxTZStatus
  );

  useEffect(
    () => {
      if (
        prevApproveAuxTZStatus === requestStatus.PENDING &&
        approveAuxTZStatus === requestStatus.FAILED
      ) {
        setIsSubmitting(false);
        setIsComplete(false);
        setIsFailed(true);
        setIsDisclaimerChecked(false);
      }
      if (
        prevApproveAuxTZStatus === requestStatus.PENDING &&
        approveAuxTZStatus === requestStatus.SUCCEED
      ) {
        setIsSubmitting(false);
        setIsComplete(true);
        setIsFailed(false);
        setIsDisclaimerChecked(false);
      }
      setPrevApproveAuxTZStatus(approveAuxTZStatus);
    },
    [approveAuxTZStatus, prevApproveAuxTZStatus]
  );

  const handleCheck = () => {
    setIsDisclaimerChecked(!isDisclaimerChecked);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    approveAuxTZ(tokenAddress, amount, gasPrice);
  };

  const renderTransactionProcess = () => {
    return (
      <div className="text-center pt-5">
        <SpinnerWithCheckMark loading={!isComplete} />
        {isSubmitting ? (
          <div className="text-center py-4">
            <p className="text-secondary text-fade-in">
              <b>{'Sending Transaction'}</b>
              <br />
              <small>{'Please kindly wait.'}</small>
            </p>
          </div>
        ) : null}
        {isComplete ? (
          <div>
            <p className="pt-4 text-secondary">
              <span className="text-primary">{'Transaction In Process'}</span>
              <br />
              <br />
              <small>{'The transaction is pending blockchain confirmation.'}</small>
              <br />
              <small>{'Please check after a few minutes.'}</small>
            </p>
            {approveAuxTZId ? (
              <u>
                <a
                  target="_blank"
                  href={`${EXPLORER_URL}/transactions/${approveAuxTZId}`}
                  rel="noreferrer"
                >
                  {'View Your Transaction'}
                </a>
              </u>
            ) : null}
            <br />
            <div className="py-5">
              <Button text={'Confirm'} type="primary" onClick={closeModal} ariaLabel={'Confirm'} />
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  const renderCreateForm = () => {
    const isSubmitButtonDisabled = isSubmitting || !isDisclaimerChecked;
    const submitButtonText = 'Confirm';
    const messageForTxFailure = 'Failed to send transaction. Please try again later.';
    return (
      <div>
        <small className="text-secondary">
          <b>Transaction Info:</b>
        </small>
        <div className="card p-3 mt-3">
          <small className="my-1 text-secondary">
            <b>{'Token Address'}</b>
          </small>
          <span className="font-monospace">{tokenAddress}</span>
          <hr className="my-2" />
          <small className="my-1 text-secondary">
            <b>{'Amount to Approve'}</b>
          </small>
          {amount} ZIL
          <hr className="my-2" />
          <small className="my-1 text-secondary">
            <b>{'Gas Price'}</b>
          </small>
          {gasPrice} ZIL
        </div>
        <br />
        <Form onSubmit={(e) => e.preventDefault()}>
          <FormGroup inline={true} className="px-5 text-center">
            <Label check={isDisclaimerChecked} onChange={handleCheck}>
              <Input type="checkbox" /> <Disclaimer />
            </Label>
          </FormGroup>
          <div className="text-center pt-2 pb-4">
            <Button
              text={submitButtonText}
              type="primary"
              onClick={onSubmit}
              ariaLabel={submitButtonText}
              IsSubmitButton={true}
              disabled={isSubmitButtonDisabled}
            />
            {isFailed ? (
              <p className="text-danger pt-4 text-fade-in">
                <small>{messageForTxFailure}</small>
              </p>
            ) : null}
          </div>
        </Form>
      </div>
    );
  };

  return (
    <Modal isOpen={isModalOpen} toggle={closeModal} size="lg" className="modal-container">
      <ModalHeader className="text-secondary" toggle={closeModal}>
        <b>{'Send Transaction'}</b>
      </ModalHeader>
      <div className="modal-body">
        <Row>
          <Col xs={11} sm={11} md={11} lg={8} className="mr-auto ml-auto">
            {isSubmitting || isComplete ? (
              renderTransactionProcess()
            ) : (
              <div>{renderCreateForm()}</div>
            )}
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default ApproveAuxTZModal;

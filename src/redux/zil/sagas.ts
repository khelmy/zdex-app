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

import { delay, select, put, takeLatest } from 'redux-saga/effects';

import { getAddressFromPrivateKey, getPubKeyFromPrivateKey } from '@zilliqa-js/crypto';
import { Long, bytes, units, BN } from '@zilliqa-js/util';
import { RPCMethod } from '@zilliqa-js/core';
import { Transaction, TxStatus } from '@zilliqa-js/account';

import axios from 'axios';

import * as consts from './actions';
import { HOST } from '../../api';
import { CHAIN_ID, MSG_VERSION } from '../../constants';

const VERSION = bytes.pack(CHAIN_ID, MSG_VERSION);
const hubAddress = 'bb13aa89cac6e3d359b7636cdfaec4fdd478b002';
const lmAddress = '3e5fae8f17e659f672eb816f1b2395f4c994bf99';
const ztAddress = '8ae7d36ac087eb394aca6242f897cedd05261e04';
const tzAddress = '8b723418c2fece8655bbe3cbdd0b6ba8dcecde86';

const getZilState = (state) => state.zil;

export function* accessWalletSaga(action) {
  // debounce by 500ms
  yield delay(500);
  try {
    const { payload } = action;
    const privateKey: string = payload.privateKey;
    const address = getAddressFromPrivateKey(privateKey);
    const publicKey = getPubKeyFromPrivateKey(privateKey);

    const { zilliqa } = yield select(getZilState);
    zilliqa.wallet.addByPrivateKey(privateKey);

    yield put({
      type: consts.ACCESS_WALLET_SUCCEEDED,
      payload: {
        address,
        publicKey,
        privateKey
      }
    });
  } catch (error) {
    console.log(error);
    yield put({ type: consts.ACCESS_WALLET_FAILED });
  }
}
export function* watchAccessWalletSaga() {
  yield takeLatest(consts.ACCESS_WALLET, accessWalletSaga);
}

function* callTransition(transition, toAddr, amount, params) {
  const zilState = yield select(getZilState);
  const { zilliqa, provider, privateKey, address, publicKey } = zilState;

  const response = yield zilliqa.blockchain.getMinimumGasPrice();
  const minGasPriceInQa: string = response.result;

  const nonceResponse = yield zilliqa.blockchain.getBalance(address);
  const nonceData = nonceResponse.result.nonce || { nonce: 0 };
  const nonce: number = nonceData.nonce + 1;

  const wallet = zilliqa.wallet;
  wallet.addByPrivateKey(privateKey);

  const txData = {
    _tag: transition,
    params
  };

  const tx = new Transaction(
    {
      version: VERSION,
      toAddr,
      amount: units.toQa(amount, units.Units.Zil),
      gasPrice: new BN(minGasPriceInQa),
      gasLimit: Long.fromNumber(10000),
      pubKey: publicKey,
      nonce,
      data: JSON.stringify(txData)
    },
    provider,
    TxStatus.Initialised,
    true
  );
  const signedTx = yield wallet.sign(tx);
  const { txParams } = signedTx;

  // Send a transaction to the network
  const data = yield provider.send(RPCMethod.CreateTransaction, txParams);

  /*
    const msg = ({
      version: VERSION,
      toAddr: toAddr,
      amount: units.toQa(amount, units.Units.Zil),
      gasPrice: new BN(minGasPriceInQa),
      gasLimit: Long.fromNumber(10000),
      pubKey: publicKey,
      nonce: nonce,
      data: JSON.stringify(txData)
    });
    let tx = zilliqa.transactions.new(msg, true);
    // const signedTx = yield wallet.sign(tx);
    const data = yield zilliqa.blockchain.createTransaction(tx, 33, 1000);
    */

  // const ctr = zilliqa.contracts.at(toAddr);
  // const data = yield ctr.call(transition, txData, args, 33, 1000, true);
  if (data.error !== undefined) {
    throw Error(data.error.message);
  }

  const id = data.result.TranID;
  console.log(data.result);
  return id;
}

export function* zilToTokenSwapSaga(action) {
  // debounce by 500ms
  yield delay(500);
  try {
    const { payload } = action;
    const { tokenAddress, amount, minTokens } = payload;
    const params = [
      {
        vname: 'token',
        type: 'ByStr20',
        value: tokenAddress
      },
      {
        vname: 'min_tokens',
        type: 'Uint128',
        value: `${minTokens}`
      },
      {
        vname: 'deadline',
        type: 'BNum',
        value: `${5e20}`
      }
    ];
    const zilToTokenSwapId = yield* callTransition(
      'ZilToTokenSwapInput',
      hubAddress,
      amount,
      params
    );
    yield put({
      type: consts.ZIL_TO_TOKEN_SWAP_SUCCEEDED,
      payload: { zilToTokenSwapId }
    });
  } catch (error) {
    console.log(error);
    yield put({ type: consts.ZIL_TO_TOKEN_SWAP_FAILED });
  }
}
export function* watchZilToTokenSwapSaga() {
  yield takeLatest(consts.ZIL_TO_TOKEN_SWAP, zilToTokenSwapSaga);
}

export function* tokenToZilSwapSaga(action) {
  // debounce by 500ms
  yield delay(500);
  try {
    const { payload } = action;
    const { tokenAddress, tokensSold, minZil } = payload;
    const params = [
      {
        vname: 'tokens_sold',
        type: 'ByStr20',
        value: tokenAddress
      },
      {
        vname: 'min_zil',
        type: 'Uint128',
        value: `${minZil}`
      },
      {
        vname: 'deadline',
        type: 'BNum',
        value: `${5e20}`
      }
    ];
    const tokenToZilSwapId = yield* callTransition('TokenToZilSwapInput', hubAddress, 0, params);
    yield put({
      type: consts.TOKEN_TO_ZIL_SWAP_SUCCEEDED,
      payload: { tokenToZilSwapId }
    });
  } catch (error) {
    console.log(error);
    yield put({ type: consts.TOKEN_TO_ZIL_SWAP_FAILED });
  }
}
export function* watchTokenToZilSwapSaga() {
  yield takeLatest(consts.TOKEN_TO_ZIL_SWAP, tokenToZilSwapSaga);
}

export function* getBalance(action) {
  // debounce by 500ms
  yield delay(500);
  try {
    const zilState = yield select(getZilState);
    const { zilliqa, address } = zilState;

    const response = yield zilliqa.blockchain.getBalance(address);
    let balanceInQa = '0';
    if (response.result) {
      balanceInQa = response.result.balance;
    }

    yield put({
      type: consts.GET_BALANCE_SUCCEEDED,
      payload: { balanceInQa }
    });
  } catch (error) {
    console.log(error);
    yield put({ type: consts.GET_BALANCE_FAILED });
  }
}
export function* watchGetBalanceSaga() {
  yield takeLatest(consts.GET_BALANCE, getBalance);
}

export function* getMinGasPrice(action) {
  // debounce by 500ms
  yield delay(500);
  try {
    const zilState = yield select(getZilState);
    const { zilliqa } = zilState;

    const response = yield zilliqa.blockchain.getMinimumGasPrice();
    const minGasPriceInQa: string = response.result;
    yield put({
      type: consts.GET_MIN_GAS_PRICE_SUCCEEDED,
      payload: { minGasPriceInQa }
    });
  } catch (error) {
    console.log(error);
    yield put({ type: consts.GET_MIN_GAS_PRICE_FAILED });
  }
}
export function* watchGetMinGasPriceSaga() {
  yield takeLatest(consts.GET_MIN_GAS_PRICE, getMinGasPrice);
}

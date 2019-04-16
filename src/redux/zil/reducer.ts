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

import { Zilliqa } from '@zilliqa-js/zilliqa';
import { HTTPProvider } from '@zilliqa-js/core';

import * as consts from './actions';
import { requestStatus, NODE_URL, NETWORK } from '../../constants';

const provider = new HTTPProvider(NODE_URL);
const zilliqa = new Zilliqa(NODE_URL, provider);

const initialState: any = {
  zilliqa,
  provider,
  network: NETWORK,
  address: undefined,
  publicKey: undefined,
  privateKey: undefined,
  faucetTxId: undefined,
  swapId: undefined,
  authStatus: undefined,
  faucetStatus: undefined,
  swapStatus: undefined,
  balanceInQa: undefined,
  getBalanceStatus: undefined,
  minGasPriceInQa: undefined,
  getMinGasPriceStatus: undefined
};

export default function zil(state = initialState, action) {
  switch (action.type) {
    case consts.ACCESS_WALLET:
      return {
        ...state,
        address: undefined,
        publicKey: undefined,
        privateKey: undefined,
        authStatus: requestStatus.PENDING
      };
    case consts.ACCESS_WALLET_SUCCEEDED:
      return {
        ...state,
        address: action.payload.address,
        publicKey: action.payload.publicKey,
        privateKey: action.payload.privateKey,
        authStatus: requestStatus.SUCCEED
      };
    case consts.ACCESS_WALLET_FAILED:
      return {
        ...state,
        address: undefined,
        publicKey: undefined,
        privateKey: undefined,
        authStatus: requestStatus.FAILED
      };
    case consts.CREATE_MARKET:
      return {
        ...state,
        createMarketStatus: requestStatus.PENDING,
        createMarketId: undefined
      };
    case consts.CREATE_MARKET_SUCCEEDED:
      return {
        ...state,
        createMarketStatus: requestStatus.SUCCEED,
        createMarketId: action.payload.createMarketId
      };
    case consts.CREATE_MARKET_FAILED:
      return {
        ...state,
        createMarketStatus: requestStatus.FAILED,
        createMarketId: undefined
      };
    case consts.APPROVE_TOKEN:
      return {
        ...state,
        approveTokenStatus: requestStatus.PENDING,
        approveTokenId: undefined
      };
    case consts.APPROVE_TOKEN_SUCCEEDED:
      return {
        ...state,
        approveTokenStatus: requestStatus.SUCCEED,
        approveTokenId: action.payload.approveTokenId
      };
    case consts.APPROVE_TOKEN_FAILED:
      return {
        ...state,
        approveTokenStatus: requestStatus.FAILED,
        approveTokenId: undefined
      };
    case consts.ZIL_TO_TOKEN_SWAP:
      return {
        ...state,
        zilToTokenSwapStatus: requestStatus.PENDING,
        zilToTokenSwapId: undefined
      };
    case consts.ZIL_TO_TOKEN_SWAP_SUCCEEDED:
      return {
        ...state,
        zilToTokenSwapStatus: requestStatus.SUCCEED,
        zilToTokenSwapId: action.payload.zilToTokenSwapId
      };
    case consts.ZIL_TO_TOKEN_SWAP_FAILED:
      return {
        ...state,
        zilToTokenSwapStatus: requestStatus.FAILED,
        zilToTokenSwapId: undefined
      };
    case consts.TOKEN_TO_ZIL_SWAP:
      return {
        ...state,
        tokenToZilSwapStatus: requestStatus.PENDING,
        tokenToZilSwapId: undefined
      };
    case consts.TOKEN_TO_ZIL_SWAP_SUCCEEDED:
      return {
        ...state,
        tokenToZilSwapStatus: requestStatus.SUCCEED,
        tokenToZilSwapId: action.payload.tokenToZilSwapId
      };
    case consts.TOKEN_TO_ZIL_SWAP_FAILED:
      return {
        ...state,
        tokenToZilSwapStatus: requestStatus.FAILED,
        tokenToZilSwapId: undefined
      };
    case consts.AUTHORIZE_ZDEX:
      return {
        ...state,
        authorizeZDEXStatus: requestStatus.PENDING,
        authorizeZDEXId: undefined
      };
    case consts.AUTHORIZE_ZDEX_SUCCEEDED:
      return {
        ...state,
        authorizeZDEXStatus: requestStatus.SUCCEED,
        authorizeZDEXId: action.payload.authorizeZDEXId
      };
    case consts.AUTHORIZE_ZDEX_FAILED:
      return {
        ...state,
        authorizeZDEXStatus: requestStatus.FAILED,
        authorizeZDEXId: undefined
      };
    case consts.ADD_LIQUIDITY:
      return {
        ...state,
        addLiquidityStatus: requestStatus.PENDING,
        addLiquidityId: undefined
      };
    case consts.ADD_LIQUIDITY_SUCCEEDED:
      return {
        ...state,
        addLiquidityStatus: requestStatus.SUCCEED,
        addLiquidityId: action.payload.addLiquidityId
      };
    case consts.ADD_LIQUIDITY_FAILED:
      return {
        ...state,
        addLiquidityStatus: requestStatus.FAILED,
        addLiquidityId: undefined
      };
    case consts.REMOVE_LIQUIDITY:
      return {
        ...state,
        removeLiquidityStatus: requestStatus.PENDING,
        removeLiquidityId: undefined
      };
    case consts.REMOVE_LIQUIDITY_SUCCEEDED:
      return {
        ...state,
        removeLiquidityStatus: requestStatus.SUCCEED,
        removeLiquidityId: action.payload.removeLiquidityId
      };
    case consts.REMOVE_LIQUIDITY_FAILED:
      return {
        ...state,
        removeLiquidityStatus: requestStatus.FAILED,
        removeLiquidityId: undefined
      };
    case consts.GET_BALANCE:
      return {
        ...state,
        getBalanceStatus: requestStatus.PENDING,
        balanceInQa: undefined
      };
    case consts.GET_BALANCE_SUCCEEDED:
      return {
        ...state,
        getBalanceStatus: requestStatus.SUCCEED,
        balanceInQa: action.payload.balanceInQa
      };
    case consts.GET_BALANCE_FAILED:
      return {
        ...state,
        getBalanceStatus: requestStatus.FAILED,
        balanceInQa: undefined
      };
    case consts.GET_MIN_GAS_PRICE:
      return {
        ...state,
        getMinGasPriceStatus: requestStatus.PENDING,
        minGasPriceInQa: undefined
      };
    case consts.GET_MIN_GAS_PRICE_SUCCEEDED:
      return {
        ...state,
        getMinGasPriceStatus: requestStatus.SUCCEED,
        minGasPriceInQa: action.payload.minGasPriceInQa
      };
    case consts.GET_MIN_GAS_PRICE_FAILED:
      return {
        ...state,
        getMinGasPriceStatus: requestStatus.FAILED,
        minGasPriceInQa: undefined
      };
    case consts.CLEAR:
      return initialState;
    default:
      return state;
  }
}

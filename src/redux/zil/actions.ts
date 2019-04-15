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

export const ACCESS_WALLET = 'ACCESS_WALLET';
export const ACCESS_WALLET_SUCCEEDED = 'ACCESS_WALLET_SUCCEEDED';
export const ACCESS_WALLET_FAILED = 'ACCESS_WALLET_FAILED';
export const accessWallet = (privateKey) => ({
  type: ACCESS_WALLET,
  payload: { privateKey }
});

export const CLEAR = 'CLEAR';
export const clear = () => ({
  type: CLEAR
});

export const MANAGE_LIQUIDITY = 'MANAGE_LIQUIDITY';
export const MANAGE_LIQUIDITY_SUCCEEDED = 'MANAGE_LIQUIDITY_SUCCEEDED';
export const MANAGE_LIQUIDITY_FAILED = 'MANAGE_LIQUIDITY_FAILED';
export const manageLiquidity = (address, token) => ({
  type: MANAGE_LIQUIDITY,
  payload: { address, token }
});

export const SWAP = 'SWAP';
export const SWAP_SUCCEEDED = 'SWAP_SUCCEEDED';
export const SWAP_FAILED = 'SWAP_FAILED';
export const swap = (toAddress, amount) => ({
  type: SWAP,
  payload: { toAddress, amount }
});

export const CREATE_MARKET = 'CREATE_MARKET';
export const CREATE_MARKET_SUCCEEDED = 'CREATE_MARKET_SUCCEEDED';
export const CREATE_MARKET_FAILED = 'CREATE_MARKET_FAILED';
export const createMarket = (token) => ({
  type: CREATE_MARKET,
  payload: { token }
});


export const GET_BALANCE = 'GET_BALANCE';
export const GET_BALANCE_SUCCEEDED = 'GET_BALANCE_SUCCEEDED';
export const GET_BALANCE_FAILED = 'GET_BALANCE_FAILED';
export const getBalance = () => ({ type: GET_BALANCE });

export const GET_MIN_GAS_PRICE = 'GET_MIN_GAS_PRICE';
export const GET_MIN_GAS_PRICE_SUCCEEDED = 'GET_MIN_GAS_PRICE_SUCCEEDED';
export const GET_MIN_GAS_PRICE_FAILED = 'GET_MIN_GAS_PRICE_FAILED';
export const getMinGasPrice = () => ({ type: GET_MIN_GAS_PRICE });

import { ethers } from "ethers";
import { gql } from "@apollo/client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Token as UniToken } from "@uniswap/sdk-core";
import { Pool } from "@uniswap/v3-sdk";
import useSWR from "swr";
import { chain, sumBy, sortBy, maxBy, minBy } from 'lodash'

import OrderBook from "abis/OrderBook.json";
import PositionManager from "abis/PositionManager.json";
import Vault from "abis/Vault.json";
import Router from "abis/Router.json";
import UniPool from "abis/UniPool.json";
import UniswapV2 from "abis/UniswapV2.json";
import Token from "abis/Token.json";
import PositionRouter from "abis/PositionRouter.json";

import { getContract } from "config/contracts";
import { ARBITRUM, getConstant, getHighExecutionFee, MAINNET } from "config/chains";
import { DECREASE, getOrderKey, INCREASE, SWAP, USD_DECIMALS } from "lib/legacy";

import { groupBy } from "lodash";
import { UI_VERSION } from "config/ui";
import { getServerBaseUrl, getServerUrl } from "config/backend";
import { getGmxGraphClient, nissohGraphClient, ethGraphClientForTrades } from "lib/subgraph/clients";
import { callContract, contractFetcher } from "lib/contracts";
import { replaceNativeTokenAddress } from "./tokens";
import { getUsd } from "./tokens/utils";
import { getProvider } from "lib/rpc";
import { bigNumberify, expandDecimals, parseValue } from "lib/numbers";
import { getTokenBySymbol } from "config/tokens";
import { t } from "@lingui/macro";

export * from "./prices";

const NOW_TS = parseInt(Date.now() / 1000)
const FIRST_DATE_TS = parseInt(+(new Date(2022, 10, 1)) / 1000)
const MOVING_AVERAGE_DAYS = 7
const MOVING_AVERAGE_PERIOD = 86400 * MOVING_AVERAGE_DAYS
const { AddressZero } = ethers.constants;

export function useAllOrdersStats(chainId) {
  const query = gql(`{
    orderStat(id: "total") {
      openSwap
      openIncrease
      openDecrease
      executedSwap
      executedIncrease
      executedDecrease
      cancelledSwap
      cancelledIncrease
      cancelledDecrease
    }
  }`);

  const [res, setRes] = useState();

  useEffect(() => {
    const graphClient = getGmxGraphClient(chainId);
    if (graphClient) {
      graphClient.query({ query }).then(setRes).catch(console.warn);
    }
  }, [setRes, query, chainId]);

  return res ? res.data.orderStat : null;
}

export function usePositionStates(chainId) {
  const [res, setRes] = useState();
  useEffect(() => {
    const query = gql(`
    {
      swaps(
        first: 1000
        where: {timestamp_gt: 0}
        orderBy: timestamp
      ) {
        account
        tokenIn
        tokenOut
        amountIn
        amountOut
        timestamp
        transaction
      }
      createIncreasePositions(
        first: 1000, 
        where: {timestamp_gt: 0}
        orderBy: timestamp
        ) {
      account
      collateralToken
      indexToken
      isLong
      amountIn
    
      sizeDelta
      acceptablePrice
      executionFee
    
      transaction
      timestamp
    }
        
    createDecreasePositions(
        first: 1000, 
        where: {timestamp_gt: 0}
        orderBy: timestamp
        ) {
      account
      collateralToken
      indexToken
      isLong
      
    
      sizeDelta
      acceptablePrice
      executionFee
    
      transaction
      timestamp
    }
    
    cancelIncreasePositions(
        first: 1000, 
        where: {timestamp_gt: 0}
        orderBy: timestamp
        ) {
      account
      
      indexToken
      isLong
      
    
      sizeDelta
      acceptablePrice
    
      transaction
      timestamp
    }
    
    cancelDecreasePositions(
        first: 1000, 
        where: {timestamp_gt: 0}
        orderBy: timestamp
        ) {
      account
      
      indexToken
      isLong
      
    
      sizeDelta
      acceptablePrice
    
      transaction
      timestamp
    }
    
    orders(
        first: 1000, 
        where: {createdTimestamp_gt: 0}
        orderBy: createdTimestamp
        ) {
      type
      account
      status
      index
      size
    
      indexToken
      isLong
    
      collateralToken
      collateral
    
      triggerPrice
      triggerAboveThreshold
    
      createdTimestamp
      cancelledTimestamp
      executedTimestamp
      transaction
    }
    
    }`);
    if (!ethGraphClientForTrades) {
      return;
    }

    ethGraphClientForTrades
      .query({ query })
      .then((res) => {
        setRes(res);
      })
      .catch((err) => {
          console.error(err);
        }
      );


  }, [setRes, chainId]);

  const tradeVolueDataMap = useMemo(() => {
    if (!res) {
      return [];
    }
    const tradeData = res.data;
    const superArray = {
      totalLongPositionCollaterals	:	bigNumberify(0),
      totalLongPositionSizes	:	bigNumberify(0),
      totalShortPositionCollaterals	:	bigNumberify(0),
      totalShortPositionSizes	:	bigNumberify(0),
      totalActivePositions	:	0
    };

    tradeData.createIncreasePositions.forEach((item) => {
      if(item.isLong) {
        superArray.totalLongPositionCollaterals = superArray.totalLongPositionCollaterals.add(bigNumberify(item.amountIn));
        superArray.totalLongPositionSizes = superArray.totalLongPositionSizes.add(bigNumberify(item.amountIn));
      } else {
        superArray.totalShortPositionCollaterals = superArray.totalShortPositionCollaterals.add(bigNumberify(item.amountIn));
        superArray.totalShortPositionSizes = superArray.totalShortPositionSizes.add(bigNumberify(item.amountIn));
      }
      superArray.totalActivePositions += 1;
    });

    // tradeData.createDecreasePositions.forEach((item) => {
    //   const obj = {
    //     timestamp: item.timestamp,
    //     group: 1669248000,
    //     action: "CreateDecreasePosition",
    //     token: ethers.utils.getAddress(item.indexToken),
    //     volume: item.amountOut,
    //   };
    //   const parent = {
    //     data: obj
    //   };
    //   superArray.push(parent);
    // });


    // tradeData.orders.forEach((item) => {
      
    //   const obj = {
    //     timestamp: item.createdTimestamp,
    //     group: 1669248000,
    //     action: "CreateIncreaseOrder",
    //     token: ethers.utils.getAddress(item.indexToken),
    //     volume: item.size
    //   };
    //   const parent = {
    //     data: obj
    //   };
    //   superArray.push(parent);
    // });


    // const mapData = new Map();

    // return tradeHistoryData.forEach((item) => ({
    //   data: item
    // }));
    return superArray;
  }, [res]);

  return tradeVolueDataMap;
}

export function useTotalVolume() {
  const [res, setRes] = useState();
  useEffect(() => {
    const query = gql(`
    {
      swaps(
        first: 1000
        where: {timestamp_gt: 0}
        orderBy: timestamp
      ) {
        account
        tokenIn
        tokenOut
        amountIn
        amountOut
        timestamp
        transaction
      }
      createIncreasePositions(
        first: 1000, 
        where: {timestamp_gt: 0}
        orderBy: timestamp
        ) {
      account
      collateralToken
      indexToken
      isLong
      amountIn
    
      sizeDelta
      acceptablePrice
      executionFee
    
      transaction
      timestamp
    }
        
    createDecreasePositions(
        first: 1000, 
        where: {timestamp_gt: 0}
        orderBy: timestamp
        ) {
      account
      collateralToken
      indexToken
      isLong
      
    
      sizeDelta
      acceptablePrice
      executionFee
    
      transaction
      timestamp
    }
    
    cancelIncreasePositions(
        first: 1000, 
        where: {timestamp_gt: 0}
        orderBy: timestamp
        ) {
      account
      
      indexToken
      isLong
      
    
      sizeDelta
      acceptablePrice
    
      transaction
      timestamp
    }
    
    cancelDecreasePositions(
        first: 1000, 
        where: {timestamp_gt: 0}
        orderBy: timestamp
        ) {
      account
      
      indexToken
      isLong
      
    
      sizeDelta
      acceptablePrice
    
      transaction
      timestamp
    }
    
    orders(
        first: 1000, 
        where: {createdTimestamp_gt: 0}
        orderBy: createdTimestamp
        ) {
      type
      account
      status
      index
      size
    
      indexToken
      isLong
    
      collateralToken
      collateral
    
      triggerPrice
      triggerAboveThreshold
    
      createdTimestamp
      cancelledTimestamp
      executedTimestamp
      transaction
    }
    
    }`);

    if (!ethGraphClientForTrades) {
      return;
    }

    ethGraphClientForTrades
      .query({ query })
      .then((res) => {
        setRes(res);
      })
      .catch((err) => {
          console.error(err);
        }
      );


  }, [setRes]);

  const tradeVolueDataMap = useMemo(() => {
    if (!res) {
      return [];
    }
    const tradeData = res.data;
    let superArray = bigNumberify(0);
    tradeData.swaps.forEach((item) => {
      superArray = superArray.add(item.amountIn);
    });

    tradeData.createIncreasePositions.forEach((item) => {
      superArray = superArray.add(item.amountIn);
    });

    tradeData.createDecreasePositions.forEach((item) => {
      // superArray.add(bigNumberify(item.amountOut));
    });


    tradeData.orders.forEach((item) => {
      superArray = superArray.add(item.size);
    });
    
    return superArray;
  }, [res]);

  return tradeVolueDataMap;
}

export function useTradeVolumeHistory(chainId) {
  const [res, setRes] = useState();
  useEffect(() => {
    const query = gql(`
    {
      swaps(
        first: 1000
        where: {timestamp_gt: 0}
        orderBy: timestamp
      ) {
        account
        tokenIn
        tokenOut
        amountIn
        amountOut
        timestamp
        transaction
      }
      createIncreasePositions(
        first: 1000, 
        where: {timestamp_gt: 0}
        orderBy: timestamp
        ) {
      account
      collateralToken
      indexToken
      isLong
      amountIn
    
      sizeDelta
      acceptablePrice
      executionFee
    
      transaction
      timestamp
    }
        
    createDecreasePositions(
        first: 1000, 
        where: {timestamp_gt: 0}
        orderBy: timestamp
        ) {
      account
      collateralToken
      indexToken
      isLong
      
    
      sizeDelta
      acceptablePrice
      executionFee
    
      transaction
      timestamp
    }
    
    cancelIncreasePositions(
        first: 1000, 
        where: {timestamp_gt: 0}
        orderBy: timestamp
        ) {
      account
      
      indexToken
      isLong
      
    
      sizeDelta
      acceptablePrice
    
      transaction
      timestamp
    }
    
    cancelDecreasePositions(
        first: 1000, 
        where: {timestamp_gt: 0}
        orderBy: timestamp
        ) {
      account
      
      indexToken
      isLong
      
    
      sizeDelta
      acceptablePrice
    
      transaction
      timestamp
    }
    
    orders(
        first: 1000, 
        where: {createdTimestamp_gt: 0}
        orderBy: createdTimestamp
        ) {
      type
      account
      status
      index
      size
    
      indexToken
      isLong
    
      collateralToken
      collateral
    
      triggerPrice
      triggerAboveThreshold
    
      createdTimestamp
      cancelledTimestamp
      executedTimestamp
      transaction
    }
    
    }`);
    if (!ethGraphClientForTrades) {
      return;
    }

    ethGraphClientForTrades
      .query({ query })
      .then((res) => {
        setRes(res);
      })
      .catch((err) => {
          console.error(err);
        }
      );


  }, [setRes, chainId]);

  const tradeVolueDataMap = useMemo(() => {
    if (!res) {
      return [];
    }
    const tradeData = res.data;
    const superArray = [];
    tradeData.swaps.forEach((item) => {
      const obj = {
        timestamp: item.timestamp,
        group: 1669248000,
        action: "Swap",
        token: ethers.utils.getAddress(item.tokenOut),
        volume: item.amountIn
      };
      const parent = {
        data: obj
      };
      superArray.push(parent);
    });

    tradeData.createIncreasePositions.forEach((item) => {
      const obj = {
        timestamp: item.timestamp,
        group: 1669248000,
        action: "CreateIncreasePosition",
        token: ethers.utils.getAddress(item.indexToken),
        volume: item.amountIn,
      };
      const parent = {
        data: obj
      };
      superArray.push(parent);
    });

    tradeData.createDecreasePositions.forEach((item) => {
      const obj = {
        timestamp: item.timestamp,
        group: 1669248000,
        action: "CreateDecreasePosition",
        token: ethers.utils.getAddress(item.indexToken),
        volume: item.amountOut,
      };
      const parent = {
        data: obj
      };
      superArray.push(parent);
    });


    tradeData.orders.forEach((item) => {
      
      const obj = {
        timestamp: item.createdTimestamp,
        group: 1669248000,
        action: "CreateIncreaseOrder",
        token: ethers.utils.getAddress(item.indexToken),
        volume: item.size
      };
      const parent = {
        data: obj
      };
      superArray.push(parent);
    });


    // const mapData = new Map();

    // return tradeHistoryData.forEach((item) => ({
    //   data: item
    // }));
    superArray.sort((a, b) => b.timestamp - a.timestamp);
    return superArray;
  }, [res]);

  return tradeVolueDataMap;
}

export function useAllTradesHistory(chainId, account) {
  const [res, setRes] = useState();

  

  useEffect(() => {
    if (account) {
      const query = gql(`
      {
        swaps(
          first: 1000
          where: {
            account: "${account.toLowerCase()}"
          }
        ) {
          account
          tokenIn
          tokenOut
          amountIn
          amountOut
          timestamp
          transaction
        }
        createIncreasePositions(
          first: 1000, 
          where: { 
            account: "${account.toLowerCase()}",
        }) {
        account
        collateralToken
        indexToken
        isLong
        amountIn
      
        sizeDelta
        acceptablePrice
        executionFee
      
        transaction
        timestamp
      }
          
      createDecreasePositions(
          first: 1000, 
          where: { 
            account: "${account.toLowerCase()}",
        }) {
        account
        collateralToken
        indexToken
        isLong
        
      
        sizeDelta
        acceptablePrice
        executionFee
      
        transaction
        timestamp
      }
      
      cancelIncreasePositions(
          first: 1000, 
          where: { 
            account: "${account.toLowerCase()}",
        }) {
        account
        
        indexToken
        isLong
        
      
        sizeDelta
        acceptablePrice
      
        transaction
        timestamp
      }
      
      cancelDecreasePositions(
          first: 1000, 
          where: { 
            account: "${account.toLowerCase()}",
        }) {
        account
        
        indexToken
        isLong
        
      
        sizeDelta
        acceptablePrice
      
        transaction
        timestamp
      }
      
      orders(
          first: 1000, 
          where: { 
            account: "${account.toLowerCase()}",
        }) {
        type
        account
        status
        index
        size
      
        indexToken
        isLong
      
        collateralToken
        collateral
      
        triggerPrice
        triggerAboveThreshold
      
        createdTimestamp
        cancelledTimestamp
        executedTimestamp
        transaction
      }
      
      }
      `);
      // console.log("---shark useAllTradesHistory 1");
      // const graphClient = getGmxGraphClient(chainId);
      if (!ethGraphClientForTrades) {
        return;
      }
      // console.log("---shark useAllTradesHistory 2");

      ethGraphClientForTrades
        .query({ query })
        .then((res) => {
          // console.log("---shark useAllTradesHistory 3");
          // console.log("---shark useAllTradesHistory Data: ", res);
          // const _data = res.data.swap.map((item) => {
          //   return {
          //     ...item,
          //   };
          // });
          setRes(res);
          // console.log("---shark useAllTradesHistory 5");
        })
        .catch((err) => {
            // console.log("---shark useAllTradesHistory 4");
            console.error(err);
          }
        );
    }
  }, [setRes, chainId, account]);

  const tradeHistoryDataMap = useMemo(() => {
    if (!res) {
      return [];
    }
    const tradeData = res.data;
    const superArray = [];
    tradeData.swaps.forEach((item) => {
      const obj = {
        timestamp: item.timestamp,
        txhash: item.transaction,
        account: item.account,
        action: "Swap",
        params: {
          "tokenIn": ethers.utils.getAddress(item.tokenIn),
          "tokenOut": ethers.utils.getAddress(item.tokenOut),
          "amountIn": item.amountIn,
          "amountOut": item.amountOut,
          
        },
      };
      const parent = {
        data: obj
      };
      superArray.push(parent);
    });

    tradeData.createIncreasePositions.forEach((item) => {
      const obj = {
        timestamp: item.timestamp,
        txhash: item.transaction,
        account: item.account,
        action: "CreateIncreasePosition",
        params: {
          "indexToken": ethers.utils.getAddress(item.indexToken),
          "tokenOut": item.tokenOut,
          "amountIn": item.amountIn,
          "acceptablePrice": item.acceptablePrice,
          "collateralToken": ethers.utils.getAddress(item.collateralToken),
          "executionFee": item.executionFee,
          "isLong": item.isLong,
          "sizeDelta": item.sizeDelta,
        },
      };
      const parent = {
        data: obj
      };
      superArray.push(parent);
    });

    tradeData.createDecreasePositions.forEach((item) => {
      const obj = {
        timestamp: item.timestamp,
        txhash: item.transaction,
        account: item.account,
        action: "CreateDecreasePosition",
        params: {
          "indexToken": ethers.utils.getAddress(item.indexToken),
          "tokenOut": item.tokenOut,
          "amountOut": item.amountOut,
          "acceptablePrice": item.acceptablePrice,
          "collateralToken": ethers.utils.getAddress(item.collateralToken),
          "executionFee": item.executionFee,
          "isLong": item.isLong,
          "sizeDelta": item.sizeDelta,
        },
      };
      const parent = {
        data: obj
      };
      superArray.push(parent);
    });

    tradeData.cancelIncreasePositions.forEach((item) => {
      const obj = {
        timestamp: item.timestamp,
        txhash: item.transaction,
        account: item.account,
        action: "CancelIncreasePosition",
        params: {
          "indexToken": ethers.utils.getAddress(item.indexToken),
          "acceptablePrice": item.acceptablePrice,
          "isLong": item.isLong,
          "sizeDelta": item.sizeDelta,
        },
      };
      const parent = {
        data: obj
      };
      superArray.push(parent);
    });

    tradeData.cancelDecreasePositions.forEach((item) => {
      const obj = {
        timestamp: item.timestamp,
        txhash: item.transaction,
        account: item.account,
        action: "CancelDecreasePosition",
        params: {
          "indexToken": ethers.utils.getAddress(item.indexToken),
          "acceptablePrice": item.acceptablePrice,
          "isLong": item.isLong,
          "sizeDelta": item.sizeDelta,
        },
      };
      const parent = {
        data: obj
      };
      superArray.push(parent);
    });

    tradeData.orders.forEach((item) => {
      
      const obj = {
        timestamp: item.createdTimestamp,
        txhash: item.transaction,
        account: item.account,
        action: "CreateIncreaseOrder",
        params: {
          "order": {
            "type":item.type,
            // "createdAtBlock":22518920,
            "updatedAt":1668747661257,
            "account":item.account,
            "orderIndex": {
              "_type": "BigNumber",
              "value":item.index
            },
            // "triggerPrice": {
            //   "_type":"BigNumber",
            //   "value":item.triggerPrice
            // },
            "triggerPrice": item.triggerPrice,
            "triggerAboveThreshold":item.triggerAboveThreshold,
            "executionFee": {
              "_type":"BigNumber",
              "value":0
            },
            "indexToken": item.indexToken? ethers.utils.getAddress(item.indexToken) : item.indexToken,
            "collateralToken":item.collateralToken? ethers.utils.getAddress(item.collateralToken) : item.collateralToken,
            // "purchaseToken":"0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
            // "purchaseTokenAmount":{
            //   "_type":"BigNumber",
            //   "value":"10000000"
            // },
            "sizeDelta":item.size,
            "isLong":item.isLong
          }},
      };
      const parent = {
        data: obj
      };
      superArray.push(parent);
    });


    // const mapData = new Map();

    // return tradeHistoryData.forEach((item) => ({
    //   data: item
    // }));
    superArray.sort((a, b) => b.timestamp - a.timestamp);
    return superArray;
  }, [res]);

  // return res? res.data : null;
  return tradeHistoryDataMap;
}

export function useUserStat(chainId) {
  const query = gql(`{
    userStat(id: "total") {
      id
      uniqueCount
    }
  }`);

  const [res, setRes] = useState();

  useEffect(() => {
    const graphClient = getGmxGraphClient(chainId);
    if (!graphClient) {
      return;
    }
    graphClient.query({ query }).then(setRes).catch(console.warn);
  }, [setRes, query, chainId]);

  return res ? res.data.userStat : null;
}

export function useLiquidationsData(chainId, account) {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (account) {
      const query = gql(`{
         liquidatedPositions(
           where: {account: "${account.toLowerCase()}"}
           first: 100
           orderBy: timestamp
           orderDirection: desc
         ) {
           key
           timestamp
           borrowFee
           loss
           collateral
           size
           markPrice
           type
         }
      }`);
      const graphClient = getGmxGraphClient(chainId);
      if (!graphClient) {
        return;
      }

      graphClient
        .query({ query })
        .then((res) => {
          const _data = res.data.liquidatedPositions.map((item) => {
            return {
              ...item,
              size: bigNumberify(item.size),
              collateral: bigNumberify(item.collateral),
              markPrice: bigNumberify(item.markPrice),
            };
          });
          setData(_data);
        })
        .catch(console.warn);
    }
  }, [setData, chainId, account]);

  return data;
}

export function useAllPositions(chainId, library) {
  const count = 1000;
  const query = gql(`{
    aggregatedTradeOpens(
      first: ${count}
    ) {
      account
      initialPosition{
        indexToken
        collateralToken
        isLong
        sizeDelta
      }
      increaseList {
        sizeDelta
      }
      decreaseList {
        sizeDelta
      }
    }
  }`);

  const [res, setRes] = useState();

  useEffect(() => {
    nissohGraphClient.query({ query }).then(setRes).catch(console.warn);
  }, [setRes, query]);

  const key = res ? `allPositions${count}__` : false;
  const { data: positions = [] } = useSWR(key, async () => {
    const provider = getProvider(library, chainId);
    const vaultAddress = getContract(chainId, "Vault");
    const contract = new ethers.Contract(vaultAddress, Vault.abi, provider);
    const ret = await Promise.all(
      res.data.aggregatedTradeOpens.map(async (dataItem) => {
        try {
          const { indexToken, collateralToken, isLong } = dataItem.initialPosition;
          const positionData = await contract.getPosition(dataItem.account, collateralToken, indexToken, isLong);
          const position = {
            size: bigNumberify(positionData[0]),
            collateral: bigNumberify(positionData[1]),
            entryFundingRate: bigNumberify(positionData[3]),
            account: dataItem.account,
          };
          position.fundingFee = await contract.getFundingFee(collateralToken, position.size, position.entryFundingRate);
          position.marginFee = position.size.div(1000);
          position.fee = position.fundingFee.add(position.marginFee);

          const THRESHOLD = 5000;
          const collateralDiffPercent = position.fee.mul(10000).div(position.collateral);
          position.danger = collateralDiffPercent.gt(THRESHOLD);

          return position;
        } catch (ex) {
          console.error(ex);
        }
      })
    );

    return ret.filter(Boolean);
  });

  return positions;
}

export function useAllOrders(chainId, library) {
  const query = gql(`{
    orders(
      first: 1000,
      orderBy: createdTimestamp,
      orderDirection: desc,
      where: {status: "open"}
    ) {
      type
      account
      index
      status
      createdTimestamp
    }
  }`);

  const [res, setRes] = useState();

  useEffect(() => {
    getGmxGraphClient(chainId).query({ query }).then(setRes);
  }, [setRes, query, chainId]);

  const key = res ? res.data.orders.map((order) => `${order.type}-${order.account}-${order.index}`) : null;
  const { data: orders = [] } = useSWR(key, () => {
    const provider = getProvider(library, chainId);
    const orderBookAddress = getContract(chainId, "OrderBook");
    const contract = new ethers.Contract(orderBookAddress, OrderBook.abi, provider);
    return Promise.all(
      res.data.orders.map(async (order) => {
        try {
          const type = order.type.charAt(0).toUpperCase() + order.type.substring(1);
          const method = `get${type}Order`;
          const orderFromChain = await contract[method](order.account, order.index);
          const ret = {};
          for (const [key, val] of Object.entries(orderFromChain)) {
            ret[key] = val;
          }
          if (order.type === "swap") {
            ret.path = [ret.path0, ret.path1, ret.path2].filter((address) => address !== AddressZero);
          }
          ret.type = type;
          ret.index = order.index;
          ret.account = order.account;
          ret.createdTimestamp = order.createdTimestamp;
          return ret;
        } catch (ex) {
          console.error(ex);
        }
      })
    );
  });

  return orders.filter(Boolean);
}

export function usePositionsForOrders(chainId, library, orders) {
  const key = orders ? orders.map((order) => getOrderKey(order) + "____") : null;
  const { data: positions = {} } = useSWR(key, async () => {
    const provider = getProvider(library, chainId);
    const vaultAddress = getContract(chainId, "Vault");
    const contract = new ethers.Contract(vaultAddress, Vault.abi, provider);
    const data = await Promise.all(
      orders.map(async (order) => {
        try {
          const position = await contract.getPosition(
            order.account,
            order.collateralToken,
            order.indexToken,
            order.isLong
          );
          if (position[0].eq(0)) {
            return [null, order];
          }
          return [position, order];
        } catch (ex) {
          console.error(ex);
        }
      })
    );
    return data.reduce((memo, [position, order]) => {
      memo[getOrderKey(order)] = position;
      return memo;
    }, {});
  });

  return positions;
}

function invariant(condition, errorMsg) {
  if (!condition) {
    throw new Error(errorMsg);
  }
}

export function useTrades(chainId, account, forSingleAccount, afterId) {
  let url =
    account && account.length > 0
      ? `${getServerBaseUrl(chainId)}/actions?account=${account}`
      : !forSingleAccount && `${getServerBaseUrl(chainId)}/actions`;

  if (afterId && afterId.length > 0) {
    const urlItem = new URL(url);
    urlItem.searchParams.append("after", afterId);
    url = urlItem.toString();
  }

  const { data: trades, mutate: updateTrades } = useSWR(url && url, {
    dedupingInterval: 10000,
    fetcher: (...args) => fetch(...args).then((res) => res.json()),
  });

  if (trades) {
    trades.sort((item0, item1) => {
      const data0 = item0.data;
      const data1 = item1.data;
      const time0 = parseInt(data0.timestamp);
      const time1 = parseInt(data1.timestamp);
      if (time1 > time0) {
        return 1;
      }
      if (time1 < time0) {
        return -1;
      }

      const block0 = parseInt(data0.blockNumber);
      const block1 = parseInt(data1.blockNumber);

      if (isNaN(block0) && isNaN(block1)) {
        return 0;
      }

      if (isNaN(block0)) {
        return 1;
      }

      if (isNaN(block1)) {
        return -1;
      }

      if (block1 > block0) {
        return 1;
      }

      if (block1 < block0) {
        return -1;
      }

      return 0;
    });
  }

  return { trades, updateTrades };
}

export function useMinExecutionFee(library, active, chainId, infoTokens) {
  const positionRouterAddress = getContract(chainId, "PositionRouter");
  const nativeTokenAddress = getContract(chainId, "NATIVE_TOKEN");

  const { data: minExecutionFee } = useSWR([active, chainId, positionRouterAddress, "minExecutionFee"], {
    fetcher: contractFetcher(library, PositionRouter),
  });

  const { data: gasPrice } = useSWR(["gasPrice", chainId], {
    fetcher: () => {
      return new Promise(async (resolve, reject) => {
        const provider = getProvider(library, chainId);
        if (!provider) {
          resolve(undefined);
          return;
        }

        try {
          const gasPrice = await provider.getGasPrice();
          resolve(gasPrice);
        } catch (e) {
          console.error(e);
        }
      });
    },
  });

  let multiplier;

  // if gas prices on Arbitrum are high, the main transaction costs would come from the L2 gas usage
  // for executing positions this is around 65,000 gas
  // if gas prices on Ethereum are high, than the gas usage might be higher, this calculation doesn't deal with that
  // case yet
  if (chainId === ARBITRUM) {
    multiplier = 65000;
  }

  // multiplier for Avalanche is just the average gas usage
  if (chainId === MAINNET) {
    multiplier = 700000;
  }

  let finalExecutionFee = minExecutionFee;

  if (gasPrice && minExecutionFee) {
    const estimatedExecutionFee = gasPrice.mul(multiplier);
    if (estimatedExecutionFee.gt(minExecutionFee)) {
      finalExecutionFee = estimatedExecutionFee;
    }
  }

  const finalExecutionFeeUSD = getUsd(finalExecutionFee, nativeTokenAddress, false, infoTokens);
  const isFeeHigh = finalExecutionFeeUSD?.gt(expandDecimals(getHighExecutionFee(chainId), USD_DECIMALS));
  const errorMessage =
    isFeeHigh &&
    `The network cost to send transactions is high at the moment, please check the "Execution Fee" value before proceeding.`;

  return {
    minExecutionFee: finalExecutionFee,
    minExecutionFeeUSD: finalExecutionFeeUSD,
    minExecutionFeeErrorMessage: errorMessage,
  };
}

export function useStakedGmxSupply(library, active) {
  const gmxAddressEth = getContract(MAINNET, "GMX");
  const stakedGmxTrackerAddressEth = getContract(MAINNET, "StakedGmxTracker");

  const { data: ethData, mutate: ethMutate } = useSWR(
    [`StakeV2:stakedGmxSupply:${active}`, MAINNET, gmxAddressEth, "balanceOf", stakedGmxTrackerAddressEth],
    {
      fetcher: contractFetcher(undefined, Token),
    }
  );

  let data;
  if (ethData) {
    data = ethData;
  }

  const mutate = () => {
    ethMutate();
    // avaxMutate();
  };

  return { data, mutate };
}

export function useHasOutdatedUi() {
  const url = getServerUrl(ARBITRUM, "/ui_version");
  const { data, mutate } = useSWR([url], {
    fetcher: (...args) => fetch(...args).then((res) => res.text()),
  });

  let hasOutdatedUi = false;

  if (data && parseFloat(data) > parseFloat(UI_VERSION)) {
    hasOutdatedUi = true;
  }

  return { data: hasOutdatedUi, mutate };
}

export function useGmxPrice(chainId, libraries, active) {
  const arbitrumLibrary = libraries && libraries.arbitrum ? libraries.arbitrum : undefined;
  // const { data: gmxPriceFromArbitrum, mutate: mutateFromArbitrum } = useGmxPriceFromArbitrum(arbitrumLibrary, active);
  const { data: gmxPriceFromEthereum, mutate: mutateFromEthereum } = useGmxPriceFromEthereum();

  const gmxPrice = gmxPriceFromEthereum;
  const mutate = useCallback(() => {
    mutateFromEthereum();
  }, [mutateFromEthereum]);

  return {
    gmxPrice,
    gmxPriceFromEthereum,
    mutate,
  };
}

function useGmxPriceFromEthereum() {
  const poolAddress = getContract(MAINNET, "TraderJoeGmxAvaxPool");

  const { data, mutate: updateReserves } = useSWR(["TraderJoeGmxAvaxReserves", MAINNET, poolAddress, "getReserves"], {
    fetcher: contractFetcher(undefined, UniswapV2),
  });
  const { _reserve0: gmxReserve, _reserve1: ethReserve } = data || {};

  const vaultAddress = getContract(MAINNET, "Vault");
  const ethAddress = getTokenBySymbol(MAINNET, "WETH").address;
  const { data: ethPrice, mutate: updateEthPrice } = useSWR(
    [`StakeV2:avaxPrice`, MAINNET, vaultAddress, "getMinPrice", ethAddress],
    {
      fetcher: contractFetcher(undefined, Vault),
    }
  );

  const PRECISION = bigNumberify(10).pow(30);
  let gmxPrice;
  if (ethReserve && gmxReserve && ethPrice) {
    gmxPrice = ethReserve.mul(PRECISION).div(gmxReserve).mul(ethPrice).div(PRECISION);
  }

  const mutate = useCallback(() => {
    updateReserves(undefined, true);
    updateEthPrice(undefined, true);
  }, [updateReserves, updateEthPrice]);

  return { data: gmxPrice, mutate };
}


// use only the supply endpoint on arbitrum, it includes the supply on avalanche
export function useTotalGmxSupply() {
  const { data: gmxSupply } = useSWR([`StakeV2:totalSupply:${MAINNET}`, MAINNET, getContract(MAINNET, "GMX"), "totalSupply"], {
    fetcher: contractFetcher(undefined, Token),
  });

  return {
    total: gmxSupply,
    mutate: undefined,
  };
}

export function useTotalGmxStaked() {
  // console.log("---shark useTotalGmxStaked");
  const stakedGmxTrackerAddressEth = getContract(MAINNET, "StakedGmxTracker");

  let totalStakedGmx = useRef(bigNumberify(0));
  

  const { data: stakedGmxSupplyEth, mutate: updateStakedGmxSupplyEth } = useSWR(
    [
      `StakeV2:stakedGmxSupply:${MAINNET}`,
      MAINNET,
      getContract(MAINNET, "GMX"),
      "balanceOf",
      stakedGmxTrackerAddressEth,
    ],
    {
      fetcher: contractFetcher(undefined, Token),
    }
  );

  const mutate = useCallback(() => {
    updateStakedGmxSupplyEth();
  }, [ updateStakedGmxSupplyEth]);

  if (stakedGmxSupplyEth) {
    let total = bigNumberify(stakedGmxSupplyEth);
    totalStakedGmx.current = total;
  }

  return {
    ethereum: stakedGmxSupplyEth,
    total: totalStakedGmx.current,
    mutate,
  };
}

export function useTotalGmxInLiquidity() {
  let poolAddressEth = getContract(MAINNET, "TraderJoeGmxAvaxPool");
  let totalGMX = useRef(bigNumberify(0));

  const { data: gmxInLiquidityOnEth, mutate: mutateGMXInLiquidityOnEth } = useSWR(
    [`StakeV2:gmxInLiquidity:${MAINNET}`, MAINNET, getContract(MAINNET, "GMX"), "balanceOf", poolAddressEth],
    {
      fetcher: contractFetcher(undefined, Token),
    }
  );
  const mutate = useCallback(() => {
    mutateGMXInLiquidityOnEth();
  }, [mutateGMXInLiquidityOnEth]);

  if (gmxInLiquidityOnEth) {
    let total = bigNumberify(gmxInLiquidityOnEth);
    totalGMX.current = total;
  }
  return {
    ethereum: gmxInLiquidityOnEth,
    total: totalGMX.current,
    mutate,
  };
}



function useGmxPriceFromArbitrum(library, active) {
  const poolAddress = getContract(ARBITRUM, "UniswapGmxEthPool");
  const { data: uniPoolSlot0, mutate: updateUniPoolSlot0 } = useSWR(
    [`StakeV2:uniPoolSlot0:${active}`, ARBITRUM, poolAddress, "slot0"],
    {
      fetcher: contractFetcher(library, UniPool),
    }
  );

  const vaultAddress = getContract(ARBITRUM, "Vault");
  const ethAddress = getTokenBySymbol(ARBITRUM, "WETH").address;
  const { data: ethPrice, mutate: updateEthPrice } = useSWR(
    [`StakeV2:ethPrice:${active}`, ARBITRUM, vaultAddress, "getMinPrice", ethAddress],
    {
      fetcher: contractFetcher(library, Vault),
    }
  );

  const gmxPrice = useMemo(() => {
    if (uniPoolSlot0 && ethPrice) {
      const tokenA = new UniToken(ARBITRUM, ethAddress, 18, "SYMBOL", "NAME");

      const gmxAddress = getContract(ARBITRUM, "GMX");
      const tokenB = new UniToken(ARBITRUM, gmxAddress, 18, "SYMBOL", "NAME");

      const pool = new Pool(
        tokenA, // tokenA
        tokenB, // tokenB
        10000, // fee
        uniPoolSlot0.sqrtPriceX96, // sqrtRatioX96
        1, // liquidity
        uniPoolSlot0.tick, // tickCurrent
        []
      );

      const poolTokenPrice = pool.priceOf(tokenB).toSignificant(6);
      const poolTokenPriceAmount = parseValue(poolTokenPrice, 18);
      return poolTokenPriceAmount.mul(ethPrice).div(expandDecimals(1, 18));
    }
  }, [ethPrice, uniPoolSlot0, ethAddress]);

  const mutate = useCallback(() => {
    updateUniPoolSlot0(undefined, true);
    updateEthPrice(undefined, true);
  }, [updateEthPrice, updateUniPoolSlot0]);

  return { data: gmxPrice, mutate };
}

export async function approvePlugin(
  chainId,
  pluginAddress,
  { library, pendingTxns, setPendingTxns, sentMsg, failMsg }
) {
  const routerAddress = getContract(chainId, "Router");
  const contract = new ethers.Contract(routerAddress, Router.abi, library.getSigner());
  return callContract(chainId, contract, "approvePlugin", [pluginAddress], {
    sentMsg,
    failMsg,
    pendingTxns,
    setPendingTxns,
  });
}

export async function createSwapOrder(
  chainId,
  library,
  path,
  amountIn,
  minOut,
  triggerRatio,
  nativeTokenAddress,
  opts = {}
) {
  const executionFee = getConstant(chainId, "SWAP_ORDER_EXECUTION_GAS_FEE");
  const triggerAboveThreshold = false;
  let shouldWrap = false;
  let shouldUnwrap = false;
  opts.value = executionFee;

  if (path[0] === AddressZero) {
    shouldWrap = true;
    opts.value = opts.value.add(amountIn);
  }
  if (path[path.length - 1] === AddressZero) {
    shouldUnwrap = true;
  }
  path = replaceNativeTokenAddress(path, nativeTokenAddress);

  const params = [path, amountIn, minOut, triggerRatio, triggerAboveThreshold, executionFee, shouldWrap, shouldUnwrap];

  const orderBookAddress = getContract(chainId, "OrderBook");
  const contract = new ethers.Contract(orderBookAddress, OrderBook.abi, library.getSigner());

  return callContract(chainId, contract, "createSwapOrder", params, opts);
}

export async function createIncreaseOrder(
  chainId,
  library,
  nativeTokenAddress,
  path,
  amountIn,
  indexTokenAddress,
  minOut,
  sizeDelta,
  collateralTokenAddress,
  isLong,
  triggerPrice,
  opts = {}
) {
  invariant(!isLong || indexTokenAddress === collateralTokenAddress, "invalid token addresses");
  invariant(indexTokenAddress !== AddressZero, "indexToken is 0");
  invariant(collateralTokenAddress !== AddressZero, "collateralToken is 0");

  const fromETH = path[0] === AddressZero;

  path = replaceNativeTokenAddress(path, nativeTokenAddress);
  const shouldWrap = fromETH;
  const triggerAboveThreshold = !isLong;
  const executionFee = getConstant(chainId, "INCREASE_ORDER_EXECUTION_GAS_FEE");

  const params = [
    path,
    amountIn,
    indexTokenAddress,
    minOut,
    sizeDelta,
    collateralTokenAddress,
    isLong,
    triggerPrice,
    triggerAboveThreshold,
    executionFee,
    shouldWrap,
  ];

  if (!opts.value) {
    opts.value = fromETH ? amountIn.add(executionFee) : executionFee;
  }

  const orderBookAddress = getContract(chainId, "OrderBook");
  const contract = new ethers.Contract(orderBookAddress, OrderBook.abi, library.getSigner());

  return callContract(chainId, contract, "createIncreaseOrder", params, opts);
}

export async function createDecreaseOrder(
  chainId,
  library,
  indexTokenAddress,
  sizeDelta,
  collateralTokenAddress,
  collateralDelta,
  isLong,
  triggerPrice,
  triggerAboveThreshold,
  opts = {}
) {
  invariant(!isLong || indexTokenAddress === collateralTokenAddress, "invalid token addresses");
  invariant(indexTokenAddress !== AddressZero, "indexToken is 0");
  invariant(collateralTokenAddress !== AddressZero, "collateralToken is 0");

  const executionFee = getConstant(chainId, "DECREASE_ORDER_EXECUTION_GAS_FEE");

  const params = [
    indexTokenAddress,
    sizeDelta,
    collateralTokenAddress,
    collateralDelta,
    isLong,
    triggerPrice,
    triggerAboveThreshold,
  ];
  opts.value = executionFee;
  const orderBookAddress = getContract(chainId, "OrderBook");
  const contract = new ethers.Contract(orderBookAddress, OrderBook.abi, library.getSigner());

  return callContract(chainId, contract, "createDecreaseOrder", params, opts);
}

export async function cancelSwapOrder(chainId, library, index, opts) {
  const params = [index];
  const method = "cancelSwapOrder";
  const orderBookAddress = getContract(chainId, "OrderBook");
  const contract = new ethers.Contract(orderBookAddress, OrderBook.abi, library.getSigner());

  return callContract(chainId, contract, method, params, opts);
}

export async function cancelDecreaseOrder(chainId, library, index, opts) {
  const params = [index];
  const method = "cancelDecreaseOrder";
  const orderBookAddress = getContract(chainId, "OrderBook");
  const contract = new ethers.Contract(orderBookAddress, OrderBook.abi, library.getSigner());

  return callContract(chainId, contract, method, params, opts);
}

export async function cancelIncreaseOrder(chainId, library, index, opts) {
  const params = [index];
  const method = "cancelIncreaseOrder";
  const orderBookAddress = getContract(chainId, "OrderBook");
  const contract = new ethers.Contract(orderBookAddress, OrderBook.abi, library.getSigner());

  return callContract(chainId, contract, method, params, opts);
}

export function handleCancelOrder(chainId, library, order, opts) {
  let func;
  if (order.type === SWAP) {
    func = cancelSwapOrder;
  } else if (order.type === INCREASE) {
    func = cancelIncreaseOrder;
  } else if (order.type === DECREASE) {
    func = cancelDecreaseOrder;
  }

  return func(chainId, library, order.index, {
    successMsg: t`Order cancelled.`,
    failMsg: t`Cancel failed.`,
    sentMsg: t`Cancel submitted.`,
    pendingTxns: opts.pendingTxns,
    setPendingTxns: opts.setPendingTxns,
  });
}

export async function cancelMultipleOrders(chainId, library, allIndexes = [], opts) {
  const ordersWithTypes = groupBy(allIndexes, (v) => v.split("-")[0]);
  function getIndexes(key) {
    if (!ordersWithTypes[key]) return;
    return ordersWithTypes[key].map((d) => d.split("-")[1]);
  }
  // params order => swap, increase, decrease
  const params = ["Swap", "Increase", "Decrease"].map((key) => getIndexes(key) || []);
  const method = "cancelMultiple";
  const orderBookAddress = getContract(chainId, "OrderBook");
  const contract = new ethers.Contract(orderBookAddress, OrderBook.abi, library.getSigner());
  return callContract(chainId, contract, method, params, opts);
}

export async function updateDecreaseOrder(
  chainId,
  library,
  index,
  collateralDelta,
  sizeDelta,
  triggerPrice,
  triggerAboveThreshold,
  opts
) {
  const params = [index, collateralDelta, sizeDelta, triggerPrice, triggerAboveThreshold];
  const method = "updateDecreaseOrder";
  const orderBookAddress = getContract(chainId, "OrderBook");
  const contract = new ethers.Contract(orderBookAddress, OrderBook.abi, library.getSigner());

  return callContract(chainId, contract, method, params, opts);
}

export async function updateIncreaseOrder(
  chainId,
  library,
  index,
  sizeDelta,
  triggerPrice,
  triggerAboveThreshold,
  opts
) {
  const params = [index, sizeDelta, triggerPrice, triggerAboveThreshold];
  const method = "updateIncreaseOrder";
  const orderBookAddress = getContract(chainId, "OrderBook");
  const contract = new ethers.Contract(orderBookAddress, OrderBook.abi, library.getSigner());

  return callContract(chainId, contract, method, params, opts);
}

export async function updateSwapOrder(chainId, library, index, minOut, triggerRatio, triggerAboveThreshold, opts) {
  const params = [index, minOut, triggerRatio, triggerAboveThreshold];
  const method = "updateSwapOrder";
  const orderBookAddress = getContract(chainId, "OrderBook");
  const contract = new ethers.Contract(orderBookAddress, OrderBook.abi, library.getSigner());

  return callContract(chainId, contract, method, params, opts);
}

export async function _executeOrder(chainId, library, method, account, index, feeReceiver, opts) {
  const params = [account, index, feeReceiver];
  const positionManagerAddress = getContract(chainId, "PositionManager");
  const contract = new ethers.Contract(positionManagerAddress, PositionManager.abi, library.getSigner());
  return callContract(chainId, contract, method, params, opts);
}

export function executeSwapOrder(chainId, library, account, index, feeReceiver, opts) {
  return _executeOrder(chainId, library, "executeSwapOrder", account, index, feeReceiver, opts);
}

export function executeIncreaseOrder(chainId, library, account, index, feeReceiver, opts) {
  return _executeOrder(chainId, library, "executeIncreaseOrder", account, index, feeReceiver, opts);
}

export function executeDecreaseOrder(chainId, library, account, index, feeReceiver, opts) {
  return _executeOrder(chainId, library, "executeDecreaseOrder", account, index, feeReceiver, opts);
}

export function useTradersData({ from = FIRST_DATE_TS, to = NOW_TS } = {}) {
  
  const [closedPositionsData, setRes] = useState();
  const query = gql(`{
    tradingStats(
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: { period: "daily", timestamp_gte: ${from}, timestamp_lte: ${to} }
      subgraphError: allow
    ) {
      timestamp
      profit
      loss
      profitCumulative
      lossCumulative
      longOpenInterest
      shortOpenInterest
    }
  }`);
  console.log("---shark useTradersData");
  useEffect(() => {
    const graphClient = getGmxGraphClient(MAINNET);
    if (!graphClient) {
      return;
    }
    graphClient.query({ query }).then(setRes).catch(console.warn);
  }, [setRes, query]);

  const [,,feesData] = useFeesData({ from, to })
  const marginFeesByTs = useMemo(() => {
    if (!feesData) {
      return {}
    }

    let feesCumulative = 0
    return feesData.reduce((memo, { timestamp, margin: fees}) => {
      feesCumulative += fees
      memo[timestamp] = {
        fees,
        feesCumulative
      }
      return memo
    }, {})
  }, [feesData])

  let ret = null
  let currentPnlCumulative = 0;
  let currentProfitCumulative = 0;
  let currentLossCumulative = 0;
  const data = closedPositionsData ? sortBy(closedPositionsData.tradingStats, i => i.timestamp).map(dataItem => {
    const longOpenInterest = dataItem.longOpenInterest / 1e30
    const shortOpenInterest = dataItem.shortOpenInterest / 1e30
    const openInterest = longOpenInterest + shortOpenInterest

    // const fees = (marginFeesByTs[dataItem.timestamp]?.fees || 0)
    // const feesCumulative = (marginFeesByTs[dataItem.timestamp]?.feesCumulative || 0)

    const profit = dataItem.profit / 1e30
    const loss = dataItem.loss / 1e30
    const profitCumulative = dataItem.profitCumulative / 1e30
    const lossCumulative = dataItem.lossCumulative / 1e30
    const pnlCumulative = profitCumulative - lossCumulative
    const pnl = profit - loss
    currentProfitCumulative += profit
    currentLossCumulative -= loss
    currentPnlCumulative += pnl
    return {
      longOpenInterest,
      shortOpenInterest,
      openInterest,
      profit,
      loss: -loss,
      profitCumulative,
      lossCumulative: -lossCumulative,
      pnl,
      pnlCumulative,
      timestamp: dataItem.timestamp,
      currentPnlCumulative,
      currentLossCumulative,
      currentProfitCumulative
    }
  }) : null

  if (data && data.length) {
    const maxProfit = maxBy(data, item => item.profit).profit
    const maxLoss = minBy(data, item => item.loss).loss
    const maxProfitLoss = Math.max(maxProfit, -maxLoss)

    const maxPnl = maxBy(data, item => item.pnl).pnl
    const minPnl = minBy(data, item => item.pnl).pnl
    const maxCurrentCumulativePnl = maxBy(data, item => item.currentPnlCumulative).currentPnlCumulative
    const minCurrentCumulativePnl = minBy(data, item => item.currentPnlCumulative).currentPnlCumulative

    const currentProfitCumulative = data[data.length - 1].currentProfitCumulative
    const currentLossCumulative = data[data.length - 1].currentLossCumulative
    const stats = {
      maxProfit,
      maxLoss,
      maxProfitLoss,
      currentProfitCumulative,
      currentLossCumulative,
      maxCurrentCumulativeProfitLoss: Math.max(currentProfitCumulative, -currentLossCumulative),

      maxAbsPnl: Math.max(
        Math.abs(maxPnl),
        Math.abs(minPnl),
      ),
      maxAbsCumulativePnl: Math.max(
        Math.abs(maxCurrentCumulativePnl),
        Math.abs(minCurrentCumulativePnl)
      ),
      
    }

    ret = {
      data,
      stats
    }
  }

  const [openInterest, openInterestDelta] = useMemo(() => {
    if (!ret) {
      return []
    }
    const total = ret.data[ret.data.length - 1]?.openInterest
    const delta = total - ret.data[ret.data.length - 2]?.openInterest
    return [total, delta]
  }, [ret])

  return [openInterest, openInterestDelta]
}

export function useFeesData({ from = FIRST_DATE_TS, to = NOW_TS } = {}) {
  const PROPS = 'margin liquidation swap mint burn'.split(' ')
  const query = gql(`{
    feeStats(
      first: 1000
      orderBy: id
      orderDirection: desc
      where: { period: daily, id_gte: ${from}, id_lte: ${to} }
      subgraphError: allow
    ) {
      id
      margin
      marginAndLiquidation
      swap
      mint
      burn
      timestamp
    }
  }`);
  // let [feesData, loading, error] = useGraph(feesQuery, {
  //   chainName
  // })
  const [feesData, setRes] = useState();

  useEffect(() => {
    const graphClient = getGmxGraphClient(MAINNET);
    if (!graphClient) {
      return;
    }
    graphClient.query({ query }).then(setRes).catch(console.warn);
  }, [setRes, query]);

  const feesChartData = useMemo(() => {
    if (!feesData) {
      return null
    }

    // let chartData = sortBy(feesData.feeStats, 'id').map(item => {
    let chartData = sortBy(feesData.data.feeStats, 'id').map(item => {

      const ret = { timestamp: item.timestamp || item.id };

      PROPS.forEach(prop => {
        if (item[prop]) {
          ret[prop] = item[prop] / 1e30
        }
      })

      ret.liquidation = item.marginAndLiquidation / 1e30 - item.margin / 1e30
      ret.all = PROPS.reduce((memo, prop) => memo + ret[prop], 0)
      return ret
    })

    let cumulative = 0
    const cumulativeByTs = {}
    return chain(chartData)
      .groupBy(item => item.timestamp)
      .map((values, timestamp) => {
        const all = sumBy(values, 'all')
        cumulative += all

        let movingAverageAll
        const movingAverageTs = timestamp - MOVING_AVERAGE_PERIOD
        if (movingAverageTs in cumulativeByTs) {
          movingAverageAll = (cumulative - cumulativeByTs[movingAverageTs]) / MOVING_AVERAGE_DAYS
        }

        const ret = {
          timestamp: Number(timestamp),
          all,
          cumulative,
          movingAverageAll
        }
        PROPS.forEach(prop => {
           ret[prop] = sumBy(values, prop)
        })
        cumulativeByTs[timestamp] = cumulative
        return ret
      })
      .value()
      .filter(item => item.timestamp >= from)
  }, [feesData])

  const [totalFees, totalFeesDelta] = useMemo(() => {
    if (!feesChartData) {
      return []
    }
    const total = feesChartData[feesChartData.length - 1]?.cumulative
    const delta = total - feesChartData[feesChartData.length - 2]?.cumulative
    return [total, delta]
  }, [feesChartData])

  return [totalFees, totalFeesDelta, feesChartData];
}

export function useVolumeData({ from = FIRST_DATE_TS, to = NOW_TS } = {}) {
	const PROPS = 'margin liquidation swap mint burn'.split(' ')
  // const timestampProp = chainName === "arbitrum" ? "id" : "timestamp"
  const timestampProp = "timestamp"
  const [graphData, setRes] = useState();
  const query = gql`{
    volumeStats(
      first: 1000,
      orderBy: ${timestampProp},
      orderDirection: desc
      where: { period: daily, ${timestampProp}_gte: ${from}, ${timestampProp}_lte: ${to} }
      subgraphError: allow
    ) {
      ${timestampProp}
      ${PROPS.join('\n')}
    }
  }`
  // const [graphData, loading, error] = useGraph(query, { chainName })

  useEffect(() => {
    const graphClient = getGmxGraphClient(MAINNET);
    if (!graphClient) {
      return;
    }
    graphClient.query({ query }).then(setRes).catch(console.warn);
  }, [setRes, query]);
  console.log (graphData, ">>>>>>>>>>>>>><<<<<<<<<<<<<")

  const data = useMemo(() => {
    if (!graphData) {
      return null
    }

    let ret =  sortBy(graphData.data.volumeStats, timestampProp).map(item => {
      const ret = { timestamp: item[timestampProp] };
      let all = 0;
      PROPS.forEach(prop => {
        ret[prop] = item[prop] / 1e30
        all += ret[prop]
      })
      ret.all = all
      return ret
    })

    let cumulative = 0
    const cumulativeByTs = {}
    return ret.map(item => {
      cumulative += item.all

      let movingAverageAll
      const movingAverageTs = item.timestamp - MOVING_AVERAGE_PERIOD
      if (movingAverageTs in cumulativeByTs) {
        movingAverageAll = (cumulative - cumulativeByTs[movingAverageTs]) / MOVING_AVERAGE_DAYS
      }

      return {
        movingAverageAll,
        cumulative,
        ...item
      }
    })
  }, [graphData])

  // return [data, loading, error]

  const [totalVolume, totalVolumeDelta] = useMemo(() => {
    if (!data) {
      return []
    }
    const total = data[data.length - 1]?.cumulative
    const delta = total - data[data.length - 2]?.cumulative
    return [total, delta]
  }, [data])

  return [totalVolume, totalVolumeDelta];
}

const numberFmt0 = Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
const numberFmt1 = Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 1 })
const numberFmt2 = Intl.NumberFormat('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 })
const currencyFmt0 = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })
const currencyFmt1 = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 1, maximumFractionDigits: 1 })
const currencyFmt2 = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })


function _getCurrencyFmt(value) {
  const absValue = Math.abs(value)
  if (absValue < 10) {
    return currencyFmt2
  } else if (absValue < 1000) {
    return currencyFmt1
  } else {
    return currencyFmt0
  }
}

function _getNumberFmt(value) {
  const absValue = Math.abs(value)
  if (absValue < 10) {
    return numberFmt2
  } else if (absValue < 1000) {
    return numberFmt1
  } else {
    return numberFmt0
  }
}


export const formatNumber = (value, opts = {}) => {
  const currency = !!opts.currency
  const compact = !!opts.compact

  if (currency && !compact) {
    return _getCurrencyFmt(value).format(value)
  }

  const display = compact ? compactNumber(value) : _getNumberFmt(value).format(value)
  if (currency) {
    return `$${display}`
  }
  return display
}

export const compactNumber = value => {
  const abs = Math.abs(value)
  if (abs >= 1e9) {
    return `${(value / 1e9).toFixed(abs < 1e10 ? 2 : 1)}B`
  }
  if (abs >= 1e6) {
    return `${(value / 1e6).toFixed(abs < 1e7 ? 2 : 1)}M`
  }
  if (abs >= 1e3) {
    return `${(value / 1e3).toFixed(abs < 1e4 ? 2 : 1)}K`
  }
  return `${value.toFixed(1)}`
}

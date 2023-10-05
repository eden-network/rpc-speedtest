// Take the RPC data and calculate the podium finishes of each
import { Result } from "../types";

// loop by comparing blockNumber and order across all
export const formatRpcRankings = (results: Result[]) => {
  if (!results.length) {
    return [];
  }

  const rpcData = results?.reduce(
    (rpcs, item) => {
      const { label, order, blockNumber } = item;
      const existingRpc = rpcs.find((group) => group.label === label);

      if (existingRpc) {
        if (order) {
          existingRpc.orders.push(order);
        }
        if (blockNumber) {
          existingRpc.blockNumbers.push(blockNumber);
        }
      } else {
        rpcs.push({
          label,
          orders: order ? [order] : [],
          blockNumbers: blockNumber ? [blockNumber] : [],
        });
      }

      return rpcs;
    },
    [] as {
      label: string;
      orders: number[];
      blockNumbers: number[];
    }[]
  );

  // how many loops are we on
  const loops = Math.max(
    ...rpcData.map(({ blockNumbers }) => blockNumbers.length)
  );

  // get the best blockNumber for each loop
  const bestBlockNumberByLoop = rpcData.reduce((acc, obj) => {
    obj.blockNumbers.forEach((blockNumber, index) => {
      if (!acc[index] || blockNumber < acc[index]) {
        acc[index] = blockNumber;
      }
    });
    return acc;
  }, [] as number[]);

  // Create array of each rpc's block order by loop and sort by that order
  const blockOrdersByLoop = Array.from({ length: loops }, (_, index) =>
    rpcData
      .map(({ orders, blockNumbers }) => {
        // only care about the order within the best block
        if (bestBlockNumberByLoop[index] === blockNumbers[index]) {
          return orders[index] || 0;
        }
        // they missed the block so the order is irrelevant; chuck it at the end
        return Infinity;
      })
      .sort((a, b) => a - b)
  );

  // add the ranking of each of the orders compared to the other RPCs accounting for best block
  const rankedRpcData = rpcData.map((rpc) => {
    const positionRankings = rpc.orders.map((order, i) => {
      // they were in the best block
      if (bestBlockNumberByLoop[i] === rpc.blockNumbers[i]) {
        // get the position of this rpc in the sorted rank order
        return blockOrdersByLoop[i].indexOf(order) + 1;
      }
      // too slow, make them last
      return rpcData.length;
    });

    function countPositions(numbers: number[]): { first: number; second: number; third: number } {
      let first = 0;
      let second = 0;
      let third = 0;

      for (const num of numbers) {
        if (num === 1) {
          first += 1;
        } else if (num === 2) {
          second += 1;
        } else if (num === 3) {
          third += 1;
        }
      }

      return { first, second, third };
    }

    const scoreboard = countPositions(positionRankings)

    return {
      ...rpc,
      rankings: positionRankings,
      first: scoreboard.first,
      second: scoreboard.second,
      third: scoreboard.third
    };
  });

  const sortedData = [...rankedRpcData].sort((a, b) => {
    for (let i = 1; i <= rankedRpcData[0].rankings.length; i++) {
      const aRank = a.rankings.filter((x) => x === i).length;
      const bRank = b.rankings.filter((x) => x === i).length;
      // get the highest count of best finishes
      if (aRank !== bRank) {
        return bRank - aRank;
      }
    }

    return 0;
  });

  return sortedData;
};

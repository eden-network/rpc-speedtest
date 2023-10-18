import { BigNumber, ethers } from "ethers";
import { parseUnits } from "ethers/lib/utils.js";
import { useEffect, useState } from "react";
const useFeeData = ({
  blockNumber,
  initialProvider
}: {
  blockNumber?: number;
  initialProvider: ethers.providers.JsonRpcProvider
}) => {
  const [feeData, setFeeData] = useState<ethers.providers.FeeData>();
  const [estimateGasData, setEstimateGasData] = useState<BigNumber>();

  ///update every block change
  ///push key to an object
  useEffect(() => {
    (async () => {
      const feeData = (await initialProvider.getFeeData());
      const estimateGas = await initialProvider.estimateGas({ to: ethers.constants.AddressZero as string, value: 0 });
      setFeeData(feeData);
      setEstimateGasData(estimateGas);
    })();
  }, [initialProvider, blockNumber]);

  const maxPriorityFeePerGas =
    feeData?.maxPriorityFeePerGas || parseUnits("1", "gwei");

  const lastBaseFeePerGas =
    feeData?.lastBaseFeePerGas || parseUnits("1", "gwei");

  //add transfer price + amount + buffer
  const gasPrice =
    lastBaseFeePerGas.add(maxPriorityFeePerGas);

  const estimateGas =
    estimateGasData || BigNumber.from(21000);

  return {
    maxPriorityFeePerGas,
    gasPrice,
    estimateGas,
    initialProvider
  };
};

export default useFeeData;

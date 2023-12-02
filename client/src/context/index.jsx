import React, { useContext, createContext } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { EditionMetadataWithOwnerOutputSchema } from "@thirdweb-dev/sdk";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xed962FcDB79cc92701baBA05a0A4114e672F63d6"
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
        args: [
          address, // owner
          form.title, // title
          form.description, // description
          form.target,
          new Date(form.deadline).getTime(), // deadline,
          form.banner,
        ],
      });

      console.log("success", data);
    } catch (error) {
      console.log("failure", error);
    }
  };

  const getCampaigns = async () => {
    const campaigns = await contract.call("fetchAllCampaigns");

    const mappedCampaigns = campaigns.map((_c, i) => ({
      id: i,
      creator: _c.creator,
      title: _c.title,
      description: _c.description,
      deadline: _c.deadline.toNumber(),
      target: ethers.utils.formatEther(_c.targetValue.toString()),
      banner: _c.banner,
      amountCollected: ethers.utils.formatEther(_c.totalAmountCollected),
    }));

    return mappedCampaigns;
  };

  const getMyCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const myCampaigns = allCampaigns.filter((c) => c.creator === address);
    return myCampaigns;
  };

  const donateToCampaign = async (id, amount) => {
    const data = await contract.call("contributeToCampaign", [id], {
      value: ethers.utils.parseEther(amount),
    });

    return data;
 
  };

  const getDonations = async (id) => {
    const donations = await contract.call("fetchDonators", [id]);

    const noOfDonations = donations[0].length;

    const _donations = [];

    for (let i = 0; i < noOfDonations; i++) {
      _donations.push({
        donator: donations[0][i],
        amountDonated: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }
    return _donations;
    
  };

  return (
    <Context.Provider
      value={{
        address,
        contract,
        connect,
        donateToCampaign,
        getCampaigns,
        getMyCampaigns,
        getDonations,
        createCampaign: publishCampaign,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCustomContext = () => useContext(Context);

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button, CountBox } from "../../components";
import { ethers } from "ethers";
import { useCustomContext } from "../../context";
import { calculateBarPercentage, noOfDaysRemaining } from "../../utils";
import { loader } from "../../assets";

const CampaignDetails = () => {
  const { state } = useLocation();
  const { address, getDonations, donateToCampaign, contract } =
    useCustomContext();

  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonations] = useState([]);

  const noOfDaysLeft = noOfDaysRemaining(state.deadline);

  const fetchCampaignDonators = async () => {
    const data = await getDonations(state.id);
    console.log(data);
    setDonations(data);
  };

  const handleDonate = async () => {
    setLoading(true);

    const d = await donateToCampaign(state.id, amount);
    setLoading(false);
  };

  useEffect(() => {
    if (contract) {
      fetchCampaignDonators();
    }
  }, [contract, address]);

  console.log(state)

  return (
    <div>
      {loading && (
        <img
          className="w-[80px] h-[80px] object-contain"
          src={loader}
          alt="loader"
        />
      )}
      <div className="w-full flex flex-col md:flex-row mt-10 gap-[24px]">
        <div className="flex-1 flex-col">
          <img
            className="w-full h-[410px] object-cover rounded-xl"
            src={state.banner}
            alt={state.title}
          />
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2 ">
            <div
              className={`absolute h-full bg-[#4acd8d] w-[${calculateBarPercentage(
                state.target,
                state.amountCollected
              )}%] max-w-full`}
            ></div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-[30px] w-full md:w-[150px]">
          <CountBox title="Days Left" value={noOfDaysLeft} />
          <CountBox
            title={`Raised of ${state.target}`}
            value={state.amountCollected}
          />
          <CountBox title="No. of Donators" value={donators?.length} />
        </div>
      </div>

      <div className="mt-[60px] flex flex-col lg:flex-row gap-5">
        <div className="flex flex-col flex-[2] gap-[40px]">
          <div>
            <h4 className="font-semibold text-[18px] p-3 uppercase">Creator</h4>
            <div className="mt-[20px] flex items-center flex-wrap gap-[14px]">
              <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                CH
              </div>
              <div>
                <h4 className="font-semibold text-[14px] break-all">
                  {state.creator}
                </h4>
                <p className="mt-[4px] text-[12px] text-[#808191]">
                  10 campaigns
                </p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-[18px] uppercase">Story</h4>
            <p className="mt-[20px] text-[16px] text-[#808191] leading-[26px] text-justify">
              {state.description}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-[18px] uppercase">Donators</h4>
            <div className="mt-[20px] flex flex-col gap-4 text-[#b2b3bd]">
              {donators.length > 0 ? (
                donators?.map((d, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <p>{i + 1}. {d.donator}</p>
                    <p>{d.amountDonated} ETH</p>
                  </div>
                ))
              ) : (
                <p className="text-[16px] text-[#808191] leading-[26px] text-justify">
                  No donators yet, be the first one.
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-[18px] uppercase">Donate</h4>
          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-mmedium text-[20px] leading-[30px] text-center text-[#808191]">
              Donate to the campaign
            </p>
            <input
              className="mt-[30px] mb-[20px] w-full py-[10px] px-[15px] sm:px-[20px] outline-none border border-[#3a3a43] bg-transparent text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
              type="number"
              placeholder="0.01 ETH"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Button
              type="button"
              title="Donate"
              className="bg-[#8c6dfd]"
              onClick={handleDonate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;

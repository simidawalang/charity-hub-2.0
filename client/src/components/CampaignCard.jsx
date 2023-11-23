import React from "react";
import { useNavigate } from "react-router-dom";
import { noOfDaysRemaining } from "../utils";

const CampaignCard = ({
  id,
  creator,
  title,
  deadline,
  banner,
  description,
  amountCollected,
  target,
}) => {
  const navigate = useNavigate();

  const remainingDays = noOfDaysRemaining(deadline);

  const handleNavigate = () => {
    navigate(`/campaign-details/${title}`, {
      state: { id, title, creator, deadline, description, banner, amountCollected, target },
    });
  };
  return (
    <div
      className="bg-[#1c1c24] w-full w-[280px] rounded-[16px] cursor-pointer relative hover:translate-y-[-10px] duration-150 ease-in-out"
      onClick={handleNavigate}
    >
      <img
        className="w-full h-[155px] rounded-[16px] object-cover"
        src={banner}
        alt={title}
      />
      <div className="p-4">
        <h2 className="font-semibold text-[18px]">{title}</h2>
        <div className="h-[32px]">
          <p className="text-[12px] text-[#808191] line-clamp-2">
            {description}
          </p>
        </div>
        <div className="flex justify-between text-[#808191] mt-3">
          <div className="">
            <span className="block mb-1 text-[12px]">
              <span className="text-gray-300">{amountCollected} </span>ETH
              raised
            </span>
            <p className="text-[10px]">
              <span className="text-gray-300">{target}</span> ETH target
            </p>
          </div>
          <div className="text-right">
            <span className="block mb-1 text-[12px]">
              <span className="text-gray-300 block">{remainingDays} </span>days
              left
            </span>
          </div>
        </div>
        <p className="truncate text-[12px] mt-3">
          by: <span>{creator}</span>
        </p>
      </div>
    </div>
  );
};

export default CampaignCard;

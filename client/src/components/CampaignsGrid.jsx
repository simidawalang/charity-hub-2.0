import React from "react";
import { useNavigate } from "react-router-dom";
import { loader } from "../assets";
import CampaignCard from "./CampaignCard";

const CampaignsGrid = ({ title, loading, campaigns }) => {
  return (
    <div>
      <h1 className="text-[20px] font-semibold">
        {title} ({campaigns.length})
      </h1>
      <div className="mt-[20px] flex flex-wrap">
        {loading && (
          <img
            className="w-[80px] h-[80px] objext-contain"
            src={loader}
            alt="loader"
          />
        )}
        {!loading && campaigns.length === 0 && (
          <p className="font-semibold text-[#818183]">No campaigns created</p>
        )}

        {!loading &&
          campaigns.length !== 0 &&
          campaigns.map((c) => <CampaignCard id={c.id} {...c} />)}
      </div>
    </div>
  );
};

export default CampaignsGrid;

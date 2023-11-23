import React from "react";
import { loader } from "../assets";
import CampaignCard from "./CampaignCard";

const CampaignsGrid = ({ title, loading, campaigns }) => {
  return (
    <div>
      <h1 className="text-[20px] font-semibold">
        {title} ({campaigns.length})
      </h1>
      <div className="mt-[20px] flex flex-wrap relative gap-6">
        {loading && (
          <img
            className="w-[80px] h-[80px] object-contain"
            src={loader}
            alt="loader"
          />
        )}
        {!loading && campaigns.length === 0 && (
          <p className="font-semibold text-[#818183]">No campaigns created</p>
        )}

        {!loading &&
          campaigns.length !== 0 &&
          campaigns.map((c) => <CampaignCard key={c.id} {...c} />)}
      </div>
    </div>
  );
};

export default CampaignsGrid;

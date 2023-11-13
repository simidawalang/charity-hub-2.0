import React, { useEffect, useState } from "react";
import { useCustomContext } from "../context";
import { CampaignsGrid } from "../components";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getCampaigns } = useCustomContext();

  const fetchCampaigns = async () => {
    setLoading(true);
    const _campaigns = await getCampaigns();
    setCampaigns(_campaigns);
    setLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <>
      <CampaignsGrid
        title="All Campaigns"
        loading={loading}
        campaigns={campaigns}
      />
    </>
  );
};

export default Home;

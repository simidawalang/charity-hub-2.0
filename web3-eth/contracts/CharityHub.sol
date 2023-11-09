// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CharityHub {
    struct Campaign {
        string title;
        string description;
        address creator;
        address[] contributors;
        uint256[] contributions;
        uint256 targetValue;
        uint256 deadline;
        uint256 totalAmountCollected;
        string banner;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public noOfCampaigns = 0;

    function createCampaign(
        address _creator,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _banner
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[noOfCampaigns];

        require(
            campaign.deadline < block.timestamp,
            "The deadline should be a time in the future."
        );

        campaign.creator = _creator;
        campaign.title = _title;
        campaign.description = _description;
        campaign.targetValue = _target;
        campaign.deadline = _deadline;
        campaign.banner = _banner;
        campaign.totalAmountCollected = 0; // no contributions when the campaign is initially launched

        noOfCampaigns++;

        return noOfCampaigns - 1; // This will serve as the campaign ID;
    }

    function contributeToCampaign(uint _campaignId) public payable {
        uint amount = msg.value;

        Campaign storage campaign = campaigns[_campaignId];

        campaign.contributors.push(msg.sender);
        campaign.contributions.push(amount);

        (bool sent, ) = payable(campaign.creator).call{value: amount}("");
        // pay to the campaign creator

        if (sent) {
            campaign.totalAmountCollected += amount;
        }
    }

    function fetchDonators(
        uint _id
    ) public view returns (address[] memory, uint[] memory) {
        return (campaigns[_id].contributors, campaigns[_id].contributions);
    }

    function fetchAllCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](noOfCampaigns);

        for (uint i = 0; i < noOfCampaigns; i++) {
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }

        return allCampaigns;
    }

    constructor() {}
}

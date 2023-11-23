import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { money } from "../../assets";
import { Button, FormField } from "../../components";
import { checkIfImage } from "../../utils";
import { useCustomContext } from "../../context";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    banner: "",
  });

  const { createCampaign } = useCustomContext();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(formData.banner, async (doesExist) => {
      if (doesExist) {
        setLoading(true);
        await createCampaign({
          ...formData,
          target: ethers.utils.parseUnits(formData.target, 18),
        });
        setLoading(false);
        navigate("/");
      } else {
        alert("Provide a valid image url");
        setFormData((prev) => {
          return { ...prev, banner: "" };
        });
      }
    });
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col p-4 sm:p-10">
      {loading && "Loading..."}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-bold sm:text-[22px] leading-[36px] ">
          Start a Campaign
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full mt-[60px] flex flex-col gap-[30px]"
      >
        <div className="grid sm:grid-cols-2 gap-[40px]">
          <FormField
            name="name"
            label="Your Name *"
            placeholder="John Doe"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <FormField
            name="title"
            label="Campaign Title *"
            placeholder="Your campaign title"
            required
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <FormField
          name="description"
          label="Campaign Description"
          placeholder="Your campaign description. Write a compelling story."
          required
          value={formData.description}
          onChange={handleChange}
          isTextarea
        />
        <div className="grid md:grid-cols-3 gap-[40px]">
          <FormField
            type="number"
            name="target"
            label="Goal"
            placeholder="ETH 1.0"
            required
            value={formData.target}
            onChange={handleChange}
          />
          <FormField
            type="date"
            name="deadline"
            label="Deadline *"
            placeholder="Campaign title"
            required
            value={formData.deadline}
            onChange={handleChange}
          />
          <FormField
            type="url"
            name="banner"
            label="Campaign Banner *"
            placeholder="Place image URL of the campaign"
            value={formData.banner}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-center">
          <Button
            type="submit"
            className="bg-[#1dc071] w-full max-w-[300px]"
            title="Create"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;

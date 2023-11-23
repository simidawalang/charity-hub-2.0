import React from "react";

const CountBox = ({ title, value }) => {
  return (
    <div className=" w-[150px]">
      <h4 className="font-bold text-[30px] p-3 bg-[#1c1c24] text-center truncate rounded-t-[10px] w-full">
        {value}
      </h4>
      <p className="text-[#808191] bg-[#28282e] px-3 py-2 w-full  text-center truncate rounded-b-[10px]">{title}</p>
    </div>
  );
};

export default CountBox;

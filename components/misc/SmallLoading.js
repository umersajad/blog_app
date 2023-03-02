import React from "react";

const Loading = ({ text }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
      <span className="block mt-[-33px] font-heading text-[1.5rem] text-slate-600 select-none">
        {text}
      </span>
    </div>
  );
};

export default Loading;

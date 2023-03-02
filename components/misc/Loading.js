import React from "react";

const Loading = ({ text }) => (
  <div className="flex flex-col items-center">
    <div className="lds-roller">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
    <span className="block mt-3 font-heading text-[1.6875rem] text-slate-600 select-none font-Quicksand">
      {text}
    </span>
  </div>
);

export default Loading;

import React from "react";
import "./loading.scss";

const Loading = () => {
  return (
    <div className="loadingScreen h-full w-full">
      <iframe
        src="https://lottie.host/embed/294a1d46-af57-40de-a778-8d3f76dc9cc4/oIngPUg9Vb.json"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      ></iframe>
    </div>
  );
};

export default Loading;

"use client";
// const AreaSlider = () => {
//     const handleMouseMove = (e)=>{
//         console.log()
//     }
//   return (
//     <>
//       <div className="w-full h-2 bg-slate-900 rounded-md relative">
//         <div
//         onMouseMove={()=> console.log()}
//           style={{
//             left: "0",
//             top: "-6px",
//           }}
//           className="absolute  w-5 h-5 rounded-full bg-slate-400"
//         ></div>
//         <div
//           style={{
//             left: "10%",
//             top: "-6px",
//           }}
//           className="absolute  w-5 h-5 rounded-full bg-slate-400"
//         ></div>
//       </div>
//     </>
//   );
// };

// export default AreaSlider;

import React, { useState, useRef, useEffect } from "react";

interface Positions {
  left1: number;
  left2: number;
}

const AreaSlider: React.FC = () => {
  const [positions, setPositions] = useState<Positions>({
    left1: 0,
    left2: 90,
  }); // Default positions
  const [dragging, setDragging] = useState<"left1" | "left2" | null>(null);

  const sliderRef = useRef<HTMLDivElement | null>(null); // Reference to the slider container
  const thumbWidth = 20; // Thumb width in pixels

  const handleMouseDown = (thumb: "left1" | "left2") => {
    setDragging(thumb);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (dragging && sliderRef.current) {
      const parentWidth = sliderRef.current.offsetWidth; // Width of the slider
      const offsetLeft = sliderRef.current.getBoundingClientRect().left; // Slider's left position
      const thumbWidthPercentage = (thumbWidth / parentWidth) * 100; // Thumb width in percentage

      const newLeft = Math.max(
        0,
        Math.min(100, ((event.clientX - offsetLeft) / parentWidth) * 100)
      ); // Constrain within 0-100%

      setPositions((prev) => {
        if (dragging === "left1") {
          return {
            ...prev,
            left1: Math.min(newLeft, prev.left2 - thumbWidthPercentage), // Ensure thumb1 doesn't cross thumb2
          };
        } else if (dragging === "left2") {
          return {
            ...prev,
            left2: Math.max(prev.left1 + thumbWidthPercentage, newLeft), // Ensure thumb2 doesn't cross thumb1
          };
        }
        return prev;
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(null); // Stop dragging
  };

  useEffect(() => {
    // Add global mouse event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // Cleanup listeners on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  return (
    <>
      <div className="flex justify-between text-sm font-bold">
        <div>Min</div>
        <div>Max</div>
      </div>
      <div className="flex justify-between my-2">
        <div className="text-sm">
          {new Intl.NumberFormat("en-US").format(
            parseInt((positions.left1 * 170982.42).toString())
          )}{" "}
          Km<sup>2</sup>
        </div>
        <div className="text-sm">
          {new Intl.NumberFormat("en-US").format(
            parseInt((positions.left2 * 170982.42).toString())
          )}{" "}
          Km<sup>2</sup>
        </div>
      </div>
      <div
        ref={sliderRef} // Attach the ref to the slider container
        className="relative w-full h-2  bg-slate-900 rounded-md"
      >
        {/* Highlight the gap between the thumbs */}
        <div
          style={{
            left: `${positions.left1}%`,
            width: `${positions.left2 - positions.left1}%`,
          }}
          className="absolute h-2 bg-slate-300 rounded-md"
        ></div>

        {/* First Thumb */}
        <div
          style={{
            left: `calc(${positions.left1}% - ${thumbWidth / 2}px)`, // Adjust for thumb width
            top: "-6px",
          }}
          className="absolute w-5 h-5 rounded-full bg-slate-400 cursor-grab"
          onMouseDown={() => handleMouseDown("left1")}
        >
          {/* <span className="absolute bottom-full mb-1 text-sm text-white bg-black rounded-md px-1">
            {positions.left1.toFixed(0)}%
          </span> */}
        </div>

        {/* Second Thumb */}
        <div
          style={{
            left: `calc(${positions.left2}% - ${thumbWidth / 2}px)`, // Adjust for thumb width
            top: "-6px",
          }}
          className="absolute w-5 h-5 rounded-full bg-slate-400 cursor-grab"
          onMouseDown={() => handleMouseDown("left2")}
        >
          {/* <span className="absolute bottom-full mb-1 text-sm text-white bg-black rounded-md px-1">
            {positions.left2.toFixed(0)}%
          </span> */}
        </div>
      </div>
    </>
  );
};

export default AreaSlider;

import React, { useEffect, useState } from "react";

const DiscountBanner = ({
  discountName,
  productImage,
  discountDate,
  productPrice,
  productDesc,
}) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(discountDate) - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [discountDate]);

  const timerComponents = Object.keys(timeLeft).map((interval) => (
    <div
      key={interval}
      className="flex flex-col items-center bg-white text-center p-3 rounded-lg border-slate-300 border-4"
    >
      <div className="text-sm">{interval.toUpperCase()}</div>

      <div className="text-4xl font-bold">{timeLeft[interval]}</div>
    </div>
  ));

  return (
    <>
      {" "}
      <div className="w-screen max-md:hidden flex bg-slate-100 py-11 px-32 min-h-[1/8] overflow-hidden justify-center gap-12 cursor-pointer ">
        <div className="text-7xl font-bold flex items-center">
          {discountName}
        </div>
        <div className="flex max-w-[1/16] ">
          <img
            src={productImage}
            alt="prodcut image"
            className=" w-full max-w-[1/8] max-h-64  mix-blend-multiply rotate-12 object-contain"
          />
        </div>
        <div className="flex flex-col p-10  justify-between gap-5">
          <div className="flex space-x-2">
            {timerComponents.length === 0 ? (
              timerComponents
            ) : (
              <span className=" text-center text-2xl font-bold">
                Time's Up!
              </span>
            )}
          </div>
          <div className=" flex flex-col  gap-3">
            <span className=" font-bold text-2xl text-center text-slate-600">
              {productDesc}
            </span>
            <span className="  font-bold text-5xl text-center">
              ${productPrice}
            </span>
          </div>
        </div>
      </div>
      <div className="px-5 py-2 w-full md:hidden flex justify-between bg-slate-100  overflow-hidden   cursor-pointer ">
        <div className="flex flex-col  ">
          <div className="text-xl font-bold flex text-black">
            {discountName}
          </div>

          <div className="flex flex-col w-full justify-between gap-5">
            <div className="flex space-x-2">
              {timerComponents.length === 0 ? (
                timerComponents
              ) : (
                <span className=" text-center text-xl font-bold">
                  Time's Up!
                </span>
              )}
            </div>
            <div className=" flex flex-col w-max">
              <span className=" font-bold text-xl text-center text-slate-600">
                {productDesc}
              </span>
              <span className="  font-bold text-xl text-left text-black">
                ${productPrice}
              </span>
            </div>
          </div>
        </div>
        <div className="flex  ">
          <img
            src={productImage}
            alt="prodcut image"
            className="h-[180px]  mix-blend-multiply rotate-12 object-contain"
          />
        </div>
      </div>
    </>
  );
};

export default DiscountBanner;

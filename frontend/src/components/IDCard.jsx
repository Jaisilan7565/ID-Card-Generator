import React from "react";
import { UPLOAD_URL } from "../utils/url";

const IDCard = ({ cardInfo, schoolLogo, studentPhoto }) => {
  console.log("Card Info", cardInfo);

  return (
    <div className="mt-4 p-4 border border-gray-300 rounded-md bg-white">
      <div className="w-full aspect-[3/2] bg-[url('/images/card-bg.png')] bg-cover bg-center rounded-xl">
        {/* Card Header  */}
        <div className="flex justify-between px-1 py-1">
          <img
            src={
              schoolLogo
                ? URL.createObjectURL(schoolLogo)
                : cardInfo?.schoolLogo
                ? UPLOAD_URL + cardInfo?.schoolLogo
                : "images/card-logo.png"
            }
            alt="school logo"
            className="w-1/6"
          />
          <div className="flex flex-col mt-2 items-end mr-5">
            <span className="text-white text-[clamp(0.3rem,1.5vw,1.5rem)] md:text-[clamp(0.5rem,1vw,0.9rem)]">
              Reg No. {cardInfo?.regNo ? cardInfo?.regNo : "123456"}
            </span>
            <span className="text-[clamp(0.8rem,3vw,2rem)] md:text-[clamp(0.3rem,1.4vw,1.5rem)] text-white font-bold">
              {cardInfo?.schoolName ? cardInfo?.schoolName : "ABC School Name"}
            </span>
          </div>
        </div>
        {/* Card Body  */}
        <div className="flex gap-2 mx-6">
          <div className="w-full">
            <h2 className="text-yellow-500 font-extrabold text-[clamp(0.8rem,4vw,2rem)] md:text-[clamp(0.5rem,2vw,2rem)] text-end mr-4">
              IDENTITY CARD
            </h2>
            {/* <div className="ml-[clamp(0.8rem,3vw,2rem)] md:ml-[clamp(0.8rem,3vw,2rem)]"> */}
            <div className="ml-[clamp(0.8rem,5vw,3.5rem)] md:ml-[clamp(0.8rem,2vw,3rem)]">
              <p className="text-green-600 font-semibold text-[clamp(0.5rem,2.5vw,1.2rem)] md:text-[clamp(0.3rem,1.5vw,1.2rem)]">
                Name -{" "}
                <span className="text-green-900">
                  {cardInfo?.studentName ? cardInfo?.studentName : "John Doe"}
                </span>
              </p>
              <p className="text-green-600 font-semibold text-[clamp(0.5rem,2.5vw,1.2rem)] md:text-[clamp(0.3rem,1.5vw,1.2rem)]">
                S/D of Mr. -{" "}
                <span className="text-green-900">
                  {cardInfo?.sd_of_mr ? cardInfo?.sd_of_mr : "Sam Doe"}
                </span>
              </p>
              <p className="text-green-600 font-semibold text-[clamp(0.5rem,2.5vw,1.2rem)] md:text-[clamp(0.3rem,1.5vw,1.2rem)]">
                S/D of Mrs. -{" "}
                <span className="text-green-900">
                  {cardInfo?.sd_of_mrs ? cardInfo?.sd_of_mrs : "Mary Doe"}
                </span>
              </p>
              <p className="text-green-600 font-semibold text-[clamp(0.5rem,2.5vw,1.2rem)] md:text-[clamp(0.3rem,1.5vw,1.2rem)]">
                Class -{" "}
                <span className="text-green-900">
                  {cardInfo?.class ? cardInfo?.class : "VII"}
                </span>
              </p>
              <p className="text-green-600 font-semibold text-[clamp(0.5rem,2.5vw,1.2rem)] md:text-[clamp(0.3rem,1.5vw,1.2rem)]">
                Date of Birth -{" "}
                <span className="text-green-900">
                  {cardInfo?.dob
                    ? cardInfo?.dob
                    : new Date().toISOString().split("T")[0]}
                </span>
              </p>
              <p className="text-green-600 font-semibold text-[clamp(0.5rem,2.5vw,1.2rem)] md:text-[clamp(0.3rem,1.5vw,1.2rem)]">
                Address -{" "}
                <span className="text-green-900">
                  {cardInfo?.address
                    ? cardInfo?.address
                    : "Mumbai, Maharashtra"}
                </span>
              </p>
              <p className="text-green-600 font-semibold text-[clamp(0.5rem,2.5vw,1.2rem)] md:text-[clamp(0.3rem,1.5vw,1.2rem)]">
                Phone -{" "}
                <span className="text-green-900">
                  {cardInfo?.phone ? cardInfo?.phone : "1234567890"}
                </span>
              </p>
            </div>
          </div>
          <div className="w-2/5 mt-4 md:mt-6 lg:mt-8">
            <img
              src={
                studentPhoto
                  ? URL.createObjectURL(studentPhoto)
                  : cardInfo?.studentPhoto
                  ? UPLOAD_URL + cardInfo?.studentPhoto
                  : "images/card-avatar.jpeg"
              }
              alt="student photo"
              className="h-auto rounded-2xl border-2 border-white object-cover shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IDCard;

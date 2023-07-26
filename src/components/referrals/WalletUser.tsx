import { getEllipsisTxt } from "@/utils/formmater-address";
import React from "react";

const WalletUser = () => {
  return (
    <div>
      <div className="flex justify-between items-center p-3 border-2 border-[--colors-secondary] rounded-[--radii-card]">
        <span className="text-[--colors-text] font-medium">Wallet</span>
        <span className="text-[--colors-primary] font-bold text-base">
          {getEllipsisTxt("0x5f84f858895BCC8261f1723B93D2C26a8cF16738")}
        </span>
      </div>
      <div className="gap-5 md:gap-0 flex justify-between text-white my-5 flex-col md:flex-row">
        <div className="border-2 border-[--colors-secondary] rounded-[--radii-card] w-full md:w-[225px] h-[40px] flex justify-between p-5 items-center">
          <span>Level</span>
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 512 512"
            focusable="false"
            className="chakra-icon css-1o1kffl"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M223.75 130.75L154.62 15.54A31.997 31.997 0 0 0 127.18 0H16.03C3.08 0-4.5 14.57 2.92 25.18l111.27 158.96c29.72-27.77 67.52-46.83 109.56-53.39zM495.97 0H384.82c-11.24 0-21.66 5.9-27.44 15.54l-69.13 115.21c42.04 6.56 79.84 25.62 109.56 53.38L509.08 25.18C516.5 14.57 508.92 0 495.97 0zM256 160c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm92.52 157.26l-37.93 36.96 8.97 52.22c1.6 9.36-8.26 16.51-16.65 12.09L256 393.88l-46.9 24.65c-8.4 4.45-18.25-2.74-16.65-12.09l8.97-52.22-37.93-36.96c-6.82-6.64-3.05-18.23 6.35-19.59l52.43-7.64 23.43-47.52c2.11-4.28 6.19-6.39 10.28-6.39 4.11 0 8.22 2.14 10.33 6.39l23.43 47.52 52.43 7.64c9.4 1.36 13.17 12.95 6.35 19.59z"></path>
          </svg>
        </div>
        <div className="border-2 border-[--colors-secondary] rounded-[--radii-card] w-full md:w-[225px] h-[40px] flex justify-between p-5 items-center">
          <span>Deposit Amount</span>
          <span>$00.00</span>
        </div>
        <div className="border-2 border-[--colors-secondary] rounded-[--radii-card] w-full md:w-[225px] h-[40px] flex justify-between p-5 items-center">
          <span>Direct Referrals</span>
          <div className="flex items-center gap-2 ">
            <span>0</span>
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 512 512"
              focusable="false"
              className="chakra-icon css-1o1kffl"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M332.64 64.58C313.18 43.57 286 32 256 32c-30.16 0-57.43 11.5-76.8 32.38-19.58 21.11-29.12 49.8-26.88 80.78C156.76 206.28 203.27 256 256 256s99.16-49.71 103.67-110.82c2.27-30.7-7.33-59.33-27.03-80.6zM432 480H80a31 31 0 01-24.2-11.13c-6.5-7.77-9.12-18.38-7.18-29.11C57.06 392.94 83.4 353.61 124.8 326c36.78-24.51 83.37-38 131.2-38s94.42 13.5 131.2 38c41.4 27.6 67.74 66.93 76.18 113.75 1.94 10.73-.68 21.34-7.18 29.11A31 31 0 01432 480z"></path>
            </svg>
          </div>
        </div>
        <div className="border-2 border-[--colors-secondary] rounded-[--radii-card] w-full md:w-[225px] h-[40px] flex justify-between p-5 items-center">
          <span>Total Referrals</span>
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 512 512"
            focusable="false"
            className="chakra-icon css-1o1kffl"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M332.64 64.58C313.18 43.57 286 32 256 32c-30.16 0-57.43 11.5-76.8 32.38-19.58 21.11-29.12 49.8-26.88 80.78C156.76 206.28 203.27 256 256 256s99.16-49.71 103.67-110.82c2.27-30.7-7.33-59.33-27.03-80.6zM432 480H80a31 31 0 01-24.2-11.13c-6.5-7.77-9.12-18.38-7.18-29.11C57.06 392.94 83.4 353.61 124.8 326c36.78-24.51 83.37-38 131.2-38s94.42 13.5 131.2 38c41.4 27.6 67.74 66.93 76.18 113.75 1.94 10.73-.68 21.34-7.18 29.11A31 31 0 01432 480z"></path>
          </svg>
        </div>
        <div className="border-2 border-[--colors-secondary] rounded-[--radii-card] w-full md:w-[225px] h-[40px] flex justify-between p-5 items-center">
          <span>Total Group Sale</span>
          <span>$00.00</span>
        </div>
      </div>
      <div className="text-white  p-3 border-2 border-[--colors-secondary] rounded-[--radii-card]">
        <div className="flex justify-between items-center">
          <span className="text-xl md:text-3xl">Referral Tree</span>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              style={{ padding: "0 60px 0 10px" }}
              className="bg-[#1b1b1b] rounded-xl h-[50px] md:w-[500px] w-[150px]"
            />
            <div className="bg-[#252525] rounded absolute p-[12px] right-[10px] top-[5px]">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="flex gap-2 my-2 flex-wrap">
          <div className="flex items-center gap-2  border p-1 bg-slate-700   rounded">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 512 512"
              focusable="false"
              className="chakra-icon css-bfrb7x"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M332.64 64.58C313.18 43.57 286 32 256 32c-30.16 0-57.43 11.5-76.8 32.38-19.58 21.11-29.12 49.8-26.88 80.78C156.76 206.28 203.27 256 256 256s99.16-49.71 103.67-110.82c2.27-30.7-7.33-59.33-27.03-80.6zM432 480H80a31 31 0 01-24.2-11.13c-6.5-7.77-9.12-18.38-7.18-29.11C57.06 392.94 83.4 353.61 124.8 326c36.78-24.51 83.37-38 131.2-38s94.42 13.5 131.2 38c41.4 27.6 67.74 66.93 76.18 113.75 1.94 10.73-.68 21.34-7.18 29.11A31 31 0 01432 480z"></path>
            </svg>
            <span className="flex items-center text-sm">Direct Sponsor</span>
          </div>
          <div className="flex items-center gap-2  border p-1 bg-slate-700   rounded">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 512 512"
              focusable="false"
              className="chakra-icon css-1h8y4d7"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M332.64 64.58C313.18 43.57 286 32 256 32c-30.16 0-57.43 11.5-76.8 32.38-19.58 21.11-29.12 49.8-26.88 80.78C156.76 206.28 203.27 256 256 256s99.16-49.71 103.67-110.82c2.27-30.7-7.33-59.33-27.03-80.6zM432 480H80a31 31 0 01-24.2-11.13c-6.5-7.77-9.12-18.38-7.18-29.11C57.06 392.94 83.4 353.61 124.8 326c36.78-24.51 83.37-38 131.2-38s94.42 13.5 131.2 38c41.4 27.6 67.74 66.93 76.18 113.75 1.94 10.73-.68 21.34-7.18 29.11A31 31 0 01432 480z"></path>
            </svg>
            <span className="flex items-center text-sm">With Referral(s)</span>
          </div>
          <div className="flex items-center gap-2 border p-1 bg-slate-700 rounded">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 512 512"
              focusable="false"
              className="chakra-icon css-bo6s3p"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M332.64 64.58C313.18 43.57 286 32 256 32c-30.16 0-57.43 11.5-76.8 32.38-19.58 21.11-29.12 49.8-26.88 80.78C156.76 206.28 203.27 256 256 256s99.16-49.71 103.67-110.82c2.27-30.7-7.33-59.33-27.03-80.6zM432 480H80a31 31 0 01-24.2-11.13c-6.5-7.77-9.12-18.38-7.18-29.11C57.06 392.94 83.4 353.61 124.8 326c36.78-24.51 83.37-38 131.2-38s94.42 13.5 131.2 38c41.4 27.6 67.74 66.93 76.18 113.75 1.94 10.73-.68 21.34-7.18 29.11A31 31 0 01432 480z"></path>
            </svg>
            <span className="flex items-center text-sm">
              Without referral(s)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletUser;

import React, { createRef, useEffect, useRef, useState } from "react";
import BetCard from "./BetCard";
import LiveBetCard from "./LiveBetCard";
import HistoryCard from "./HistoryCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";
import FutureCard from "./FutureCard";
import SwiperNavButton from "../SwiperNavButton";
import { Swiper as SwiperType } from "swiper";
import Popup, { PopupRef } from "../ui/Modal";
import { Icons } from "../Icons";
import { DocumentData } from "firebase/firestore";
import Button from "../ui/Button";
import getDataFileredByOnSnapshot from "@/helpers/getDataFilteredByOnSnapshot";
import { useAccount } from "wagmi";
import ClaimModal from "./ClaimModal";

import Link from "next/link";
import Image from "next/image";

const Card = () => {
  const { address, isConnected } = useAccount();
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [winningRound, setWinningRound] = useState<number>();
  const [titleClaimModal, setTitleClaimModal] = useState<string>("");
  const [nextBetData, setNextBetData] = useState<DocumentData[]>([]);
  const [datasBetted, setDatasBetted] = useState<DocumentData[]>([]);

  const swiperRef = useRef<SwiperType>();
  const collectWinningsRef = createRef<PopupRef>();

  useEffect(() => {
    getDataFileredByOnSnapshot(
      "predictions",
      [
        ["locked", "==", false],
        ["cancel", "==", false],
      ],
      (docs: DocumentData) => {
        setNextBetData(docs as DocumentData[]);
        setCurrentRound(docs?.[0]?.epoch);
      },
      undefined,
      undefined
    );
    if (isConnected) {
      getDataFileredByOnSnapshot(
        "bets",
        [["user_address", "==", address as `0x${string}`]],
        (docs: DocumentData) => {
          setDatasBetted(docs as DocumentData[]);
        }
      );
    }
  }, [address, isConnected]);

  const dataBettedInCurrentRound = datasBetted.find(
    (dataBetted: DocumentData) => dataBetted.epoch === currentRound
  );

  const showCollectWinningHandler = (
    status: boolean,
    title: string,
    round: number
  ) => {
    if (status === true) {
      setWinningRound(round);
      setTitleClaimModal(title);
      return collectWinningsRef.current?.open();
    }
    return collectWinningsRef.current?.close();
  };

  return (
    <React.Fragment>
      <div className="text-center">
        <SwiperNavButton swiperRef={swiperRef} />
      </div>
      <div className="flex justify-center items-center">
        <Swiper
          modules={[Navigation]}
          slidesPerView={"auto"}
          centeredSlides={true}
          initialSlide={3}
          noSwipingSelector={"input"}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            // when window width is >= 640px
            640: {
              slidesPerView: 7,
              spaceBetween: 16,
            },
          }}
        >
          <SwiperSlide>
            <HistoryCard
              historyRound={+currentRound - 4}
              showCollectWinningModal={showCollectWinningHandler}
            />
          </SwiperSlide>
          <SwiperSlide>
            <HistoryCard
              historyRound={+currentRound - 3}
              showCollectWinningModal={showCollectWinningHandler}
            />
          </SwiperSlide>
          <SwiperSlide>
            <HistoryCard
              historyRound={+currentRound - 2}
              showCollectWinningModal={showCollectWinningHandler}
            />
          </SwiperSlide>
          <SwiperSlide>
            <LiveBetCard
              liveRound={+currentRound - 1}
              nextBetData={nextBetData[0]}
            />
          </SwiperSlide>
          <SwiperSlide>
            <BetCard
              currentRound={currentRound}
              nextBetData={nextBetData[0]}
              dataBettedInCurrentRound={dataBettedInCurrentRound}
            />
          </SwiperSlide>
          <SwiperSlide>
            <FutureCard futureRound={+currentRound + 1} />
          </SwiperSlide>
          <SwiperSlide>
            <FutureCard futureRound={+currentRound + 2} plusMinute={5} />
          </SwiperSlide>
        </Swiper>
        <Popup
          ref={collectWinningsRef}
          width={300}
          footer={false}
          closable
          title={titleClaimModal}
          styleContent={{
            background: "var(--colors-backgroundAlt)",
            color: "var(--colors-text)",
          }}
          content={
            <ClaimModal
              winningRound={winningRound}
              onCancel={() => {
                showCollectWinningHandler(false, "", 0);
              }}
            />
          }
        />
      </div>

      <div className="flex lg:relative justify-end pr-4 pb-5">
        <Link
          href={"https://chain.link/"}
          target="_blank"
          className="lg:absolute"
        >
          <Image src="/svgs/market_data.svg" width={170} height={47} alt="" />
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Card;

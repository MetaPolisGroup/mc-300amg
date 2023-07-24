import React, { createRef, useEffect, useRef, useState } from "react";
import BetCard from "./BetCard";
import LiveBetCard from "./LiveBetCard";
import HistoryCard from "./HistoryCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
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
import getDataFileredByOnSnapshot from "@/helpers/getDataByOnSnapshot";

const Card = () => {
  const [currentRound, setCurrentRound] = useState<string>("");
  const [winningRound, setWinningRound] = useState<string>("");
  const [nextBetData, setNextBetData] = useState<DocumentData[]>([]);

  const swiperRef = useRef<SwiperType>();
  const collectWinningsRef = createRef<PopupRef>();

  useEffect(() => {
    getDataFileredByOnSnapshot(
      "predictions",
      [["locked", "==", false]],
      (docs: DocumentData) => {
        setNextBetData(docs as DocumentData[]);
        setCurrentRound(docs?.[0]?.epoch);
      },
      undefined,
      undefined
    );
  }, []);

  const showCollectWinningHandler = (status: boolean, round: string) => {
    if (status === true) {
      setWinningRound(round);
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
              slidesPerView: 3,
              spaceBetween: 16,
            },
          }}
        >
          <SwiperSlide>
            <HistoryCard
              currentRound={(+currentRound - 4).toString()}
              showCollectWinningModal={showCollectWinningHandler}
            />
          </SwiperSlide>
          <SwiperSlide>
            <HistoryCard
              currentRound={(+currentRound - 3).toString()}
              showCollectWinningModal={showCollectWinningHandler}
            />
          </SwiperSlide>
          <SwiperSlide>
            <HistoryCard
              currentRound={(+currentRound - 2).toString()}
              showCollectWinningModal={showCollectWinningHandler}
            />
          </SwiperSlide>
          <SwiperSlide>
            <LiveBetCard currentRound={(+currentRound - 1).toString()} />
          </SwiperSlide>
          <SwiperSlide>
            <BetCard currentRound={currentRound} nextBetData={nextBetData[0]} />
          </SwiperSlide>
          <SwiperSlide>
            <FutureCard currentRound={(+currentRound + 1).toString()} />
          </SwiperSlide>
          <SwiperSlide>
            <FutureCard currentRound={(+currentRound + 2).toString()} />
          </SwiperSlide>
        </Swiper>
        <Popup
          ref={collectWinningsRef}
          width={300}
          footer={false}
          closable
          title="Collect Winnnings"
          styleContent={{
            background: "var(--colors-backgroundAlt)",
            color: "var(--colors-text)",
          }}
          content={
            <React.Fragment>
              <div className="w-full">
                <Icons.Trophy className="m-auto w-14 h-14 text-[--colors-gold] my-10" />
                <div className="flex justify-between font-semibold">
                  <span>Collecting</span>
                  <span>0.0453 BNB</span>
                </div>
                <p className="w-full text-right text-[--colors-text99]">
                  ~10.93$
                </p>
                <p className="text-center text-[--colors-text99] my-2">
                  From round {winningRound}
                </p>
                <Button variant={"success"} className="w-full">
                  Confirm
                </Button>
              </div>
            </React.Fragment>
          }
        />
      </div>
    </React.Fragment>
  );
};

export default Card;

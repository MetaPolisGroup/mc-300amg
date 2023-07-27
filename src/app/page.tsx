"use client";
import { createRef, useEffect, useState } from "react";
import CountDown from "@/components/CountDown";
import CoinCurrency from "@/components/CoinCurrency";
import DrawerHistory from "@/components/drawer-history/DrawerHistory";
import Card from "@/components/bet-bo/Card";
import SubNav, { MODE } from "@/components/SubNav";
import clsx from "clsx";
import Chart from "@/components/chart/Chart";
import Popup, { PopupRef } from "@/components/ui/Modal";
import ClaimModal from "@/components/bet-bo/ClaimModal";
import { useAccount } from "wagmi";
import Modal from "@/components/ui/Modal/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import getDataFileredByOnSnapshot from "@/helpers/getDataFilteredByOnSnapshot";
import userApi from "@/services/user-api";
import { useSearchParams } from "next/navigation";
import { Icons } from "@/components/Icons";
import toast from "react-hot-toast";

export default function Home() {
  const [modeSubNavMobile, setModeSubNavMobile] = useState<string>(MODE.CHART);

  const { isConnected, address } = useAccount();
  const [showUserNickname, setShowUserNickname] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [collectWinning, setCollectWinning] = useState<number>();
  const [nicknameValue, setNicknameValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const collectWinningsRef = createRef<PopupRef>();

  const isScreenMoblie = 1024 > screen.width;
  const isShowDrawer = modeSubNavMobile === MODE.HISTORY;

  useEffect(() => {
    let timeSet = setTimeout(() => {
      if (!isScreenMoblie) return;

      return setModeSubNavMobile(MODE.CARD);
    }, 1000);
    return () => {
      clearTimeout(timeSet);
    };
  }, [isScreenMoblie]);

  const handlerToggleCollectWinning = (status: boolean, round: number) => {
    setCollectWinning(round);

    if (status === true) {
      return collectWinningsRef.current?.open();
    }
    return collectWinningsRef.current?.close();
  };

  const searchParams = useSearchParams();

  const recommendId = searchParams.get("id");

  useEffect(() => {
    if (isConnected && address) {
      getDataFileredByOnSnapshot(
        "users",
        [["user_address", "==", address]],
        (docs) => {
          if (docs?.[0]?.nickname === "") {
            setShowUserNickname(true);
          }
          if (docs.length === 0) {
            setShowUserNickname(true);
          }
        }
      );
    }
  }, [isConnected, address]);

  const changeNicknameValueHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { value },
    } = e;
    setNicknameValue(value);
  };

  const submitNicknameHandler = async () => {
    setIsLoading(true);
    if (nicknameValue.trim().length === 0) {
      setErrorMessage("Nick name is not empty!");
      setIsLoading(false);
      return;
    }
    try {
      const response = await userApi.nickname({
        user_address: address!,
        nickname: nicknameValue,
        recommend_id: recommendId ? recommendId : "",
      });
      if (response) {
        setIsLoading(false);
        setShowUserNickname(false);
        console.log(response);
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-[--colors-backgroundAlt] shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex bg-[--colors-success] p-4 rounded-l-lg">
              <Icons.XCircle className="text-[--colors-white]" />
            </div>
            <div className="flex-1 w-0 p-2">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5"></div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-[--colors-text]">
                    Success!
                  </p>
                  <p className="mt-1 text-sm text-[--colors-text]">
                    Your nickname has been updated!
                  </p>
                </div>
              </div>
            </div>
            <div className="flex">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-start justify-end text-sm font-medium focus:outline-none"
              >
                <Icons.X className="text-[--colors-primary]" />
              </button>
            </div>
          </div>
        ));
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <main className="bg-gradient-to-r from-[--colors-violetAlt1] to-[--colors-violetAlt2] overflow-hidden">
      <div className="flex overflow-hidden">
        <div
          className={clsx(
            "overflow-hidden",
            isShowDrawer ? "w-[0px] lg:w-[calc(100%-385px)]" : "w-[100%]"
          )}
        >
          <div className="text-[--colors-failure] p-4">
            <div className="flex flex-nowrap justify-between">
              <CoinCurrency />
              <CountDown
                title="5m"
                onAction={{
                  setIsShowDrawer: () => {
                    setModeSubNavMobile(MODE.HISTORY);
                  },
                }}
              />
            </div>
          </div>

          <div
            className={clsx(
              modeSubNavMobile !== MODE.CARD && isScreenMoblie && "hidden"
            )}
          >
            <Card />
          </div>

          <div
            className={clsx(
              modeSubNavMobile !== MODE.CHART && isScreenMoblie && "hidden"
            )}
          >
            <Chart />
          </div>
        </div>
        <DrawerHistory
          open={isShowDrawer}
          onClose={() => setModeSubNavMobile(MODE.CARD)}
          onCollect={handlerToggleCollectWinning}
        />
      </div>

      <SubNav modeMobile={modeSubNavMobile} onAction={setModeSubNavMobile} />

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
          <ClaimModal
            winningRound={collectWinning}
            onCancel={() => {
              handlerToggleCollectWinning(false, 0);
            }}
          />
        }
      />

      <Modal
        show={showUserNickname}
        title="Username"
        width={500}
        styleContent={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          backgroundColor: "transparent !important",
          backgroundImage:
            "linear-gradient(100%, var(--colors-lightBlueLeft), var(--colors-lightBlueRight))",
        }}
      >
        <div>
          <p>Enter your nickname:</p>
          <Input
            className="bg-white border-[--colors-success] border-2 rounded-2xl text-black px-2 py-4"
            onChange={changeNicknameValueHandler}
            onFocus={() => setErrorMessage("")}
          />
          <span className="text-sm text-red-500">{errorMessage}</span>
        </div>
        <Button
          variant="success"
          onClick={submitNicknameHandler}
          isLoading={isLoading}
        >
          Confirm
        </Button>
      </Modal>
    </main>
  );
}

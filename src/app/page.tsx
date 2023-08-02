"use client";
import SliderListGame from "@/components/sliderListGame";
import SliderBannerGame from "@/components/sliderBannerGame";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <main className="bg-gradient-to-r from-[--colors-violetAlt1] to-[--colors-violetAlt2] overflow-hidden">
      <SliderListGame />
      <SliderBannerGame />
      <div className="px-4 flex flex-col items-center md:flex-row justify-between md:px-28">
        <div className="flex flex-col gap-3 md:gap-10">
          <h1 className="text-[#28C38B] text-3xl md:text-6xl font-semibold">
            Unlimited & Advanced Defi Playground
          </h1>
          <p className="text-sm md:text-2xl text-[--colors-textSub]">
            Powered by Blockchain technology, giving users transparency and
            fairness to deliver thrilling and enjoyable experiences
          </p>
          <div className="flex gap-2 items-center">
            <Button variant="success" className="rounded-full px-9">
              Categories
            </Button>
            <Button
              variant="success"
              className="bg-transparent rounded-full border-2 border-[--colors-primary] px-9"
            >
              Roadmap
            </Button>
          </div>
        </div>
        <Image
          src="/images/banners/PRX_herobanner-01 1.png"
          width={680}
          height={800}
          alt="banner hero"
        />
      </div>
    </main>
  );
}

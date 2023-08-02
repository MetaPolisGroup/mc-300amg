"use client";
// import { useEffect, useState } from "react";
import SliderListGame from "@/components/sliderListGame";
import SliderBannerGame from "@/components/sliderBannerGame";

export default function Home() {
  return (
    <main className="bg-gradient-to-r from-[--colors-violetAlt1] to-[--colors-violetAlt2] overflow-hidden">
      <SliderListGame />
      <SliderBannerGame />
    </main>
  );
}

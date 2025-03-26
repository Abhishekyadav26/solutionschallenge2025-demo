"use client";

import { DotPatternDemo } from "@/components/page-format/background";
import { NavbarDemo } from "@/components/page-format/navbar";
import { ScrollProgressDemo } from "@/components/page-format/scroll";
import { FlipWordsDemo } from "@/components/page-format/text";

export default function Home() {
  return (
    <>  <div className="flex items-center content-center dark bg-black">
            <ScrollProgressDemo />
        </div>    
        <div className="flex items-center content-center h-auto dark bg-black">
            <NavbarDemo />
        </div>
        <div className="flex items-center content-center h-screen dark bg-black">
            <DotPatternDemo />
        </div>
        <div className="flex items-center content-center h-screen dark bg-black">
            <FlipWordsDemo />
        </div>
    </>
  );
}
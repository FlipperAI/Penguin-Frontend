import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { ArrowRightIcon } from "lucide-react";
import { Mockup, MockupFrame } from "../../ui/mockup";
import Glow from "../../ui/glow";
import { useTheme } from "next-themes";
import { HoverBorderGradient } from "../../ui/hover-border-gradient";
import { MacbookScroll } from "@/components/MacbookScroll";
import Image from "next/image";

export default function Hero() {
  const { resolvedTheme } = useTheme();
  console.log(resolvedTheme);
  
  const videoSrc = "https://cdn.dribbble.com/userupload/7314909/file/original-e54e32fefb908ac7ff18ded0efb97695.mp4";  // Replace image src with video source

  return (
    <div className="fade-bottom overflow-hidden pb-0 sm:pb-0 md:pb-0">
      <div className="mx-auto flex max-w-container flex-col gap-12 pt-16 sm:gap-24">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-4">
          <div  className="p-4 drop-shadow-2xl opacity-80">
            <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/1200px-Tux.svg.png" width={75} height={75} alt="TuxCode Logo" />
          </div>
          <h1 className="relative z-10 p-10 inline-block animate-appear bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-4xl font-semibold leading-tight text-transparent drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight">
            Start Coding Now - TuxCode
          </h1>
          <p className="text-md p-10 relative z-10 max-w-[550px] animate-appear font-medium text-muted-foreground delay-100 sm:text-xl">
            Sharpen your skills with real-time coding challenges, instant feedback, and a community of passionate developers.
          </p>
          <div className="relative z-10 flex animate-appear justify-center gap-4 delay-300">
            <div className="relative z-10 flex animate-appear justify-center gap-4 delay-300">
              <HoverBorderGradient variant="default" size="lg" aschid>
                <a href="/login">Get Started</a>
              </HoverBorderGradient>
            </div>
          </div>
          <div className="relative -mt-20 w-full">
            <MacbookScroll></MacbookScroll>
            <Glow
              variant="top"
              className="animate-appear-zoom opacity-0 delay-1000"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

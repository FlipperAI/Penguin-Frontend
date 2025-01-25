"use client";

import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { ArrowRightIcon } from "lucide-react";
import { Mockup, MockupFrame } from "../../ui/mockup";
import Glow from "../../ui/glow";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Hero() {
  const { resolvedTheme } = useTheme();
  console.log(resolvedTheme)
  let src;
  
  src = "https://cdn.dribbble.com/userupload/2852774/file/original-83618dd3c9431c1c967997802ff68fb9.png?resize=752x&vertical=center"

  return (
    <div className="fade-bottom overflow-hidden pb-0 sm:pb-0 md:pb-0">
      <div className="mx-auto flex max-w-container flex-col gap-12 pt-16 sm:gap-24">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-12">
          <Badge variant="outline" className="animate-appear">
            <span className="text-muted-foreground">
              New version of Launch UI is out!
            </span>
            <a
              href="/"
              className="flex items-center gap-1"
            >
              Get started
              <ArrowRightIcon className="h-3 w-3" />
            </a>
          </Badge>
          <h1 className="relative z-10 inline-block animate-appear bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-4xl font-semibold leading-tight text-transparent drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight">
            Code. Compete. Conquer.
          </h1>
          <p className="text-md relative z-10 max-w-[550px] animate-appear font-medium text-muted-foreground delay-100 sm:text-xl">
          Sharpen your skills with real-time coding challenges, instant feedback, and a community of passionate developers.
          </p>
          <div className="relative z-10 flex animate-appear justify-center gap-4 delay-300">
            <div className="relative z-10 flex animate-appear justify-center gap-4 delay-300">
              <Button variant="default" size="lg" asChild>
                <a href="/login">Get Started</a>
              </Button>
            </div>
          </div>
          <div className="relative pt-12">
            <MockupFrame
              className="animate-appear opacity delay-700"
              size="small"
            >
              <Mockup type="responsive">
                <Image
                  src={src}
                  alt="Launch UI app screenshot"
                  width={1248}
                  height={765}
                />
              </Mockup>
            </MockupFrame>
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

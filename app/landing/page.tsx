'use client';

import { AnimatedTestimonials } from '@/components/AnimatedTestimonials';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";
import { Mockup, MockupFrame } from "@/components/ui/mockup";
import Glow from "@/components/ui/glow";
import Image from "next/image";
import { useTheme } from "next-themes";
import Github from "@/components/logos/github";
import Hero from '@/components/sections/hero/default';
import { AuroraBackground } from '@/components/ui/AuroraBackground';

const testimonials = [
  {
    quote: "This platform has completely transformed the way I practice coding. The real-time feedback is amazing!",
    name: "John Doe",
    designation: "Software Engineer",
    src: "https://ui.aceternity.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1535713875002-d1d0cf377fde%3Fq%3D80%26w%3D3560%26auto%3Dformat%26fit%3Dcrop%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D&w=640&q=75", // Replace with actual image path
  },
  {
    quote: "I love the variety of problems and the clean interface. It's perfect for preparing for coding interviews.",
    name: "Jane Smith",
    designation: "Frontend Developer",
    src: "https://ui.aceternity.com/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1438761681033-6461ffad8d80%3Fq%3D80%26w%3D3540%26auto%3Dformat%26fit%3Dcrop%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D&w=640&q=75", // Replace with actual image path
  },
  {
    quote: "The isolation of code execution in Docker containers is a game-changer. It feels like a real coding environment.",
    name: "Alex Johnson",
    designation: "DevOps Engineer",
    src: "https://plus.unsplash.com/premium_photo-1682096252599-e8536cd97d2b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D  ", // Replace with actual image path
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-black-50 to-purple-50 flex flex-col items-center justify-center p-6">
      {/* Hero Section */}
      <Hero/>

      {/* Testimonials Section */}
      <div className="w-full max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 mt-10">What Our Users Say</h2>
        <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-600">
        <p>© 2023 Online Coding Judge. All rights reserved.</p>
      </footer>
    </div>
  );
}
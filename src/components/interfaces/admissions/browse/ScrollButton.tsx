"use client";

import { Button } from "@nextui-org/react";

interface ScrollButtonProps {
  className?: string;
}

export function ScrollButton({ className = "" }: ScrollButtonProps) {
  const scrollToSchools = () => {
    const element = document.getElementById('schools');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Button
      className={`bg-white text-zinc-900 px-8 py-6 font-semibold hover:bg-zinc-100 transition-colors ${className}`}
      onPress={scrollToSchools}
    >
      Browse Schools
    </Button>
  );
}

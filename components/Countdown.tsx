"use client";

import { useEffect, useState } from "react";

type CountdownProps = {
  targetDate: string;
};

type TimeLeft = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (!targetDate || Number.isNaN(target) || difference <= 0) {
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      setTimeLeft({
        days: String(
          Math.floor(difference / (1000 * 60 * 60 * 24))
        ).padStart(2, "0"),
        hours: String(
          Math.floor((difference / (1000 * 60 * 60)) % 24)
        ).padStart(2, "0"),
        minutes: String(
          Math.floor((difference / (1000 * 60)) % 60)
        ).padStart(2, "0"),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(
          2,
          "0"
        ),
      });
    };

    calculateCountdown();

    const interval = window.setInterval(calculateCountdown, 1000);

    return () => window.clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <CountdownBox label="Days" value={timeLeft.days} />
      <CountdownBox label="Hours" value={timeLeft.hours} />
      <CountdownBox label="Minutes" value={timeLeft.minutes} />
      <CountdownBox label="Seconds" value={timeLeft.seconds} />
    </div>
  );
}

function CountdownBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.08] p-6 text-center shadow-2xl backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.12]">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-yellow-400/10 opacity-0 transition group-hover:opacity-100" />

      <div className="relative z-10">
        <h3 className="text-4xl font-black text-yellow-300 md:text-5xl">
          {value}
        </h3>

        <p className="mt-2 text-sm font-bold uppercase tracking-[0.25em] text-white/60">
          {label}
        </p>
      </div>
    </div>
  );
}
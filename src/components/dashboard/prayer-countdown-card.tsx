"use client";

import { useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { PrayerSlot } from "@/lib/nexus-data";

type CountdownState = {
  countdown: string;
  nextPrayer: PrayerSlot;
};

function buildPrayerDate(reference: Date, time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date(reference);

  date.setHours(hours, minutes, 0, 0);

  return date;
}

function getNextPrayerState(prayers: PrayerSlot[]): CountdownState {
  const now = new Date();
  const todaySlots = prayers.map((prayer) => ({
    ...prayer,
    date: buildPrayerDate(now, prayer.time),
  }));

  const upcomingPrayer = todaySlots.find((slot) => slot.date.getTime() > now.getTime());
  const nextPrayer = upcomingPrayer ?? {
    ...prayers[0],
    date: buildPrayerDate(new Date(now.getTime() + 1000 * 60 * 60 * 24), prayers[0].time),
  };

  const diff = Math.max(0, nextPrayer.date.getTime() - now.getTime());
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    nextPrayer: {
      name: nextPrayer.name,
      time: nextPrayer.time,
    },
    countdown: [hours, minutes, seconds]
      .map((value) => value.toString().padStart(2, "0"))
      .join(":"),
  };
}

export function PrayerCountdownCard({
  location,
  prayers,
}: {
  location: string;
  prayers: PrayerSlot[];
}) {
  const initialState = useMemo(() => getNextPrayerState(prayers), [prayers]);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const tick = () => setState(getNextPrayerState(prayers));

    tick();
    const interval = window.setInterval(tick, 1000);

    return () => window.clearInterval(interval);
  }, [prayers]);

  return (
    <Card className="border border-amber-400/15 bg-[linear-gradient(180deg,rgba(251,191,36,0.12),rgba(255,255,255,0.03))] shadow-[0_18px_60px_rgba(0,0,0,0.22)]">
      <CardHeader>
        <CardDescription className="text-amber-100/70">Next prayer time</CardDescription>
        <CardTitle className="text-white">{state.nextPrayer.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-[24px] border border-amber-300/10 bg-black/20 p-4">
          <p className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {state.countdown}
          </p>
          <p className="mt-2 text-sm text-amber-100/70">
            Countdown to {state.nextPrayer.name} in {location} at {state.nextPrayer.time}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {prayers.map((prayer) => (
            <Badge
              key={prayer.name}
              className={
                prayer.name === state.nextPrayer.name
                  ? "border-amber-300/20 bg-amber-300/15 text-amber-100"
                  : "border-white/10 bg-white/[0.04] text-zinc-300"
              }
            >
              {prayer.name} {prayer.time}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

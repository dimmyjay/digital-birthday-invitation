"use client";

import { useEffect, useMemo, useState } from "react";

type ShareButtonsProps = {
  invitationLink?: string;
  celebrantName: string;
  age: string;
  displayDate: string;
  time: string;
  venue: string;
  husbandName?: string;
  children?: string[];
};

export default function ShareButtons({
  invitationLink,
  celebrantName,
  age,
  displayDate,
  time,
  venue,
  husbandName,
  children = [],
}: ShareButtonsProps) {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const finalLink = invitationLink || origin;

  const shareText = useMemo(() => {
    return `You are specially invited to ${celebrantName}'s ${age}th Birthday Celebration.

Date: ${displayDate}
Time: ${time}
Venue: ${venue}

${
  husbandName
    ? `Marked with love by ${husbandName}${
        children.length ? `, together with ${children.join(", ")}` : ""
      }.`
    : ""
}

Open invitation: ${finalLink}`;
  }, [
    celebrantName,
    age,
    displayDate,
    time,
    venue,
    husbandName,
    children,
    finalLink,
  ]);

  const copyLink = async () => {
    if (!finalLink) return;

    try {
      await navigator.clipboard.writeText(finalLink);
      alert("Invitation link copied!");
    } catch (error) {
      console.error("Copy error:", error);
      alert("Unable to copy link. Please copy it manually.");
    }
  };

  const shareWhatsApp = () => {
    if (!finalLink) return;

    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
  };

  const nativeShare = async () => {
    if (!finalLink) return;

    if (!navigator.share) {
      shareWhatsApp();
      return;
    }

    try {
      await navigator.share({
        title: `${celebrantName}'s ${age}th Birthday Celebration`,
        text: shareText,
        url: finalLink,
      });
    } catch (error) {
      console.error("Native share cancelled/error:", error);
    }
  };

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <button
        type="button"
        onClick={shareWhatsApp}
        disabled={!finalLink}
        className="rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 px-6 py-4 font-black text-black shadow-lg shadow-pink-500/25 transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Share WhatsApp
      </button>

      <button
        type="button"
        onClick={copyLink}
        disabled={!finalLink}
        className="rounded-full border border-white/20 bg-white/10 px-6 py-4 font-black text-white backdrop-blur-md transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Copy Link
      </button>

      <button
        type="button"
        onClick={nativeShare}
        disabled={!finalLink}
        className="rounded-full border border-yellow-300/30 bg-yellow-300/10 px-6 py-4 font-black text-yellow-100 backdrop-blur-md transition hover:bg-yellow-300/20 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Share Invite
      </button>
    </div>
  );
}
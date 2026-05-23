"use client";

import { database } from "@/lib/firebase";
import { push, ref, set } from "firebase/database";
import { useState } from "react";

type RSVPFormProps = {
  slug: string;
  celebrantName: string;
};

export default function RSVPForm({ slug, celebrantName }: RSVPFormProps) {
  const [guestName, setGuestName] = useState("");
  const [guestMessage, setGuestMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const submitRSVP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!guestName.trim()) {
      alert("Please enter your name.");
      return;
    }

    try {
      setIsSubmitting(true);

      const newRsvpRef = push(ref(database, `rsvps/${slug}`));

      await set(newRsvpRef, {
        name: guestName.trim(),
        message: guestMessage.trim(),
        invitationSlug: slug,
        celebrantName,
        createdAt: new Date().toISOString(),
      });

      setIsSuccess(true);
      setGuestName("");
      setGuestMessage("");
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      alert("Failed to submit RSVP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="px-6 py-20">
      <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-2">
        <div>
          <p className="font-bold uppercase tracking-[0.3em] text-pink-300">
            RSVP
          </p>

          <h2 className="mt-4 text-3xl font-black md:text-5xl">
            Let Us Know You Are Coming
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-white/65">
            Kindly confirm your attendance and send a short birthday message.
          </p>

          {isSuccess && (
            <div className="mt-6 rounded-3xl border border-green-400/30 bg-green-400/10 p-5 text-green-100">
              Thank you. Your RSVP has been received.
            </div>
          )}
        </div>

        <form
          onSubmit={submitRSVP}
          className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl"
        >
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-white/70">
              Your Name
            </span>

            <input
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-white outline-none placeholder:text-white/35 focus:border-pink-300"
            />
          </label>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-bold text-white/70">
              Birthday Message
            </span>

            <textarea
              value={guestMessage}
              onChange={(e) => setGuestMessage(e.target.value)}
              placeholder="Write a short birthday message"
              rows={5}
              className="w-full resize-none rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-white outline-none placeholder:text-white/35 focus:border-pink-300"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 px-6 py-4 font-black text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit RSVP"}
          </button>
        </form>
      </div>
    </section>
  );
}
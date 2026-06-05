"use client";

import Countdown from "@/components/Countdown";
import GuestMessage from "@/components/GuestMessage";
import MusicPlayer from "@/components/MusicPlayer";
import RSVPForm from "@/components/RSVPForm";
import ShareButtons from "@/components/ShareButtons";
import { database } from "@/lib/firebase";
import { get, ref } from "firebase/database";
import Link from "next/link";
import { use, useEffect, useState } from "react";

type BirthdayInvitation = {
  slug: string;
  celebrantName: string;
  age: string;
  dateOfBirth: string;
  birthdayDate: string;
  displayDate: string;
  time: string;
  venue: string;
  venueLink?: string;
  dressCode: string;
  theme: string;
  celebrantImage: string;
};

const fallbackInvitation: BirthdayInvitation = {
  slug: "oluwatosin-mary-arokoyo-40th-birthday",
  celebrantName: "Oluwatosin Mary Arokoyo",
  age: "40",
  dateOfBirth: "June 6, 1986",
  birthdayDate: "2026-06-27T16:00:00",
  displayDate: "Saturday, June 27, 2026",
  time: "4:00 PM",
  venue: "Venue will be announced",
  venueLink: "",
  dressCode: "Elegant White with Gold Accents",
  theme: "Celebrating 40 Years of Grace, Purpose, Excellence and Blessings",
  celebrantImage: "/images/celebrant.jpg",
};

export default function BirthdayInvitationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const [origin, setOrigin] = useState("");
  const [invitation, setInvitation] =
    useState<BirthdayInvitation>(fallbackInvitation);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    const fetchInvitation = async () => {
      try {
        setIsLoading(true);

        const snapshot = await get(ref(database, `invitations/${slug}`));

        if (snapshot.exists()) {
          setInvitation({
            ...fallbackInvitation,
            ...snapshot.val(),
            birthdayDate: "2026-06-27T16:00:00",
            displayDate: "Saturday, June 27, 2026",
            dateOfBirth: "June 6, 1986",
          });
        } else {
          setInvitation(fallbackInvitation);
        }
      } catch (error) {
        console.error("Error fetching invitation:", error);
        setInvitation(fallbackInvitation);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvitation();
  }, [slug]);

  const invitationPath = `/invite/${slug}`;
  const invitationLink = origin ? `${origin}${invitationPath}` : invitationPath;

  const mapLink =
    invitation.venueLink && invitation.venueLink.trim().length > 0
      ? invitation.venueLink
      : "";

  const addToCalendar = () => {
    const title = `${invitation.celebrantName}'s ${invitation.age}th Birthday Celebration`;
    const details = `You are invited to celebrate ${invitation.celebrantName}'s ${invitation.age}th birthday. Date of birth: ${invitation.dateOfBirth}.`;
    const start = "20260627T160000";
    const end = "20260627T200000";

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${start}/${end}&details=${encodeURIComponent(
      details
    )}&location=${encodeURIComponent(invitation.venue)}`;

    window.open(calendarUrl, "_blank");
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#090312] px-6 text-white">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 text-center">
          <p className="text-3xl">🎉</p>
          <h1 className="mt-4 text-2xl font-black">Loading Invitation...</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#090312] text-white">
      <MusicPlayer src="/music/birthday-song.mp3" title="Birthday Music" />

      <section className="relative min-h-screen px-4 sm:px-6 py-10">
        <div className="absolute inset-0 bg-[url('/images/birthday-bg.jpg')] bg-cover bg-center opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#090312] via-[#16071f]/90 to-[#2a071f]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#ff4ecd44,transparent_35%),radial-gradient(circle_at_bottom_right,#facc1544,transparent_35%)]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="flex items-center justify-between gap-4 mb-12">
            <Link
              href="/"
              className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold backdrop-blur-md transition hover:bg-white/20"
            >
              ← Home
            </Link>

            <Link
              href="/create"
              className="rounded-full bg-white px-5 py-3 text-sm font-black text-purple-900 transition hover:scale-105"
            >
              Create Invite
            </Link>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-pink-100 backdrop-blur-md">
                🎉 You Are Specially Invited
              </div>

              <h1 className="mt-6 text-4xl font-black leading-tight md:text-7xl">
                {invitation.celebrantName}
                <span className="block bg-gradient-to-r from-pink-300 via-yellow-200 to-purple-300 bg-clip-text text-transparent">
                  {invitation.age}th Birthday Celebration
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">
                Join us as we celebrate {invitation.celebrantName} on her
                special {invitation.age}th birthday celebration. It will be a beautiful moment
                of joy, thanksgiving, laughter, love, and unforgettable
                memories.
              </p>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-md">
                <p className="leading-relaxed text-white/75">
                  Date of Birth:{" "}
                  <span className="font-black text-yellow-300">
                    {invitation.dateOfBirth}
                  </span>
                  <br />
                  Celebration Date:{" "}
                  <span className="font-black text-pink-300">
                    {invitation.displayDate}
                  </span>
                </p>
              </div>

              <div className="mt-8">
                <ShareButtons
                  invitationLink={invitationLink}
                  celebrantName={invitation.celebrantName}
                  age={invitation.age}
                  displayDate={invitation.displayDate}
                  time={invitation.time}
                  venue={invitation.venue}
                />
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={addToCalendar}
                  className="rounded-full border border-white/20 bg-white/10 px-8 py-4 font-black text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  Add to Calendar
                </button>

                {mapLink && (
                  <a
                    href={mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 px-8 py-4 text-center font-black text-black transition hover:scale-105"
                  >
                    Open Google Map
                  </a>
                )}
              </div>
            </div>

            {/* Right Side - Full Image Display with Text Above */}
            <div className="relative flex flex-col gap-6">
              {/* Text Above Image */}
              <div className="text-center space-y-4 order-first">
                <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-white/90 font-bold drop-shadow-lg">
                  Celebrating
                </p>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white drop-shadow-lg">
                  {invitation.celebrantName}
                </h2>

                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-300 drop-shadow-lg">
                  {invitation.age}th Birthday
                </p>

                <p className="text-xs sm:text-sm text-white/95 max-w-md mx-auto drop-shadow-lg leading-relaxed font-medium">
                  {invitation.theme}
                </p>

                <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-yellow-300 to-pink-300 mx-auto drop-shadow-lg" />
              </div>

              {/* Full Height Image with Overlay */}
              <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-pink-500 via-purple-700 to-yellow-400 min-h-[600px] sm:min-h-[700px] flex flex-col shadow-2xl shadow-pink-500/30">
                {/* Background Image - Object Position Top to Show Full Person */}
                <div className="absolute inset-0">
                  <img
                    src={invitation.celebrantImage}
                    alt={invitation.celebrantName}
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Gradient Overlay - Very subtle to keep image visible */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14">
            <Countdown targetDate={invitation.birthdayDate} />
          </div>
        </div>
      </section>

      <section className="bg-[#13091f] px-4 sm:px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-bold uppercase tracking-[0.3em] text-yellow-300">
              Event Details
            </p>

            <h2 className="mt-4 text-3xl font-black md:text-5xl">
              Celebrate With {invitation.celebrantName}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <DetailCard
              icon="🎂"
              title="Date of Birth"
              value={invitation.dateOfBirth}
            />
            <DetailCard
              icon="📅"
              title="Celebration Date"
              value={invitation.displayDate}
            />
            <DetailCard icon="⏰" title="Time" value={invitation.time} />

            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 text-center transition hover:bg-white/[0.1]">
              <div className="text-5xl">📍</div>

              <p className="mt-5 text-sm font-bold uppercase tracking-[0.25em] text-white/45">
                Venue
              </p>

              <h3 className="mt-3 text-xl font-black">
                {invitation.venue}
              </h3>

              {mapLink && (
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 px-5 py-3 text-sm font-black text-black transition hover:scale-105"
                >
                  View on Google Map
                </a>
              )}
            </div>
          </div>

          <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 text-center shadow-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-pink-300">
              {invitation.age}th Birthday Celebration
            </p>

            <h3 className="mt-4 text-3xl font-black md:text-5xl">
              {invitation.theme}
            </h3>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
              This celebration is specially dedicated to {invitation.celebrantName}
              as she marks {invitation.age} wonderful years of life, grace, strength,
              purpose, and blessings.
            </p>
          </div>
        </div>
      </section>

      <RSVPForm slug={slug} celebrantName={invitation.celebrantName} />

      <GuestMessage slug={slug} />

      <section className="bg-gradient-to-r from-pink-600 via-purple-700 to-yellow-500 px-4 sm:px-6 py-20">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-black md:text-5xl">
            We Look Forward To Celebrating With You
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">
            Come with joy, love, and thanksgiving as we celebrate{" "}
            {invitation.celebrantName} at {invitation.age}.
          </p>

          <div className="mt-8">
            <ShareButtons
              invitationLink={invitationLink}
              celebrantName={invitation.celebrantName}
              age={invitation.age}
              displayDate={invitation.displayDate}
              time={invitation.time}
              venue={invitation.venue}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function DetailCard({
  icon,
  title,
  value,
}: {
  icon: string;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 text-center transition hover:bg-white/[0.1]">
      <div className="text-5xl">{icon}</div>

      <p className="mt-5 text-sm font-bold uppercase tracking-[0.25em] text-white/45">
        {title}
      </p>

      <h3 className="mt-3 text-xl font-black">{value}</h3>
    </div>
  );
}

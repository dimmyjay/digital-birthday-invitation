"use client";

import { database } from "@/lib/firebase";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

type GuestMessageItem = {
  id: string;
  name: string;
  message: string;
  invitationSlug?: string;
  celebrantName?: string;
  createdAt?: string;
};

type GuestMessageProps = {
  slug: string;
};

export default function GuestMessage({ slug }: GuestMessageProps) {
  const [messages, setMessages] = useState<GuestMessageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const messagesRef = ref(database, `rsvps/${slug}`);

    const unsubscribe = onValue(
      messagesRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          setMessages([]);
          setIsLoading(false);
          return;
        }

        const data = snapshot.val();

        const formattedMessages: GuestMessageItem[] = Object.entries(data)
          .map(([id, value]) => {
            const item = value as Omit<GuestMessageItem, "id">;

            return {
              id,
              name: item.name || "Guest",
              message: item.message || "",
              invitationSlug: item.invitationSlug,
              celebrantName: item.celebrantName,
              createdAt: item.createdAt,
            };
          })
          .filter((item) => item.message.trim().length > 0)
          .sort((a, b) => {
            const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return bTime - aTime;
          });

        setMessages(formattedMessages);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error loading guest messages:", error);
        setMessages([]);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [slug]);

  return (
    <section className="bg-[#13091f] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-bold uppercase tracking-[0.3em] text-pink-300">
            Guest Messages
          </p>

          <h2 className="mt-4 text-3xl font-black md:text-5xl">
            Birthday Wishes From Loved Ones
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-white/65">
            Messages submitted by guests will appear here in real time.
          </p>
        </div>

        {isLoading ? (
          <div className="mx-auto mt-10 max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 text-center">
            <p className="text-3xl">💌</p>
            <h3 className="mt-4 text-xl font-black">Loading messages...</h3>
          </div>
        ) : messages.length === 0 ? (
          <div className="mx-auto mt-10 max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 text-center">
            <p className="text-4xl">✨</p>
            <h3 className="mt-4 text-2xl font-black">No Messages Yet</h3>
            <p className="mt-3 text-white/60">
              Be the first to send a beautiful birthday message.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {messages.map((item) => (
              <article
                key={item.id}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.1]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-yellow-400/10 opacity-0 transition group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-yellow-400 text-xl font-black text-black">
                      {getInitials(item.name)}
                    </div>

                    <div>
                      <h3 className="font-black text-white">{item.name}</h3>
                      <p className="text-xs text-white/45">
                        {formatDate(item.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-3xl border border-white/10 bg-black/20 p-5">
                    <p className="leading-relaxed text-white/75">
                      “{item.message}”
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function formatDate(date?: string) {
  if (!date) return "Just now";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Just now";
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
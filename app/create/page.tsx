"use client";

import { database } from "@/lib/firebase";
import { get, ref, set } from "firebase/database";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type InviteForm = {
  celebrantName: string;
  age: string;
  celebrationDate: string;
  venue: string;
  venueLink: string;
  time: string;
  dressCode: string;
  theme: string;
  celebrantImage: string;
};

const defaultForm: InviteForm = {
  celebrantName: "Oluwatosin Mary Arokoyo",
  age: "40",
  celebrationDate: "2026-06-27",
  venue: "",
  venueLink: "",
  time: "2:00 PM",
  dressCode: "Elegant White with Gold Accents",
  theme: "Celebrating 40 Years of Grace, Purpose, Excellence and Blessings",
  celebrantImage: "/images/celebrant.jpg",
};

export default function CreateBirthdayInvitePage() {
  const [origin, setOrigin] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingSavedData, setIsLoadingSavedData] = useState(true);
  const [form, setForm] = useState<InviteForm>(defaultForm);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const slug = useMemo(() => {
    return "oluwatosin-mary-arokoyo-40th-birthday";
  }, []);

  useEffect(() => {
    const loadSavedInvitation = async () => {
      try {
        setIsLoadingSavedData(true);

        const snapshot = await get(ref(database, `invitations/${slug}`));

        if (snapshot.exists()) {
          const saved = snapshot.val();

          setForm({
            celebrantName: saved.celebrantName || defaultForm.celebrantName,
            age: saved.age || defaultForm.age,
            celebrationDate: "2026-06-27",
            venue: saved.venue || "",
            venueLink: saved.venueLink || "",
            time: saved.time || "2:00 PM",
            dressCode: saved.dressCode || defaultForm.dressCode,
            theme: saved.theme || defaultForm.theme,
            celebrantImage: saved.celebrantImage || defaultForm.celebrantImage,
          });
        }
      } catch (error) {
        console.error("Error loading saved invitation:", error);
      } finally {
        setIsLoadingSavedData(false);
      }
    };

    loadSavedInvitation();
  }, [slug]);

  const invitationPath = `/invite/${slug}`;
  const invitationLink = origin ? `${origin}${invitationPath}` : invitationPath;

  const updateField = (key: keyof InviteForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const saveInvitation = async () => {
    try {
      setIsSaving(true);

      const invitationData = {
        slug,
        celebrantName: form.celebrantName.trim(),
        age: form.age.trim(),
        birthdayDate: "2026-06-27T14:00:00",
        displayDate: "Saturday, June 27, 2026",
        time: form.time.trim() || "2:00 PM",
        venue: form.venue.trim() || "Venue will be announced",
        venueLink: form.venueLink.trim(),
        dressCode: form.dressCode.trim() || "Elegant White with Gold Accents",
        theme:
          form.theme.trim() ||
          "Celebrating 40 Years of Grace, Purpose, Excellence and Blessings",
        celebrantImage: form.celebrantImage.trim() || "/images/celebrant.jpg",
        updatedAt: new Date().toISOString(),
      };

      await set(ref(database, `invitations/${slug}`), invitationData);

      setForm((prev) => ({
        ...prev,
        venue: invitationData.venue,
        venueLink: invitationData.venueLink,
        time: invitationData.time,
      }));

      alert("✨ Invitation saved successfully!");
    } catch (error) {
      console.error("Error saving invitation:", error);
      alert("Failed to save invitation. Check Firebase config and rules.");
    } finally {
      setIsSaving(false);
    }
  };

  const copyLink = async () => {
    if (!origin) return;
    await navigator.clipboard.writeText(invitationLink);
    alert("✅ Invitation link copied!");
  };

  const shareWhatsApp = () => {
    if (!origin) return;

    const message = `🎉 You are specially invited to ${form.celebrantName}'s ${form.age}th Birthday Celebration.

📅 Celebration Date: June 27, 2026
🕐 Time: ${form.time || "2:00 PM"}
📍 Venue: ${form.venue || "To be announced"}
🗺️ Google Map: ${form.venueLink || "To be shared"}
👗 Dress Code: ${form.dressCode}

🎫 Card Admits Only One Person

✨ Theme:
${form.theme}

🎊 Open invitation:
${invitationLink}`;

    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#0f0718] px-4 sm:px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20"
          >
            ← Back Home
          </Link>

          <Link
            href={invitationPath}
            className="rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 px-5 py-3 text-sm font-black text-black transition hover:scale-105"
          >
            View Invitation
          </Link>
        </div>

        <div className="mb-12 text-center">
          <p className="font-bold uppercase tracking-[0.3em] text-pink-300">
            Birthday Invitation Creator
          </p>

          <h1 className="mt-4 text-4xl font-black md:text-6xl">
            Create Birthday Invitation Link
          </h1>

          {isLoadingSavedData && (
            <p className="mt-4 text-sm font-bold text-yellow-200">
              Loading saved invitation data...
            </p>
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Form Section */}
          <section className="lg:col-span-1 rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl h-fit sticky top-6">
            <h2 className="text-2xl font-black">Invitation Details</h2>

            <div className="mt-6 space-y-5">
              <Input
                label="Celebrant Name"
                value={form.celebrantName}
                onChange={(value) => updateField("celebrantName", value)}
              />

              <div className="grid gap-5 grid-cols-2">
                <Input
                  label="Age"
                  value={form.age}
                  onChange={(value) => updateField("age", value)}
                />

                <Input
                  label="Celebration Date"
                  type="date"
                  value={form.celebrationDate}
                  onChange={(value) => updateField("celebrationDate", value)}
                />
              </div>

              <div className="grid gap-5 grid-cols-2">
                <Input
                  label="Time"
                  value={form.time}
                  onChange={(value) => updateField("time", value)}
                />

                <Input
                  label="Dress Code"
                  value={form.dressCode}
                  onChange={(value) => updateField("dressCode", value)}
                />
              </div>

              <Input
                label="Venue Text"
                placeholder="Example: Royal Event Hall, Lagos"
                value={form.venue}
                onChange={(value) => updateField("venue", value)}
              />

              <TextArea
                label="Google Map Link"
                placeholder="Paste Google Maps link here..."
                value={form.venueLink}
                onChange={(value) => updateField("venueLink", value)}
              />

              <TextArea
                label="Theme"
                value={form.theme}
                onChange={(value) => updateField("theme", value)}
              />

              <Input
                label="Celebrant Image Path"
                value={form.celebrantImage}
                onChange={(value) => updateField("celebrantImage", value)}
              />

              <button
                type="button"
                onClick={saveInvitation}
                disabled={isSaving || isLoadingSavedData}
                className="w-full rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 px-6 py-4 font-black text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Invitation to Firebase"}
              </button>
            </div>
          </section>

          {/* Preview Section */}
          <section className="lg:col-span-2">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl overflow-hidden">
              <h2 className="text-2xl font-black mb-6">Live Preview</h2>

              {/* Full Height Image with Overlay */}
              <div className="relative rounded-[1.5rem] overflow-hidden bg-gradient-to-br from-pink-500 via-purple-700 to-yellow-400 min-h-[700px] flex flex-col">
                {/* Background Image - Object Position Top to Show Head */}
                <div className="absolute inset-0">
                  <img
                    src={form.celebrantImage}
                    alt={form.celebrantName}
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Gradient Overlay - Only at Bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 from-0% via-black/40 via-40% to-transparent to-100%" />
                </div>

                {/* Content Overlay - All at Bottom to Avoid Covering Face */}
                <div className="relative z-10 flex flex-col justify-end h-full p-8 pb-12">
                  {/* All Content at Bottom */}
                  <div className="text-center space-y-4">
                    <p className="text-sm uppercase tracking-[0.35em] text-white/90 font-bold drop-shadow-lg">
                      You Are Invited
                    </p>

                    <h3 className="text-4xl lg:text-5xl font-black leading-tight text-white drop-shadow-lg">
                      {form.celebrantName}
                    </h3>

                    <p className="text-3xl lg:text-4xl font-bold text-yellow-300 drop-shadow-lg">
                      {form.age}th Birthday Celebration
                    </p>

                    <p className="text-sm lg:text-base text-white/95 max-w-md mx-auto drop-shadow-lg leading-relaxed font-medium">
                      {form.theme}
                    </p>

                    <div className="w-16 h-1 bg-gradient-to-r from-yellow-300 to-pink-300 mx-auto drop-shadow-lg" />
                  </div>
                </div>
              </div>

              {/* Details Grid Below */}
              <div className="mt-8 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <PreviewRow label="Celebration Date" value="June 27, 2026" />
                  <PreviewRow label="Time" value={form.time || "2:00 PM"} />
                  <PreviewRow
                    label="Dress Code"
                    value={form.dressCode}
                  />
                </div>

                <PreviewRow label="Venue" value={form.venue || "Not added yet"} />
                <PreviewRow label="Theme" value={form.theme} />

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs text-white/50">🎫 Card Admits Only One Person</p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs text-white/50">📍 Google Map Link</p>

                  {form.venueLink.trim() ? (
                    <a
                      href={form.venueLink.trim()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 px-5 py-3 text-sm font-black text-black transition hover:scale-105"
                    >
                      📍 Open Google Map
                    </a>
                  ) : (
                    <h4 className="mt-2 font-bold text-white/60">
                      Not added yet
                    </h4>
                  )}
                </div>
              </div>

              {/* Invitation Link */}
              <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-sm text-white/50">Generated Link</p>
                <p className="mt-2 break-all font-semibold text-pink-200 text-xs lg:text-sm">
                  {invitationLink}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 grid gap-4 grid-cols-2">
                <button
                  type="button"
                  onClick={copyLink}
                  disabled={!origin}
                  className="rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 px-6 py-4 font-black text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 text-sm lg:text-base"
                >
                  📋 Copy Link
                </button>

                <button
                  type="button"
                  onClick={shareWhatsApp}
                  disabled={!origin}
                  className="rounded-full border border-white/20 bg-white/10 px-6 py-4 font-black text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50 text-sm lg:text-base"
                >
                  💬 Share WhatsApp
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-white/70">
        {label}
      </span>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-white outline-none placeholder:text-white/35 focus:border-pink-300 focus:bg-white/20 transition"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-white/70">
        {label}
      </span>

      <textarea
        rows={2}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-none rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-white outline-none break-all placeholder:text-white/35 focus:border-pink-300 focus:bg-white/20 transition"
      />
    </label>
  );
}

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <p className="text-xs text-white/50">{label}</p>
      <h4 className="mt-1 break-words font-bold text-white leading-relaxed">{value}</h4>
    </div>
  );
}

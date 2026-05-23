"use client";

import Link from "next/link";
import { ref, set } from "firebase/database";
import { useEffect, useMemo, useState } from "react";
import { database } from "@/lib/firebase";

type InviteForm = {
  celebrantName: string;
  age: string;
  birthdayDate: string;
  husbandName: string;
  children: string;
  venue: string;
  time: string;
  dressCode: string;
  theme: string;
  celebrantImage: string;
  familyImage: string;
};

export default function CreateBirthdayInvitePage() {
  const [origin, setOrigin] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState<InviteForm>({
    celebrantName: "Oluwatosin Mary Arokoyo",
    age: "40",
    birthdayDate: "2026-06-06",
    husbandName: "Akin Arokoyo",
    children: "Semilore Arokoyo, Ibukun Arokoyo, Korede Arokoyo",
    venue: "",
    time: "4:00 PM",
    dressCode: "Elegant / Royal Outfit",
    theme: "40 Years of Grace, Love and Blessings",
    celebrantImage: "/images/celebrant.jpg",
    familyImage: "/images/family.jpg",
  });

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const slug = useMemo(() => {
    return (
      form.celebrantName
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-") || "birthday-invitation"
    );
  }, [form.celebrantName]);

  const invitationPath = `/invite/${slug}`;
  const invitationLink = origin ? `${origin}${invitationPath}` : invitationPath;

  const updateField = (key: keyof InviteForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const saveInvitation = async () => {
    try {
      setIsSaving(true);

      const childrenArray = form.children
        .split(",")
        .map((child) => child.trim())
        .filter(Boolean);

      const invitationData = {
        slug,
        celebrantName: form.celebrantName,
        age: form.age,
        birthdayDate: `${form.birthdayDate}T16:00:00`,
        displayDate: "Saturday, June 6, 2026",
        time: form.time || "To be announced",
        venue: form.venue || "Venue will be announced",
        dressCode: form.dressCode || "Elegant / Royal Outfit",
        theme: form.theme,
        husbandName: form.husbandName,
        children: childrenArray,
        familyName: "The Arokoyo Family",
        celebrantImage: form.celebrantImage,
        familyImage: form.familyImage,
        createdAt: new Date().toISOString(),
      };

      await set(ref(database, `invitations/${slug}`), invitationData);

      alert("Invitation saved successfully!");
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
    alert("Invitation link copied!");
  };

  const shareWhatsApp = () => {
    if (!origin) return;

    const message = `You are specially invited to ${form.celebrantName}'s ${form.age}th Birthday Celebration.

Date: ${form.birthdayDate}
Time: ${form.time || "To be announced"}
Venue: ${form.venue || "To be announced"}

Open invitation: ${invitationLink}`;

    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#0f0718] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
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

        <div className="mb-10 text-center">
          <p className="font-bold uppercase tracking-[0.3em] text-pink-300">
            Birthday Invitation Creator
          </p>

          <h1 className="mt-4 text-4xl font-black md:text-6xl">
            Create Birthday Invitation Link
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/65">
            Fill in the birthday details, save it to Firebase, and share the
            generated invitation link with guests.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">
            <h2 className="text-2xl font-black">Invitation Details</h2>

            <div className="mt-6 space-y-5">
              <Input label="Celebrant Name" value={form.celebrantName} onChange={(value) => updateField("celebrantName", value)} />

              <div className="grid gap-5 md:grid-cols-2">
                <Input label="Age" value={form.age} onChange={(value) => updateField("age", value)} />
                <Input label="Birthday Date" type="date" value={form.birthdayDate} onChange={(value) => updateField("birthdayDate", value)} />
              </div>

              <Input label="Husband / Host Name" value={form.husbandName} onChange={(value) => updateField("husbandName", value)} />
              <Input label="Children Names" value={form.children} onChange={(value) => updateField("children", value)} />

              <div className="grid gap-5 md:grid-cols-2">
                <Input label="Time" value={form.time} onChange={(value) => updateField("time", value)} />
                <Input label="Dress Code" value={form.dressCode} onChange={(value) => updateField("dressCode", value)} />
              </div>

              <Input label="Venue" placeholder="Enter event venue" value={form.venue} onChange={(value) => updateField("venue", value)} />
              <Input label="Theme" value={form.theme} onChange={(value) => updateField("theme", value)} />

              <Input label="Celebrant Image Path" value={form.celebrantImage} onChange={(value) => updateField("celebrantImage", value)} />
              <Input label="Family Image Path" value={form.familyImage} onChange={(value) => updateField("familyImage", value)} />

              <button
                type="button"
                onClick={saveInvitation}
                disabled={isSaving}
                className="w-full rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 px-6 py-4 font-black text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Invitation to Firebase"}
              </button>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">
            <h2 className="text-2xl font-black">Live Preview</h2>

            <div className="mt-6 overflow-hidden rounded-[1.5rem] bg-[#1a0b2e]">
              <div className="relative flex min-h-72 items-center justify-center bg-gradient-to-br from-pink-500 via-purple-700 to-yellow-400 p-6 text-center">
                <div className="absolute inset-0 bg-black/25" />

                <div className="relative z-10">
                  <div className="mx-auto mb-5 h-28 w-28 overflow-hidden rounded-full border-4 border-yellow-200/70 bg-white/20 p-1">
                    <img
                      src={form.celebrantImage}
                      alt={form.celebrantName}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>

                  <p className="text-sm uppercase tracking-[0.35em] text-white/80">
                    You Are Invited
                  </p>

                  <h3 className="mt-4 text-4xl font-black leading-tight">
                    {form.celebrantName || "Celebrant Name"}
                  </h3>

                  <p className="mt-3 text-2xl font-bold text-yellow-200">
                    {form.age || "40"}th Birthday Celebration
                  </p>

                  <p className="mt-3 text-white/85">
                    {form.theme || "A beautiful birthday celebration"}
                  </p>
                </div>
              </div>

              <div className="space-y-4 p-6">
                <PreviewRow label="Date" value={form.birthdayDate} />
                <PreviewRow label="Time" value={form.time || "Not added yet"} />
                <PreviewRow label="Venue" value={form.venue || "Not added yet"} />
                <PreviewRow label="Marked By" value={form.husbandName || "Not added yet"} />
                <PreviewRow label="Children" value={form.children || "Not added yet"} />
                <PreviewRow label="Dress Code" value={form.dressCode || "Not added yet"} />
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-sm text-white/50">Generated Link</p>
              <p className="mt-2 break-all font-semibold text-pink-200">
                {invitationLink}
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={copyLink}
                disabled={!origin}
                className="rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 px-6 py-4 font-black text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Copy Link
              </button>

              <button
                type="button"
                onClick={shareWhatsApp}
                disabled={!origin}
                className="rounded-full border border-white/20 bg-white/10 px-6 py-4 font-black text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Share WhatsApp
              </button>
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
        className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-white outline-none placeholder:text-white/35 focus:border-pink-300"
      />
    </label>
  );
}

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <p className="text-xs text-white/50">{label}</p>
      <h4 className="mt-1 font-bold">{value}</h4>
    </div>
  );
}
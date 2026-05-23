"use client";

type BirthdayInvitation = {
  slug?: string;
  celebrantName: string;
  age: string;
  birthdayDate: string;
  displayDate: string;
  time: string;
  venue: string;
  dressCode: string;
  theme: string;
  husbandName: string;
  children: string[];
  familyName: string;
  celebrantImage: string;
  familyImage: string;
};

type BirthdayInvitationCardProps = {
  invitation: BirthdayInvitation;
};

export default function BirthdayInvitationCard({
  invitation,
}: BirthdayInvitationCardProps) {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
      <div className="relative flex min-h-[560px] items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-pink-500 via-purple-800 to-yellow-400 p-8 text-center">
        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute left-5 top-5 text-6xl">🎈</div>
        <div className="absolute right-5 top-5 text-6xl">✨</div>
        <div className="absolute bottom-5 left-5 text-6xl">🎂</div>
        <div className="absolute bottom-5 right-5 text-6xl">🌸</div>

        <div className="absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-yellow-300/25 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-pink-400/25 blur-3xl" />

        <div className="relative z-10">
          <p className="text-sm uppercase tracking-[0.4em] text-white/80">
            Save The Date
          </p>

          <h2 className="mt-5 text-6xl font-black leading-tight text-yellow-200 md:text-7xl">
            {invitation.age}
          </h2>

          <p className="mt-2 text-2xl font-black text-white">
            Years of Grace
          </p>

          <div className="mx-auto mt-8 h-48 w-48 rounded-full border-4 border-yellow-200/70 bg-white/20 p-2 shadow-2xl">
            <img
              src={invitation.celebrantImage || "/images/celebrant.jpg"}
              alt={invitation.celebrantName}
              className="h-full w-full rounded-full object-cover"
            />
          </div>

          <h3 className="mt-8 text-3xl font-black">
            {invitation.celebrantName}
          </h3>

          <p className="mx-auto mt-3 max-w-md text-white/85">
            {invitation.theme}
          </p>

          <div className="mx-auto mt-6 max-w-md rounded-3xl border border-white/15 bg-black/25 p-5 backdrop-blur-md">
            <div className="grid gap-4 sm:grid-cols-2">
              <SmallDetail label="Date" value={invitation.displayDate} />
              <SmallDetail label="Time" value={invitation.time} />
              <SmallDetail label="Venue" value={invitation.venue} />
              <SmallDetail label="Dress Code" value={invitation.dressCode} />
            </div>
          </div>

          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-white/75">
            Marked with love by{" "}
            <span className="font-black text-yellow-200">
              {invitation.husbandName}
            </span>{" "}
            and the entire{" "}
            <span className="font-black text-pink-200">
              {invitation.familyName}
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

function SmallDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">
        {label}
      </p>
      <h4 className="mt-1 text-sm font-black text-white">{value}</h4>
    </div>
  );
}
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#0f0718] text-white">
      <section className="relative flex min-h-screen items-center justify-center px-6 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#ff4ecd33,transparent_35%),radial-gradient(circle_at_bottom_right,#facc1533,transparent_35%)]" />
        <div className="absolute left-10 top-20 h-32 w-32 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-40 w-40 rounded-full bg-yellow-400/20 blur-3xl" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-pink-100 backdrop-blur-md">
              🎉 Official 40th Birthday Celebration
            </div>

            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              Join us as we celebrate
              <span className="block bg-gradient-to-r from-pink-400 via-yellow-300 to-purple-400 bg-clip-text text-transparent">
                Oluwatosin Arokoyo
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl">
              You are specially invited to celebrate the 40th birthday of
              Oluwatosin Mary Arokoyo. Join us for an unforgettable day of joy,
              thanksgiving, laughter, love, and beautiful memories.
            </p>

            {/* <div className="mt-6 max-w-xl rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-md">
              <p className="leading-relaxed text-white/70">
                Celebrate a remarkable milestone as Oluwatosin Mary Arokoyo
                marks four decades of grace, achievements, blessings, and
                unforgettable memories.
              </p>
            </div> */}

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/invite/oluwatosin-mary-arokoyo-40th-birthday"
                className="rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 px-8 py-4 text-center font-bold text-black shadow-lg shadow-pink-500/25 transition hover:scale-105"
              >
                View Invitation
              </Link>

              <Link
                href="/create"
                className="rounded-full border border-white/20 bg-white/10 px-8 py-4 text-center font-bold text-white backdrop-blur-md transition hover:bg-white/20"
              >
                Create Another Invite
              </Link>
            </div>

            <div className="mt-10 grid max-w-lg grid-cols-3 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                <h3 className="text-2xl font-black text-yellow-300">40</h3>
                <p className="mt-1 text-sm text-white/70">
                  Years Celebration
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                <h3 className="text-2xl font-black text-pink-300">June 27</h3>
                <p className="mt-1 text-sm text-white/70">
                  Celebration Date
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                <h3 className="text-2xl font-black text-purple-300">2026</h3>
                <p className="mt-1 text-sm text-white/70">
                  Celebration Year
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-pink-500/30 to-yellow-400/30 blur-2xl" />

            <div className="relative rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
              <div className="overflow-hidden rounded-[1.5rem] bg-[#1a0b2e]">
                <div className="relative flex h-80 items-center justify-center bg-gradient-to-br from-pink-500 via-purple-700 to-yellow-400">
                  <div className="absolute inset-0 bg-black/25" />

                  <div className="absolute left-5 top-5 text-5xl">🎈</div>
                  <div className="absolute right-5 top-5 text-5xl">✨</div>
                  <div className="absolute bottom-5 left-5 text-5xl">🎂</div>
                  <div className="absolute bottom-5 right-5 text-5xl">🌸</div>

                  <div className="relative px-6 text-center">
                    <p className="text-sm uppercase tracking-[0.35em] text-white/80">
                      You Are Invited
                    </p>

                    <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
                      Oluwatosin Mary Arokoyo
                    </h2>

                    <p className="mt-3 text-2xl font-bold text-yellow-200">
                      40th Birthday Celebration
                    </p>

                    {/* <p className="mt-3 text-white/85">
                      Celebrating 40 Years of Grace, Purpose, Excellence and
                      Blessings.
                    </p> */}
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <PreviewBox
                      label="Celebration Date"
                      value="June 27, 2026"
                    />
                    <PreviewBox label="Age" value="40 Years" />
                    <PreviewBox label="Theme" value="Celebrating Grace" />
                  </div>

                  <Link
                    href="/invite/oluwatosin-mary-arokoyo-40th-birthday"
                    className="mt-6 block w-full rounded-full bg-gradient-to-r from-yellow-300 to-pink-400 px-6 py-4 text-center font-black text-black transition hover:scale-105"
                  >
                    Open Invitation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function PreviewBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <p className="text-xs text-white/50">{label}</p>
      <h3 className="mt-1 font-bold">{value}</h3>
    </div>
  );
}

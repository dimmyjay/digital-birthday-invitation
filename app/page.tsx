import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0f0718] text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#ff4ecd33,transparent_35%),radial-gradient(circle_at_bottom_right,#facc1533,transparent_35%)]" />
        <div className="absolute top-20 left-10 h-32 w-32 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-40 w-40 rounded-full bg-yellow-400/20 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-pink-100 backdrop-blur-md mb-6">
              🎉 40th Birthday Digital Invitation
            </div>

            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              You Are Invited To
              <span className="block bg-gradient-to-r from-pink-400 via-yellow-300 to-purple-400 bg-clip-text text-transparent">
                Oluwatosin Mary Arokoyo&apos;s 40th Birthday
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-white/75 max-w-xl leading-relaxed">
              Join us as we celebrate a beautiful woman, loving wife, caring
              mother, and amazing blessing to her family — Oluwatosin Mary
              Arokoyo, as she marks her glorious 40th birthday.
            </p>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-md max-w-xl">
              <p className="text-white/70 leading-relaxed">
                This special celebration is lovingly marked by her husband,
                <span className="font-bold text-yellow-300"> Akin Arokoyo</span>,
                together with their wonderful children:
                <span className="font-bold text-pink-300">
                  {" "}
                  Semilore Arokoyo, Ibukun Arokoyo, and Korede Arokoyo.
                </span>
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/invite/oluwatosin-mary-arokoyo-40th-birthday"
                className="rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 px-8 py-4 text-center font-bold text-black shadow-lg shadow-pink-500/25 hover:scale-105 transition"
              >
                View Invitation
              </Link>

              <Link
                href="/create"
                className="rounded-full border border-white/20 bg-white/10 px-8 py-4 text-center font-bold text-white backdrop-blur-md hover:bg-white/20 transition"
              >
                Create Another Invite
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                <h3 className="text-2xl font-black text-yellow-300">40</h3>
                <p className="text-sm text-white/70 mt-1">Years of grace</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                <h3 className="text-2xl font-black text-pink-300">June 6</h3>
                <p className="text-sm text-white/70 mt-1">Birthday date</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                <h3 className="text-2xl font-black text-purple-300">2026</h3>
                <p className="text-sm text-white/70 mt-1">Celebration year</p>
              </div>
            </div>
          </div>

          {/* Right Invitation Preview */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-pink-500/30 to-yellow-400/30 blur-2xl" />

            <div className="relative rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
              <div className="rounded-[1.5rem] bg-[#1a0b2e] overflow-hidden">
                <div className="relative h-80 bg-gradient-to-br from-pink-500 via-purple-700 to-yellow-400 flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/25" />

                  <div className="absolute top-5 left-5 text-5xl">🎈</div>
                  <div className="absolute top-5 right-5 text-5xl">✨</div>
                  <div className="absolute bottom-5 left-5 text-5xl">🎂</div>
                  <div className="absolute bottom-5 right-5 text-5xl">🌸</div>

                  <div className="relative text-center px-6">
                    <p className="text-sm uppercase tracking-[0.35em] text-white/80">
                      You Are Invited
                    </p>

                    <h2 className="mt-4 text-4xl md:text-5xl font-black leading-tight">
                      Oluwatosin Mary Arokoyo
                    </h2>

                    <p className="mt-3 text-2xl font-bold text-yellow-200">
                      40th Birthday Celebration
                    </p>

                    <p className="mt-3 text-white/85">
                      A celebration of life, love, family, and grace.
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-white/10 p-4">
                      <p className="text-xs text-white/50">Date</p>
                      <h3 className="font-bold mt-1">June 6, 2026</h3>
                    </div>

                    <div className="rounded-2xl bg-white/10 p-4">
                      <p className="text-xs text-white/50">Age</p>
                      <h3 className="font-bold mt-1">40 Years</h3>
                    </div>

                    <div className="rounded-2xl bg-white/10 p-4">
                      <p className="text-xs text-white/50">Marked By</p>
                      <h3 className="font-bold mt-1">Akin Arokoyo</h3>
                    </div>

                    <div className="rounded-2xl bg-white/10 p-4">
                      <p className="text-xs text-white/50">Family</p>
                      <h3 className="font-bold mt-1">Arokoyo Family</h3>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl bg-white/10 p-4">
                    <p className="text-xs text-white/50">Children</p>
                    <h3 className="font-bold mt-1 leading-relaxed">
                      Semilore Arokoyo, Ibukun Arokoyo & Korede Arokoyo
                    </h3>
                  </div>

                  <Link
                    href="/invite/oluwatosin-mary-arokoyo-40th-birthday"
                    className="mt-6 block w-full rounded-full bg-gradient-to-r from-yellow-300 to-pink-400 px-6 py-4 text-center font-black text-black hover:scale-105 transition"
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
export type BirthdayInvitation = {
  slug: string;
  celebrantName: string;
  age: string;
  dateOfBirth: string;
  birthdayDate: string; // Celebration Date
  displayDate: string;
  time: string;
  venue: string;
  dressCode: string;
  theme: string;
  heroMessage: string;
  invitationMessage: string;
  celebrantImage?: string;
};

export const birthdayInvitations: BirthdayInvitation[] = [
  {
    slug: "oluwatosin-mary-arokoyo-40th-birthday",

    celebrantName: "Oluwatosin Mary Arokoyo",

    age: "40",

    dateOfBirth: "June 6, 1986",

    birthdayDate: "2026-06-27T16:00:00",

    displayDate: "Saturday, June 27, 2026",

    time: "2:00 PM",

    venue: "Venue will be announced",

    dressCode: "Elegant / Royal Outfit",

    theme:
      "Celebrating 40 Years of Grace, Purpose, Excellence and Blessings",

    celebrantImage: "/images/celebrant.jpg",

    heroMessage:
      "With joy and gratitude to God, you are specially invited to celebrate Oluwatosin Mary Arokoyo as she marks 40 remarkable years of grace, purpose, achievements, blessings, and beautiful memories.",

    invitationMessage:
      "Join us for an unforgettable celebration filled with joy, thanksgiving, laughter, love, elegance, and cherished moments as we honor Oluwatosin Mary Arokoyo on this special milestone.",
  },
];

export function getBirthdayInvitationBySlug(slug: string) {
  return birthdayInvitations.find(
    (invite) => invite.slug === slug
  );
}

export function createBirthdaySlug(name: string) {
  return (
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-") || "birthday-invitation"
  );
}

export const defaultBirthdayInvitation: BirthdayInvitation = {
  slug: "oluwatosin-mary-arokoyo-40th-birthday",

  celebrantName: "Oluwatosin Mary Arokoyo",

  age: "40",

  dateOfBirth: "June 6, 1986",

  birthdayDate: "2026-06-27T16:00:00",

  displayDate: "Saturday, June 27, 2026",

  time: "4:00 PM",

  venue: "Venue will be announced",

  dressCode: "Elegant / Royal Outfit",

  theme:
    "Celebrating 40 Years of Grace, Purpose, Excellence and Blessings",

  celebrantImage: "/images/celebrant.jpg",

  heroMessage:
    "With joy and gratitude to God, you are specially invited to celebrate Oluwatosin Mary Arokoyo as she marks 40 remarkable years of grace, purpose, achievements, blessings, and beautiful memories.",

  invitationMessage:
    "Join us for an unforgettable celebration filled with joy, thanksgiving, laughter, love, elegance, and cherished moments as we honor Oluwatosin Mary Arokoyo on this special milestone.",
};

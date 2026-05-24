export type BirthdayInvitation = {
  slug: string;
  celebrantName: string;
  age: string;
  birthdayDate: string;
  displayDate: string;
  time: string;
  venue: string;
  dressCode: string;
  theme: string;
  heroMessage: string;
  invitationMessage: string;
  celebrantImage?: string;
  familyMessage?: string;
};

export const birthdayInvitations: BirthdayInvitation[] = [
  {
    slug: "oluwatosin-mary-arokoyo",
    celebrantName: "Oluwatosin Mary Arokoyo",
    age: "40",
    birthdayDate: "2026-06-06T16:00:00",
    displayDate: "Saturday, June 6, 2026",
    time: "4:00 PM",
    venue: "Venue will be announced",
    dressCode: "Elegant / Royal Outfit",
    theme: "40 Years of Grace, Love and Blessings",
    celebrantImage: "/images/celebrant.jpg",

    heroMessage:
      "With joy and gratitude to God, we invite you to celebrate a beautiful woman as she marks 40 years of grace, love, beauty, strength, and blessings.",

    invitationMessage:
      "Join us for a joyful celebration filled with thanksgiving, laughter, love, and beautiful memories.",

    familyMessage:
      "The family rejoices with her and joyfully invites you to celebrate this beautiful milestone.",
  },
];

export function getBirthdayInvitationBySlug(slug: string) {
  return birthdayInvitations.find((invite) => invite.slug === slug);
}

export function createBirthdaySlug(name: string) {
  return (
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\\s-]/g, "")
      .replace(/\\s+/g, "-")
      .replace(/-+/g, "-") || "birthday-invitation"
  );
}

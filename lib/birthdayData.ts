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
  husbandName: string;
  children: string[];
  familyName: string;
  heroMessage: string;
  invitationMessage: string;
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
    husbandName: "Akin Arokoyo",
    children: ["Semilore Arokoyo", "Ibukun Arokoyo", "Korede Arokoyo"],
    familyName: "The Arokoyo Family",
    heroMessage:
      "With joy and gratitude to God, we invite you to celebrate a beautiful woman, loving wife, caring mother, and blessing to her family as she marks 40 years of grace, love, beauty, strength, and blessings.",
    invitationMessage:
      "Her loving husband, Akin Arokoyo, together with their wonderful children, Semilore Arokoyo, Ibukun Arokoyo, and Korede Arokoyo, joyfully invite you to share in this special celebration.",
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
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-") || "birthday-invitation"
  );
}
export const shareCopy = {
  kicker: "Add your voice",
  heading: "Share what shifted",
  subhead:
    "Tell us one thing you lead differently now. We’ll add it to the wall to help the next leader — with your first name, role, and only what you approve.",

  promptLabel: "What’s one thing you lead differently now?",
  promptPlaceholder:
    "e.g. I stopped solving my team’s problems for them — now I ask one question and wait.",
  promptHint: "One specific shift is worth more than a paragraph of praise.",

  nameLabel: "First name",
  roleLabel: "Role / title",
  orgLabel: "Organization (optional)",
  emailLabel: "Email (optional — only so we can thank you or verify)",

  allowAudio: true,
  audioLabel: "Prefer to say it? Add a 20–30 second voice note (optional)",

  consentLabel:
    "I’m happy for LTL Pulse to share this publicly with my first name, role, and organization.",

  submitLabel: "Share my voice",
  submittingLabel: "Sending…",

  successHeading: "Thank you — that helps more than you know.",
  successBody:
    "We review every submission before it goes up, so it may take a little time to appear. Welcome to the conversation.",

  errorBody: "Something went wrong sending that. Please try again in a moment.",

  endpoint: "/api/testimonials",
  maxQuoteLength: 280,
};

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
  companyUrlLabel: "Company or profile link (optional)",
  companyUrlPlaceholder: "https://yourcompany.com",

  allowAudio: true,
  audioLabel: "Prefer to say it? Add a 20–30 second voice note (optional)",
  audioHint: "MP3, M4A, or other common audio formats · max 8 MB",

  allowVideo: true,
  videoLabel: "Or share a short video testimonial (optional)",
  videoHint: "20–60 seconds · MP4 or WebM · max 50 MB",

  consentLabel:
    "I’m happy for LTL Pulse to share this publicly with my first name, role, organization, and company link (if provided).",

  submitLabel: "Share my voice",
  submittingLabel: "Sending…",

  successHeading: "Thank you — that helps more than you know.",
  successBody:
    "We review every submission before it goes up, so it may take a little time to appear. Welcome to the conversation.",

  errorBody: "Something went wrong sending that. Please try again in a moment.",

  endpoint: "/api/testimonials",
  maxQuoteLength: 280,
};

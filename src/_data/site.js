// Site-wide settings. Values set to null are still to be supplied by the
// owner; templates render a clearly marked placeholder until they are filled in.
export default {
  name: "High Gear",
  lang: "en",
  description:
    "High Gear is a women's barbershop quartet from Nashua, New Hampshire, and a proud quartet member of Harmony, Inc.",

  // Formspree form ID (the part after https://formspree.io/f/).
  formspreeId: null,
  // Cloudflare Turnstile site key (configured in Formspree's form settings).
  turnstileSiteKey: null,
  // Typical reply time for the Contact page, in days.
  replyDays: null,

  youtubeChannel: null,

  // Owner-supplied images. Paths are relative to the project root, e.g.
  // "src/images/logo.png". Leave null to show a same-size placeholder.
  images: {
    logo: null, // Transparent PNG at 2x (448x256) or SVG. Alt: "High Gear".
    group: null, // Home hero, 4:3.
    groupAlt: null, // Names each member, left to right.
    groupCaption: null,
    performance: null, // Contact page, 4:3.
    performanceAlt: null,
    harmonyLogo: null,
    bhsLogo: null,
  },

  // Home hero intro and About page story.
  intro: null,
  story: [null, null],
};

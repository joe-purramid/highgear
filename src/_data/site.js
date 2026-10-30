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
  // "images/logo.png". Leave null to show a same-size placeholder.
  // performancePosition is CSS object-position: which part of the photo stays
  // visible when it is cropped to fit its 4:3 frame.
  images: {
    logo: null, // Transparent PNG at 2x (448x256) or SVG. Alt: "High Gear".
    group: "images/highgear1.jpg", // Home hero; frame follows the photo's shape.
    groupAlt:
      "High Gear in a studio portrait, left to right: Deb Green, Jennifer Selby, Christina Tramack and Ari Schmidt, smiling in purple gowns and sparkling necklaces.",
    groupCaption: null,
    performance: "images/highgear2.jpg", // Contact page, 4:3 frame.
    performanceAlt:
      "High Gear on a contest stage under blue lights, arm in arm and wearing medals, left to right: Ari Schmidt, Deb Green, Jennifer Selby and Christina Tramack.",
    performancePosition: "50% 5%",
    harmonyLogo: null,
    bhsLogo: null,
  },

  // Home hero intro and About page story.
  intro: null,
  story: [null, null],
};

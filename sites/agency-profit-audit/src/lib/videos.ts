// Video slots for the pre-call watch pages (/watch-before-call, /call-confirmed).
//
// Each value is a Wistia media ID — the token in the media's URL, e.g.
// "f0soy2zz7z" from wistia.com/medias/f0soy2zz7z. Same hosting/player as the
// landing page VSL. The live IDs are checked in below; the matching env var is
// an optional override for swapping a video without a code change (still needs
// a redeploy, since NEXT_PUBLIC_* is inlined at build time). Blank or unset env
// vars fall through to the checked-in ID. An empty ID on both sides renders a
// labelled poster-frame placeholder instead of a player.
//
// Captions: the Wistia web-component player has no embed option for
// captions-on-by-default — toggle "Captions on by default" per video in
// Wistia under Customize > Captions and the embed inherits it.

export const watchVideos = {
  hero: {
    slot: "video-before-the-call",
    mediaId: process.env.NEXT_PUBLIC_VIDEO_BEFORE_THE_CALL || "f0soy2zz7z",
  },
  breakouts: [
    {
      slot: "video-how-we-work",
      mediaId: process.env.NEXT_PUBLIC_VIDEO_HOW_WE_WORK || "zbmaxitlk3",
      label: "How we work with agencies",
    },
    {
      slot: "video-the-reframe",
      mediaId: process.env.NEXT_PUBLIC_VIDEO_THE_REFRAME || "tqgpmqy6nr",
      label: "Why your finance function can't answer your questions",
    },
    {
      slot: "video-who-this-is-for",
      mediaId: process.env.NEXT_PUBLIC_VIDEO_WHO_THIS_IS_FOR || "jxb0a3r2lu",
      label: "Who this is for, and who it is not",
    },
  ],
} as const;

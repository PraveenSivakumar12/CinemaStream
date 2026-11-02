// Centralized utility for OTT streaming platform links and branding

export const OTT_PLATFORMS = [
  {
    id: "netflix",
    name: "Netflix",
    badgeColor: "#E50914",
    textColor: "#FFFFFF",
    icon: "N",
    getUrl: (title) => `https://www.netflix.com/search?q=${encodeURIComponent(title)}`,
  },
  {
    id: "prime",
    name: "Prime Video",
    badgeColor: "#00A8E1",
    textColor: "#FFFFFF",
    icon: "P",
    getUrl: (title) => `https://www.primevideo.com/search/ref=atv_nb_sr?phrase=${encodeURIComponent(title)}`,
  },
  {
    id: "hotstar",
    name: "Disney+ Hotstar",
    badgeColor: "#0F1014",
    border: "1px solid #1f80e0",
    textColor: "#1f80e0",
    icon: "D+",
    getUrl: (title) => `https://www.hotstar.com/in/explore?search_query=${encodeURIComponent(title)}`,
  },
  {
    id: "appletv",
    name: "Apple TV",
    badgeColor: "#1d1d1f",
    textColor: "#FFFFFF",
    icon: "",
    getUrl: (title) => `https://tv.apple.com/search?term=${encodeURIComponent(title)}`,
  },
  {
    id: "youtube",
    name: "YouTube",
    badgeColor: "#FF0000",
    textColor: "#FFFFFF",
    icon: "▶",
    getUrl: (title) => `https://www.youtube.com/results?search_query=${encodeURIComponent(title + " official trailer")}`,
  },
];

export function getOttLinks(title) {
  if (!title) return [];
  return OTT_PLATFORMS.map((platform) => ({
    id: platform.id,
    name: platform.name,
    badgeColor: platform.badgeColor,
    textColor: platform.textColor,
    border: platform.border,
    icon: platform.icon,
    url: platform.getUrl(title),
  }));
}

import type { LucideIcon } from "lucide-react";
import { Heart, Play, RefreshCw, Rocket, TrendingUp, Users } from "lucide-react";

export type HighlightStat = {
  icon: LucideIcon;
  value: string;
  label: string;
};

export type HighlightMedia =
  | { type: "tiktok"; videoId: string; href: string }
  | { type: "tiktok-photo"; postId: string; href: string }
  | { type: "facebook-video"; href: string }
  | {
      type: "facebook-reel";
      href: string;
      posterSrc?: string;
      posterOnly?: boolean;
    };

export type HighlightSatelliteHighlight = {
  icon: LucideIcon;
  label: string;
};

export type HighlightFeaturedChannel = {
  id: string;
  name: string;
  subtitle: string;
  contentTitle: string;
  contentDescription: string;
  caption: string;
  media: HighlightMedia;
  stats: HighlightStat[];
  roles: string[];
};

export type HighlightSatelliteChannel = {
  id: string;
  badge: string;
  name: string;
  subtitle: string;
  description: string;
  highlights: HighlightSatelliteHighlight[];
  captionLines: string[];
  media: HighlightMedia;
  stats: HighlightStat[];
  operationTitle: string;
  operationDescription: string;
  roles: string[];
};

export const HIGHLIGHT_BADGE = "Other Brands";
export const SATELLITE_BADGE = "Kênh vệ tinh";

export const FEATURED_CHANNELS: HighlightFeaturedChannel[] = [
  {
    id: "lac-coffee",
    name: "Lạc Coffee & Desserts",
    subtitle: "F&B · Video viral đa nền tảng",
    contentTitle: "Góc nội dung tiêu biểu",
    contentDescription:
      "Sản xuất video short-form cho thương hiệu trà sữa & dessert; clip tiêu biểu đạt hơn 900.000 lượt xem trên TikTok.",
    caption: "Một ly trà sữa — một câu chuyện nhỏ mỗi ngày ✨",
    media: {
      type: "tiktok",
      videoId: "7569592443268599061",
      href: "https://www.tiktok.com/@laccoffeedesserts2/video/7569592443268599061",
    },
    stats: [
      { icon: Users, value: "500+", label: "Follower" },
      { icon: Play, value: "900K+", label: "Lượt xem" },
      { icon: TrendingUp, value: "9,2%", label: "Tỷ lệ tương tác" },
    ],
    roles: [
      "Lên kế hoạch nội dung",
      "Sản xuất video",
      "Kịch bản short-form",
      "Đăng tải đa kênh",
    ],
  },
  {
    id: "178-grill",
    name: "178 GRILL - Nướng Than Hoa",
    subtitle: "F&B · Nướng than hoa",
    contentTitle: "Góc nội dung tiêu biểu",
    contentDescription:
      "Sản xuất video short-form giới thiệu món nướng và không gian quán — tăng nhận diện thương hiệu trên TikTok.",
    caption: "Hương khói than hoa — vị nướng đậm đà mỗi ngày 🔥",
    media: {
      type: "tiktok",
      videoId: "7635994048246959367",
      href: "https://www.tiktok.com/@178grill_nuongthanhoa/video/7635994048246959367",
    },
    stats: [
      { icon: Users, value: "900+", label: "Follower" },
      { icon: Play, value: "50K+", label: "Lượt xem" },
      { icon: TrendingUp, value: "7,8%", label: "Tỷ lệ tương tác" },
    ],
    roles: [
      "Nội dung F&B",
      "Quay dựng video",
      "Kịch bản short-form",
      "Đăng tải TikTok",
    ],
  },
];

export const SATELLITE_CHANNEL: HighlightSatelliteChannel = {
  id: "caideogicungthich",
  badge: SATELLITE_BADGE,
  name: "Đinh Hương",
  subtitle: "Kênh vệ tinh hỗ trợ dự án F&B",
  description:
    "Kênh tự xây dựng để hỗ trợ các dự án F&B: thử nghiệm góc nội dung, tăng nhận diện thương hiệu và dẫn traffic hỗ trợ cho kênh chính.",
  highlights: [
    { icon: Heart, label: "Thử nghiệm nội dung" },
    { icon: RefreshCw, label: "Tăng nhận diện" },
    { icon: Rocket, label: "Dẫn traffic & hỗ trợ" },
  ],
  captionLines: [
    "Món ngon mỗi ngày",
    "Trải nghiệm vị giác trọn vẹn 😍",
  ],
  media: {
    type: "tiktok-photo",
    postId: "7644186955290332434",
    href: "https://www.tiktok.com/@caideogicungthich/photo/7644186955290332434",
  },
  stats: [
    { icon: Users, value: "100+", label: "Follower" },
    { icon: Play, value: "100K+", label: "Lượt xem" },
    { icon: TrendingUp, value: "6,3%", label: "Tỷ lệ tương tác" },
  ],
  operationTitle: "Vai trò & cách vận hành",
  operationDescription:
    "Tự xây kênh & vận hành nội dung bám sát chiến dịch F&B của khách hàng.",
  roles: [
    "F&B Content",
    "Support Traffic",
    "Brand Seeding",
    "Short-form Video",
  ],
};

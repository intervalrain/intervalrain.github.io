import type { Props } from "astro";
import IconMail from "@/assets/icons/IconMail.svg";
import IconGitHub from "@/assets/icons/IconGitHub.svg";
import IconBrandX from "@/assets/icons/IconBrandX.svg";
import IconLinkedin from "@/assets/icons/IconLinkedin.svg";
import IconFacebook from "@/assets/icons/IconFacebook.svg";
import IconInstagram from "@/assets/icons/IconInstagram.svg";
import IconYouTube from "@/assets/icons/IconYouTube.svg";
import IconWhatsapp from "@/assets/icons/IconWhatsapp.svg";
import IconTelegram from "@/assets/icons/IconTelegram.svg";
import IconPinterest from "@/assets/icons/IconPinterest.svg";
import { SITE } from "@/config";

interface Social {
  name: string;
  href: string;
  linkTitle: string;
  icon: (_props: Props) => Element;
}

export const SOCIALS: Social[] = [
  {
    name: "GitHub",
    href: "https://github.com/intervalrain",
    linkTitle: `${SITE.title} on GitHub`,
    icon: IconGitHub,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/intervalrain",
    linkTitle: `${SITE.title} on LinkedIn`,
    icon: IconLinkedin,
  },
  {
    name: "Facebook",
    href: "https://facebook.com/intervalrain",
    linkTitle: `${SITE.title} on Facebook`,
    icon: IconFacebook,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/intervalrain",
    linkTitle: `${SITE.title} on Instagram`,
    icon: IconInstagram,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UCE0Y75__1fPNJGmwbMG0MSA",
    linkTitle: `${SITE.title} on YouTube`,
    icon: IconYouTube,
  },
] as const;

export const SHARE_LINKS: Social[] = [
  {
    name: "WhatsApp",
    href: "https://wa.me/?text=",
    linkTitle: `Share this post via WhatsApp`,
    icon: IconWhatsapp,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/sharer.php?u=",
    linkTitle: `Share this post on Facebook`,
    icon: IconFacebook,
  },
  {
    name: "X",
    href: "https://x.com/intent/post?url=",
    linkTitle: `Share this post on X`,
    icon: IconBrandX,
  },
  {
    name: "Telegram",
    href: "https://t.me/share/url?url=",
    linkTitle: `Share this post via Telegram`,
    icon: IconTelegram,
  },
  {
    name: "Pinterest",
    href: "https://pinterest.com/pin/create/button/?url=",
    linkTitle: `Share this post on Pinterest`,
    icon: IconPinterest,
  },
  {
    name: "Mail",
    href: "mailto:?subject=See%20this%20post&body=",
    linkTitle: `Share this post via email`,
    icon: IconMail,
  },
] as const;

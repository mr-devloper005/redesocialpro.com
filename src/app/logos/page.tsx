import { LogoShowcase } from "@/components/logos/logo-showcase";
import { buildTaskMetadata } from "@/lib/seo";
import { taskPageMetadata } from "@/config/site.content";

export const revalidate = 3;

export const generateMetadata = () =>
  buildTaskMetadata("logos", {
    path: "/logos",
    title: "Professional Logo Showcase",
    description: "Browse and discover company logos, brand identities, and corporate trademarks from various industries and organizations.",
  });

export default function LogoShowcasePage() {
  return <LogoShowcase />;
}

import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // Ancienne page CMS « Billetterie Particuliers » (module Weezevent de
  // l'édition 2026, terminé) : les anciens liens et favoris mènent à la
  // billetterie unique. Temporaire (307) pour ne pas figer l'adresse.
  async redirects() {
    return [
      { source: "/billetterie/particulier", destination: "/billetterie", permanent: false },
      {
        source: "/:locale(fr|en|es|de|nl|pt|it)/billetterie/particulier",
        destination: "/:locale/billetterie",
        permanent: false,
      },
      // Ancienne page « Devenir exposant » (packs fictifs) : l'offre exposant
      // vit sur /presentation-exposants.
      { source: "/devenez-exposants", destination: "/presentation-exposants", permanent: false },
      {
        source: "/:locale(fr|en|es|de|nl|pt|it)/devenez-exposants",
        destination: "/:locale/presentation-exposants",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mfgounaqnyzwkkjthntq.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

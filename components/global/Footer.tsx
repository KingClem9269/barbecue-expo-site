import { GlobalConfigBlok } from "@/types/storyblok";

import FooterNav from "../nav/FooterNav";
import { LocaleSwitcher } from "../nav/LocaleSwitcher";

const Footer = ({
  data,
  locale,
}: {
  data: GlobalConfigBlok;
  locale: string;
}) => {
  return (
    <footer className="w-full bg-primary text-white p-4 md:p-8 lg:p-16 xl:p-32">
      <div className="">
        <FooterNav footerMenu={data?.footer_menu || []} />
        <div className="mt-8 font-lg">
          <div>{data?.address}</div>
          <div>{data?.phone}</div>
          <div>{data?.email}</div>
        </div>
        <div className="mt-8 flex justify-center">
          <LocaleSwitcher currentLocale={locale} />
        </div>
        <div className="border-t border-white pt-8 text-center text-secondary text-sm mt-4">
          <p>© 2026 BBQ Expo - JPC Events - Site: Studio Stéphane</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

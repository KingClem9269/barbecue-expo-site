import { MenuItemBlok } from "@/types/storyblok";
import FooterNavDrawer from "@/components/nav/FooterNavDrawer";

const FooterNav = ({ footerMenu }: { footerMenu: MenuItemBlok[] }) => {
  return (
    <div className="grid md:grid-cols-4">
      {footerMenu.map((item: MenuItemBlok, index: number) => (
        <FooterNavDrawer item={item} key={index} />
      ))}
    </div>
  );
};

export default FooterNav;

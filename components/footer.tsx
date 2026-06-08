import { bbq_menu } from "@/content/menu";

export function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {bbq_menu.map((item, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4">
                <a href={item.href} className="hover:underline">
                  {item.title}
                </a>
              </h3>
              {item.submenu && (
                <ul className="space-y-2">
                  {item.submenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <a
                        href={subItem.href}
                        className="text-slate-300 hover:text-white text-sm hover:underline"
                      >
                        {subItem.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div className="border-t border-slate-700 pt-8 text-center text-slate-400 text-sm">
          <p>© 2027 BBQ Expo. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}



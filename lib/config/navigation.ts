export const mainNavigation = [
  { key: "shop", href: "/shop" },
  { key: "collections", href: "/collections" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export const footerNavigation = [
  {
    key: "storefront",
    links: [
      { key: "shop", href: "/shop" },
      { key: "collections", href: "/collections" },
      { key: "cartLabel", href: "/cart" },
    ],
  },
  {
    key: "account",
    links: [
      { key: "login", href: "/login" },
      { key: "signup", href: "/signup" },
      { key: "account", href: "/account" },
    ],
  },
  {
    key: "brand",
    links: [
      { key: "about", href: "/about" },
      { key: "contact", href: "/contact" },
      { key: "admin", href: "/admin" },
    ],
  },
] as const;

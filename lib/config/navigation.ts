export const mainNavigation = [
  { title: "Shop", href: "/shop" },
  { title: "Collections", href: "/collections" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
] as const;

export const footerNavigation = [
  {
    title: "Storefront",
    links: [
      { title: "Shop", href: "/shop" },
      { title: "Collections", href: "/collections" },
      { title: "Cart", href: "/cart" },
    ],
  },
  {
    title: "Account",
    links: [
      { title: "Login", href: "/login" },
      { title: "Signup", href: "/signup" },
      { title: "Account", href: "/account" },
    ],
  },
  {
    title: "Brand",
    links: [
      { title: "About", href: "/about" },
      { title: "Contact", href: "/contact" },
      { title: "Admin", href: "/admin" },
    ],
  },
] as const;

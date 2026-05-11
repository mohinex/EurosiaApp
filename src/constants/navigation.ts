export const NAV_LINKS = [
  { name: "Solutions", path: "/solutions", hasDropdown: true },
  { name: "Apps", path: "/apps" },
  { name: "Marketplace", path: "/marketplace" },
  { name: "Pricing", path: "/pricing" },
  { name: "About", path: "/about" },
];

export const SOLUTION_ITEMS = [
  { name: "Enterprise ERP", desc: "For large scale operations", iconName: "Building2" },
  { name: "Managed Cloud", desc: "Global scaling infrastructure", iconName: "Server" },
  { name: "Bank-Grade Security", desc: "High-compliance protection", iconName: "Shield" },
];

export const PAGE_CONFIG: Record<string, { navbarTheme: "dark" | "light" }> = {
  "/": { navbarTheme: "dark" },
  "/solutions": { navbarTheme: "light" },
  "/apps": { navbarTheme: "light" },
  "/marketplace": { navbarTheme: "light" },
  "/pricing": { navbarTheme: "light" },
  "/about": { navbarTheme: "light" },
  "/contact": { navbarTheme: "light" },
};

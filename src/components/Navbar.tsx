import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageToggle from "./LanguageToggle";
import { LayoutDashboard, Users, CreditCard, Cloud, Banknote, Shield, LogOut, Menu, X, Sprout } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { t, lang } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoggedIn = localStorage.getItem("valam_user");

  const navItems = [
    { to: "/dashboard", label: t("dashboard"), icon: LayoutDashboard },
    { to: "/pools", label: t("pools"), icon: Users },
    { to: "/premium", label: t("premium"), icon: CreditCard },
    { to: "/weather", label: t("weather"), icon: Cloud },
    { to: "/payouts", label: t("payouts"), icon: Banknote },
    { to: "/admin", label: t("admin"), icon: Shield },
  ];

  const handleLogout = () => {
    localStorage.removeItem("valam_user");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <Sprout className="h-7 w-7 text-primary" />
          <span className={`text-xl font-bold text-foreground ${lang === "ta" ? "font-tamil" : ""}`}>
            வளம் <span className="text-sm font-normal text-muted-foreground">Valam</span>
          </span>
        </Link>

        {isLoggedIn && (
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === to
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                } ${lang === "ta" ? "font-tamil" : ""}`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2">
          <LanguageToggle />
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="hidden items-center gap-1 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive md:flex"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
          {isLoggedIn && (
            <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}
        </div>
      </div>

      {mobileOpen && isLoggedIn && (
        <div className="border-t border-border bg-background px-4 py-2 md:hidden">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium ${
                location.pathname === to
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              } ${lang === "ta" ? "font-tamil" : ""}`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-destructive"
          >
            <LogOut className="h-4 w-4" />
            {t("logout")}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

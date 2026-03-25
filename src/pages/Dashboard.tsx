import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import { Users, CreditCard, Banknote, Sprout } from "lucide-react";
import WeatherCard from "@/components/WeatherCard";
import RiskMeter from "@/components/RiskMeter";

const Dashboard = () => {
  const { t, lang } = useLanguage();
  const cls = lang === "ta" ? "font-tamil" : "";
  const user = JSON.parse(localStorage.getItem("valam_user") || '{"name":"Farmer"}');

  const actions = [
    { to: "/pools", label: t("joinPool"), icon: Users, color: "bg-primary text-primary-foreground" },
    { to: "/premium", label: t("payPremium"), icon: CreditCard, color: "bg-secondary text-secondary-foreground" },
    { to: "/payouts", label: t("viewPayout"), icon: Banknote, color: "bg-success text-success-foreground" },
  ];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className={`text-2xl font-bold text-foreground ${cls}`}>
          {t("welcomeBack")}, {user.name || "Farmer"} 🌾
        </h1>
      </motion.div>

      {/* Pool info */}
      <div className="mb-6 rounded-xl border border-border bg-card p-5 shadow-card">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2"><Sprout className="h-5 w-5 text-primary" /></div>
          <div>
            <p className={`text-sm text-muted-foreground ${cls}`}>{t("currentPool")}</p>
            <p className="font-semibold text-card-foreground">Tamil Nadu Rice Pool #12</p>
          </div>
          <span className="ml-auto rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">Active</span>
        </div>
      </div>

      <div className="mb-6 grid gap-5 md:grid-cols-2">
        <WeatherCard temperature={32} rainfall={12} humidity={78} location="Thanjavur, TN" />
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <RiskMeter level="medium" />
          <div className="mt-4 rounded-lg bg-warning/10 p-3">
            <p className={`text-sm text-warning ${cls}`}>⚠️ {t("lowRainfall")}</p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="grid gap-4 sm:grid-cols-3">
        {actions.map(({ to, label, icon: Icon, color }, i) => (
          <motion.div key={to} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Link
              to={to}
              className={`flex items-center gap-3 rounded-xl p-4 font-semibold shadow-card transition-all hover:scale-[1.02] hover:shadow-elevated ${color} ${cls}`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

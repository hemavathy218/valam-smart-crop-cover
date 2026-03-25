import { useLanguage } from "@/i18n/LanguageContext";
import { Users, Layers, Cloud, Banknote } from "lucide-react";

const stats = [
  { key: "totalUsers" as const, value: "1,247", icon: Users },
  { key: "poolsCreated" as const, value: "38", icon: Layers },
  { key: "weatherTriggers" as const, value: "12", icon: Cloud },
  { key: "payoutLogs" as const, value: "156", icon: Banknote },
];

const recentPayouts = [
  { user: "Ravi K.", pool: "Rice Pool #12", amount: 8000, date: "2026-03-15" },
  { user: "Lakshmi S.", pool: "Sugarcane Group", amount: 5000, date: "2026-03-14" },
  { user: "Murugan P.", pool: "Cotton Collective", amount: 6000, date: "2026-03-13" },
  { user: "Selvi R.", pool: "Rice Pool #12", amount: 4500, date: "2026-03-12" },
];

const Admin = () => {
  const { t, lang } = useLanguage();
  const cls = lang === "ta" ? "font-tamil" : "";

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className={`mb-6 text-2xl font-bold text-foreground ${cls}`}>{t("admin")}</h1>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ key, value, icon: Icon }) => (
          <div key={key} className="rounded-xl border border-border bg-card p-5 shadow-card">
            <Icon className="mb-2 h-6 w-6 text-primary" />
            <p className="text-2xl font-bold text-card-foreground">{value}</p>
            <p className={`text-sm text-muted-foreground ${cls}`}>{t(key)}</p>
          </div>
        ))}
      </div>

      <h2 className={`mb-4 text-lg font-semibold text-foreground ${cls}`}>{t("payoutLogs")}</h2>
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">User</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Pool</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Amount</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentPayouts.map((p, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="px-4 py-3 text-card-foreground">{p.user}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.pool}</td>
                <td className="px-4 py-3 text-right font-medium text-success">₹{p.amount.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3 text-right text-muted-foreground">{p.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;

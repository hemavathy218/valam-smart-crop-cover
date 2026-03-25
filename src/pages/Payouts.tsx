import { useLanguage } from "@/i18n/LanguageContext";
import { CheckCircle, Clock, ArrowDownCircle } from "lucide-react";

const transactions = [
  { date: "2026-03-15", amount: 8000, status: "credited", reason: "Low rainfall trigger" },
  { date: "2026-02-20", amount: 5000, status: "credited", reason: "Emergency partial payout" },
  { date: "2026-01-10", amount: 3000, status: "pending", reason: "Heavy rain trigger" },
];

const Payouts = () => {
  const { t, lang } = useLanguage();
  const cls = lang === "ta" ? "font-tamil" : "";

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className={`mb-6 text-2xl font-bold text-foreground ${cls}`}>{t("payouts")}</h1>

      {/* Summary */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-success/30 bg-success/5 p-5 text-center">
          <ArrowDownCircle className="mx-auto mb-2 h-8 w-8 text-success" />
          <p className={`text-sm text-muted-foreground ${cls}`}>{t("amountCredited")}</p>
          <p className="text-3xl font-bold text-foreground">₹13,000</p>
        </div>
        <div className="rounded-xl border border-warning/30 bg-warning/5 p-5 text-center">
          <Clock className="mx-auto mb-2 h-8 w-8 text-warning" />
          <p className={`text-sm text-muted-foreground ${cls}`}>{t("pending")}</p>
          <p className="text-3xl font-bold text-foreground">₹3,000</p>
        </div>
      </div>

      <h2 className={`mb-4 text-lg font-semibold text-foreground ${cls}`}>{t("transactionHistory")}</h2>
      <div className="space-y-3">
        {transactions.map((tx, i) => (
          <div key={i} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-soft">
            {tx.status === "credited" ? (
              <CheckCircle className="h-5 w-5 flex-shrink-0 text-success" />
            ) : (
              <Clock className="h-5 w-5 flex-shrink-0 text-warning" />
            )}
            <div className="flex-1">
              <p className="font-medium text-card-foreground">{tx.reason}</p>
              <p className="text-xs text-muted-foreground">{tx.date}</p>
            </div>
            <span className={`font-semibold ${tx.status === "credited" ? "text-success" : "text-warning"}`}>
              ₹{tx.amount.toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payouts;

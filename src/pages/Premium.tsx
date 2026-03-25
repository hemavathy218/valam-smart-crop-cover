import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { CreditCard, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Premium = () => {
  const { t, lang } = useLanguage();
  const cls = lang === "ta" ? "font-tamil" : "";
  const [paid, setPaid] = useState(false);

  return (
    <div className="container mx-auto max-w-md px-4 py-8">
      <h1 className={`mb-6 text-2xl font-bold text-foreground ${cls}`}>{t("premium")}</h1>
      <AnimatePresence mode="wait">
        {!paid ? (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="rounded-xl border border-border bg-card p-6 shadow-elevated"
          >
            <div className="mb-6 text-center">
              <p className={`text-sm text-muted-foreground ${cls}`}>{t("premiumAmount")}</p>
              <p className="mt-1 text-4xl font-bold text-foreground">₹500</p>
              <p className="text-sm text-muted-foreground">per season</p>
            </div>
            <div className="mb-4 rounded-lg bg-muted p-4 text-sm text-muted-foreground">
              <p>Pool: Tamil Nadu Rice Pool #12</p>
              <p>Crop: Rice • Season: Kharif 2026</p>
            </div>
            <button
              onClick={() => setPaid(true)}
              className={`flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-primary-foreground shadow-card transition-all hover:opacity-90 ${cls}`}
            >
              <CreditCard className="h-5 w-5" />
              {t("payViaUpi")}
            </button>
          </motion.div>
        ) : (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl border border-success/30 bg-success/5 p-8 text-center shadow-elevated"
          >
            <CheckCircle className="mx-auto mb-4 h-16 w-16 text-success" />
            <h2 className={`text-xl font-bold text-foreground ${cls}`}>{t("paymentSuccess")}</h2>
            <p className="mt-2 text-muted-foreground">₹500 paid for Kharif 2026</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Premium;

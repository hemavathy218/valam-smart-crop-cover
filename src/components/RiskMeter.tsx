import { useLanguage } from "@/i18n/LanguageContext";

interface RiskMeterProps {
  level: "low" | "medium" | "high";
}

const RiskMeter = ({ level }: RiskMeterProps) => {
  const { t, lang } = useLanguage();

  const config = {
    low: { width: "33%", color: "bg-success", label: t("low") },
    medium: { width: "66%", color: "bg-warning", label: t("medium") },
    high: { width: "100%", color: "bg-destructive", label: t("high") },
  };

  const { width, color, label } = config[level];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className={`text-sm font-medium text-muted-foreground ${lang === "ta" ? "font-tamil" : ""}`}>
          {t("riskMeter")}
        </span>
        <span className={`text-sm font-semibold ${lang === "ta" ? "font-tamil" : ""}`}>{label}</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full ${color} transition-all duration-700`}
          style={{ width }}
        />
      </div>
    </div>
  );
};

export default RiskMeter;

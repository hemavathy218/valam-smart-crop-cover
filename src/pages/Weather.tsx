import { useLanguage } from "@/i18n/LanguageContext";
import WeatherCard from "@/components/WeatherCard";
import { AlertTriangle, CloudRain, Sun } from "lucide-react";

const alerts = [
  { type: "warning", icon: AlertTriangle, text: "Low rainfall detected in Thanjavur district — 30% below average", textTa: "தஞ்சாவூர் மாவட்டத்தில் குறைந்த மழைப்பொழிவு — சராசரியை விட 30% குறைவு" },
  { type: "danger", icon: CloudRain, text: "Heavy rain expected in Cuddalore — flood risk alert", textTa: "கடலூரில் கனமழை எதிர்பார்க்கப்படுகிறது — வெள்ள அபாய எச்சரிக்கை" },
  { type: "info", icon: Sun, text: "Normal conditions in Coimbatore — crops are safe", textTa: "கோயம்புத்தூரில் இயல்பான நிலை — பயிர்கள் பாதுகாப்பாக உள்ளன" },
];

const Weather = () => {
  const { t, lang } = useLanguage();
  const cls = lang === "ta" ? "font-tamil" : "";

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className={`mb-6 text-2xl font-bold text-foreground ${cls}`}>{t("liveWeather")}</h1>
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <WeatherCard temperature={32} rainfall={12} humidity={78} location="Thanjavur" />
        <WeatherCard temperature={28} rainfall={45} humidity={85} location="Cuddalore" />
      </div>

      <h2 className={`mb-4 text-lg font-semibold text-foreground ${cls}`}>{t("riskAlerts")}</h2>
      <div className="space-y-3">
        {alerts.map((alert, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 rounded-xl border p-4 ${
              alert.type === "danger"
                ? "border-destructive/30 bg-destructive/5"
                : alert.type === "warning"
                ? "border-warning/30 bg-warning/5"
                : "border-success/30 bg-success/5"
            }`}
          >
            <alert.icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${
              alert.type === "danger" ? "text-destructive" : alert.type === "warning" ? "text-warning" : "text-success"
            }`} />
            <p className={`text-sm text-foreground ${cls}`}>{lang === "ta" ? alert.textTa : alert.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Weather;

import { useLanguage } from "@/i18n/LanguageContext";
import { Cloud, Droplets, Thermometer } from "lucide-react";

interface WeatherCardProps {
  temperature: number;
  rainfall: number;
  humidity: number;
  location?: string;
}

const WeatherCard = ({ temperature, rainfall, humidity, location }: WeatherCardProps) => {
  const { t, lang } = useLanguage();

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <h3 className={`font-semibold text-card-foreground ${lang === "ta" ? "font-tamil" : ""}`}>
          {t("weatherWidget")}
        </h3>
        {location && <span className="text-xs text-muted-foreground">{location}</span>}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center gap-1 rounded-lg bg-muted p-3">
          <Thermometer className="h-5 w-5 text-destructive" />
          <span className="text-lg font-bold text-card-foreground">{temperature}°C</span>
          <span className={`text-xs text-muted-foreground ${lang === "ta" ? "font-tamil" : ""}`}>{t("temperature")}</span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-lg bg-muted p-3">
          <Droplets className="h-5 w-5 text-info" />
          <span className="text-lg font-bold text-card-foreground">{rainfall} mm</span>
          <span className={`text-xs text-muted-foreground ${lang === "ta" ? "font-tamil" : ""}`}>{t("rainfall")}</span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-lg bg-muted p-3">
          <Cloud className="h-5 w-5 text-primary" />
          <span className="text-lg font-bold text-card-foreground">{humidity}%</span>
          <span className={`text-xs text-muted-foreground ${lang === "ta" ? "font-tamil" : ""}`}>{t("humidity")}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;

import { useLanguage } from "@/i18n/LanguageContext";
import { Globe } from "lucide-react";

const LanguageToggle = () => {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === "en" ? "ta" : "en")}
      className="flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-sm font-medium text-foreground shadow-soft transition-all hover:shadow-card"
    >
      <Globe className="h-4 w-4 text-primary" />
      <span className={lang === "ta" ? "font-tamil" : ""}>{lang === "en" ? "தமிழ்" : "English"}</span>
    </button>
  );
};

export default LanguageToggle;

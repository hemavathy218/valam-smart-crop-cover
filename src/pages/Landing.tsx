import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import { Shield, Cloud, Zap, Globe, Sprout, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-farm.jpg";

const Landing = () => {
  const { t, lang } = useLanguage();
  const cls = lang === "ta" ? "font-tamil" : "";

  const features = [
    { icon: Shield, title: t("feature1Title"), desc: t("feature1Desc") },
    { icon: Cloud, title: t("feature2Title"), desc: t("feature2Desc") },
    { icon: Zap, title: t("feature3Title"), desc: t("feature3Desc") },
    { icon: Globe, title: t("feature4Title"), desc: t("feature4Desc") },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Farmland" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/20" />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="mb-4 flex items-center gap-2">
              <Sprout className="h-8 w-8 text-secondary" />
              <span className="font-tamil text-lg font-bold text-secondary">வளம்</span>
            </div>
            <h1 className={`mb-4 text-4xl font-bold leading-tight text-primary-foreground md:text-6xl ${cls}`}>
              {t("heroTitle")}
            </h1>
            <p className={`mb-8 text-lg text-primary-foreground/80 md:text-xl ${cls}`}>
              {t("heroSubtitle")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/login"
                className={`inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-elevated transition-all hover:scale-105 ${cls}`}
              >
                {t("login")}
              </Link>
              <Link
                to="/register"
                className={`inline-flex items-center gap-2 rounded-xl bg-secondary px-6 py-3 font-semibold text-secondary-foreground shadow-elevated transition-all hover:scale-105 ${cls}`}
              >
                {t("register")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-elevated"
              >
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className={`mb-2 text-lg font-semibold text-card-foreground ${cls}`}>{f.title}</h3>
                <p className={`text-sm text-muted-foreground ${cls}`}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="font-tamil text-sm text-muted-foreground">
            © 2026 வளம் (Valam) — Smart Parametric Insurance Platform
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { User, MapPin, Wheat, Banknote, Users, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const Section = ({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) => (
  <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
    <div className="mb-4 flex items-center gap-2">
      <div className="rounded-lg bg-primary/10 p-2"><Icon className="h-5 w-5 text-primary" /></div>
      <h3 className="font-semibold text-card-foreground">{title}</h3>
    </div>
    <div className="space-y-3">{children}</div>
  </div>
);

const Input = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-muted-foreground">{label}</label>
    <input
      {...props}
      className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
    />
  </div>
);

const Register = () => {
  const { t, lang } = useLanguage();
  const cls = lang === "ta" ? "font-tamil" : "";
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", phone: "", state: "", district: "", village: "",
    cropType: "rice", landSize: "", irrigationType: "rainfed",
    bankUpi: "", ifsc: "", poolPref: "auto",
  });

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [key]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("Please fill required fields");
      return;
    }
    localStorage.setItem("valam_user", JSON.stringify(form));
    toast.success("Registration successful!");
    navigate("/dashboard");
  };

  const crops = ["rice", "wheat", "sugarcane", "cotton", "millets", "groundnut"] as const;

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className={`mb-6 text-2xl font-bold text-foreground ${cls}`}>{t("registerTitle")}</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Section icon={User} title={t("personalDetails")}>
          <Input label={t("fullName")} value={form.name} onChange={set("name")} required />
          <Input label={t("mobileNumber")} type="tel" value={form.phone} onChange={set("phone")} required />
        </Section>

        <Section icon={MapPin} title={t("locationDetails")}>
          <Input label={t("state")} value={form.state} onChange={set("state")} />
          <div className="grid grid-cols-2 gap-3">
            <Input label={t("district")} value={form.district} onChange={set("district")} />
            <Input label={t("village")} value={form.village} onChange={set("village")} />
          </div>
          <button type="button" className="text-sm text-primary underline">{t("autoDetectGps")}</button>
        </Section>

        <Section icon={Wheat} title={t("farmingDetails")}>
          <div>
            <label className="mb-1 block text-sm font-medium text-muted-foreground">{t("cropType")}</label>
            <select
              value={form.cropType}
              onChange={set("cropType")}
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {crops.map((c) => (
                <option key={c} value={c}>{t(c)}</option>
              ))}
            </select>
          </div>
          <Input label={t("landSize")} type="number" value={form.landSize} onChange={set("landSize")} />
          <div>
            <label className="mb-1 block text-sm font-medium text-muted-foreground">{t("irrigationType")}</label>
            <div className="flex gap-4">
              {["rainfed", "borewell"].map((v) => (
                <label key={v} className="flex items-center gap-2 text-sm text-foreground">
                  <input
                    type="radio"
                    name="irrigation"
                    value={v}
                    checked={form.irrigationType === v}
                    onChange={set("irrigationType")}
                    className="accent-primary"
                  />
                  {t(v === "rainfed" ? "rainFed" : "borewell")}
                </label>
              ))}
            </div>
          </div>
        </Section>

        <Section icon={Banknote} title={t("financialDetails")}>
          <Input label={t("bankAccountUpi")} value={form.bankUpi} onChange={set("bankUpi")} />
          <Input label={t("ifscCode")} value={form.ifsc} onChange={set("ifsc")} />
        </Section>

        <Section icon={Users} title={t("poolPreference")}>
          <div className="flex gap-4">
            {["existing", "auto"].map((v) => (
              <label key={v} className="flex items-center gap-2 text-sm text-foreground">
                <input
                  type="radio"
                  name="pool"
                  value={v}
                  checked={form.poolPref === v}
                  onChange={set("poolPref")}
                  className="accent-primary"
                />
                {t(v === "existing" ? "joinExistingPool" : "autoAssignPool")}
              </label>
            ))}
          </div>
        </Section>

        <button
          type="submit"
          className={`flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-primary-foreground shadow-elevated transition-all hover:opacity-90 ${cls}`}
        >
          {t("submit")}
          <ChevronRight className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
};

export default Register;

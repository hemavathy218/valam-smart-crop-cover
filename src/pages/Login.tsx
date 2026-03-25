import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { Sprout, Phone } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const { t, lang } = useLanguage();
  const cls = lang === "ta" ? "font-tamil" : "";
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      toast.error("Enter a valid mobile number");
      return;
    }
    localStorage.setItem("valam_user", JSON.stringify({ phone, name: "Farmer" }));
    toast.success("Login successful!");
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-elevated">
        <div className="mb-6 flex flex-col items-center gap-2">
          <Sprout className="h-10 w-10 text-primary" />
          <h1 className={`text-2xl font-bold text-card-foreground ${cls}`}>{t("login")}</h1>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className={`mb-1 block text-sm font-medium text-muted-foreground ${cls}`}>
              {t("mobileNumber")}
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9876543210"
                className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <button
            type="submit"
            className={`w-full rounded-lg bg-primary py-2.5 font-semibold text-primary-foreground transition-all hover:opacity-90 ${cls}`}
          >
            {t("login")}
          </button>
        </form>
        <p className={`mt-4 text-center text-sm text-muted-foreground ${cls}`}>
          <Link to="/register" className="text-primary underline">{t("register")}</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

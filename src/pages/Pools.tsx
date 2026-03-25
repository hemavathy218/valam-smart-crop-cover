import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Users, Sprout } from "lucide-react";
import { toast } from "sonner";

const mockPools = [
  { id: 1, name: "Tamil Nadu Rice Pool #12", crop: "Rice", members: 45, fund: 225000 },
  { id: 2, name: "Delta Sugarcane Group", crop: "Sugarcane", members: 32, fund: 180000 },
  { id: 3, name: "Coimbatore Cotton Collective", crop: "Cotton", members: 28, fund: 140000 },
  { id: 4, name: "Madurai Millets Alliance", crop: "Millets", members: 20, fund: 95000 },
];

const Pools = () => {
  const { t, lang } = useLanguage();
  const cls = lang === "ta" ? "font-tamil" : "";
  const [joined, setJoined] = useState<number[]>([1]);

  const handleJoin = (id: number) => {
    setJoined([...joined, id]);
    toast.success("Joined pool successfully!");
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className={`mb-6 text-2xl font-bold text-foreground ${cls}`}>{t("pools")}</h1>
      <div className="space-y-4">
        {mockPools.map((pool) => (
          <div key={pool.id} className="rounded-xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-elevated">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2"><Sprout className="h-5 w-5 text-primary" /></div>
                <div>
                  <h3 className="font-semibold text-card-foreground">{pool.name}</h3>
                  <p className="text-sm text-muted-foreground">{pool.crop}</p>
                </div>
              </div>
              {joined.includes(pool.id) ? (
                <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">Joined</span>
              ) : (
                <button
                  onClick={() => handleJoin(pool.id)}
                  className={`rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 ${cls}`}
                >
                  {t("join")}
                </button>
              )}
            </div>
            <div className="mt-4 flex gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {pool.members} {t("members")}</span>
              <span>₹{pool.fund.toLocaleString("en-IN")} {t("totalFund")}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pools;

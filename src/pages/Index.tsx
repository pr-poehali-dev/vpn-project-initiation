import { useState } from "react";
import Icon from "@/components/ui/icon";

const servers = [
  { country: "Нидерланды", city: "Амстердам", flag: "🇳🇱", ping: 12, load: 34, region: "Европа" },
  { country: "Германия", city: "Франкфурт", flag: "🇩🇪", ping: 18, load: 56, region: "Европа" },
  { country: "Франция", city: "Париж", flag: "🇫🇷", ping: 22, load: 41, region: "Европа" },
  { country: "Великобритания", city: "Лондон", flag: "🇬🇧", ping: 28, load: 67, region: "Европа" },
  { country: "США", city: "Нью-Йорк", flag: "🇺🇸", ping: 85, load: 48, region: "Америка" },
  { country: "США", city: "Лос-Анджелес", flag: "🇺🇸", ping: 110, load: 39, region: "Америка" },
  { country: "Канада", city: "Торонто", flag: "🇨🇦", ping: 92, load: 28, region: "Америка" },
  { country: "Япония", city: "Токио", flag: "🇯🇵", ping: 140, load: 52, region: "Азия" },
  { country: "Сингапур", city: "Сингапур", flag: "🇸🇬", ping: 130, load: 45, region: "Азия" },
  { country: "ОАЭ", city: "Дубай", flag: "🇦🇪", ping: 55, load: 30, region: "Азия" },
];

const plans = [
  {
    name: "Free",
    price: "0",
    period: "навсегда",
    color: "cyan",
    border: "border-[rgba(0,245,255,0.2)]",
    glow: "0 0 30px rgba(0,245,255,0.1)",
    btnBg: "bg-transparent border border-[rgba(0,245,255,0.4)] text-[#00f5ff] hover:bg-[rgba(0,245,255,0.1)]",
    badge: null,
    features: [
      { text: "3 сервера на выбор", ok: true },
      { text: "10 ГБ трафика / мес", ok: true },
      { text: "1 устройство", ok: true },
      { text: "Скорость до 10 Мбит/с", ok: true },
      { text: "Без рекламы", ok: false },
      { text: "Приоритетный сервер", ok: false },
      { text: "Поддержка 24/7", ok: false },
    ],
  },
  {
    name: "Pro",
    price: "299",
    period: "в месяц",
    color: "purple",
    border: "border-[rgba(168,85,247,0.5)]",
    glow: "0 0 40px rgba(168,85,247,0.25), 0 0 80px rgba(168,85,247,0.1)",
    btnBg: "bg-gradient-to-r from-[#a855f7] to-[#7c3aed] text-white hover:opacity-90",
    badge: "Популярный",
    features: [
      { text: "Все серверы (50+ стран)", ok: true },
      { text: "Безлимитный трафик", ok: true },
      { text: "5 устройств", ok: true },
      { text: "Скорость до 1 Гбит/с", ok: true },
      { text: "Без рекламы", ok: true },
      { text: "Приоритетный сервер", ok: true },
      { text: "Поддержка 24/7", ok: false },
    ],
  },
  {
    name: "Business",
    price: "999",
    period: "в месяц",
    color: "green",
    border: "border-[rgba(0,255,136,0.2)]",
    glow: "0 0 30px rgba(0,255,136,0.1)",
    btnBg: "bg-transparent border border-[rgba(0,255,136,0.4)] text-[#00ff88] hover:bg-[rgba(0,255,136,0.1)]",
    badge: null,
    features: [
      { text: "Все серверы (50+ стран)", ok: true },
      { text: "Безлимитный трафик", ok: true },
      { text: "Безлимитно устройств", ok: true },
      { text: "Выделенный IP-адрес", ok: true },
      { text: "Без рекламы", ok: true },
      { text: "Приоритетный сервер", ok: true },
      { text: "Поддержка 24/7", ok: true },
    ],
  },
];

export default function Index() {
  const [tab, setTab] = useState<"home" | "servers" | "plans">("home");
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [selectedServer, setSelectedServer] = useState(servers[0]);
  const [filterRegion, setFilterRegion] = useState("Все");

  const regions = ["Все", "Европа", "Америка", "Азия"];

  const filteredServers =
    filterRegion === "Все" ? servers : servers.filter((s) => s.region === filterRegion);

  const handleConnect = () => {
    if (connected) {
      setConnected(false);
      return;
    }
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
    }, 2200);
  };

  const getPingColor = (ping: number) => {
    if (ping < 40) return "text-[#00ff88]";
    if (ping < 80) return "text-yellow-400";
    return "text-orange-400";
  };

  const getLoadColor = (load: number) => {
    if (load < 40) return "#00ff88";
    if (load < 70) return "#facc15";
    return "#fb923c";
  };

  return (
    <div className="min-h-screen bg-mesh font-golos text-white">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,245,255,0.04) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)" }} />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-[rgba(0,245,255,0.08)]"
        style={{ background: "rgba(6,10,16,0.9)", backdropFilter: "blur(20px)" }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #00f5ff, #a855f7)" }}>
            <Icon name="Shield" size={16} className="text-[#060a10]" />
          </div>
          <span className="font-bold text-lg gradient-text">NovaPulse</span>
          <span className="text-xs text-[rgba(0,245,255,0.5)] font-mono-vpn uppercase tracking-widest">VPN</span>
        </div>

        {connected && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
            style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.3)" }}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
            <span className="text-[#00ff88] font-semibold">Подключено</span>
          </div>
        )}

        <div className="flex items-center gap-1 text-xs text-[rgba(255,255,255,0.4)] px-3 py-1.5 rounded-full"
          style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.15)" }}>
          <Icon name="EyeOff" size={12} className="text-[#00ff88]" />
          <span>No-Log</span>
        </div>
      </header>

      {/* Nav Tabs */}
      <nav className="relative z-10 flex gap-0 border-b border-[rgba(0,245,255,0.08)]"
        style={{ background: "rgba(6,10,16,0.7)" }}>
        {(["home", "servers", "plans"] as const).map((t) => {
          const labels = { home: "Главная", servers: "Серверы", plans: "Тарифы" };
          const icons = { home: "Home", servers: "Globe", plans: "Zap" };
          const active = tab === t;
          return (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-medium transition-all relative
                ${active ? "text-[#00f5ff]" : "text-[rgba(255,255,255,0.4)] hover:text-[rgba(255,255,255,0.7)]"}`}>
              <Icon name={icons[t] as any} size={15} />
              {labels[t]}
              {active && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full"
                  style={{ background: "linear-gradient(90deg, transparent, #00f5ff, transparent)" }} />
              )}
            </button>
          );
        })}
      </nav>

      {/* Content */}
      <main className="relative z-10 max-w-md mx-auto px-4 py-6">

        {/* HOME TAB */}
        {tab === "home" && (
          <div className="animate-fade-in-up">
            {/* Server selector */}
            <div className="card-glass rounded-2xl p-4 mb-6 cursor-pointer animate-border-glow"
              onClick={() => setTab("servers")}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedServer.flag}</span>
                  <div>
                    <div className="font-semibold text-white">{selectedServer.country}</div>
                    <div className="text-xs text-[rgba(255,255,255,0.4)]">{selectedServer.city}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-mono-vpn font-bold ${getPingColor(selectedServer.ping)}`}>
                    {selectedServer.ping} мс
                  </span>
                  <Icon name="ChevronRight" size={16} className="text-[rgba(255,255,255,0.3)]" />
                </div>
              </div>
            </div>

            {/* Connect Button */}
            <div className="flex flex-col items-center py-8">
              {/* Outer glow rings */}
              <div className="relative flex items-center justify-center">
                {connected && (
                  <>
                    <div className="absolute w-56 h-56 rounded-full animate-pulse-ring-outer"
                      style={{ border: "1px solid rgba(0,255,136,0.15)" }} />
                    <div className="absolute w-44 h-44 rounded-full animate-pulse-ring"
                      style={{ border: "1px solid rgba(0,255,136,0.25)" }} />
                  </>
                )}
                {connecting && (
                  <>
                    <div className="absolute w-56 h-56 rounded-full animate-rotate-slow"
                      style={{ border: "2px dashed rgba(0,245,255,0.2)" }} />
                    <div className="absolute w-44 h-44 rounded-full animate-rotate-reverse"
                      style={{ border: "1px dashed rgba(168,85,247,0.3)" }} />
                  </>
                )}

                <button onClick={handleConnect}
                  className="connect-btn w-36 h-36 rounded-full flex flex-col items-center justify-center gap-2 font-bold text-sm relative z-10"
                  style={{
                    background: connected
                      ? "radial-gradient(circle, rgba(0,255,136,0.2) 0%, rgba(0,255,136,0.05) 100%)"
                      : connecting
                      ? "radial-gradient(circle, rgba(0,245,255,0.15) 0%, rgba(168,85,247,0.08) 100%)"
                      : "radial-gradient(circle, rgba(0,245,255,0.12) 0%, rgba(168,85,247,0.06) 100%)",
                    border: connected
                      ? "2px solid rgba(0,255,136,0.5)"
                      : "2px solid rgba(0,245,255,0.35)",
                    boxShadow: connected
                      ? "0 0 40px rgba(0,255,136,0.3), 0 0 80px rgba(0,255,136,0.1), inset 0 0 30px rgba(0,255,136,0.05)"
                      : "0 0 30px rgba(0,245,255,0.2), 0 0 60px rgba(0,245,255,0.08), inset 0 0 20px rgba(0,245,255,0.04)",
                  }}>
                  <Icon
                    name={connecting ? "Loader" : connected ? "ShieldCheck" : "Power"}
                    size={32}
                    className={`${connecting ? "animate-spin text-[#00f5ff]" : connected ? "text-[#00ff88] text-glow-green" : "text-[#00f5ff] text-glow-cyan"}`}
                  />
                  <span className={`text-xs font-mono-vpn uppercase tracking-wider ${connected ? "text-[#00ff88]" : "text-[#00f5ff]"}`}>
                    {connecting ? "Подключение" : connected ? "Активно" : "Подключить"}
                  </span>
                </button>
              </div>

              {/* Status text */}
              <div className="mt-6 text-center">
                {connected ? (
                  <div className="animate-fade-in">
                    <p className="text-[#00ff88] font-semibold text-glow-green">Соединение защищено</p>
                    <p className="text-[rgba(255,255,255,0.4)] text-sm mt-1">
                      {selectedServer.city}, {selectedServer.country}
                    </p>
                  </div>
                ) : connecting ? (
                  <div className="animate-fade-in">
                    <p className="text-[#00f5ff] font-semibold">Устанавливаем соединение<span className="animate-blink">_</span></p>
                    <p className="text-[rgba(255,255,255,0.4)] text-sm mt-1">Шифрование AES-256</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-[rgba(255,255,255,0.5)] text-sm">Нажмите для подключения</p>
                    <p className="text-[rgba(255,255,255,0.25)] text-xs mt-1">AES-256 · WireGuard · No-Log</p>
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            {connected && (
              <div className="grid grid-cols-3 gap-3 animate-fade-in-up">
                {[
                  { label: "Загрузка", value: "↓ 48.2", unit: "МБ/с", icon: "ArrowDown", color: "#00f5ff" },
                  { label: "Отдача", value: "↑ 12.1", unit: "МБ/с", icon: "ArrowUp", color: "#a855f7" },
                  { label: "Пинг", value: selectedServer.ping.toString(), unit: "мс", icon: "Activity", color: "#00ff88" },
                ].map((s) => (
                  <div key={s.label} className="card-glass rounded-xl p-3 text-center">
                    <Icon name={s.icon as any} size={14} style={{ color: s.color }} className="mx-auto mb-1" />
                    <div className="font-mono-vpn font-bold text-sm" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-[10px] text-[rgba(255,255,255,0.35)] mt-0.5">{s.unit}</div>
                    <div className="text-[10px] text-[rgba(255,255,255,0.3)]">{s.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Features row */}
            {!connected && !connecting && (
              <div className="grid grid-cols-3 gap-3 mt-2">
                {[
                  { icon: "Lock", label: "AES-256", color: "#00f5ff" },
                  { icon: "EyeOff", label: "No-Log", color: "#a855f7" },
                  { icon: "Zap", label: "WireGuard", color: "#00ff88" },
                ].map((f) => (
                  <div key={f.label} className="card-glass rounded-xl p-3 text-center">
                    <Icon name={f.icon as any} size={18} style={{ color: f.color }} className="mx-auto mb-2" />
                    <div className="text-xs font-semibold" style={{ color: f.color }}>{f.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SERVERS TAB */}
        {tab === "servers" && (
          <div className="animate-fade-in-up">
            {/* Region filter */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
              {regions.map((r) => (
                <button key={r} onClick={() => setFilterRegion(r)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    filterRegion === r
                      ? "text-[#060a10] font-bold"
                      : "text-[rgba(255,255,255,0.45)] hover:text-white"
                  }`}
                  style={{
                    background: filterRegion === r
                      ? "linear-gradient(135deg, #00f5ff, #a855f7)"
                      : "rgba(255,255,255,0.05)",
                    border: filterRegion === r ? "none" : "1px solid rgba(255,255,255,0.08)",
                  }}>
                  {r}
                </button>
              ))}
            </div>

            {/* Server list */}
            <div className="flex flex-col gap-2">
              {filteredServers.map((s, i) => (
                <button key={i} onClick={() => { setSelectedServer(s); setTab("home"); }}
                  className={`server-row w-full card-glass rounded-xl p-4 flex items-center gap-4 text-left transition-all
                    ${selectedServer.city === s.city ? "border-[rgba(0,245,255,0.4)] glow-cyan" : "border-[rgba(255,255,255,0.06)]"}`}
                  style={{
                    border: selectedServer.city === s.city
                      ? "1px solid rgba(0,245,255,0.4)"
                      : "1px solid rgba(255,255,255,0.06)",
                    boxShadow: selectedServer.city === s.city ? "0 0 20px rgba(0,245,255,0.1)" : "none",
                  }}>
                  <span className="text-2xl">{s.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-white">{s.country}</div>
                    <div className="text-xs text-[rgba(255,255,255,0.4)] truncate">{s.city}</div>
                  </div>
                  {/* Load bar */}
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-xs font-mono-vpn font-bold ${getPingColor(s.ping)}`}>{s.ping} мс</span>
                    <div className="w-16 h-1 rounded-full bg-[rgba(255,255,255,0.08)] overflow-hidden">
                      <div className="h-full rounded-full transition-all"
                        style={{ width: `${s.load}%`, background: getLoadColor(s.load) }} />
                    </div>
                    <span className="text-[10px] text-[rgba(255,255,255,0.3)]">{s.load}% нагрузка</span>
                  </div>
                  {selectedServer.city === s.city && (
                    <Icon name="CheckCircle" size={16} className="text-[#00f5ff] flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* PLANS TAB */}
        {tab === "plans" && (
          <div className="animate-fade-in-up">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold gradient-text mb-1">Выберите тариф</h2>
              <p className="text-sm text-[rgba(255,255,255,0.4)]">Без скрытых платежей · Отмена в любой момент</p>
            </div>

            <div className="flex flex-col gap-4">
              {plans.map((plan, i) => (
                <div key={plan.name}
                  className={`relative rounded-2xl p-5 ${plan.border} animate-fade-in-up delay-${i * 100 + 100}`}
                  style={{
                    background: "rgba(13,17,23,0.85)",
                    backdropFilter: "blur(20px)",
                    border: `1px solid ${plan.color === "purple" ? "rgba(168,85,247,0.4)" : plan.color === "cyan" ? "rgba(0,245,255,0.2)" : "rgba(0,255,136,0.2)"}`,
                    boxShadow: plan.glow,
                  }}>
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                      style={{ background: "linear-gradient(135deg, #a855f7, #7c3aed)" }}>
                      {plan.badge}
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-lg font-bold text-white">{plan.name}</div>
                      <div className="text-[rgba(255,255,255,0.35)] text-xs">{plan.period}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono-vpn font-bold text-3xl"
                        style={{
                          color: plan.color === "purple" ? "#a855f7" : plan.color === "cyan" ? "#00f5ff" : "#00ff88",
                          textShadow: plan.color === "purple"
                            ? "0 0 15px rgba(168,85,247,0.6)"
                            : plan.color === "cyan"
                            ? "0 0 15px rgba(0,245,255,0.6)"
                            : "0 0 15px rgba(0,255,136,0.6)",
                        }}>
                        ₽{plan.price}
                      </div>
                      <div className="text-[rgba(255,255,255,0.3)] text-xs">/мес</div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mb-5">
                    {plan.features.map((f, fi) => (
                      <div key={fi} className={`flex items-center gap-2.5 text-sm ${f.ok ? "text-[rgba(255,255,255,0.8)]" : "text-[rgba(255,255,255,0.25)] line-through"}`}>
                        <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            background: f.ok
                              ? plan.color === "purple" ? "rgba(168,85,247,0.2)" : plan.color === "cyan" ? "rgba(0,245,255,0.15)" : "rgba(0,255,136,0.15)"
                              : "rgba(255,255,255,0.05)",
                          }}>
                          {f.ok
                            ? <Icon name="Check" size={10} style={{ color: plan.color === "purple" ? "#a855f7" : plan.color === "cyan" ? "#00f5ff" : "#00ff88" }} />
                            : <Icon name="X" size={10} className="text-[rgba(255,255,255,0.2)]" />
                          }
                        </div>
                        {f.text}
                      </div>
                    ))}
                  </div>

                  <button className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${plan.btnBg}`}>
                    {plan.name === "Free" ? "Начать бесплатно" : `Выбрать ${plan.name}`}
                  </button>
                </div>
              ))}
            </div>

            {/* Bottom note */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[rgba(255,255,255,0.3)]">
              <Icon name="ShieldCheck" size={12} className="text-[#00ff88]" />
              <span>No-Log политика · История не сохраняется</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

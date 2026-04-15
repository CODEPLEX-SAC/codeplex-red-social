import React, { useState } from "react";
import { card, tituloLg, tabClass } from "@/compartido/constantes/estilos.constantes";

/* ── Datos mock ─────────────────────────────────────────── */
const BALANCE        = 1250;
const TOTAL_GANADO   = 3000;
const TOTAL_RETIRADO = 2590;
const NIVEL          = "Diamante";

const CHART_DATA = {
  ganadas:   [90, 55, 107, 80, 93, 170, 140],
  retiradas: [5,   5, 107,  5,  5,   5,   5],
};

const ACTIVIDADES = [
  { label: "Respuesta aceptada",    tiempo: "14:42 · hace un momento", puntos: 25, monedas: 149 },
  { label: "Invitación completada", tiempo: "14:42 · hace un momento", puntos: 25, monedas: 149 },
  { label: "Post destacado",        tiempo: "14:42 · hace un momento", puntos: 25, monedas: 149 },
  { label: "Respuesta aceptada",    tiempo: "14:42 · hace un momento", puntos: 25, monedas: 149 },
];

const RETOS = [
  { label: "Publicar 5 posts",   sub: "3 de 5 completados",    puntos: 50, progreso: 60 },
  { label: "Invitar 3 usuarios", sub: "3/9 · hace un momento", puntos: 50, progreso: 33 },
  { label: "Post destacado",     sub: "14/20",                 puntos: 20, progreso: 70 },
];

const INSIGNIAS = ["Diamante", "100 reacciones", "Nivel Diamante", "Bloqueada"];

const BADGE_SUCCESS = { background: "rgba(16,185,129,0.12)", color: "var(--success-color)" };
const BADGE_PURPLE  = { background: "rgba(139,92,246,0.12)", color: "var(--secondary-color)" };

/* ── Helper: smooth SVG path ────────────────────────────── */
function smoothPath(pts) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = pts[i - 1];
    const [cx, cy] = pts[i];
    const mx = (px + cx) / 2;
    d += ` C ${mx} ${py}, ${mx} ${cy}, ${cx} ${cy}`;
  }
  return d;
}

/* ── Donut chart ────────────────────────────────────────── */
function DonutChart({ balance, total }) {
  const r = 52, cx = 70, cy = 70;
  const circ  = 2 * Math.PI * r;
  const pct   = Math.min(balance / total, 1);
  const dash  = pct * circ;

  return (
    <div className="relative w-[130px] h-[130px] shrink-0">
      <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
        <defs>
          <linearGradient id="donutGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="var(--primary-color)" />
            <stop offset="100%" stopColor="var(--secondary-color)" />
          </linearGradient>
        </defs>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--border-color)" strokeWidth="13" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="url(#donutGrad)" strokeWidth="13"
          strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[20px] font-bold text-[var(--text-dark)] leading-none">{balance.toLocaleString()}</span>
        <span className="text-[8px] font-bold text-[var(--text-muted)] tracking-[0.6px] uppercase mt-[2px]">Balance total</span>
      </div>
    </div>
  );
}

/* ── Line chart ─────────────────────────────────────────── */
function LineChart({ data }) {
  const W = 560, H = 200;
  const PAD = { top: 8, bottom: 10, left: 32, right: 10 };
  const cW = W - PAD.left - PAD.right;
  const cH = H - PAD.top - PAD.bottom;
  const maxVal = 207;
  const n = data.ganadas.length;

  const toX = (i) => PAD.left + (i / (n - 1)) * cW;
  const toY = (v) => PAD.top + cH - (v / maxVal) * cH;
  const botY = toY(0);

  const ptsG = data.ganadas.map((v, i)   => [toX(i), toY(v)]);
  const ptsR = data.retiradas.map((v, i) => [toX(i), toY(v)]);

  const lineG = smoothPath(ptsG);
  const lineR = smoothPath(ptsR);
  const areaG = `${lineG} L ${toX(n-1)} ${botY} L ${toX(0)} ${botY} Z`;
  const areaR = `${lineR} L ${toX(n-1)} ${botY} L ${toX(0)} ${botY} Z`;

  const yLabels = [207, 155, 103, 52, 0];

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[300px]" style={{ height: 200 }}>
        {yLabels.map((v) => (
          <g key={v}>
            <line x1={PAD.left} y1={toY(v)} x2={W - PAD.right} y2={toY(v)}
              stroke="var(--border-color)" strokeWidth="1" strokeDasharray="4 4" />
            <text x={PAD.left - 5} y={toY(v) + 4} textAnchor="end"
              fontSize="10" fill="var(--text-muted)">{v}</text>
          </g>
        ))}
        <path d={areaG} fill="var(--secondary-color)" fillOpacity="0.12" />
        <path d={areaR} fill="#F59E0B"               fillOpacity="0.12" />
        <path d={lineG} fill="none" stroke="var(--secondary-color)" strokeWidth="2.5" />
        <path d={lineR} fill="none" stroke="#F59E0B"               strokeWidth="2.5" />
        {ptsG.map(([x, y], i) => (
          <circle key={`g${i}`} cx={x} cy={y} r="5"
            fill="var(--white-color)" stroke="var(--secondary-color)" strokeWidth="2.5" />
        ))}
        {ptsR.map(([x, y], i) => (
          <circle key={`r${i}`} cx={x} cy={y} r="5"
            fill="var(--white-color)" stroke="#F59E0B" strokeWidth="2.5" />
        ))}
      </svg>
    </div>
  );
}

/* ── Icono check circular ───────────────────────────────── */
function IconCheck({ color = "var(--secondary-color)" }) {
  return (
    <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
      style={{ background: `${color}22` }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  );
}

/* ── Componente principal ───────────────────────────────── */
function Monedero() {
  const [tab, setTab] = useState("inicio");

  return (
    <div className="flex flex-col gap-5 max-w-[860px] mx-auto w-full">

      {/* Título */}
      <div>
        <h1 className="text-[24px] font-bold text-[var(--text-dark)] m-0">Mi Monedero</h1>
        <p className="text-[13px] text-[var(--text-muted)] m-0 mt-1">Gestiona tus monedas, recompensas y retiros</p>
      </div>

      {/* Balance card */}
      <div className={`${card} flex items-center gap-5 flex-wrap`}>
        <DonutChart balance={BALANCE} total={TOTAL_GANADO} />
        <div className="flex flex-col gap-[6px] min-w-0">
          <p className="text-[10px] font-bold text-[var(--text-muted)] tracking-[0.6px] uppercase m-0">Balance Total</p>
          <p className="text-[15px] font-semibold text-[var(--text-dark)] m-0">Monedas acumuladas en la red social</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {["↑+45 hoy", "↑+320 este mes", "100 disponibles para retirar"].map((b) => (
              <span key={b} className="px-[8px] py-[3px] rounded-full text-[11px] font-semibold"
                style={BADGE_SUCCESS}>{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4 [@media(max-width:560px)]:grid-cols-1 [@media(max-width:800px)]:grid-cols-1 sm:grid-cols-3">
        {/* Total ganado */}
        <div className={card}>
          <p className="text-[12px] text-[var(--text-muted)] m-0">Total ganado</p>
          <p className="text-[28px] font-bold text-[var(--text-dark)] m-0 leading-tight mt-1">{TOTAL_GANADO.toLocaleString()}</p>
          <p className="text-[12px] text-[var(--text-muted)] m-0 mb-2">monedas</p>
          <span className="px-[8px] py-[3px] rounded-full text-[11px] font-semibold" style={BADGE_SUCCESS}>↑+180 esta semana</span>
        </div>
        {/* Retirado */}
        <div className={card}>
          <p className="text-[12px] text-[var(--text-muted)] m-0">Retirado anteriormente</p>
          <p className="text-[28px] font-bold text-[var(--text-dark)] m-0 leading-tight mt-1">{TOTAL_RETIRADO.toLocaleString()}</p>
          <p className="text-[12px] text-[var(--text-muted)] m-0 mb-2">monedas</p>
          <span className="px-[8px] py-[3px] rounded-full text-[11px] font-semibold" style={BADGE_SUCCESS}>+4 retiros realizados</span>
        </div>
        {/* Nivel */}
        <div className={card}>
          <p className="text-[12px] text-[var(--text-muted)] m-0">Nivel actual</p>
          <p className="text-[28px] font-bold m-0 leading-tight mt-1" style={{ color: "var(--secondary-color)" }}>{NIVEL}</p>
          <div className="mt-2">
            <span className="px-[8px] py-[3px] rounded-full text-[11px] font-semibold" style={BADGE_PURPLE}>+20% extra</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[var(--border-color)]">
        <div className="flex">
          {[["inicio", "Inicio"], ["historial", "Historial"], ["retirar", "Retirar"]].map(([id, label]) => (
            <button key={id} className={tabClass(tab === id)} onClick={() => setTab(id)}>{label}</button>
          ))}
        </div>
      </div>

      {/* ── Tab: Inicio ── */}
      {tab === "inicio" && (
        <>
          {/* Gráfico */}
          <div className={card}>
            <div className="flex items-center gap-5 mb-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="w-[10px] h-[10px] rounded-full" style={{ background: "var(--secondary-color)" }} />
                <span className="text-[12px] text-[var(--text-muted)]">Monedas ganadas</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-[10px] h-[10px] rounded-full bg-[#F59E0B]" />
                <span className="text-[12px] text-[var(--text-muted)]">Monedas retiradas</span>
              </div>
            </div>
            <LineChart data={CHART_DATA} />
          </div>

          {/* Actividades */}
          <div className={card}>
            <h4 className={`${tituloLg} mb-3`}>Actividades</h4>
            {ACTIVIDADES.map((a, i) => (
              <div key={i} className="flex items-center gap-3 py-3 border-b border-[var(--border-color)] last:border-b-0">
                <IconCheck />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-[var(--text-dark)] m-0">{a.label}</p>
                  <p className="text-[11px] text-[var(--text-muted)] m-0">{a.tiempo}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[13px] font-bold m-0" style={{ color: "var(--secondary-color)" }}>+{a.puntos}</p>
                  <p className="text-[11px] text-[var(--text-muted)] m-0">+{a.monedas} monedas</p>
                </div>
              </div>
            ))}
          </div>

          {/* Retos activos */}
          <div>
            <h4 className={`${tituloLg} mb-3`} style={{ color: "var(--secondary-color)" }}>Retos activos</h4>
            <div className="grid grid-cols-3 gap-4 [@media(max-width:600px)]:grid-cols-1">
              {RETOS.map((r, i) => (
                <div key={i} className={`${card} flex flex-col gap-2`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-[var(--text-dark)] m-0">{r.label}</p>
                      <p className="text-[11px] text-[var(--text-muted)] m-0 mt-[2px]">{r.sub}</p>
                    </div>
                    <span className="text-[14px] font-bold shrink-0" style={{ color: "var(--secondary-color)" }}>+{r.puntos}</span>
                  </div>
                  <div className="h-[5px] rounded-full overflow-hidden bg-[var(--border-color)]">
                    <div className="h-full rounded-full" style={{ width: `${r.progreso}%`, background: "var(--gradient-primary)" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insignias */}
          <div>
            <h4 className={`${tituloLg} mb-3`} style={{ color: "var(--secondary-color)" }}>Insignias obtenidas</h4>
            <div className="grid grid-cols-4 gap-4 [@media(max-width:500px)]:grid-cols-2">
              {INSIGNIAS.map((ins, i) => (
                <div key={i} className={`${card} flex flex-col items-center gap-2 py-5`}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={BADGE_PURPLE}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                      stroke="var(--secondary-color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="text-[12px] font-semibold text-[var(--text-dark)] m-0 text-center leading-tight">{ins}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ── Tab: Historial ── */}
      {tab === "historial" && (
        <div className={`${card} flex flex-col items-center gap-2 py-14 text-center`}>
          <p className="text-[15px] font-bold text-[var(--text-dark)] m-0">Historial de movimientos</p>
          <p className="text-[13px] text-[var(--text-muted)] m-0">Aquí verás todos tus movimientos de monedas</p>
        </div>
      )}

      {/* ── Tab: Retirar ── */}
      {tab === "retirar" && (
        <div className={`${card} flex flex-col items-center gap-2 py-14 text-center`}>
          <p className="text-[15px] font-bold text-[var(--text-dark)] m-0">Retirar monedas</p>
          <p className="text-[13px] text-[var(--text-muted)] m-0">Próximamente podrás retirar tus monedas</p>
        </div>
      )}

    </div>
  );
}

export default Monedero;

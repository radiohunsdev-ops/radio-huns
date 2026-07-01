"use client"

import { useState, useEffect, useMemo, useRef } from "react";
import { Mic2, X, Clock, CalendarDays } from "lucide-react";

// All shows are currently Music, so category styling/legend has been
// removed for now. Re-introduce categoryStyle + deriveCategory if the
// API starts returning mixed show types again.
const showStyle = {
  bg: "bg-gradient-to-br from-[#2A0E07] to-[#210B05]",
  border: "border-[#F2B24D]/25",
  accent: "#F2B24D",
};

const liveAccent = "#E2703A";

// ---- Shape coming back from getActiveSchedule() ----
type ApiSchedule = {
  id: string;
  title: string;
  shortDescription?: string | null;
  dj: string;
  image?: unknown;
  day: string; // e.g. "saturday" (lowercase)
  startTime: string; // e.g. "15.00 " (dot-separated, may have trailing space)
  endTime: string; // e.g. "16.00"
  active?: boolean | null;
  slug?: string | null;
};

type Show = {
  id: string;
  day: string; // "Saturday"
  start: string; // "15:00"
  end: string; // "16:00"
  title: string;
  host: string;
  description?: string | null;
};

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// ---- Normalizers for the API's raw formatting ----

// "15.00 " / "9.00" / "15:00" -> "15:00"
function normalizeTime(raw: string): string {
  const clean = raw.trim().replace(/\./g, ":");
  const [h, m = "00"] = clean.split(":");
  return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
}

// "saturday" -> "Saturday"
function normalizeDay(raw: string): string {
  const clean = raw.trim().toLowerCase();
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}

function toShow(item: ApiSchedule): Show {
  return {
    id: item.id,
    day: normalizeDay(item.day),
    start: normalizeTime(item.startTime),
    end: normalizeTime(item.endTime),
    title: item.title,
    host: item.dj,
    description: item.shortDescription ?? null,
  };
}

function getCurrentTime() {
  const now = new Date();
  return now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0");
}
function getCurrentDay() {
  return new Date().toLocaleDateString("en-US", { weekday: "long" });
}

// ---- Signature element: a tiny equalizer, used anywhere "on air" needs
// to be communicated. Idle (animate=false) it reads as a station mark;
// animated, it reads as "playing right now". ----
function EqBars({ animate = true, className = "" }: { animate?: boolean; className?: string }) {
  return (
    <span className={`eq ${animate ? "eq-live" : "eq-idle"} ${className}`} aria-hidden="true">
      <span className="eq-bar" style={{ animationDelay: "0ms" }} />
      <span className="eq-bar" style={{ animationDelay: "160ms" }} />
      <span className="eq-bar" style={{ animationDelay: "80ms" }} />
      <span className="eq-bar" style={{ animationDelay: "230ms" }} />
    </span>
  );
}

// ---- Detail modal ----
function ShowModal({ show, isLive, onClose }: { show: Show; isLive: boolean; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="show-modal-title"
    >
      <div
        className="relative w-full max-w-sm rounded-2xl border border-[#F2B24D]/25 bg-linear-to-b from-[#230C06] to-[#1A0703] p-5 shadow-2xl shadow-black/60 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#F2B24D]/50 to-transparent" />

        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {isLive && (
          <span
            className="mb-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#1A0502] shadow"
            style={{ backgroundColor: liveAccent }}
          >
            <EqBars animate className="text-[#1A0502]" />
            On air
          </span>
        )}

        <h2 id="show-modal-title" className="font-display text-lg font-semibold leading-snug text-white sm:text-xl">
          {show.title}
        </h2>

        <p className="mt-3 flex items-center gap-1.5 font-mono-radio text-[11px] uppercase tracking-wide text-white/50">
          <Mic2 className="h-3.5 w-3.5 shrink-0" />
          {show.host}
        </p>

        <p className="mt-1.5 flex items-center gap-1.5 font-mono-radio text-[11px] uppercase tracking-wide text-white/50">
          <CalendarDays className="h-3.5 w-3.5 shrink-0" />
          {show.day}
        </p>

        <p className="mt-1.5 flex items-center gap-1.5 font-mono-radio text-[11px] uppercase tracking-wide text-white/50">
          <Clock className="h-3.5 w-3.5 shrink-0" />
          {show.start} – {show.end}
        </p>

        {show.description && (
          <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-relaxed text-white/70">
            {show.description}
          </p>
        )}
      </div>
    </div>
  );
}

// ---- Mobile card (used in the per-day list view) ----
function ShowCard({ show, isLive, onSelect }: { show: Show; isLive: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative w-full rounded-xl border-l-2 ${showStyle.border} ${showStyle.bg} px-4 py-3.5 text-left backdrop-blur-sm transition-all duration-300 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B24D]/70 ${
        isLive ? "border-l-[3px]" : ""
      }`}
      style={{ borderLeftColor: isLive ? liveAccent : showStyle.accent }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-sm font-semibold leading-snug text-white">{show.title}</h3>
          <p className="mt-1 flex items-center gap-1 font-body text-[12px] text-white/50">
            <Mic2 className="h-3 w-3 shrink-0" />
            <span className="truncate">{show.host}</span>
          </p>
        </div>

        {isLive ? (
          <span
            className="flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 font-mono-radio text-[9px] font-semibold uppercase tracking-wide text-[#1A0502] shadow"
            style={{ backgroundColor: liveAccent }}
          >
            <EqBars animate className="text-[#1A0502]" />
            Live
          </span>
        ) : (
          <span className="shrink-0 font-mono-radio text-[11px] tracking-wide text-white/35">
            {show.start}
          </span>
        )}
      </div>

      {isLive && (
        <p className="mt-2 font-mono-radio text-[10px] tracking-wide text-white/35">
          {show.start} – {show.end}
        </p>
      )}
    </button>
  );
}

export default function WeeklySchedule({ schedules = [] as ApiSchedule[] }: { schedules?: ApiSchedule[] }) {
  const [now, setNow] = useState({ day: getCurrentDay(), time: getCurrentTime() });
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [selectedDay, setSelectedDay] = useState(getCurrentDay());
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => setNow({ day: getCurrentDay(), time: getCurrentTime() }), 30000);
    return () => clearInterval(id);
  }, []);

  // ---- Scroll this section into view when arriving via #weekly-schedule ----
  useEffect(() => {
    if (typeof window === "undefined") return;

    const scrollIfHashMatches = () => {
      if (window.location.hash === "#weekly-schedule" && rootRef.current) {
        requestAnimationFrame(() => {
          rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    };

    // Handles: full page load at /schedules#weekly-schedule
    scrollIfHashMatches();

    // Handles: client-side navigation where the hash changes but the page
    // (and this component) is already mounted
    window.addEventListener("hashchange", scrollIfHashMatches);
    return () => window.removeEventListener("hashchange", scrollIfHashMatches);
  }, []);

  const shows = useMemo(() => {
    return (schedules ?? [])
      .filter((s) => s.active !== false)
      .map(toShow);
  }, [schedules]);

  const times = useMemo(() => {
    const unique = Array.from(new Set(shows.map((s) => s.start)));
    return unique.sort((a, b) => a.localeCompare(b));
  }, [shows]);

  const scheduleMap = useMemo(() => {
    const map = new Map<string, Show>();
    shows.forEach((s) => map.set(`${s.day}-${s.start}`, s));
    return map;
  }, [shows]);

  const dayShows = useMemo(() => {
    return shows
      .filter((s) => s.day === selectedDay)
      .sort((a, b) => a.start.localeCompare(b.start));
  }, [shows, selectedDay]);

  const selectedIsLive =
    !!selectedShow &&
    now.day === selectedShow.day &&
    now.time >= selectedShow.start &&
    now.time < selectedShow.end;

  return (
    <div
      id="weekly-schedule"
      ref={rootRef}
      className="radio-schedule min-h-screen w-full scroll-mt-20 bg-[#150502] p-4 font-body text-white sm:p-6 lg:p-8"
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap");

        .font-display {
          font-family: "Space Grotesk", ui-sans-serif, sans-serif;
        }
        .font-body {
          font-family: "Inter", ui-sans-serif, sans-serif;
        }
        .font-mono-radio {
          font-family: "JetBrains Mono", ui-monospace, monospace;
        }

        .radio-schedule {
          background-image:
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(242, 178, 77, 0.12), transparent),
            radial-gradient(ellipse 60% 40% at 100% 110%, rgba(226, 112, 58, 0.08), transparent);
        }

        .eq {
          display: inline-flex;
          align-items: flex-end;
          gap: 2px;
          height: 10px;
          width: 12px;
        }
        .eq-bar {
          width: 2px;
          background: currentColor;
          border-radius: 1px;
          height: 30%;
        }
        .eq-idle .eq-bar {
          height: 45%;
          opacity: 0.6;
        }
        .eq-live .eq-bar {
          animation: eqBounce 0.9s ease-in-out infinite;
        }
        @keyframes eqBounce {
          0%,
          100% {
            height: 20%;
          }
          50% {
            height: 100%;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .eq-live .eq-bar {
            animation: none;
            height: 65%;
          }
        }

        .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col items-center gap-3 text-center sm:mb-8">
          <div className="flex items-center gap-2 rounded-full border border-[#F2B24D]/25 bg-[#F2B24D]/5 px-4 py-1.5 font-mono-radio text-[10px] uppercase tracking-[0.25em] text-[#F2B24D]/80">
            <EqBars animate={false} />
            On air all week
          </div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Weekly Broadcast Schedule
          </h1>
          <p className="max-w-md font-body text-sm text-white/40">
            Right now:{" "}
            <span className="font-mono-radio font-medium text-[#F2B24D]/90">
              {now.day} · {now.time}
            </span>
          </p>
        </div>

        {shows.length === 0 ? (
          <div className="flex min-h-[30vh] w-full flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/2 p-8 text-center">
            <EqBars animate={false} className="text-white/30" />
            <p className="font-body text-sm text-white/40">
              No schedule available right now. Check back once shows are published.
            </p>
          </div>
        ) : (
          <>
            {/* ---- Mobile / small-tablet view: day tabs + vertical list ---- */}
            <div className="md:hidden">
              <div className="no-scrollbar -mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-1">
                {days.map((day) => {
                  const isToday = day === now.day;
                  const isSelected = day === selectedDay;
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setSelectedDay(day)}
                      className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 font-mono-radio text-[11px] font-medium uppercase tracking-wide transition-colors ${
                        isSelected
                          ? "bg-[#F2B24D] text-[#1A0502]"
                          : "border border-white/10 bg-white/3 text-white/60"
                      }`}
                    >
                      {day.slice(0, 3)}
                      {isToday && (
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: isSelected ? "#1A0502" : liveAccent }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {dayShows.length === 0 ? (
                <div className="flex min-h-[20vh] w-full flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/2 p-6 text-center">
                  <EqBars animate={false} className="text-white/30" />
                  <p className="font-body text-sm text-white/40">No shows scheduled for {selectedDay}.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2.5">
                  {dayShows.map((show) => {
                    const isLive = now.day === show.day && now.time >= show.start && now.time < show.end;
                    return (
                      <ShowCard
                        key={show.id}
                        show={show}
                        isLive={isLive}
                        onSelect={() => setSelectedShow(show)}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            {/* ---- Tablet / desktop view: full weekly grid ---- */}
            <div className="hidden overflow-x-auto rounded-2xl border border-white/10 bg-white/2 shadow-2xl shadow-black/40 backdrop-blur-xl md:block">
              <div
                className="grid min-w-225"
                style={{ gridTemplateColumns: "80px repeat(7, minmax(120px,1fr))" }}
              >
                {/* Corner */}
                <div className="sticky left-0 top-0 z-30 flex items-center justify-center border-b border-r border-white/10 bg-[#160604]/95 p-3 font-mono-radio text-[10px] font-medium uppercase tracking-wider text-white/40 backdrop-blur-xl">
                  Time
                </div>

                {days.map((day) => (
                  <div
                    key={day}
                    className={`border-b border-r border-white/10 p-2.5 text-center font-display text-xs font-semibold backdrop-blur-xl transition-colors lg:p-3 lg:text-sm ${
                      day === now.day ? "bg-[#F2B24D]/10 text-[#F2B24D]" : "bg-[#160604]/95 text-white/70"
                    }`}
                  >
                    <span className="lg:hidden">{day.slice(0, 3)}</span>
                    <span className="hidden lg:inline">{day}</span>
                    {day === now.day && (
                      <div
                        className="mx-auto mt-1.5 h-0.5 w-6 rounded-full"
                        style={{ background: `linear-gradient(90deg, ${showStyle.accent}, ${liveAccent})` }}
                      />
                    )}
                  </div>
                ))}

                {times.map((time) => (
                  <div key={time} className="contents">
                    <div className="sticky left-0 z-20 flex items-center justify-center gap-1 border-b border-r border-white/10 bg-[#160604]/95 p-2 font-mono-radio text-[10px] text-white/40 backdrop-blur-xl lg:text-[11px]">
                      <span className="hidden text-white/20 lg:inline">–</span>
                      {time}
                    </div>

                    {days.map((day) => {
                      const show = scheduleMap.get(`${day}-${time}`);

                      if (!show) {
                        return (
                          <div
                            key={`${day}-${time}`}
                            className="min-h-23 border-b border-r border-white/5 bg-white/1"
                          />
                        );
                      }

                      const isLive =
                        now.day === show.day && now.time >= show.start && now.time < show.end;

                      return (
                        <div key={show.id} className="min-h-23 border-b border-r border-white/5 p-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedShow(show)}
                            className={`group relative h-full w-full rounded-xl border-l-2 ${showStyle.border} ${showStyle.bg} py-2.5 pl-3 pr-2.5 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B24D]/70 ${
                              isLive ? "border-l-[3px]" : ""
                            }`}
                            style={{ borderLeftColor: isLive ? liveAccent : showStyle.accent }}
                          >
                            {isLive && (
                              <span
                                className="absolute -top-2 right-2 flex items-center gap-1 rounded-full px-2 py-0.5 font-mono-radio text-[9px] font-semibold uppercase tracking-wide text-[#1A0502] shadow"
                                style={{ backgroundColor: liveAccent }}
                              >
                                <EqBars animate className="text-[#1A0502]" />
                                Live
                              </span>
                            )}

                            <h3 className="font-display text-[12px] font-semibold leading-snug text-white lg:text-[12.5px]">
                              {show.title}
                            </h3>

                            <p className="mt-1 flex items-center gap-1 font-body text-[10.5px] text-white/50 lg:text-[11px]">
                              <Mic2 className="h-3 w-3 shrink-0" />
                              <span className="truncate">{show.host}</span>
                            </p>

                            <p className="mt-1.5 font-mono-radio text-[10px] tracking-wide text-white/35">
                              {show.start} – {show.end}
                            </p>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {selectedShow && (
        <ShowModal show={selectedShow} isLive={selectedIsLive} onClose={() => setSelectedShow(null)} />
      )}
    </div>
  );
}
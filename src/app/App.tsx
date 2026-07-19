import { useState, useMemo } from "react";
import { Chrome as Home, ChartBar as BarChart2, BookOpen, Map, ChevronLeft, Check, Plus, Minus, Search, X } from "lucide-react";
import "../styles/index.css";

// ── Course database ───────────────────────────────────────────────────────────

interface CourseHole { par: 3 | 4 | 5; yards: number }
interface Course { id: string; name: string; location: string; holes: CourseHole[] }

const COURSES: Course[] = [
  {
    id: "st-andrews-old",
    name: "St Andrews Old Course",
    location: "St Andrews, Scotland",
    holes: [
      {par:4,yards:376},{par:4,yards:453},{par:4,yards:371},{par:4,yards:480},{par:5,yards:568},
      {par:4,yards:412},{par:4,yards:371},{par:3,yards:175},{par:4,yards:352},{par:4,yards:380},
      {par:3,yards:174},{par:4,yards:348},{par:4,yards:465},{par:5,yards:618},{par:4,yards:456},
      {par:4,yards:418},{par:4,yards:495},{par:4,yards:357},
    ],
  },
  {
    id: "augusta-national",
    name: "Augusta National",
    location: "Augusta, Georgia, USA",
    holes: [
      {par:4,yards:445},{par:5,yards:575},{par:4,yards:350},{par:3,yards:240},{par:4,yards:455},
      {par:3,yards:180},{par:4,yards:450},{par:5,yards:570},{par:4,yards:460},{par:4,yards:495},
      {par:4,yards:505},{par:3,yards:155},{par:5,yards:510},{par:4,yards:440},{par:5,yards:550},
      {par:3,yards:170},{par:4,yards:440},{par:4,yards:465},
    ],
  },
  {
    id: "pebble-beach",
    name: "Pebble Beach Golf Links",
    location: "Pebble Beach, California, USA",
    holes: [
      {par:4,yards:381},{par:5,yards:502},{par:4,yards:390},{par:4,yards:331},{par:3,yards:195},
      {par:5,yards:513},{par:3,yards:106},{par:4,yards:431},{par:4,yards:466},{par:4,yards:446},
      {par:4,yards:380},{par:3,yards:202},{par:4,yards:399},{par:5,yards:573},{par:4,yards:397},
      {par:4,yards:402},{par:3,yards:208},{par:5,yards:543},
    ],
  },
  {
    id: "wentworth-west",
    name: "Wentworth West Course",
    location: "Virginia Water, England",
    holes: [
      {par:4,yards:471},{par:3,yards:155},{par:4,yards:452},{par:5,yards:501},{par:3,yards:191},
      {par:4,yards:344},{par:4,yards:399},{par:4,yards:398},{par:4,yards:450},{par:3,yards:186},
      {par:4,yards:376},{par:5,yards:483},{par:4,yards:441},{par:3,yards:179},{par:4,yards:466},
      {par:4,yards:380},{par:5,yards:571},{par:4,yards:502},
    ],
  },
  {
    id: "sunningdale-old",
    name: "Sunningdale Old Course",
    location: "Sunningdale, England",
    holes: [
      {par:4,yards:494},{par:4,yards:453},{par:3,yards:296},{par:4,yards:161},{par:4,yards:415},
      {par:3,yards:415},{par:4,yards:402},{par:4,yards:172},{par:4,yards:267},{par:4,yards:478},
      {par:4,yards:325},{par:4,yards:451},{par:3,yards:185},{par:4,yards:509},{par:3,yards:226},
      {par:4,yards:438},{par:4,yards:421},{par:4,yards:432},
    ],
  },
  {
    id: "royal-birkdale",
    name: "Royal Birkdale",
    location: "Southport, England",
    holes: [
      {par:4,yards:449},{par:4,yards:421},{par:4,yards:407},{par:3,yards:203},{par:4,yards:346},
      {par:4,yards:480},{par:3,yards:177},{par:4,yards:457},{par:4,yards:411},{par:4,yards:403},
      {par:3,yards:408},{par:4,yards:183},{par:4,yards:499},{par:3,yards:201},{par:4,yards:542},
      {par:4,yards:439},{par:5,yards:547},{par:4,yards:473},
    ],
  },
  {
    id: "muirfield",
    name: "Muirfield",
    location: "East Lothian, Scotland",
    holes: [
      {par:4,yards:448},{par:3,yards:351},{par:4,yards:379},{par:3,yards:180},{par:5,yards:559},
      {par:4,yards:469},{par:5,yards:185},{par:3,yards:444},{par:4,yards:504},{par:4,yards:475},
      {par:4,yards:385},{par:4,yards:381},{par:3,yards:153},{par:5,yards:449},{par:4,yards:417},
      {par:3,yards:188},{par:5,yards:550},{par:4,yards:448},
    ],
  },
  {
    id: "royal-troon",
    name: "Royal Troon",
    location: "Troon, Scotland",
    holes: [
      {par:4,yards:370},{par:4,yards:391},{par:4,yards:379},{par:5,yards:557},{par:3,yards:210},
      {par:5,yards:601},{par:4,yards:402},{par:3,yards:123},{par:4,yards:423},{par:4,yards:438},
      {par:4,yards:463},{par:4,yards:431},{par:4,yards:465},{par:3,yards:179},{par:4,yards:457},
      {par:3,yards:542},{par:4,yards:223},{par:4,yards:452},
    ],
  },
  {
    id: "carnoustie",
    name: "Carnoustie Golf Links",
    location: "Carnoustie, Scotland",
    holes: [
      {par:4,yards:406},{par:4,yards:462},{par:4,yards:374},{par:4,yards:412},{par:4,yards:411},
      {par:5,yards:578},{par:4,yards:412},{par:3,yards:183},{par:4,yards:474},{par:4,yards:465},
      {par:4,yards:362},{par:3,yards:479},{par:4,yards:161},{par:5,yards:514},{par:4,yards:472},
      {par:3,yards:250},{par:4,yards:459},{par:4,yards:499},
    ],
  },
  {
    id: "emirates-majlis",
    name: "Emirates Golf Club (Majlis)",
    location: "Dubai, UAE",
    holes: [
      {par:4,yards:403},{par:5,yards:521},{par:4,yards:390},{par:3,yards:185},{par:4,yards:449},
      {par:4,yards:396},{par:3,yards:172},{par:4,yards:425},{par:5,yards:548},{par:4,yards:413},
      {par:4,yards:378},{par:3,yards:201},{par:4,yards:444},{par:5,yards:533},{par:4,yards:390},
      {par:3,yards:167},{par:4,yards:418},{par:4,yards:455},
    ],
  },
];

type Screen = "home" | "scorecard" | "entry" | "analysis" | "practice" | "strategy";
type MissDir = "short" | "long" | "left" | "right" | null;

// ── Per-hole scorecard entry ──────────────────────────────────────────────────

type MissDirValue = "short" | "long" | "left" | "right";

interface HoleEntry {
  par: 3 | 4 | 5;
  yards: number;
  score: number;
  gir: boolean;
  putts: number;
  puttLength: string;
  puttLength2: string;
  upAndDown: "sand" | "rough" | "fairway" | "no" | null;
  upAndDownLie: "fairway" | "rough" | "sand" | null;
  approachDist: string;
  approachLie: "fairway" | "rough" | "sand" | null;
  misses: MissDirValue[];
}

const HOLE_PARS: (3 | 4 | 5)[] = [4,3,5,4,4,3,4,5,4,4,3,5,4,4,3,5,4,4];
const HOLE_YARDS = [382,172,510,395,348,195,420,525,365,390,158,498,410,355,188,542,372,405];

function defaultHoles(course?: Course): HoleEntry[] {
  return Array.from({ length: 18 }, (_, i) => {
    const par   = (course?.holes[i]?.par   ?? HOLE_PARS[i])  as 3 | 4 | 5;
    const yards =  course?.holes[i]?.yards ?? HOLE_YARDS[i];
    return {
      par,
      yards,
      score: par,
      gir: false,
      putts: 2,
      puttLength: "",
      puttLength2: "",
      upAndDown: null,
      upAndDownLie: null,
      approachDist: "",
      approachLie: null,
      misses: [],
    };
  });
}

// ── Unit helpers ─────────────────────────────────────────────────────────────

type Units = "imperial" | "metric";

const ydsToM = (y: number) => Math.round(y * 0.9144);
const ftToM  = (f: number) => (f * 0.3048).toFixed(1);

function distLabel(val: string | number, units: Units, type: "dist" | "putt" = "dist"): string {
  if (val === "" || val === null || val === undefined) return "";
  const n = typeof val === "string" ? parseFloat(val) : val;
  if (isNaN(n)) return String(val);
  if (units === "metric") return type === "putt" ? `${ftToM(n)} m` : `${ydsToM(n)} m`;
  return type === "putt" ? `${n} ft` : `${n} yds`;
}

function distUnit(units: Units, type: "dist" | "putt" = "dist") {
  if (units === "metric") return type === "putt" ? "m" : "m";
  return type === "putt" ? "ft" : "yds";
}

function UnitToggle({ units, onChange }: { units: Units; onChange: (u: Units) => void }) {
  return (
    <button
      onClick={() => onChange(units === "imperial" ? "metric" : "imperial")}
      className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border bg-white text-xs font-semibold text-muted-foreground active:opacity-70 transition-opacity"
    >
      <span style={{ color: units === "imperial" ? "#1b4332" : "#6b7d72" }}>yds</span>
      <span className="text-muted-foreground/40">/</span>
      <span style={{ color: units === "metric" ? "#1b4332" : "#6b7d72" }}>m</span>
    </button>
  );
}

// ── Static analysis data ──────────────────────────────────────────────────────

const shotsLostData = [
  { name: "Driving",    value: 3.2 },
  { name: "Approach",  value: 4.8 },
  { name: "Short Game",value: 2.1 },
  { name: "Putting",   value: 3.5 },
  { name: "Penalties", value: 1.4 },
  { name: "Strategy",  value: 0.8 },
];

const scoreHistory = [92, 90, 91, 88, 89, 88];
const scoreLabels  = ["Feb","Mar","Apr","May","Jun","Jul"];

const drills = [
  {
    id: 1,
    name: "50-Yard Wedge Ladder",
    area: "Short Game",
    time: "20 min",
    instructions:
      "Place targets at 30, 40, 50, 60 and 70 yards. Hit 3 balls to each in sequence, then work back down. Focus on contact quality and distance control — accuracy follows consistency.",
  },
  {
    id: 2,
    name: "Gate Putting Drill",
    area: "Putting",
    time: "15 min",
    instructions:
      "Set two tees 3 inches apart, 6 inches ahead of the ball on your intended line. Putt 20 balls from 6 feet, threading the gate each time. This trains a square face at impact.",
  },
  {
    id: 3,
    name: "Fairway Corridor",
    area: "Driving",
    time: "25 min",
    instructions:
      "On the range, pick an imaginary 30-yard wide corridor. Hit 10 drivers and record how many land inside it. Target 6 out of 10. Prioritise a smooth tempo — tension kills width.",
  },
];

const strategies = [
  {
    number: 1,
    title: "Aim for the fat part of every green",
    detail:
      "Your data shows tight pin-hunting is costing you strokes. Aim centre-green every time — a 20-foot birdie putt still leaves an easy two-putt. Stop giving away bogeys chasing birdies.",
  },
  {
    number: 2,
    title: "Take one extra club into the wind",
    detail:
      "You consistently come up short on approach. When the wind is into you, club up at least one. Being past the hole is almost always easier to manage than being short in the collection area.",
  },
  {
    number: 3,
    title: "Treat every par 5 as three deliberate shots",
    detail:
      "Lay up to 80–100 yards on par 5s instead of forcing a hero carry. That puts you in your most confident scoring zone for the third shot — and keeps you out of the trees.",
  },
];

// ── Shared atoms ──────────────────────────────────────────────────────────────

function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <button
      onClick={onBack}
      className="flex items-center gap-1 text-muted-foreground text-sm mb-6 -ml-0.5 active:opacity-60 transition-opacity"
    >
      <ChevronLeft size={16} />
      Back
    </button>
  );
}

function Tag({ children }: { children: string }) {
  return (
    <span className="inline-block text-[10px] font-semibold uppercase tracking-wide bg-secondary text-primary px-2 py-0.5 rounded-full">
      {children}
    </span>
  );
}

function Stepper({
  value,
  onChange,
  min = 1,
  max = 20,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground active:bg-muted transition-colors disabled:opacity-30"
        disabled={value <= min}
      >
        <Minus size={14} />
      </button>
      <span className="text-xl font-bold text-foreground tabular-nums w-6 text-center">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground active:bg-muted transition-colors disabled:opacity-30"
        disabled={value >= max}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}

// ── Bottom navigation ─────────────────────────────────────────────────────────

function BottomNav({
  current,
  onNavigate,
}: {
  current: Screen;
  onNavigate: (s: Screen) => void;
}) {
  const items: { id: Screen; label: string; Icon: React.FC<{ size: number; strokeWidth: number }> }[] = [
    { id: "home",     label: "Home",     Icon: Home },
    { id: "analysis", label: "Analysis", Icon: BarChart2 },
    { id: "practice", label: "Practice", Icon: BookOpen },
    { id: "strategy", label: "Strategy", Icon: Map },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-border flex z-10">
      {items.map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => onNavigate(id)}
          className={`flex-1 flex flex-col items-center gap-0.5 py-3 text-xs font-medium transition-colors ${
            current === id ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Icon size={20} strokeWidth={current === id ? 2.25 : 1.5} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

// ── Screen 1 · Home ───────────────────────────────────────────────────────────

function HomeScreen({ onNavigate, units, onUnitsChange }: { onNavigate: (s: Screen) => void; units: Units; onUnitsChange: (u: Units) => void }) {
  const scoreMin = Math.min(...scoreHistory);
  const scoreMax = Math.max(...scoreHistory) + 2;

  return (
    <div className="px-5 pt-12 pb-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-muted-foreground text-sm mb-0.5">Good morning,</p>
          <h1 className="text-[26px] font-semibold text-foreground leading-tight" style={{ fontFamily: "'Lora', Georgia, serif" }}>
            James
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <UnitToggle units={units} onChange={onUnitsChange} />
          <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white text-sm font-semibold tracking-wide">JM</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-white rounded-2xl p-4 border border-border">
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-2">Handicap</p>
          <p className="text-4xl font-bold text-primary leading-none mb-1" style={{ fontFamily: "'Lora', Georgia, serif" }}>16.4</p>
          <p className="text-xs text-emerald-600 font-medium">↓ 0.8 this month</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-border">
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-2">Last Round</p>
          <p className="text-4xl font-bold text-foreground leading-none mb-1" style={{ fontFamily: "'Lora', Georgia, serif" }}>88</p>
          <p className="text-xs text-muted-foreground">Sunningdale · Jun 28</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-border mb-3">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-foreground">Score Trend</p>
          <p className="text-xs text-muted-foreground">Last 6 rounds</p>
        </div>
        <div className="flex items-end gap-2 h-14">
          {scoreHistory.map((score, i) => {
            const pct = ((scoreMax - score) / (scoreMax - scoreMin)) * 100;
            const isLatest = i === scoreHistory.length - 1;
            return (
              <div key={scoreLabels[i]} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full rounded-sm" style={{ height: `${Math.max(pct, 15)}%`, backgroundColor: isLatest ? "#1b4332" : "#c8ddd2" }} />
                <span className="text-[9px] text-muted-foreground">{scoreLabels[i]}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-border mb-5">
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-sm font-semibold text-foreground">Weekly Goal</p>
          <p className="text-xs font-semibold text-primary">2 of 3 sessions</p>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: "67%" }} />
        </div>
        <p className="text-xs text-muted-foreground mt-2">1 practice session remaining this week</p>
      </div>

      <button
        onClick={() => onNavigate("scorecard")}
        className="w-full bg-primary text-white rounded-2xl py-4 text-[15px] font-semibold flex items-center justify-center gap-2 active:opacity-90 transition-opacity mb-3"
      >
        <span className="text-lg leading-none">+</span> Analyse a Round
      </button>

      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => onNavigate("practice")} className="bg-white border border-border text-foreground rounded-2xl py-3.5 text-sm font-medium active:opacity-80 transition-opacity">
          Practice Plan
        </button>
        <button onClick={() => onNavigate("strategy")} className="bg-white border border-border text-foreground rounded-2xl py-3.5 text-sm font-medium active:opacity-80 transition-opacity">
          Game Plan
        </button>
      </div>
    </div>
  );
}

// ── Screen 2 · Scorecard entry ────────────────────────────────────────────────

const missOptions: { label: string; value: MissDirValue }[] = [
  { label: "Short", value: "short" },
  { label: "Long",  value: "long"  },
  { label: "Left",  value: "left"  },
  { label: "Right", value: "right" },
];

const parColors: Record<number, string> = { 3: "#2d6a4f", 4: "#52b788", 5: "#1b4332" };

function CoursePickerStep({
  selectedCourse,
  onSelect,
  onSkip,
  onBack,
}: {
  selectedCourse: Course | null;
  onSelect: (c: Course) => void;
  onSkip: () => void;
  onBack: () => void;
}) {
  const [query, setQuery] = useState("");
  const [showManual, setShowManual] = useState(false);
  const [manualName, setManualName] = useState("");
  const [manualLocation, setManualLocation] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return q.length < 1 ? COURSES : COURSES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.location.toLowerCase().includes(q)
    );
  }, [query]);

  const handleManualSubmit = () => {
    if (!manualName.trim()) return;
    const custom: Course = {
      id: `custom-${Date.now()}`,
      name: manualName.trim(),
      location: manualLocation.trim() || "Custom course",
      holes: HOLE_PARS.map((par, i) => ({ par, yards: HOLE_YARDS[i] })),
    };
    onSelect(custom);
  };

  if (showManual) {
    return (
      <div className="flex flex-col min-h-screen bg-background px-5 pt-10 pb-8">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setShowManual(false)} className="flex items-center gap-1 text-muted-foreground text-sm active:opacity-60">
            <ChevronLeft size={16} /> Back
          </button>
        </div>

        <h1 className="text-2xl font-semibold text-foreground mb-1" style={{ fontFamily: "'Lora', Georgia, serif" }}>
          Add Course
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Enter the course details. You can adjust each hole's yardage on the scorecard.
        </p>

        <div className="space-y-3 mb-6">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Course Name</label>
            <input
              type="text"
              value={manualName}
              onChange={(e) => setManualName(e.target.value)}
              placeholder="e.g. Paraparaumu Beach Golf Club"
              className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Location <span className="normal-case font-normal">(optional)</span></label>
            <input
              type="text"
              value={manualLocation}
              onChange={(e) => setManualLocation(e.target.value)}
              placeholder="e.g. Paraparaumu, New Zealand"
              className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
            />
          </div>

          <div className="bg-secondary rounded-xl p-3 border border-primary/10">
            <p className="text-xs text-primary font-medium">Tip: Default yardages are pre-filled. Tap any hole's yardage on the scorecard to adjust it.</p>
          </div>
        </div>

        <button
          onClick={handleManualSubmit}
          disabled={!manualName.trim()}
          className="w-full bg-primary text-white rounded-2xl py-4 text-[15px] font-semibold active:opacity-90 transition-opacity disabled:opacity-40"
        >
          Start Scorecard →
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background px-5 pt-10 pb-8">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center gap-1 text-muted-foreground text-sm active:opacity-60">
          <ChevronLeft size={16} /> Back
        </button>
        <button onClick={onSkip} className="text-xs font-semibold text-primary active:opacity-60">
          Skip →
        </button>
      </div>

      <h1 className="text-2xl font-semibold text-foreground mb-1" style={{ fontFamily: "'Lora', Georgia, serif" }}>
        Select Course
      </h1>
      <p className="text-sm text-muted-foreground mb-5">
        We'll load the hole lengths and pars automatically.
      </p>

      {/* Search box */}
      <div className="relative mb-3">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search courses…"
          className="w-full bg-white border border-border rounded-xl pl-9 pr-9 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
        />
        {query && (
          <button onClick={() => setQuery("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
            <X size={14} />
          </button>
        )}
      </div>

      {/* Add manually button */}
      <button
        onClick={() => setShowManual(true)}
        className="w-full mb-4 flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-primary/30 text-sm font-medium text-primary active:opacity-70 transition-opacity"
      >
        <Plus size={15} /> Add course manually
      </button>

      {/* Course list */}
      <div className="space-y-2 flex-1 overflow-y-auto">
        {filtered.map((course) => {
          const isSelected = selectedCourse?.id === course.id;
          const par = course.holes.reduce((s, h) => s + h.par, 0);
          const totalYards = course.holes.reduce((s, h) => s + h.yards, 0);
          return (
            <button
              key={course.id}
              onClick={() => onSelect(course)}
              className="w-full text-left rounded-2xl border p-4 transition-all active:opacity-80"
              style={{
                backgroundColor: isSelected ? "#1b4332" : "#ffffff",
                borderColor: isSelected ? "#1b4332" : "rgba(27,67,50,0.1)",
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className={`text-sm font-semibold leading-tight ${isSelected ? "text-white" : "text-foreground"}`}>
                    {course.name}
                  </p>
                  <p className={`text-xs mt-0.5 ${isSelected ? "text-white/70" : "text-muted-foreground"}`}>
                    {course.location}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`text-xs font-semibold ${isSelected ? "text-white" : "text-primary"}`}>Par {par}</p>
                  <p className={`text-xs ${isSelected ? "text-white/70" : "text-muted-foreground"}`}>{totalYards.toLocaleString()} yds</p>
                </div>
              </div>
            </button>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No courses found. Try adding it manually.
          </div>
        )}
      </div>

      {selectedCourse && (
        <button
          onClick={onSkip}
          className="mt-4 w-full bg-primary text-white rounded-2xl py-4 text-[15px] font-semibold active:opacity-90 transition-opacity"
        >
          Start Scorecard →
        </button>
      )}
    </div>
  );
}

function ScorecardScreen({
  holes,
  onChange,
  selectedCourse,
  onCourseSelect,
  units,
  onUnitsChange,
  onBack,
  onFinish,
}: {
  holes: HoleEntry[];
  onChange: (i: number, patch: Partial<HoleEntry>) => void;
  selectedCourse: Course | null;
  onCourseSelect: (c: Course) => void;
  units: Units;
  onUnitsChange: (u: Units) => void;
  onBack: () => void;
  onFinish: () => void;
}) {
  const [step, setStep] = useState<"course" | "holes">("course");
  const [idx, setIdx] = useState(0);

  if (step === "course") {
    return (
      <CoursePickerStep
        selectedCourse={selectedCourse}
        onSelect={(c) => { onCourseSelect(c); setStep("holes"); }}
        onSkip={() => setStep("holes")}
        onBack={onBack}
      />
    );
  }
  const hole = holes[idx];
  const progress = ((idx + 1) / 18) * 100;
  const isLast = idx === 17;

  const scoreVsPar = hole.score - hole.par;
  const scoreLabel =
    scoreVsPar <= -2 ? "Eagle" :
    scoreVsPar === -1 ? "Birdie" :
    scoreVsPar === 0  ? "Par" :
    scoreVsPar === 1  ? "Bogey" :
    scoreVsPar === 2  ? "Double" : `+${scoreVsPar}`;

  const scoreColor =
    scoreVsPar < 0  ? "text-emerald-600" :
    scoreVsPar === 0 ? "text-foreground" :
    scoreVsPar === 1 ? "text-amber-600" : "text-red-500";

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Top bar */}
      <div className="px-5 pt-10 pb-4">
        <div className="flex items-center justify-between mb-3">
          <button onClick={onBack} className="flex items-center gap-1 text-muted-foreground text-sm active:opacity-60">
            <ChevronLeft size={16} /> Back
          </button>
          <div className="flex items-center gap-2">
            <UnitToggle units={units} onChange={onUnitsChange} />
            <span className="text-xs font-semibold text-muted-foreground">{idx + 1} / 18</span>
          </div>
          <button onClick={onFinish} className="text-xs font-semibold text-primary active:opacity-60">
            Skip →
          </button>
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Hole card */}
      <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-3">
        {/* Hole header */}
        <div className="bg-white rounded-2xl border border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg font-bold" style={{ fontFamily: "'Lora', Georgia, serif" }}>{idx + 1}</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                {([3, 4, 5] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => onChange(idx, { par: p, score: Math.max(hole.score, p) })}
                    className="text-xs font-bold px-2.5 py-1 rounded-lg transition-colors"
                    style={{
                      backgroundColor: hole.par === p ? parColors[p] : "#edf1ee",
                      color: hole.par === p ? "#fff" : "#6b7d72",
                    }}
                  >
                    Par {p}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <input
                  type="number"
                  value={hole.yards ?? ""}
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10);
                    if (!isNaN(v) && v > 0) onChange(idx, { yards: v });
                  }}
                  className="w-14 bg-muted text-muted-foreground text-xs font-medium rounded-lg px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white focus:text-foreground transition-all"
                />
                <span className="text-xs text-muted-foreground">
                  {units === "metric" ? `(${ydsToM(hole.yards ?? 0)} m)` : "yds"}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-2xl font-bold tabular-nums ${scoreColor}`} style={{ fontFamily: "'Lora', Georgia, serif" }}>
              {hole.score}
            </p>
            <p className={`text-xs font-semibold ${scoreColor}`}>{scoreLabel}</p>
          </div>
        </div>

        {/* Score stepper */}
        <div className="bg-white rounded-2xl border border-border p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Score</p>
          <Stepper value={hole.score} onChange={(v) => onChange(idx, { score: v })} min={1} max={15} />
        </div>

        {/* GIR + Putts */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl border border-border p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">GIR</p>
            <div className="flex gap-2">
              {[true, false].map((val) => (
                <button
                  key={String(val)}
                  onClick={() => onChange(idx, { gir: val, ...(val ? { upAndDown: null, upAndDownLie: null } : {}) })}
                  className="flex-1 py-2 rounded-xl text-xs font-semibold transition-colors"
                  style={{
                    backgroundColor: hole.gir === val ? (val ? "#1b4332" : "#ef4444") : "#edf1ee",
                    color: hole.gir === val ? "#fff" : "#6b7d72",
                  }}
                >
                  {val ? "Yes" : "No"}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-border p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Putts</p>
            <Stepper value={hole.putts} onChange={(v) => onChange(idx, { putts: v })} min={0} max={6} />
          </div>
        </div>

        {/* Putt lengths + Up & Down */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl border border-border p-4 space-y-2">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">1st Putt ({distUnit(units, "putt")})</p>
              <input
                type="number"
                value={hole.puttLength}
                onChange={(e) => onChange(idx, { puttLength: e.target.value })}
                placeholder="e.g. 18"
                className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">2nd Putt ({distUnit(units, "putt")})</p>
              <input
                type="number"
                value={hole.puttLength2}
                onChange={(e) => onChange(idx, { puttLength2: e.target.value })}
                placeholder="e.g. 4"
                className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
              />
            </div>
          </div>
          <div className={`bg-white rounded-2xl border border-border p-4 transition-opacity ${hole.gir ? "opacity-30 pointer-events-none" : ""}`}>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Up &amp; Down</p>
            <div className="grid grid-cols-2 gap-1.5 mb-3">
              {(["sand", "rough", "fairway", "no"] as const).map((val) => {
                const active = hole.upAndDown === val;
                const labels = { sand: "🏖 Sand", rough: "🌿 Rough", fairway: "🌱 Fairway", no: "✗ Missed" };
                const activeColor = val === "no" ? "#ef4444" : "#1b4332";
                return (
                  <button
                    key={val}
                    onClick={() => onChange(idx, { upAndDown: active ? null : val })}
                    className="py-2 rounded-xl text-xs font-semibold transition-colors"
                    style={{
                      backgroundColor: active ? activeColor : "#edf1ee",
                      color: active ? "#fff" : "#6b7d72",
                    }}
                  >
                    {labels[val]}
                  </button>
                );
              })}
            </div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Lie</p>
            <div className="grid grid-cols-3 gap-1.5">
              {(["fairway", "rough", "sand"] as const).map((lie) => {
                const active = hole.upAndDownLie === lie;
                const icons = { fairway: "🌱", rough: "🌿", sand: "🏖" };
                return (
                  <button
                    key={lie}
                    onClick={() => onChange(idx, { upAndDownLie: active ? null : lie })}
                    className="py-2 rounded-xl text-xs font-semibold transition-colors"
                    style={{
                      backgroundColor: active ? "#1b4332" : "#edf1ee",
                      color: active ? "#fff" : "#6b7d72",
                    }}
                  >
                    {icons[lie]} {lie.charAt(0).toUpperCase() + lie.slice(1)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Approach distance + lie */}
        <div className="bg-white rounded-2xl border border-border p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Approach Distance ({distUnit(units)})</p>
          <input
            type="number"
            value={hole.approachDist}
            onChange={(e) => onChange(idx, { approachDist: e.target.value })}
            placeholder={`e.g. ${Math.round(hole.yards * 0.38)}`}
            className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all mb-3"
          />
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Lie</p>
          <div className="grid grid-cols-3 gap-1.5">
            {(["fairway", "rough", "sand"] as const).map((lie) => {
              const active = hole.approachLie === lie;
              const icons = { fairway: "🌱", rough: "🌿", sand: "🏖" };
              return (
                <button
                  key={lie}
                  onClick={() => onChange(idx, { approachLie: active ? null : lie })}
                  className="py-2 rounded-xl text-xs font-semibold capitalize transition-colors"
                  style={{
                    backgroundColor: active ? "#1b4332" : "#edf1ee",
                    color: active ? "#fff" : "#6b7d72",
                  }}
                >
                  {icons[lie]} {lie.charAt(0).toUpperCase() + lie.slice(1)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Approach miss — multi-select */}
        <div className="bg-white rounded-2xl border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Approach Miss</p>
            {hole.misses.length > 0 && (
              <button
                onClick={() => onChange(idx, { misses: [] })}
                className="text-[10px] font-semibold text-muted-foreground active:opacity-60"
              >
                Clear
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {missOptions.map(({ label, value }) => {
              const active = hole.misses.includes(value);
              return (
                <button
                  key={label}
                  onClick={() => {
                    const next = active
                      ? hole.misses.filter((m) => m !== value)
                      : [...hole.misses, value];
                    onChange(idx, { misses: next });
                  }}
                  className="py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
                  style={{
                    backgroundColor: active ? "#1b4332" : "#edf1ee",
                    color: active ? "#fff" : "#6b7d72",
                  }}
                >
                  {active && <Check size={12} strokeWidth={3} />}
                  {label}
                </button>
              );
            })}
          </div>
          {hole.misses.length === 0 && (
            <p className="text-[11px] text-muted-foreground mt-2 text-center">Tap to select — choose all that apply</p>
          )}
        </div>

        {/* Hole dots */}
        <div className="flex justify-center gap-1 pt-1 pb-2">
          {holes.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} aria-label={`Hole ${i + 1}`}>
              <div
                className="rounded-full transition-all"
                style={{
                  width: i === idx ? 16 : 5,
                  height: 5,
                  backgroundColor: i === idx ? "#1b4332" : "#c8ddd2",
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Prev / Next */}
      <div className="px-5 pb-8 pt-2 flex gap-3">
        <button
          onClick={() => setIdx((i) => Math.max(0, i - 1))}
          disabled={idx === 0}
          className="flex-1 py-3.5 rounded-2xl border border-border text-sm font-semibold text-foreground disabled:opacity-30 active:bg-muted transition-colors"
        >
          ← Prev
        </button>
        {isLast ? (
          <button
            onClick={onFinish}
            className="flex-1 py-3.5 rounded-2xl bg-primary text-white text-sm font-semibold active:opacity-90 transition-opacity"
          >
            Log Round →
          </button>
        ) : (
          <button
            onClick={() => setIdx((i) => Math.min(17, i + 1))}
            className="flex-1 py-3.5 rounded-2xl bg-primary text-white text-sm font-semibold active:opacity-90 transition-opacity"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}

// ── Screen 3 · Round summary entry ────────────────────────────────────────────

interface FormData {
  course: string;
  score: string;
  fairways: string;
  gir: string;
  putts: string;
  penalties: string;
  missedShots: string;
  notes: string;
}

function Field({
  label, value, onChange, placeholder, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
      />
    </div>
  );
}

function EntryScreen({
  formData,
  setFormData,
  onBack,
  onSubmit,
}: {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onBack: () => void;
  onSubmit: () => void;
}) {
  const set = (key: keyof FormData) => (v: string) => setFormData((p) => ({ ...p, [key]: v }));

  return (
    <div className="px-5 pt-12 pb-6">
      <BackButton onBack={onBack} />
      <h1 className="text-2xl font-semibold text-foreground mb-1" style={{ fontFamily: "'Lora', Georgia, serif" }}>
        Log a Round
      </h1>
      <p className="text-sm text-muted-foreground mb-6">Add course details and any extra notes.</p>

      <div className="space-y-4">
        <Field label="Course" value={formData.course} onChange={set("course")} placeholder="e.g. Wentworth West Course" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Total Score" value={formData.score} onChange={set("score")} placeholder="e.g. 88" type="number" />
          <Field label="Putts" value={formData.putts} onChange={set("putts")} placeholder="e.g. 34" type="number" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Fairways Hit" value={formData.fairways} onChange={set("fairways")} placeholder="e.g. 7/14" />
          <Field label="Greens in Reg." value={formData.gir} onChange={set("gir")} placeholder="e.g. 4/18" />
        </div>
        <Field label="Penalty Strokes" value={formData.penalties} onChange={set("penalties")} placeholder="e.g. 2" type="number" />
        <Field label="Main Missed Shots" value={formData.missedShots} onChange={set("missedShots")} placeholder="e.g. pull hooks off tee, thin chips" />
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData((p) => ({ ...p, notes: e.target.value }))}
            placeholder="How did the round feel? Any specific holes that hurt you?"
            rows={3}
            className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all resize-none"
          />
        </div>
        <button onClick={onSubmit} className="w-full bg-primary text-white rounded-2xl py-4 text-[15px] font-semibold mt-1 active:opacity-90 transition-opacity">
          Analyse Round →
        </button>
      </div>
    </div>
  );
}

// ── Screen 4 · Round analysis ─────────────────────────────────────────────────

const BAR_COLORS = ["#1b4332","#2d6a4f","#52b788","#95d5b2","#b7d4c0","#d8f3dc"];

function ShotsLostChart({ data }: { data: { name: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value));
  const chartH = 120, barW = 32, gap = 12;
  const totalW = data.length * (barW + gap) - gap;

  return (
    <svg width="100%" viewBox={`0 0 ${totalW} ${chartH + 28}`} style={{ overflow: "visible" }}>
      {data.map((d, i) => {
        const barH = (d.value / max) * chartH;
        const x = i * (barW + gap);
        const y = chartH - barH;
        return (
          <g key={d.name}>
            <rect x={x} y={y} width={barW} height={barH} rx={5} ry={5} fill={BAR_COLORS[i] ?? "#c8ddd2"} />
            <text x={x + barW / 2} y={chartH + 14} textAnchor="middle" fontSize={9} fill="#6b7d72" fontFamily="'DM Sans', system-ui, sans-serif">{d.name}</text>
            <text x={x + barW / 2} y={y - 5} textAnchor="middle" fontSize={10} fontWeight="600" fill={BAR_COLORS[i] ?? "#1b4332"} fontFamily="'DM Sans', system-ui, sans-serif">{d.value}</text>
          </g>
        );
      })}
    </svg>
  );
}

function GreenDiagram({ misses }: { misses: MissDirValue[] }) {
  const W = 80, H = 64, cx = W / 2, cy = H / 2, rx = 34, ry = 26;

  const zoneCenter = (dir: MissDirValue): [number, number, number, number] => {
    if (dir === "short") return [cx,        cy + ry - 6, 16, 10];
    if (dir === "long")  return [cx,        cy - ry + 6, 16, 10];
    if (dir === "left")  return [cx - rx + 6, cy,        10, 14];
    return                      [cx + rx - 6, cy,        10, 14]; // right
  };

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#d8f3dc" stroke="#95d5b2" strokeWidth={1} />
      {misses.map((dir) => {
        const [ex, ey, erx, ery] = zoneCenter(dir);
        return (
          <ellipse
            key={dir}
            cx={ex} cy={ey} rx={erx} ry={ery}
            fill="#ef4444" fillOpacity={0.28}
            stroke="#ef4444" strokeWidth={1} strokeOpacity={0.6}
          />
        );
      })}
      <line x1={cx} y1={cy - 18} x2={cx} y2={cy + 4} stroke="#1b4332" strokeWidth={1.5} />
      <polygon points={`${cx},${cy - 18} ${cx + 10},${cy - 13} ${cx},${cy - 8}`} fill="#1b4332" />
      <text x={cx}    y={H - 2}  textAnchor="middle" fontSize={7} fill="#6b7d72">S</text>
      <text x={cx}    y={8}      textAnchor="middle" fontSize={7} fill="#6b7d72">N</text>
      <text x={4}     y={cy + 3} textAnchor="middle" fontSize={7} fill="#6b7d72">W</text>
      <text x={W - 4} y={cy + 3} textAnchor="middle" fontSize={7} fill="#6b7d72">E</text>
    </svg>
  );
}

function HoleSlider({ holes, course, units }: { holes: HoleEntry[]; course: Course | null; units: Units }) {
  const [idx, setIdx] = useState(0);
  const hole = holes[idx];
  const yards = units === "metric" ? `${ydsToM(hole.yards)} m` : `${hole.yards} yds`;
  const missLabel: Record<MissDirValue, string> = { short: "Short", long: "Long", left: "Left", right: "Right" };
  const scoreVsPar = hole.score - hole.par;
  const scoreColor = scoreVsPar < 0 ? "text-emerald-600" : scoreVsPar === 0 ? "text-foreground" : scoreVsPar === 1 ? "text-amber-600" : "text-red-500";
  const scoreLabel = scoreVsPar <= -2 ? "Eagle" : scoreVsPar === -1 ? "Birdie" : scoreVsPar === 0 ? "Par" : scoreVsPar === 1 ? "Bogey" : scoreVsPar === 2 ? "Double" : `+${scoreVsPar}`;

  return (
    <div className="bg-white rounded-2xl border border-border mb-3 overflow-hidden">
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border">
        <p className="text-sm font-semibold text-foreground">Hole by Hole</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
            disabled={idx === 0}
            className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-muted-foreground disabled:opacity-30 active:bg-muted transition-colors"
          >
            <ChevronLeft size={13} />
          </button>
          <span className="text-xs font-semibold text-foreground tabular-nums w-12 text-center">{idx + 1} / 18</span>
          <button
            onClick={() => setIdx((i) => Math.min(17, i + 1))}
            disabled={idx === 17}
            className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-muted-foreground disabled:opacity-30 active:bg-muted transition-colors"
          >
            <ChevronLeft size={13} className="rotate-180" />
          </button>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="flex items-start gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">{idx + 1}</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: parColors[hole.par] }}>
                    Par {hole.par}
                  </span>
                  <span className="text-xs text-muted-foreground">{yards} yds</span>
                </div>
              </div>
              <div className="ml-auto text-right">
                <span className={`text-lg font-bold tabular-nums ${scoreColor}`}>{hole.score}</span>
                <span className={`text-xs font-semibold ml-1 ${scoreColor}`}>{scoreLabel}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">GIR</p>
                <p className={`text-sm font-semibold mt-0.5 ${hole.gir ? "text-emerald-600" : "text-red-500"}`}>
                  {hole.gir ? "Yes ✓" : "No ✗"}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Putts</p>
                <p className={`text-sm font-semibold mt-0.5 ${hole.putts >= 3 ? "text-red-500" : "text-foreground"}`}>{hole.putts}</p>
              </div>
              {hole.puttLength && (
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">1st Putt</p>
                  <p className="text-sm font-semibold mt-0.5 text-foreground">{distLabel(hole.puttLength, units, "putt")}</p>
                </div>
              )}
              {hole.puttLength2 && (
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">2nd Putt</p>
                  <p className="text-sm font-semibold mt-0.5 text-foreground">{distLabel(hole.puttLength2, units, "putt")}</p>
                </div>
              )}
              {!hole.gir && hole.upAndDown !== null && (
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Up &amp; Down</p>
                  <p className={`text-sm font-semibold mt-0.5 ${hole.upAndDown === "no" ? "text-red-500" : "text-emerald-600"}`}>
                    {{ sand: "Sand ✓", rough: "Rough ✓", fairway: "Fairway ✓", no: "Missed ✗" }[hole.upAndDown]}
                    {hole.upAndDownLie && (
                      <span className="ml-1 font-normal text-muted-foreground">
                        · {{ fairway: "🌱 Fairway", rough: "🌿 Rough", sand: "🏖 Sand" }[hole.upAndDownLie]}
                      </span>
                    )}
                  </p>
                </div>
              )}
              {hole.approachDist && (
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Approach</p>
                  <p className="text-sm font-semibold mt-0.5 text-foreground">
                    {distLabel(hole.approachDist, units)}
                    {hole.approachLie && (
                      <span className="ml-1 font-normal text-muted-foreground">
                        · {{ fairway: "🌱 Fairway", rough: "🌿 Rough", sand: "🏖 Sand" }[hole.approachLie]}
                      </span>
                    )}
                  </p>
                </div>
              )}
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Miss</p>
                <p className={`text-sm font-semibold mt-0.5 ${hole.misses.length > 0 ? "text-red-500" : "text-emerald-600"}`}>
                  {hole.misses.length > 0 ? hole.misses.map((m) => missLabel[m]).join(" · ") : "On green"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1 flex-shrink-0 pt-1">
            <GreenDiagram misses={hole.misses} />
            <p className="text-[9px] text-muted-foreground">approach miss</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-1 pb-3">
        {holes.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} aria-label={`Hole ${i + 1}`}>
            <div className="rounded-full transition-all" style={{ width: i === idx ? 16 : 5, height: 5, backgroundColor: i === idx ? "#1b4332" : "#c8ddd2" }} />
          </button>
        ))}
      </div>
    </div>
  );
}

function AnalysisScreen({
  holes,
  course,
  units,
  onUnitsChange,
  onBack,
  onNavigate,
}: {
  holes: HoleEntry[];
  course: Course | null;
  units: Units;
  onUnitsChange: (u: Units) => void;
  onBack: () => void;
  onNavigate: (s: Screen) => void;
}) {
  const total = shotsLostData.reduce((s, d) => s + d.value, 0);
  const biggest = shotsLostData.reduce((a, b) => (a.value > b.value ? a : b));

  return (
    <div className="px-5 pt-12 pb-6">
      <div className="flex items-center justify-between mb-4">
        <BackButton onBack={onBack} />
        <UnitToggle units={units} onChange={onUnitsChange} />
      </div>
      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">{course ? course.name : "Sunningdale"} · Jun 28</p>
      <h1 className="text-2xl font-semibold text-foreground mb-1" style={{ fontFamily: "'Lora', Georgia, serif" }}>Round Analysis</h1>
      <p className="text-sm text-muted-foreground mb-6">Score 88 &middot; <span className="font-medium text-foreground">{total.toFixed(1)} shots lost</span> vs. scratch</p>

      <div className="bg-white rounded-2xl p-4 border border-border mb-3">
        <p className="text-sm font-semibold text-foreground mb-4">Shots Lost by Category</p>
        <ShotsLostChart data={shotsLostData} />
      </div>

      <div className="bg-white rounded-2xl border border-border mb-3 overflow-hidden">
        <p className="text-sm font-semibold text-foreground px-4 pt-4 pb-3">Shot Breakdown</p>
        {shotsLostData.map((item, i) => (
          <div key={item.name} className={`flex items-center px-4 py-3 ${i < shotsLostData.length - 1 ? "border-b border-border" : ""}`}>
            <div className="w-2 h-2 rounded-full mr-3 flex-shrink-0" style={{ backgroundColor: BAR_COLORS[i] }} />
            <p className="text-sm text-foreground flex-1">{item.name}</p>
            <p className="text-sm font-semibold text-foreground mr-1.5">{item.value}</p>
            <p className="text-xs text-muted-foreground">shots</p>
          </div>
        ))}
      </div>

      <HoleSlider holes={holes} course={course} units={units} />

      <div className="bg-secondary rounded-2xl p-4 border border-primary/10 mb-4">
        <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1.5">Key Insight</p>
        <p className="text-sm text-foreground leading-relaxed">
          <span className="font-semibold">{biggest.name}</span> is your biggest leak — <span className="font-semibold">{biggest.value} shots lost</span> per round. Tightening this one area alone could cut 3–4 strokes from your scorecard.
        </p>
      </div>

      <button onClick={() => onNavigate("practice")} className="w-full bg-primary text-white rounded-2xl py-4 text-[15px] font-semibold active:opacity-90 transition-opacity">
        View Practice Plan →
      </button>
    </div>
  );
}

// ── Screen 5 · Practice plan ──────────────────────────────────────────────────

function PracticeScreen({ completed, onToggle, onBack }: { completed: number[]; onToggle: (id: number) => void; onBack: () => void }) {
  const pct = Math.round((completed.length / drills.length) * 100);

  return (
    <div className="px-5 pt-12 pb-6">
      <BackButton onBack={onBack} />
      <h1 className="text-2xl font-semibold text-foreground mb-1" style={{ fontFamily: "'Lora', Georgia, serif" }}>Practice Plan</h1>
      <p className="text-sm text-muted-foreground mb-5">Targeted to your round analysis &middot; 60 min total</p>

      <div className="bg-white rounded-2xl p-4 border border-border mb-5">
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-sm font-semibold text-foreground">Session Progress</p>
          <p className="text-sm font-semibold text-primary">{completed.length} / {drills.length} done</p>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="space-y-3">
        {drills.map((drill) => {
          const done = completed.includes(drill.id);
          return (
            <div key={drill.id} className={`bg-white rounded-2xl border transition-colors ${done ? "border-primary/25 bg-secondary/40" : "border-border"}`}>
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <button onClick={() => onToggle(drill.id)} className="mt-0.5 flex-shrink-0 transition-all active:scale-90">
                    {done ? (
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <Check size={11} color="white" strokeWidth={3} />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/35" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[15px] font-semibold mb-1.5 transition-colors ${done ? "line-through text-muted-foreground" : "text-foreground"}`}>{drill.name}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <Tag>{drill.area}</Tag>
                      <span className="text-xs text-muted-foreground">{drill.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{drill.instructions}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {pct === 100 && (
        <div className="mt-4 bg-primary rounded-2xl p-4 text-center">
          <p className="text-white font-semibold text-sm">Session complete. Great work.</p>
          <p className="text-white/60 text-xs mt-1">Your progress has been logged.</p>
        </div>
      )}
    </div>
  );
}

// ── Screen 6 · Strategy ───────────────────────────────────────────────────────

function StrategyScreen({ onBack }: { onBack: () => void }) {
  const [swingThought, setSwingThought] = useState("");
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");

  const handleEdit = () => {
    setDraft(swingThought);
    setEditing(true);
  };

  const handleSave = () => {
    setSwingThought(draft.trim());
    setEditing(false);
  };

  return (
    <div className="px-5 pt-12 pb-6">
      <BackButton onBack={onBack} />
      <p className="text-[11px] font-bold text-primary uppercase tracking-wider mb-1">For your next round</p>
      <h1 className="text-2xl font-semibold text-foreground mb-1" style={{ fontFamily: "'Lora', Georgia, serif" }}>Game Plan</h1>
      <p className="text-sm text-muted-foreground mb-6">Three rules to play smarter, not harder.</p>

      <div className="space-y-3 mb-4">
        {strategies.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">{s.number}</span>
              </div>
              <p className="text-[14px] font-semibold text-foreground leading-tight">{s.title}</p>
            </div>
            <div className="px-4 py-3.5">
              <p className="text-xs text-muted-foreground leading-relaxed">{s.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Swing thought */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden mb-5">
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs">💭</span>
            </div>
            <p className="text-[14px] font-semibold text-foreground">Swing Thought</p>
          </div>
          <button
            onClick={editing ? handleSave : handleEdit}
            className="text-xs font-semibold text-primary active:opacity-60 transition-opacity"
          >
            {editing ? "Save" : swingThought ? "Edit" : "Add"}
          </button>
        </div>

        <div className="px-4 py-3.5">
          {editing ? (
            <textarea
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="e.g. Slow takeaway, wide arc…"
              rows={3}
              className="w-full text-sm text-foreground placeholder:text-muted-foreground/50 bg-transparent focus:outline-none resize-none leading-relaxed"
            />
          ) : swingThought ? (
            <p className="text-sm text-foreground leading-relaxed italic" style={{ fontFamily: "'Lora', Georgia, serif" }}>
              "{swingThought}"
            </p>
          ) : (
            <button
              onClick={handleEdit}
              className="w-full text-left text-xs text-muted-foreground/60 leading-relaxed active:opacity-60"
            >
              Tap Add to write your swing thought for this round…
            </button>
          )}
        </div>
      </div>

      <div className="bg-secondary rounded-2xl p-4 border border-primary/10 text-center">
        <p className="text-sm font-semibold text-primary mb-1">Save for the first tee</p>
        <p className="text-xs text-muted-foreground">Screenshot this screen and keep it in your pocket. Refer back on any tough decision.</p>
      </div>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [units, setUnits] = useState<Units>("imperial");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [holes, setHoles] = useState<HoleEntry[]>(() => defaultHoles());
  const [completedDrills, setCompletedDrills] = useState<number[]>([]);
  const [formData, setFormData] = useState<FormData>({
    course: "", score: "", fairways: "", gir: "", putts: "", penalties: "", missedShots: "", notes: "",
  });

  const patchHole = (i: number, patch: Partial<HoleEntry>) =>
    setHoles((prev) => prev.map((h, j) => (j === i ? { ...h, ...patch } : h)));

  const toggleDrill = (id: number) =>
    setCompletedDrills((prev) => prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]);

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setHoles(defaultHoles(course));
    setFormData((f) => ({ ...f, course: course.name }));
  };

  const hideNav = screen === "scorecard" || screen === "entry";

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-sm min-h-screen flex flex-col relative" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        <div className={`flex-1 overflow-y-auto ${hideNav ? "" : "pb-[72px]"}`}>
          {screen === "home"      && <HomeScreen onNavigate={setScreen} units={units} onUnitsChange={setUnits} />}
          {screen === "scorecard" && (
            <ScorecardScreen
              holes={holes}
              onChange={patchHole}
              selectedCourse={selectedCourse}
              onCourseSelect={handleCourseSelect}
              units={units}
              onUnitsChange={setUnits}
              onBack={() => setScreen("home")}
              onFinish={() => setScreen("entry")}
            />
          )}
          {screen === "entry"     && (
            <EntryScreen
              formData={formData}
              setFormData={setFormData}
              onBack={() => setScreen("scorecard")}
              onSubmit={() => setScreen("analysis")}
            />
          )}
          {screen === "analysis"  && <AnalysisScreen holes={holes} course={selectedCourse} units={units} onUnitsChange={setUnits} onBack={() => setScreen("home")} onNavigate={setScreen} />}
          {screen === "practice"  && <PracticeScreen completed={completedDrills} onToggle={toggleDrill} onBack={() => setScreen("home")} />}
          {screen === "strategy"  && <StrategyScreen onBack={() => setScreen("home")} />}
        </div>

        {!hideNav && <BottomNav current={screen} onNavigate={setScreen} />}
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import litecanvas from 'litecanvas';
import {
  Sparkles,
  ShieldCheck,
  Clock,
  Heart,
  ChevronLeft,
  X,
  MessageCircle,
  Phone,
  Maximize2,
  Info,
} from 'lucide-react';
import { buildWhatsAppUrl, ROTEM_PHONE } from '../utils/whatsapp.ts';

export interface DaycareZone {
  id: string;
  title: string;
  subtitle: string;
  theme: string;
  color: string;
  accentColor: string;
  iconName: string;
  x: number;
  y: number;
  w: number;
  h: number;
  hours: string;
  badge: string;
  highlights: string[];
  safety: string[];
  description: string;
}

export const DAYCARE_ZONES: DaycareZone[] = [
  {
    id: 'hive-core',
    title: 'קבלת הפנים ומפגש הבוקר',
    subtitle: 'The Hive Core - לב הכוורת',
    theme: 'honey',
    color: '#fef3c7',
    accentColor: '#d97706',
    iconName: 'sunny',
    x: 290,
    y: 40,
    w: 220,
    h: 180,
    hours: '07:30 - 08:30',
    badge: 'תחנת פתיחת היום',
    description:
      'מרכז הכוורת שבו הצוות מקבל כל ילד וילדה בחיבוק חם, חיוך ושיר אישי. כאן מתקיים מפגש הבוקר הנעים, סיפורי פתיחה ועדכון הלוח היומי.',
    highlights: [
      'קבלת פנים פרטנית ומלטפת לפרידה רגועה מההורים',
      'מפגש בוקר סביב השטיח עם שירים, תנועה ומשחקי היכרות',
      'לוח שבועי חזותי הממחיש את עונות השנה ושגרת הגן',
    ],
    safety: [
      'שער כניסה מבוקר ונעול עם קודן בטיחותי',
      'משטח כניסה תקני למניעת החלקה',
      'עמדת היגיינה ובדיקת שלומות קבועה בכל בוקר',
    ],
  },
  {
    id: 'free-play',
    title: 'מרחב הפעילות והמשחקים',
    subtitle: 'עולם של הרכבה ודמיון',
    theme: 'amber',
    color: '#ffedd5',
    accentColor: '#ea580c',
    iconName: 'extension',
    x: 40,
    y: 40,
    w: 230,
    h: 210,
    hours: '08:30 - 10:30',
    badge: 'פיתוח מוטוריקה',
    description:
      'אזור רחב ומוגן המדמה מגוון פינות התפתחות: משחקי הרכבה ולגו עץ, מטבחון פעוטות למשחקי תפקידים, פינת בובות וספריית פעוטות עשירה.',
    highlights: [
      'משחקי בנייה, לגו עץ ומסילות מגנטיות לפיתוח תפיסה מרחבית',
      'פינת דמיון עם בובות, תחפושות וכלי מטבחון מותאמים',
      'משטחי ג\'ימבורי רכים לטיפוס, זחילה ותרגול יציבה',
    ],
    safety: [
      'כל המשחקים בעלי תו תקן אירופאי/ישראלי וללא חלקים קטנים',
      'ריפוד מגן בכל הפינות והמשקופים',
      'חיטוי יומי יסודי של צעצועי הפעוטות',
    ],
  },
  {
    id: 'creative-arts',
    title: 'מתחם היצירה והחוגים',
    subtitle: 'צבע, מגע וריתמוסיקה',
    theme: 'rose',
    color: '#ffe4e6',
    accentColor: '#e11d48',
    iconName: 'palette',
    x: 530,
    y: 40,
    w: 230,
    h: 210,
    hours: '10:30 - 11:30',
    badge: 'מוטוריקה עדינה',
    description:
      'שולחנות עבודה מאוירים המותאמים במדויק לגובה הפעוטות. כאן מתקיימים חוגי המוזיקה, ציור באצבעות, פיסול בבצק טבעי ומפגשי טבע וחיות.',
    highlights: [
      'יצירה חושית: ציור בצבעי מים ידידותיים, ספוגים ובצק טבעי',
      'חוג ריתמוסיקה ותנועה שבועי בליווי כלי נגינה אמיתיים',
      'פיתוח אחיזת מלקחיים, תיאום עין-יד וביטוי יצירתי חופשי',
    ],
    safety: [
      'חומרי יצירה 100% Non-Toxic המאושרים לפעוטות ולשטיפה מהירה',
      'שולחנות וכיסאות עץ יציבים עם פינות מעוגלות',
      'השגחה צמודה של אנשי הצוות בכל שעת פעילות',
    ],
  },
  {
    id: 'dining',
    title: 'פינת האוכל והמטבחון',
    subtitle: 'תזונה טרייה ומבושלת מדי יום',
    theme: 'emerald',
    color: '#ecfdf5',
    accentColor: '#059669',
    iconName: 'restaurant',
    x: 40,
    y: 270,
    w: 230,
    h: 220,
    hours: '08:30, 11:45, 15:30',
    badge: 'אוכל מבושל במקום',
    description:
      'מתחם ארוחות נקי ונעים שבו מוגשות ארוחות חמות ומזינות המבושלות מדי בוקר במקום מחומרי גלם טריים בלבד, בהקפדה על הרגלי אכילה עצמאיים.',
    highlights: [
      'ארוחת בוקר עשירה: ביצים, גבינות, ירקות טריים ולחם מלא',
      'ארוחת צהריים חמה: מרק עשיר, מנה בשרית/חלבון, תוספת וירקות',
      'ארוחת ארבע קלה: פירות העונה וכריך בריאות',
    ],
    safety: [
      'מטבחון סגור ומרוחק מהישג ידם של הפעוטות',
      'הקפדה מוחלטת על איסור אלרגנים מסכנים (אגוזים, בוטנים וכו\')',
      'סטריליזציה יומיומית של כלי האוכל ושולחנות הנירוסטה',
    ],
  },
  {
    id: 'quiet-rest',
    title: 'אזור המנוחה והשינה',
    subtitle: 'שלווה, רוגע וטעינת כוחות',
    theme: 'indigo',
    color: '#e0e7ff',
    accentColor: '#4f46e5',
    iconName: 'bed',
    x: 530,
    y: 270,
    w: 230,
    h: 220,
    hours: '13:00 - 15:00',
    badge: 'מזרנים אורתופדיים',
    description:
      'מרחב שינה שקט וחשוך חלקית המשרה ביטחון ורוגע. הקטנטנים נרדמים לצלילי מוזיקה שקטה, עם מצעים אישיים מהבית והשגחה אישית של הצוות.',
    highlights: [
      'תאורה עמומה, צלילים מרגיעים ואווירה מלטפת לקראת שנת צהריים',
      'מזרנים אורתופדיים בעלי תקן בטיחות עם מצעים אישיים',
      'השכמה מדורגת ומלטפת ללא לחץ עם חיבוק חם',
    ],
    safety: [
      'פיקוח עין רציף וערנות מוחלטת של הצוות בכל שעות השינה',
      'בקרת טמפרטורה מדויקת של 22-24 מעלות כל השנה',
      'שמירה על מרחק בטיחותי תקני בין המיטות',
    ],
  },
  {
    id: 'outdoor-yard',
    title: 'החצר והמרחב החיצוני',
    subtitle: 'שמש, טבע, מרחב ומתקנים',
    theme: 'green',
    color: '#f0fdf4',
    accentColor: '#16a34a',
    iconName: 'yard',
    x: 290,
    y: 240,
    w: 220,
    h: 250,
    hours: '09:30 - 10:30, 16:00',
    badge: 'הצללה מלאה 95% UV',
    description:
      'חצר מרווחת ומטופחת עם משטח דשא סינתטי רך ומוגן, בימבות, מגלשות שיווי משקל לפעוטות, ארגז חול נקי ופינת עציצים ופרחים עונתיים.',
    highlights: [
      'רשת צל גדולה המסננת קרינת שמש ומאפשרת משחק בכל עונות השנה',
      'מתקני שיווי משקל ומגלשות בטיחותיות המותאמות לגיל הרך',
      'בימבות, עגלות משחק וכדורים לפיתוח מוטוריקה גסה',
    ],
    safety: [
      'משטח בלימת נפילות תקני מתחת לכל המתקנים',
      'שער כפול נעול למניעת יציאה עצמאית של ילדים',
      'ארגז חול מכוסה הרמטית לאחר כל פעילות למניעת זיהומים',
    ],
  },
];

export function DaycareMap() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<any>(null);
  const [selectedZone, setSelectedZone] = useState<DaycareZone | null>(null);
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null);

  const selectedZoneRef = useRef<DaycareZone | null>(null);
  useEffect(() => {
    selectedZoneRef.current = selectedZone;
  }, [selectedZone]);

  const pointerRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });

  useEffect(() => {
    if (!canvasRef.current) return;

    // Bees moving across the kindergarten map
    const bees = [
      { x: 150, y: 120, speed: 45, amplitude: 15, freq: 2, angle: 0 },
      { x: 600, y: 160, speed: 35, amplitude: 20, freq: 1.5, angle: 1.5 },
      { x: 400, y: 380, speed: 50, amplitude: 12, freq: 2.2, angle: 3 },
    ];

    let currentHovered: string | null = null;

    // Helper to draw rounded rectangle safely on any CanvasRenderingContext2D
    const drawRoundRect = (c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
      if (typeof c.roundRect === 'function') {
        c.roundRect(x, y, w, h, r);
      } else {
        const radius = Math.min(r, w / 2, h / 2);
        c.moveTo(x + radius, y);
        c.arcTo(x + w, y, x + w, y + h, radius);
        c.arcTo(x + w, y + h, x, y + h, radius);
        c.arcTo(x, y + h, x, y, radius);
        c.arcTo(x, y, x + w, y, radius);
        c.closePath();
      }
    };

    // Helper to draw ellipse safely
    const drawEllipse = (c: CanvasRenderingContext2D, x: number, y: number, rx: number, ry: number, rot = 0) => {
      if (typeof c.ellipse === 'function') {
        c.ellipse(x, y, rx, ry, rot, 0, Math.PI * 2);
      } else {
        c.save();
        c.translate(x, y);
        c.rotate(rot);
        c.scale(rx, ry);
        c.arc(0, 0, 1, 0, Math.PI * 2);
        c.restore();
      }
    };

    const engine = litecanvas({
      canvas: canvasRef.current,
      width: 800,
      height: 520,
      autoscale: false,
      global: false,
      loop: {
        init() {
          // Engine initialized
        },
        update(dt) {
          // Animate bees
          for (let i = 0; i < bees.length; i++) {
            const b = bees[i];
            b.x += b.speed * dt;
            b.y += Math.sin((engine.T + b.angle) * b.freq) * (b.amplitude * dt * 4);
            if (b.x > 840) {
              b.x = -40;
              b.y = 80 + (i * 130) % 360;
            }
          }
        },
        draw() {
          // Clear background with soft warm parchment tone
          engine.cls('#fbf8f2');

          // Safely acquire the real 2D Canvas context
          let ctx: CanvasRenderingContext2D | null = null;
          try {
            if (typeof (engine as any).ctx === 'function') {
              const c = (engine as any).ctx();
              if (c && typeof c.save === 'function') {
                ctx = c;
              }
            }
          } catch {
            // fallback below
          }
          if (!ctx && canvasRef.current) {
            const c = canvasRef.current.getContext('2d');
            if (c && typeof c.save === 'function') {
              ctx = c;
            }
          }

          // Draw honeycomb / warm grid background pattern
          if (ctx) {
            ctx.save();
            ctx.strokeStyle = 'rgba(217, 119, 6, 0.08)';
            ctx.lineWidth = 1;
            const hexSize = 28;
            for (let y = 0; y < 520; y += hexSize * 1.5) {
              for (let x = 0; x < 800; x += hexSize * 1.732) {
                ctx.beginPath();
                for (let a = 0; a < 6; a++) {
                  const angle = (Math.PI / 3) * a;
                  const hx = x + hexSize * Math.cos(angle);
                  const hy = y + hexSize * Math.sin(angle);
                  if (a === 0) ctx.moveTo(hx, hy);
                  else ctx.lineTo(hx, hy);
                }
                ctx.closePath();
                ctx.stroke();
              }
            }
            ctx.restore();
          }

          // Connecting walkways between zones
          if (ctx) {
            ctx.save();
            ctx.strokeStyle = '#e5d7c3';
            ctx.lineWidth = 14;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.setLineDash([8, 8]);
            ctx.beginPath();
            // Hive core to all zones
            ctx.moveTo(400, 130);
            ctx.lineTo(155, 145);
            ctx.moveTo(400, 130);
            ctx.lineTo(645, 145);
            ctx.moveTo(400, 130);
            ctx.lineTo(400, 365);
            ctx.moveTo(400, 365);
            ctx.lineTo(155, 380);
            ctx.moveTo(400, 365);
            ctx.lineTo(645, 380);
            ctx.stroke();
            ctx.restore();
          }

          // Draw each room / zone
          const p = pointerRef.current;
          const mx = p && p.x >= 0 ? p.x : engine.MX;
          const my = p && p.y >= 0 ? p.y : engine.MY;
          let foundHover: string | null = null;
          const activeZone = selectedZoneRef.current;

          for (const zone of DAYCARE_ZONES) {
            const isHover = mx >= zone.x && mx <= zone.x + zone.w && my >= zone.y && my <= zone.y + zone.h;
            if (isHover) {
              foundHover = zone.id;
            }

            const isSelected = activeZone?.id === zone.id;

            // Room card shadow
            engine.rectfill(zone.x + 3, zone.y + 4, zone.w, zone.h, 'rgba(95, 52, 20, 0.09)', 16);

            // Room body fill
            const bodyColor = isSelected ? '#fff9e6' : isHover ? '#ffffff' : zone.color;
            engine.rectfill(zone.x, zone.y, zone.w, zone.h, bodyColor, 16);

            // Room border outline
            const strokeColor = isSelected ? '#b45309' : isHover ? zone.accentColor : 'rgba(120, 53, 15, 0.2)';
            const strokeWidth = isSelected ? 3 : isHover ? 2.5 : 1.5;

            if (ctx) {
              ctx.save();
              ctx.strokeStyle = strokeColor;
              ctx.lineWidth = strokeWidth;
              ctx.beginPath();
              drawRoundRect(ctx, zone.x, zone.y, zone.w, zone.h, 16);
              ctx.stroke();

              // Top badge header
              ctx.fillStyle = zone.accentColor;
              ctx.beginPath();
              drawRoundRect(ctx, zone.x + 12, zone.y + 12, zone.w - 24, 26, 8);
              ctx.fill();

              // Badge text
              ctx.fillStyle = '#ffffff';
              ctx.font = 'bold 12px Heebo, sans-serif';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.direction = 'rtl';
              ctx.fillText(zone.badge, zone.x + zone.w / 2, zone.y + 25);

              // Title
              ctx.fillStyle = '#311400';
              ctx.font = 'bold 15px Heebo, sans-serif';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'top';
              ctx.direction = 'rtl';
              ctx.fillText(zone.title, zone.x + zone.w / 2, zone.y + 48);

              // Subtitle
              ctx.fillStyle = '#78350f';
              ctx.font = '12px Heebo, sans-serif';
              ctx.fillText(zone.subtitle, zone.x + zone.w / 2, zone.y + 70);

              // Central decorative circular emblem
              const cx = zone.x + zone.w / 2;
              const cy = zone.y + 118;
              ctx.beginPath();
              ctx.arc(cx, cy, 26, 0, Math.PI * 2);
              ctx.fillStyle = '#ffffff';
              ctx.fill();
              ctx.strokeStyle = zone.accentColor;
              ctx.lineWidth = 2;
              ctx.stroke();

              // Icon initial or mini symbol
              ctx.fillStyle = zone.accentColor;
              ctx.font = 'bold 18px Heebo, sans-serif';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              const symbolMap: Record<string, string> = {
                'hive-core': '☀️',
                'free-play': '🧩',
                'creative-arts': '🎨',
                'dining': '🥣',
                'quiet-rest': '🌙',
                'outdoor-yard': '🌳',
              };
              ctx.fillText(symbolMap[zone.id] || '✨', cx, cy);

              // Hours pill
              ctx.fillStyle = 'rgba(120, 53, 15, 0.08)';
              ctx.beginPath();
              drawRoundRect(ctx, zone.x + 16, zone.y + zone.h - 38, zone.w - 32, 24, 12);
              ctx.fill();

              ctx.fillStyle = '#5f3414';
              ctx.font = '11px Heebo, sans-serif';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(`🕒 ${zone.hours}`, zone.x + zone.w / 2, zone.y + zone.h - 26);

              // Hover/Select pulsing ring
              if (isHover || isSelected) {
                const pulse = Math.sin(engine.T * 5) * 2;
                ctx.strokeStyle = zone.accentColor;
                ctx.lineWidth = 1.5;
                ctx.setLineDash([4, 4]);
                ctx.beginPath();
                drawRoundRect(ctx, zone.x - 4 - pulse, zone.y - 4 - pulse, zone.w + 8 + pulse * 2, zone.h + 8 + pulse * 2, 20);
                ctx.stroke();
                ctx.setLineDash([]);
              }

              ctx.restore();
            }
          }

          if (currentHovered !== foundHover) {
            currentHovered = foundHover;
            setHoveredZoneId(foundHover);
          }

          // Draw the animated bees flying over the kindergarten
          if (ctx) {
            for (let i = 0; i < bees.length; i++) {
              const b = bees[i];
              ctx.save();
              ctx.translate(b.x, b.y);

              // Bee body (oval)
              ctx.fillStyle = '#f59e0b';
              ctx.beginPath();
              drawEllipse(ctx, 0, 0, 10, 7, 0);
              ctx.fill();
              ctx.strokeStyle = '#78350f';
              ctx.lineWidth = 1.2;
              ctx.stroke();

              // Stripes
              ctx.fillStyle = '#311400';
              ctx.fillRect(-2, -6, 2.5, 12);
              ctx.fillRect(3, -5, 2.5, 10);

              // Wings with flutter animation
              const wingFlap = Math.sin(engine.T * 30 + i) * 6;
              ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
              ctx.strokeStyle = '#93c5fd';
              ctx.lineWidth = 1;
              ctx.beginPath();
              drawEllipse(ctx, -1, -8 + wingFlap * 0.4, 4, 7, 0.3);
              ctx.fill();
              ctx.stroke();

              ctx.restore();
            }
          }

          // Top corner indicator
          if (ctx) {
            ctx.save();
            ctx.fillStyle = '#311400';
            ctx.font = 'bold 12px Heebo, sans-serif';
            ctx.textAlign = 'right';
            ctx.direction = 'rtl';
            ctx.fillText('🐝 לחצו על כל מתחם במפה כדי לפתוח פרטים ותקני בטיחות', 780, 20);
            ctx.restore();
          }
        },
        tapped(tapX, tapY) {
          // Handle tap / click
          for (const zone of DAYCARE_ZONES) {
            if (tapX >= zone.x && tapX <= zone.x + zone.w && tapY >= zone.y && tapY <= zone.y + zone.h) {
              setSelectedZone(zone);
              break;
            }
          }
        },
      },
    });

    engineRef.current = engine;

    return () => {
      engine.quit();
    };
  }, []);

  const getCanvasCoords = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;
    return {
      x: (clientX - rect.left) * (800 / rect.width),
      y: (clientY - rect.top) * (520 / rect.height),
    };
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const coords = getCanvasCoords(e.clientX, e.clientY);
    if (coords) {
      pointerRef.current = coords;
    }
  };

  const handleCanvasMouseLeave = () => {
    pointerRef.current = { x: -100, y: -100 };
    setHoveredZoneId(null);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const coords = getCanvasCoords(e.clientX, e.clientY);
    if (!coords) return;
    for (const zone of DAYCARE_ZONES) {
      if (coords.x >= zone.x && coords.x <= zone.x + zone.w && coords.y >= zone.y && coords.y <= zone.y + zone.h) {
        setSelectedZone(zone);
        break;
      }
    }
  };

  const handleCardClick = (zone: DaycareZone) => {
    setSelectedZone(zone);
  };

  const handleWhatsAppBooking = (zone: DaycareZone) => {
    const text = `שלום רותם, ביקרתי במפה האינטראקטיבית באתר והתרשמתי מאוד מ${zone.title} (${zone.subtitle}). אשמח לתאם סיור היכרות ולשמוע עוד על ההרשמה לגן באריאל!`;
    const url = buildWhatsAppUrl(text, ROTEM_PHONE);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="map" className="py-16 bg-[#fbf9f5] scroll-mt-20 border-b border-[#e4e2de]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdcc6]/80 text-[#5f3414] text-xs sm:text-sm font-semibold mb-3 border border-[#f9b98e]">
            <Sparkles className="w-4 h-4 text-[#d97706]" />
            מנוע סיור 2D קליל (litecanvas ~4KB)
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#311400] font-['Epilogue',sans-serif] tracking-tight">
            סיור אינטראקטיבי במרחבי הגן
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#51443c] leading-relaxed">
            סיירו במבנה הגן של מאיה באריאל. לחצו על כל אחד מ-6 המתחמים כדי לראות את שגרת הפעילות, התקנים, והמרחב הבטוח שבו ילדכם גדל.
          </p>
        </div>

        {/* Interactive Canvas Container */}
        <div className="relative bg-white rounded-3xl p-3 sm:p-5 shadow-xl border border-[#e4e2de] overflow-hidden">
          {/* Canvas Wrapper */}
          <div className="relative w-full aspect-[800/520] max-h-[560px] mx-auto rounded-2xl overflow-hidden border border-[#e5d7c3] bg-[#fbf8f2]">
            <canvas
              ref={canvasRef}
              id="kindergarten-map"
              width={800}
              height={520}
              onClick={handleCanvasClick}
              onMouseMove={handleCanvasMouseMove}
              onMouseLeave={handleCanvasMouseLeave}
              className="w-full h-full block cursor-pointer select-none touch-manipulation"
              aria-label="מפה אינטראקטיבית של גן הילדים הבית של מאיה באריאל"
            />
          </div>

          {/* Quick Helper Banner */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-[#51443c] bg-[#f5f3ef] p-3 rounded-xl border border-[#e4e2de]">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#d97706] shrink-0" />
              <span>
                ניתן ללחוץ ישירות על כל חדר במפה, או לבחור מהכפתורים מטה לצפייה מהירה בטלפונים ניידים.
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-medium text-[#78350f]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              מתחם פעוטון וצהרון עד 40 ילדים
            </div>
          </div>
        </div>

        {/* 6 Quick Zone Selector Cards (Mobile & Desktop friendly) */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {DAYCARE_ZONES.map((zone) => {
            const isHovered = hoveredZoneId === zone.id;
            const isSelected = selectedZone?.id === zone.id;
            return (
              <button
                key={zone.id}
                type="button"
                onClick={() => handleCardClick(zone)}
                className={`text-right p-3 rounded-2xl transition-all duration-200 border cursor-pointer ${
                  isSelected
                    ? 'bg-[#fef3c7] border-[#d97706] shadow-md -translate-y-0.5 ring-2 ring-[#d97706]/40'
                    : isHovered
                    ? 'bg-white border-[#f59e0b] shadow-sm -translate-y-0.5'
                    : 'bg-white border-[#e4e2de] hover:border-[#d97706]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded-md bg-[#f5f3ef] text-[#5f3414]">
                    {zone.badge.split(' ')[0]}
                  </span>
                  <span className="text-base">
                    {zone.id === 'hive-core' && '☀️'}
                    {zone.id === 'free-play' && '🧩'}
                    {zone.id === 'creative-arts' && '🎨'}
                    {zone.id === 'dining' && '🥣'}
                    {zone.id === 'quiet-rest' && '🌙'}
                    {zone.id === 'outdoor-yard' && '🌳'}
                  </span>
                </div>
                <div className="font-bold text-xs sm:text-sm text-[#311400] leading-snug line-clamp-1">
                  {zone.title}
                </div>
                <div className="text-[11px] text-[#78350f] mt-0.5 line-clamp-1">
                  {zone.hours}
                </div>
              </button>
            );
          })}
        </div>

        {/* Zone Detail Modal */}
        {selectedZone && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="zone-dialog-title"
          >
            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#e4e2de] overflow-hidden max-h-[90vh] flex flex-col">
              {/* Modal Header */}
              <div
                className="p-6 text-white relative flex items-start justify-between"
                style={{
                  background: `linear-gradient(135deg, ${selectedZone.accentColor}, #431407)`,
                }}
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-semibold mb-2">
                    <Clock className="w-3.5 h-3.5" />
                    {selectedZone.hours} • {selectedZone.badge}
                  </div>
                  <h3 id="zone-dialog-title" className="text-2xl sm:text-3xl font-extrabold font-['Epilogue',sans-serif]">
                    {selectedZone.title}
                  </h3>
                  <p className="text-white/80 text-sm mt-1">{selectedZone.subtitle}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedZone(null)}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                  aria-label="סגור חלונית"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="p-6 overflow-y-auto space-y-6 text-[#1b1c1a]">
                {/* Description */}
                <p className="text-base text-[#51443c] leading-relaxed">
                  {selectedZone.description}
                </p>

                {/* Highlights */}
                <div className="bg-[#fbf9f5] p-4 rounded-2xl border border-[#e4e2de]">
                  <h4 className="font-bold text-[#311400] text-sm sm:text-base flex items-center gap-2 mb-3">
                    <Heart className="w-4 h-4 text-[#e11d48]" />
                    פעילויות ומרחבי עשייה במתחם זה:
                  </h4>
                  <ul className="space-y-2">
                    {selectedZone.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-[#51443c]">
                        <span className="text-amber-500 font-bold shrink-0">✦</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Safety Standards */}
                <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/80">
                  <h4 className="font-bold text-emerald-950 text-sm sm:text-base flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    תקני בטיחות, היגיינה ופיקוח:
                  </h4>
                  <ul className="space-y-2">
                    {selectedZone.safety.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-emerald-900">
                        <span className="text-emerald-600 font-bold shrink-0">✔</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="p-4 sm:p-6 bg-[#fbf9f5] border-t border-[#e4e2de] flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedZone(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#e4e2de] text-[#51443c] font-medium hover:bg-white transition-colors cursor-pointer text-sm"
                >
                  חזרה למפת הגן
                </button>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => handleWhatsAppBooking(selectedZone)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    תיאום סיור במתחם זה בווטסאפ
                  </button>
                  <a
                    href="tel:0528707056"
                    className="p-2.5 rounded-xl border border-[#e4e2de] bg-white text-[#5f3414] hover:bg-[#ffdcc6]/40 transition-colors"
                    title="חייגו ישירות לרותם"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

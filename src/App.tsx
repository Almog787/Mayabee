import React, { useState } from "react";
import { PolicyModal, ModalType } from "./components/PolicyModal";
import { DaycareMap } from "./components/DaycareMap.tsx";
import {
  formatParentWhatsAppMessage,
  formatCareerWhatsAppMessage,
  buildWhatsAppUrl,
  ROTEM_PHONE,
} from "./utils/whatsapp.ts";

const LOGO_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCEcDQNrfe6hVjYHKWmKwxDdNbS-digJx_veeZRO1B694REoxl78-T_kPbu6kMfzM4DvlE11glPVo-4TS1Kworjrk6X5vPuwrJFc_euk89b6P-RWUNKeSoDK3-7_b7oe5sBrsRZ8bNl3mBdQ-fzoI74-l8vjbFEy0M1JPYVc6ZP7zGOxgsqSEutn_xdcqpBoB-LnS1V5lNcQLOYic0sXctonfGkiLgbKpp--cPewNuSZi-UEEBgmTbnsXpWqx2OSH0QpA";

export default function App() {
  // Navigation / Modal state
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Parent Registration Form State
  const [parentName, setParentName] = useState("");
  const [childInfo, setChildInfo] = useState("");
  const [parentCity, setParentCity] = useState("אריאל");
  const [parentPhone, setParentPhone] = useState("");
  const [parentNotes, setParentNotes] = useState("");
  const [parentSubmitted, setParentSubmitted] = useState(false);

  // Career Recruitment Form State
  const [careerName, setCareerName] = useState("");
  const [careerPhone, setCareerPhone] = useState("");
  const [careerCity, setCareerCity] = useState("אריאל");
  const [careerExp, setCareerExp] = useState("");
  const [careerSubmitted, setCareerSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleParentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName.trim() || !childInfo.trim() || !parentPhone.trim()) return;

    const message = formatParentWhatsAppMessage({
      parentName,
      childInfo,
      city: parentCity,
      phone: parentPhone,
      notes: parentNotes,
    });
    const url = buildWhatsAppUrl(message, ROTEM_PHONE);
    setParentSubmitted(true);
    window.open(url, "_blank");
  };

  const handleCareerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!careerName.trim() || !careerPhone.trim() || !careerExp.trim()) return;

    const message = formatCareerWhatsAppMessage({
      name: careerName,
      phone: careerPhone,
      city: careerCity,
      experience: careerExp,
    });
    const url = buildWhatsAppUrl(message, ROTEM_PHONE);
    setCareerSubmitted(true);
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#fbf9f5] text-[#1b1c1a] antialiased flex flex-col font-sans selection:bg-[#ffd9df] selection:text-[#5f3414]">
      {/* ================= TOP APP BAR ================= */}
      <header className="bg-[#fbf9f5]/95 backdrop-blur-md text-[#5f3414] top-0 sticky z-40 shadow-sm border-b border-[#d6c3b8]/30">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-2.5">
          {/* Brand Logo / Identity */}
          <a
            className="flex items-center gap-3 group active:scale-95 transition-transform duration-150 ease-out"
            href="#hero"
          >
            <div className="w-11 h-11 rounded-full p-0.5 bg-[#ffdeab] ring-2 ring-[#7a4b29]/20 overflow-hidden shadow-sm flex items-center justify-center">
              <img
                alt="הבית של מאיה - בהנהלת רותם עירון"
                className="w-full h-full object-cover rounded-full"
                src={LOGO_URL}
              />
            </div>
            <div className="flex flex-col text-right">
              <span className="text-xl font-bold text-[#5f3414] leading-tight font-heading">
                הבית של מאיה
              </span>
              <span className="text-xs text-[#51443c] font-medium">
                בהנהלת רותם עירון • אריאל
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold">
            <a
              className="text-[#5f3414] border-b-2 border-[#5f3414] pb-0.5"
              href="#hero"
            >
              עלינו
            </a>
            <a
              className="text-[#51443c] hover:text-[#5f3414] transition-colors"
              href="#values"
            >
              הערכים שלנו
            </a>
            <a
              className="text-[#51443c] hover:text-[#5f3414] transition-colors"
              href="#map"
            >
              מפת הגן (2D)
            </a>
            <a
              className="text-[#51443c] hover:text-[#5f3414] transition-colors"
              href="#schedule"
            >
              סדר היום
            </a>
            <a
              className="text-[#51443c] hover:text-[#5f3414] transition-colors"
              href="#faq"
            >
              שאלות נפוצות
            </a>
            <a
              className="text-[#51443c] hover:text-[#5f3414] transition-colors"
              href="#register"
            >
              הרשמה לילדים
            </a>
            <a
              className="text-[#51443c] hover:text-[#5f3414] transition-colors"
              href="#careers"
            >
              דרושים ומשרות
            </a>
            <a
              className="text-[#51443c] hover:text-[#5f3414] transition-colors"
              href="#contact"
            >
              יצירת קשר
            </a>
          </nav>

          {/* Trailing Action Buttons */}
          <div className="flex items-center gap-2">
            <a
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#efeeea] hover:bg-[#eae8e4] text-[#5f3414] text-xs font-bold active:scale-95 transition-all"
              href="tel:0528707056"
            >
              <span className="material-symbols-outlined text-[#5f3414] text-base">call</span>
              <span>חייגו אלינו</span>
            </a>

            <a
              className="inline-flex items-center gap-2 px-3.5 py-2 md:px-4 md:py-2.5 rounded-xl bg-[#7a4b29] text-white text-xs md:text-sm font-bold shadow-sm hover:bg-[#5f3414] active:scale-95 transition-all"
              href="#register"
            >
              <span className="material-symbols-outlined text-[#ffdeab] text-base fill-icon">
                chat
              </span>
              <span>שריון מקום בווטסאפ</span>
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="lg:hidden p-2 rounded-xl bg-[#efeeea] text-[#5f3414]"
              aria-label="פתח תפריט"
            >
              <span className="material-symbols-outlined text-xl">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 py-3 bg-[#ffffff] border-b border-[#efeeea] space-y-2 text-sm font-bold">
            <a
              className="block p-2 rounded-lg text-[#5f3414] hover:bg-[#fbf9f5]"
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
            >
              עלינו
            </a>
            <a
              className="block p-2 rounded-lg text-[#51443c] hover:bg-[#fbf9f5]"
              href="#values"
              onClick={() => setMobileMenuOpen(false)}
            >
              הערכים שלנו
            </a>
            <a
              className="block p-2 rounded-lg text-[#51443c] hover:bg-[#fbf9f5]"
              href="#map"
              onClick={() => setMobileMenuOpen(false)}
            >
              סיור במפת הגן (2D)
            </a>
            <a
              className="block p-2 rounded-lg text-[#51443c] hover:bg-[#fbf9f5]"
              href="#schedule"
              onClick={() => setMobileMenuOpen(false)}
            >
              סדר היום
            </a>
            <a
              className="block p-2 rounded-lg text-[#51443c] hover:bg-[#fbf9f5]"
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
            >
              שאלות נפוצות
            </a>
            <a
              className="block p-2 rounded-lg text-[#51443c] hover:bg-[#fbf9f5]"
              href="#register"
              onClick={() => setMobileMenuOpen(false)}
            >
              הרשמה לילדים
            </a>
            <a
              className="block p-2 rounded-lg text-[#51443c] hover:bg-[#fbf9f5]"
              href="#careers"
              onClick={() => setMobileMenuOpen(false)}
            >
              דרושים ומשרות
            </a>
            <a
              className="block p-2 rounded-lg text-[#51443c] hover:bg-[#fbf9f5]"
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
            >
              יצירת קשר
            </a>
            <a
              className="block p-2 rounded-lg bg-[#25D366] text-white flex items-center gap-1.5"
              href={`https://wa.me/${ROTEM_PHONE}?text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%A8%D7%95%D7%AA%D7%9D%2C%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%93%D7%A8%D7%9A%20%D7%94%D7%90%D7%AA%D7%A8%20%D7%95%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A7%D7%91%D7%9C%20%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A0%D7%95%D7%A1%D7%A4%D7%99%D7%9D!`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="material-symbols-outlined text-base fill-icon">chat</span>
              <span>שיחה ישירה בווטסאפ עם רותם</span>
            </a>
          </div>
        )}
      </header>

      {/* ================= SECTION 1: HERO SECTION ================= */}
      <section
        className="relative overflow-hidden pt-8 md:pt-14 pb-14 bg-gradient-to-b from-[#fbf9f5] via-[#FFF9F3] to-[#f5f3ef] border-b border-[#d6c3b8]/20"
        id="hero"
      >
        {/* Atmospheric background decor */}
        <div className="absolute -top-24 right-1/4 w-96 h-96 bg-[#ffdeab]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-10 w-80 h-80 bg-[#ffd9df]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center text-center">
          {/* Logo Emblem Centerpiece */}
          <div className="relative mb-6 group">
            <div className="w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full p-2 bg-gradient-to-tr from-[#ffdeab] via-[#ffd9df] to-[#ffdeab] shadow-xl ring-4 ring-white flex items-center justify-center transition-transform duration-300 hover:scale-[1.02]">
              <img
                alt="הבית של מאיה - בהנהלת רותם עירון"
                className="w-full h-full object-cover rounded-full"
                src={LOGO_URL}
              />
            </div>
            {/* Decorative Floating Badges */}
            <div className="absolute -bottom-2 md:bottom-2 -right-4 md:-right-6 bg-white border border-[#d6c3b8]/40 rounded-2xl px-3.5 py-1.5 shadow-md flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#7e5700] fill-icon text-lg">
                local_florist
              </span>
              <span className="text-xs text-[#5f3414] font-bold">עוטפים באהבה</span>
            </div>
          </div>

          {/* Main Headline & Subtitle */}
          <div className="max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffdeab]/60 text-[#7e5700] text-xs font-bold">
              <span className="material-symbols-outlined text-sm fill-icon">favorite</span>
              <span>פעוטון וצהרון מומלץ באריאל</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#5f3414] tracking-tight leading-tight font-heading">
              הבית החם והמתוק של הילדים שלכם באריאל
            </h1>
            <p className="text-base sm:text-lg text-[#51443c] max-w-2xl mx-auto leading-relaxed">
              מסגרת חינוכית עשירה בחום, אהבה, למידה חווייתית וביטחון מלא. בהנהלת רותם עירון.
            </p>
          </div>

          {/* Primary Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
            <a
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#7a4b29] text-white font-bold text-base shadow-md hover:bg-[#5f3414] active:scale-95 transition-all flex items-center justify-center gap-2"
              href="#register"
            >
              <span className="material-symbols-outlined fill-icon text-[#ffdeab]">
                assignment_ind
              </span>
              <span>שמירת מקום לשנת הלימודים הקרובה</span>
            </a>
            <a
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#ffd9df]/70 border border-[#ffd9df] text-[#5f3414] font-bold text-base hover:bg-[#ffd9df] active:scale-95 transition-all flex items-center justify-center gap-2"
              href="#careers"
            >
              <span className="material-symbols-outlined fill-icon text-[#652d3b]">groups</span>
              <span>הצטרפות לצוות המוביל שלנו</span>
            </a>
          </div>

          {/* Trust Indicators / Badges Grid */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-4xl pt-6 border-t border-[#d6c3b8]/30">
            <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/90 border border-[#d6c3b8]/30 shadow-sm">
              <span className="material-symbols-outlined text-[#7e5700] text-xl">group_work</span>
              <span className="text-xs sm:text-sm font-bold text-[#1b1c1a]">
                קבוצות קטנות ואיכותיות
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/90 border border-[#d6c3b8]/30 shadow-sm">
              <span className="material-symbols-outlined text-[#652d3b] text-xl fill-icon">
                volunteer_activism
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#1b1c1a]">
                יחס אישי וחם
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/90 border border-[#d6c3b8]/30 shadow-sm">
              <span className="material-symbols-outlined text-[#7e5700] text-xl">
                verified_user
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#1b1c1a]">
                פיקוח וליווי מקצועי
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/90 border border-[#d6c3b8]/30 shadow-sm">
              <span className="material-symbols-outlined text-[#5f3414] text-xl">videocam</span>
              <span className="text-xs sm:text-sm font-bold text-[#1b1c1a]">
                מצלמות ואבטחה
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 2: VALUES ================= */}
      <section className="py-14 bg-[#fbf9f5]" id="values">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdeab]/60 text-[#7e5700] text-xs font-bold mb-2">
              <span className="material-symbols-outlined text-sm">stars</span>
              מה מחכה בכוורת שלנו?
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#5f3414] font-heading">
              למה הורים באריאל בוחרים בבית של מאיה?
            </h2>
            <p className="text-sm sm:text-base text-[#51443c] mt-2">
              אנחנו מאמינים שכל ילד וילדה זקוקים לקרקע בטוחה, אווירה נינוחה והרבה חום כדי לגלות את
              העולם בחיוך ובסקרנות טבעית.
            </p>
          </div>

          {/* Bento Grid of 4 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
            {/* Card 1: Warmth & Love */}
            <div className="p-6 rounded-3xl bg-white border border-[#d6c3b8]/40 custom-shadow-warm relative overflow-hidden flex flex-col justify-between group hover:border-[#ffd9df] transition-all">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#FFF0F3] border border-[#F7A8B8] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#8C3B4E] text-2xl fill-icon">
                    favorite
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[#8C3B4E] uppercase tracking-wider font-bold">
                    הלב של הגן
                  </span>
                  <h3 className="text-lg font-bold text-[#5f3414] mt-1 font-heading">
                    חום, יחס אישי ואהבה
                  </h3>
                  <p className="text-sm text-[#51443c] mt-2 leading-relaxed">
                    דגש עמוק על פיתוח רגשי, יחס עוטף המותאם לקצב ההתפתחות הייחודי של כל ילד, קבוצות
                    אינטימיות וחיבוק אמיתי לכל בוקר חדש.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#efeeea] flex items-center text-xs font-semibold text-[#51443c]">
                <span className="material-symbols-outlined text-sm ml-1 text-[#7e5700]">
                  check_circle
                </span>
                תשומת לב מרבית לכל פעוט ופעוטה
              </div>
            </div>

            {/* Card 2: Professional Leadership */}
            <div className="p-6 rounded-3xl bg-white border border-[#d6c3b8]/40 custom-shadow-warm relative overflow-hidden flex flex-col justify-between group hover:border-[#ffdeab] transition-all">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#FFF5D6] border border-[#F3B233]/40 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#7A4B29] text-2xl fill-icon">
                    school
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[#7e5700] font-bold">ניהול מקצועי</span>
                  <h3 className="text-lg font-bold text-[#5f3414] mt-1 font-heading">
                    הנהלה מקצועית ובעלת ניסיון
                  </h3>
                  <p className="text-sm text-[#51443c] mt-2 leading-relaxed">
                    בהנהלת רותם עירון – ליווי מקצועי רציף, סטנדרטים פדגוגיים מוקפדים, תקשורת פתוחה
                    ושותפות אמיתית עם ההורים לאורך כל השנה.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#efeeea] flex items-center text-xs font-semibold text-[#51443c]">
                <span className="material-symbols-outlined text-sm ml-1 text-[#7e5700]">
                  check_circle
                </span>
                ניסיון עשיר וליווי התפתחותי מוסמך
              </div>
            </div>

            {/* Card 3: Safe & Enriching Environment */}
            <div className="p-6 rounded-3xl bg-white border border-[#d6c3b8]/40 custom-shadow-warm relative overflow-hidden flex flex-col justify-between group hover:border-[#9DB68C] transition-all">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#E8F0E4] border border-[#9DB68C] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#446132] text-2xl fill-icon">
                    yard
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[#446132] font-bold">סביבה טבעית</span>
                  <h3 className="text-lg font-bold text-[#5f3414] mt-1 font-heading">
                    סביבה מוגנת ומעשירה
                  </h3>
                  <p className="text-sm text-[#51443c] mt-2 leading-relaxed">
                    סדר יום עשיר בתנועה, מוזיקה וחוגים, ארוחות מזינות ומבושלות טריות מדי יום, חצר
                    משחקים מוצלת, ירוקה ובטיחותית לפי כל התקנים.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#efeeea] flex items-center text-xs font-semibold text-[#51443c]">
                <span className="material-symbols-outlined text-sm ml-1 text-[#7e5700]">
                  check_circle
                </span>
                תפריט בריא ומגוון המותאם לגיל הרך
              </div>
            </div>

            {/* Card 4: Transparency & Communication */}
            <div className="p-6 rounded-3xl bg-white border border-[#d6c3b8]/40 custom-shadow-warm relative overflow-hidden flex flex-col justify-between group hover:border-[#d6c3b8] transition-all">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#FFF9F3] border border-[#d6c3b8] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#5f3414] text-2xl fill-icon">
                    forum
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[#5f3414] font-bold">הקשבה ושותפות</span>
                  <h3 className="text-lg font-bold text-[#5f3414] mt-1 font-heading">
                    שקיפות ותקשורת רציפה
                  </h3>
                  <p className="text-sm text-[#51443c] mt-2 leading-relaxed">
                    עדכונים שוטפים, פתיחות מלאה, מענה זמין להורים ושקט נפשי מוחלט בידיעה שהאוצר שלכם
                    נמצא בידיים הכי בטוחות ומסורות שיש.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#efeeea] flex items-center text-xs font-semibold text-[#51443c]">
                <span className="material-symbols-outlined text-sm ml-1 text-[#7e5700]">
                  check_circle
                </span>
                קשר ישיר עם רותם והצוות בכל שאלה
              </div>
            </div>
          </div>

          {/* ================= SCHEDULE ================= */}
          <div
            className="p-6 md:p-8 rounded-3xl bg-[#f5f3ef] border border-[#d6c3b8]/30"
            id="schedule"
          >
            <div className="text-center max-w-2xl mx-auto mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdeab]/60 text-[#7e5700] text-xs font-bold mb-1">
                <span className="material-symbols-outlined text-xs">schedule</span>
                סדר יום רגוע ומובנה
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#5f3414] font-heading">
                סדר היום המתוק שלנו בכוורת
              </h3>
              <p className="text-xs md:text-sm text-[#51443c]">
                שגרה מבורכת המעניקה לילדים עוגן של ביטחון, שלווה ושמחה
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <div className="p-4 rounded-2xl bg-white border border-[#d6c3b8]/20 flex flex-col items-center text-center">
                <span className="text-sm font-bold text-[#7e5700]">07:30 - 08:30</span>
                <span className="text-sm font-bold text-[#5f3414] mt-1">קבלת פנים חמה</span>
                <p className="text-xs text-[#51443c] mt-1">
                  חיבוק בוקר אישי ומשחקי שולחן רגועים
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#d6c3b8]/20 flex flex-col items-center text-center">
                <span className="text-sm font-bold text-[#7e5700]">08:45 - 09:30</span>
                <span className="text-sm font-bold text-[#5f3414] mt-1">ארוחת בוקר מזינה</span>
                <p className="text-xs text-[#51443c] mt-1">
                  ירקות חתוכים, גבינות, לחמים וממרחים בריאים
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#d6c3b8]/20 flex flex-col items-center text-center">
                <span className="text-sm font-bold text-[#7e5700]">09:30 - 11:30</span>
                <span className="text-sm font-bold text-[#5f3414] mt-1">מפגש, חוגים וחצר</span>
                <p className="text-xs text-[#51443c] mt-1">
                  שירי עונות, סיפורים, יצירה ומשחק מוטורי בחצר
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#d6c3b8]/20 flex flex-col items-center text-center">
                <span className="text-sm font-bold text-[#7e5700]">11:45 - 12:45</span>
                <span className="text-sm font-bold text-[#5f3414] mt-1">ארוחת צהריים חמה</span>
                <p className="text-xs text-[#51443c] mt-1">
                  אוכל ביתי מבושל, מגוון ומאוזן תזונתית
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#d6c3b8]/20 flex flex-col items-center text-center">
                <span className="text-sm font-bold text-[#7e5700]">13:00 - 15:00</span>
                <span className="text-sm font-bold text-[#5f3414] mt-1">מנוחת צהריים שלווה</span>
                <p className="text-xs text-[#51443c] mt-1">
                  שינה מתוקה עם מנגינות מרגיעות ואיסוף נעים
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= INTERACTIVE 2D DAYCARE MAP (litecanvas) ================= */}
      <DaycareMap />

      {/* ================= SECTION 3: PARENT REGISTRATION FORM ================= */}
      <section
        className="py-14 bg-gradient-to-b from-[#fbf9f5] via-[#FFF6ED] to-[#fbf9f5] border-y border-[#d6c3b8]/30"
        id="register"
      >
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          {/* Card Container */}
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-[#F8ECE2] shadow-xl relative overflow-hidden">
            {/* Decorative subtle element */}
            <div className="absolute -top-12 -left-12 w-36 h-36 bg-[#ffdeab]/40 rounded-full blur-2xl pointer-events-none" />

            <div className="text-center max-w-xl mx-auto mb-8 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#ffdeab]/50 text-[#7e5700] text-xs font-bold mb-2">
                <span className="material-symbols-outlined text-sm fill-icon">favorite</span>
                <span>הרשמה ומידע להורים באריאל</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#5f3414] font-heading">
                רוצים לשמוע עוד? נשמח להכיר!
              </h2>
              <p className="text-xs md:text-sm text-[#51443c] mt-2">
                מלאו את הפרטים ונחזור אליכם ישירות בווטסאפ עם כל המידע על הגן באריאל, זמני פעילות
                ושריון מקום.
              </p>
            </div>

            {parentSubmitted && (
              <div className="mb-6 p-4 rounded-2xl bg-green-50 border border-green-200 text-green-800 text-sm flex items-center gap-3">
                <span className="material-symbols-outlined text-2xl text-green-600 fill-icon">
                  check_circle
                </span>
                <div>
                  <p className="font-bold">תודה רבה! שיחת הווטסאפ עם רותם נפתחה.</p>
                  <p className="text-xs text-green-700">
                    אם החלון נחסם על ידי הדפדפן, לחצו שוב על כפתור השליחה למטה.
                  </p>
                </div>
              </div>
            )}

            <form className="space-y-4 relative z-10" onSubmit={handleParentSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Parent Name */}
                <div>
                  <label
                    className="block text-xs font-bold text-[#5f3414] mb-1.5"
                    htmlFor="parentName"
                  >
                    שם מלא של ההורה <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute right-3 top-3.5 text-[#84746b] text-lg pointer-events-none">
                      person
                    </span>
                    <input
                      className="w-full pr-10 pl-3 py-3 rounded-2xl bg-[#FFFDF9] border border-[#d6c3b8]/80 text-[#1b1c1a] focus:outline-none focus:ring-2 focus:ring-[#7e5700] text-sm transition-all"
                      id="parentName"
                      placeholder="לדוגמה: יעל כהן"
                      required
                      type="text"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Child Name and Age */}
                <div>
                  <label
                    className="block text-xs font-bold text-[#5f3414] mb-1.5"
                    htmlFor="childInfo"
                  >
                    שם הילד/ה + גיל <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute right-3 top-3.5 text-[#84746b] text-lg pointer-events-none">
                      child_care
                    </span>
                    <input
                      className="w-full pr-10 pl-3 py-3 rounded-2xl bg-[#FFFDF9] border border-[#d6c3b8]/80 text-[#1b1c1a] focus:outline-none focus:ring-2 focus:ring-[#7e5700] text-sm transition-all"
                      id="childInfo"
                      placeholder="לדוגמה: איתי, שנה וחצי"
                      required
                      type="text"
                      value={childInfo}
                      onChange={(e) => setChildInfo(e.target.value)}
                    />
                  </div>
                </div>

                {/* City */}
                <div>
                  <label
                    className="block text-xs font-bold text-[#5f3414] mb-1.5"
                    htmlFor="parentCity"
                  >
                    עיר מגורים
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute right-3 top-3.5 text-[#84746b] text-lg pointer-events-none">
                      location_on
                    </span>
                    <input
                      className="w-full pr-10 pl-3 py-3 rounded-2xl bg-[#FFFDF9] border border-[#d6c3b8]/80 text-[#1b1c1a] focus:outline-none focus:ring-2 focus:ring-[#7e5700] text-sm transition-all"
                      id="parentCity"
                      type="text"
                      value={parentCity}
                      onChange={(e) => setParentCity(e.target.value)}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label
                    className="block text-xs font-bold text-[#5f3414] mb-1.5"
                    htmlFor="parentPhone"
                  >
                    מספר טלפון ליצירת קשר <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute right-3 top-3.5 text-[#84746b] text-lg pointer-events-none">
                      phone_iphone
                    </span>
                    <input
                      className="w-full pr-10 pl-3 py-3 text-right rounded-2xl bg-[#FFFDF9] border border-[#d6c3b8]/80 text-[#1b1c1a] focus:outline-none focus:ring-2 focus:ring-[#7e5700] text-sm transition-all"
                      dir="ltr"
                      id="parentPhone"
                      placeholder="050-0000000"
                      required
                      type="tel"
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Optional Notes */}
              <div>
                <label
                  className="block text-xs font-bold text-[#5f3414] mb-1.5"
                  htmlFor="parentNotes"
                >
                  הערות או שאלות נוספות לרותם (אופציונלי)
                </label>
                <textarea
                  className="w-full p-3 rounded-2xl bg-[#FFFDF9] border border-[#d6c3b8]/80 text-[#1b1c1a] focus:outline-none focus:ring-2 focus:ring-[#7e5700] text-sm resize-none"
                  id="parentNotes"
                  rows={2}
                  placeholder="לדוגמה: שאלות על שעות פעילות, תזונה או תאריך תחילת שנת הלימודים"
                  value={parentNotes}
                  onChange={(e) => setParentNotes(e.target.value)}
                />
              </div>

              {/* Submit to WhatsApp Button */}
              <div className="pt-2">
                <button
                  className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-base shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  type="submit"
                >
                  <span className="material-symbols-outlined fill-icon text-2xl">chat</span>
                  <span>שלחו פרטים לשריון מקום בווטסאפ של רותם</span>
                </button>
                <p className="text-center text-xs text-[#84746b] mt-2">
                  בלחיצה על הכפתור תיפתח שיחת ווטסאפ ישירה עם פרטי הפנייה מוכנים לשליחה
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ================= SECTION 4: STAFF RECRUITMENT ================= */}
      <section className="py-14 bg-[#fbf9f5]" id="careers">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Recruitment Info Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffd9df]/60 text-[#5f3414] text-xs font-bold">
                <span className="material-symbols-outlined text-sm fill-icon">favorite</span>
                <span>רוצה לגדול ולהתפתח איתנו?</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#5f3414] leading-tight font-heading">
                דרושות נשות צוות חמות ואוהבות למשפחת "הבית של מאיה" באריאל!
              </h2>
              <p className="text-sm text-[#51443c] leading-relaxed">
                אם יש לך תשוקה אמיתית לחינוך הגיל הרך, סבלנות, חיוך רחב ורצון לעבוד בסביבה תומכת,
                מעריכה ומחבקת – המקום שלך איתנו!
              </p>
              <div className="space-y-3 pt-2">
                <h4 className="text-base font-bold text-[#5f3414] font-heading">
                  מה אנחנו מציעים בכוורת?
                </h4>
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#d6c3b8]/30 shadow-sm">
                  <span className="material-symbols-outlined text-[#7e5700] text-2xl shrink-0 fill-icon">
                    diversity_1
                  </span>
                  <div>
                    <p className="text-xs md:text-sm font-bold text-[#5f3414]">
                      סביבת עבודה משפחתית ונעימה
                    </p>
                    <p className="text-xs text-[#51443c]">
                      אווירה קהילתית, כבוד הדדי וצוות תומך שמחזיק ידיים.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#d6c3b8]/30 shadow-sm">
                  <span className="material-symbols-outlined text-[#7e5700] text-2xl shrink-0 fill-icon">
                    payments
                  </span>
                  <div>
                    <p className="text-xs md:text-sm font-bold text-[#5f3414]">
                      תנאים מתגמלים ויציבות תעסוקתית
                    </p>
                    <p className="text-xs text-[#51443c]">
                      הערכה מלאה להשקעה שלך ותנאים הוגנים ומעולים.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#d6c3b8]/30 shadow-sm">
                  <span className="material-symbols-outlined text-[#7e5700] text-2xl shrink-0 fill-icon">
                    psychology
                  </span>
                  <div>
                    <p className="text-xs md:text-sm font-bold text-[#5f3414]">
                      הדרכה וליווי מקצועי שוטף
                    </p>
                    <p className="text-xs text-[#51443c]">
                      ליווי אישי בהנהלת רותם עירון המאפשר צמיחה מקצועית איכותית.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recruitment Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#d6c3b8]/40 custom-shadow-warm">
                <div className="mb-4">
                  <span className="text-xs text-[#7e5700] uppercase font-bold">
                    טופס הגשת מועמדות מהיר
                  </span>
                  <h3 className="text-xl font-bold text-[#5f3414] mt-1 font-heading">
                    הצטרפי למשפחת הבית של מאיה
                  </h3>
                  <p className="text-xs text-[#51443c]">
                    השאירי פרטים ונשוחח בהקדם לקביעת ראיון הכרות
                  </p>
                </div>

                {careerSubmitted && (
                  <div className="mb-4 p-3 rounded-2xl bg-green-50 border border-green-200 text-green-800 text-xs">
                    פרטי המועמדות נשלחו לווטסאפ של רותם בהצלחה!
                  </div>
                )}

                <form className="space-y-3" onSubmit={handleCareerSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Candidate Name */}
                    <div>
                      <label
                        className="block text-xs font-bold text-[#5f3414] mb-1"
                        htmlFor="careerName"
                      >
                        שם מלא <span className="text-red-500">*</span>
                      </label>
                      <input
                        className="w-full px-3 py-2.5 rounded-xl bg-[#FFFDF9] border border-[#d6c3b8] text-[#1b1c1a] focus:outline-none focus:ring-2 focus:ring-[#7e5700] text-sm"
                        id="careerName"
                        placeholder="שמך המלא"
                        required
                        type="text"
                        value={careerName}
                        onChange={(e) => setCareerName(e.target.value)}
                      />
                    </div>
                    {/* Candidate Phone */}
                    <div>
                      <label
                        className="block text-xs font-bold text-[#5f3414] mb-1"
                        htmlFor="careerPhone"
                      >
                        מספר טלפון <span className="text-red-500">*</span>
                      </label>
                      <input
                        className="w-full px-3 py-2.5 text-right rounded-xl bg-[#FFFDF9] border border-[#d6c3b8] text-[#1b1c1a] focus:outline-none focus:ring-2 focus:ring-[#7e5700] text-sm"
                        dir="ltr"
                        id="careerPhone"
                        placeholder="050-0000000"
                        required
                        type="tel"
                        value={careerPhone}
                        onChange={(e) => setCareerPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Candidate City */}
                  <div>
                    <label
                      className="block text-xs font-bold text-[#5f3414] mb-1"
                      htmlFor="careerCity"
                    >
                      עיר מגורים
                    </label>
                    <input
                      className="w-full px-3 py-2.5 rounded-xl bg-[#FFFDF9] border border-[#d6c3b8] text-[#1b1c1a] focus:outline-none focus:ring-2 focus:ring-[#7e5700] text-sm"
                      id="careerCity"
                      type="text"
                      value={careerCity}
                      onChange={(e) => setCareerCity(e.target.value)}
                    />
                  </div>

                  {/* Experience Field */}
                  <div>
                    <label
                      className="block text-xs font-bold text-[#5f3414] mb-1"
                      htmlFor="careerExp"
                    >
                      ניסיון קודם בחינוך / טיפול בגיל הרך <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      className="w-full px-3 py-2.5 rounded-xl bg-[#FFFDF9] border border-[#d6c3b8] text-[#1b1c1a] focus:outline-none focus:ring-2 focus:ring-[#7e5700] text-sm resize-none"
                      id="careerExp"
                      placeholder="פרטי בקצרה על הניסיון שלך עם ילדים (או צייני שאין ושיש לך רצון ומוטיבציה ללמוד)"
                      required
                      rows={3}
                      value={careerExp}
                      onChange={(e) => setCareerExp(e.target.value)}
                    />
                  </div>

                  {/* Career WhatsApp Button */}
                  <button
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#7a4b29] text-white hover:bg-[#5f3414] font-bold text-sm md:text-base shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    type="submit"
                  >
                    <span className="material-symbols-outlined fill-icon text-[#ffdeab] text-xl">
                      send
                    </span>
                    <span>הגשת מועמדות בווטסאפ לרותם</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 4.5: FAQ ACCORDION (SEO & PARENT GUIDANCE) ================= */}
      <section className="py-14 bg-white border-t border-[#d6c3b8]/30 scroll-mt-16" id="faq">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdeab]/60 text-[#7e5700] text-xs font-bold mb-2">
              <span className="material-symbols-outlined text-sm">help_outline</span>
              מידע חשוב להורים
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#5f3414] font-heading">
              שאלות ותשובות נפוצות על הבית של מאיה באריאל
            </h2>
            <p className="text-sm text-[#51443c] mt-1">
              ריכזנו עבורכם את התשובות לשאלות שכל הורה שואל בבחירת פעוטון, משפחתון וצהרון באריאל
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "לאילו גילאים מיועד 'הבית של מאיה' באריאל?",
                a: "המסגרת מחולקת לשני מסלולים עיקריים: פעוטון ומשפחתון לקטנטנים מגיל 3 חודשים ועד 3 שנים בקבוצות גיל אינטימיות עם יחס מטפלת-ילד מיטבי, וצהרון עשיר וחווייתי לילדי גנים ובתי ספר עד כיתה ב' הכולל ארוחה חמה, עזרה בשיעורים וחוגים.",
              },
              {
                q: "מהן שעות הפעילות של הגן והצהרון באריאל?",
                a: "הפעוטון פועל בימים ראשון עד חמישי בין השעות 07:30 ל-17:00 (ניתן לבחור מסלול עד 16:30). בימי שישי וערבי חג הגן פועל בין 07:30 ל-12:30. הצהרון פועל משעת סיום מוסדות החינוך ועד השעה 17:00.",
              },
              {
                q: "מה כולל התפריט והתזונה היומית בגן?",
                a: "אנחנו מקפידים על בישול טרי במקום בכל בוקר! התפריט כולל ארוחת בוקר ישראלית מזינה (ביצים, לחם מלא, ירקות וממרחים), ארוחת צהריים חמה ומאוזנת (עוף/בשר/קטניות, תוספת פחמימה מורכבת ומבחר ירקות מבושלים), וארוחת מנחה קלה. קיימת התאמה קפדנית לאלרגיות ולרגישויות מזון.",
              },
              {
                q: "מהם נהלי הבטיחות, הפיקוח והמיגון בגן?",
                a: "הגן פועל ברישיון ופיקוח מחמירים. שערי הכניסה נעולים בקודן מאובטח, החצר מוצלת ב-95% הגנת UV ומרופדת במשטחי בלימה תקניים, הצעצועים והמתקנים בעלי תו תקן ישראלי, והצוות עובר הכשרות עזרה ראשונה והחייאת פעוטות בתדירות קבועה.",
              },
              {
                q: "כיצד מתבצע תהליך ההסתגלות לקטנטנים חדשים?",
                a: "אנו מאמינים בהסתגלות הדרגתית, רגישה ועוטפת המותאמת לקצב האישי של כל ילד והורה. בימים הראשונים שעות השהות נבנות בהדרגה יחד עם נוכחות ההורה, כדי ליצור אמון וחיבור בטוח עם רותם והצוות.",
              },
              {
                q: "איך יוצרים קשר ומתאמים סיור היכרות עם רותם עירון?",
                a: "הכי קל ומהיר! לוחצים על כפתור הווטסאפ באתר או מתקשרים ישירות לטלפון 052-8707056. רותם תשמח לשוחח, לענות על כל שאלה ולתאם מועד נוח לסיור אישי והתרשמות מהגן באריאל.",
              },
            ].map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#d6c3b8]/40 bg-[#fbf9f5] overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-right flex items-center justify-between gap-3 font-bold text-sm sm:text-base text-[#5f3414] hover:bg-[#f5f3ef] transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <span className="material-symbols-outlined text-[#7e5700] text-xl transition-transform duration-200 shrink-0">
                      {isOpen ? "expand_less" : "expand_more"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[#51443c] leading-relaxed border-t border-[#e4e2de]/60 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= SECTION 5: CONTACT & LOCATION ================= */}
      <section className="py-14 bg-[#f5f3ef] border-t border-[#d6c3b8]/30" id="contact">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdeab]/60 text-[#7e5700] text-xs font-bold mb-2">
              <span className="material-symbols-outlined text-sm">handshake</span>
              דלתנו תמיד פתוחה
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#5f3414] font-heading">
              צרו איתנו קשר ישיר
            </h2>
            <p className="text-sm text-[#51443c] mt-1">
              רותם וצוות הגן ישמחו לענות על כל שאלה, לתאם פגישה אישית ולהראות לכם את הגן באריאל
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Location Card */}
            <div className="p-6 rounded-2xl bg-white border border-[#d6c3b8]/30 flex flex-col items-center text-center shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#ffdeab]/50 flex items-center justify-center text-[#7e5700] mb-3">
                <span className="material-symbols-outlined text-2xl">location_on</span>
              </div>
              <h3 className="font-bold text-base text-[#5f3414]">מיקום הגן</h3>
              <p className="text-sm text-[#51443c] mt-1">העיר אריאל</p>
              <p className="text-xs text-[#84746b] mt-0.5">מיקום נגיש, שקט וקרוב לחניה נוחה</p>
            </div>

            {/* Hours Card */}
            <div className="p-6 rounded-2xl bg-white border border-[#d6c3b8]/30 flex flex-col items-center text-center shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#ffd9df]/60 flex items-center justify-center text-[#652d3b] mb-3">
                <span className="material-symbols-outlined text-2xl">schedule</span>
              </div>
              <h3 className="font-bold text-base text-[#5f3414]">שעות פעילות</h3>
              <p className="text-sm text-[#51443c] mt-1">ימים א'-ה': 07:30 - 16:30 / 17:00</p>
              <p className="text-xs text-[#84746b] mt-0.5">ימי שישי: 07:30 - 12:30</p>
            </div>

            {/* Direct Actions Card */}
            <div className="p-6 rounded-2xl bg-white border border-[#d6c3b8]/30 flex flex-col items-center justify-center text-center gap-3 shadow-sm">
              <a
                className="w-full py-2.5 px-4 rounded-xl bg-[#7a4b29] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#5f3414] transition-all"
                href="tel:0528707056"
              >
                <span className="material-symbols-outlined text-base">call</span>
                <span>שיחה ישירה לרותם (052-8707056)</span>
              </a>
              <a
                className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#1EBE5D] transition-all"
                href={`https://wa.me/${ROTEM_PHONE}?text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%A8%D7%95%D7%AA%D7%9D%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A9%D7%9E%D7%95%D7%A2%20%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A2%D7%9C%20%D7%94%D7%92%D7%9F%20%D7%91%D7%90%D7%A8%D7%99%D7%90%D7%9C`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-base fill-icon">chat</span>
                <span>פנייה ישירה בווטסאפ לרותם</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 6: STICKY BOTTOM BAR (Mobile) ================= */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 p-2 bg-white/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.08)] border-t border-[#d6c3b8]/20">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-2">
          {/* Call Button */}
          <a
            className="flex-1 py-2 px-2.5 rounded-xl bg-[#efeeea] text-[#5f3414] text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition-all text-center"
            href="tel:0528707056"
          >
            <span className="material-symbols-outlined text-base">call</span>
            <span>חייגו אלינו</span>
          </a>
          {/* WhatsApp Button */}
          <a
            className="flex-1 py-2 px-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition-all text-center"
            href={`https://wa.me/${ROTEM_PHONE}?text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%A8%D7%95%D7%AA%D7%9D%2C%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%93%D7%A8%D7%9A%20%D7%94%D7%90%D7%AA%D7%A8%20%D7%95%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A7%D7%91%D7%9C%20%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A0%D7%95%D7%A1%D7%A4%D7%99%D7%9D!`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="material-symbols-outlined text-base fill-icon">chat</span>
            <span>שלחו ווטסאפ</span>
          </a>
          {/* Register Shortcut */}
          <a
            className="flex-1 py-2 px-2.5 rounded-xl bg-[#7a4b29] text-white text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition-all text-center"
            href="#register"
          >
            <span className="material-symbols-outlined text-base text-[#ffdeab]">edit_note</span>
            <span>הרשמה לגן</span>
          </a>
        </div>
      </div>

      {/* Spacer for sticky mobile bottom bar */}
      <div className="h-16 md:hidden" />

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#e4e2de] border-t border-[#d6c3b8]/40 w-full mt-auto">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand & Copyright */}
          <div className="flex flex-col items-center md:items-start text-center md:text-right gap-1">
            <span className="text-xl font-bold text-[#5f3414] font-heading">הבית של מאיה</span>
            <p className="text-xs text-[#51443c]">
              © כל הזכויות שמורות לבית של מאיה - בהנהלת רותם עירון, אריאל
            </p>
          </div>
          {/* Interactive Policy & Info Modals */}
          <nav className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
            <button
              onClick={() => setActiveModal("accessibility")}
              className="text-[#51443c] hover:text-[#5f3414] transition-colors hover:underline"
            >
              הצהרת נגישות
            </button>
            <span className="text-[#84746b]">•</span>
            <button
              onClick={() => setActiveModal("privacy")}
              className="text-[#51443c] hover:text-[#5f3414] transition-colors hover:underline"
            >
              מדיניות פרטיות
            </button>
            <span className="text-[#84746b]">•</span>
            <button
              onClick={() => setActiveModal("rules")}
              className="text-[#51443c] hover:text-[#5f3414] transition-colors hover:underline"
            >
              תקנון הגן
            </button>
            <span className="text-[#84746b]">•</span>
            <button
              onClick={() => setActiveModal("directions")}
              className="text-[#51443c] hover:text-[#5f3414] transition-colors hover:underline"
            >
              דרכי הגעה וחניה
            </button>
          </nav>
        </div>
      </footer>

      {/* Modals */}
      <PolicyModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}

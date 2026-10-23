import React from "react";

export type ModalType = "accessibility" | "privacy" | "rules" | "directions" | null;

interface PolicyModalProps {
  type: ModalType;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const contentMap: Record<
    Exclude<ModalType, null>,
    { title: string; icon: string; content: React.ReactNode }
  > = {
    accessibility: {
      title: "הצהרת נגישות",
      icon: "accessibility",
      content: (
        <div className="space-y-3 text-sm text-[#51443c] leading-relaxed">
          <p>
            אנו ב"הבית של מאיה - בהנהלת רותם עירון" רואים חשיבות עליונה במתן שירות שוויוני ונגיש לכלל
            ההורים, הילדים והמבקרים.
          </p>
          <h4 className="font-bold text-[#5f3414]">נגישות פיזית במתחם הגן באריאל:</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>חניות נגישות בסמוך למתחם הגן.</li>
            <li>שביל גישה מרוצף ומפולס עד לשער הכניסה וחלל הפעילות.</li>
            <li>מעברים מרווחים ללא מדרגות בין חלל המשחקים לחצר.</li>
          </ul>
          <h4 className="font-bold text-[#5f3414]">נגישות אתר האינטרנט:</h4>
          <p>
            האתר נבנה בהתאם לתקן WCAG 2.1 ברמת AA, תומך בקוראי מסך, ניווט מקלדת מלא, ניגודיות צבעים
            מוקפדת והתאמה מלאה למכשירים ניידים.
          </p>
          <p className="text-xs text-[#84746b]">
            בכל שאלה או בקשה בנושא נגישות, רותם עירון זמינה עבורכם בטלפון 050-0000000.
          </p>
        </div>
      ),
    },
    privacy: {
      title: "מדיניות פרטיות",
      icon: "shield_lock",
      content: (
        <div className="space-y-3 text-sm text-[#51443c] leading-relaxed">
          <p>
            פרטיותכם ופרטיות ילדיכם יקרה לנו מכל. כל פרט שנמסר בטפסי ההרשמה או המועמדות לעבודה משמש
            אך ורק לצורך יצירת קשר ישיר ותיאום מול הנהלת הגן.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>אין העברת מידע לשום צד שלישי או חברות פרסום.</li>
            <li>שליחת ההודעות מתבצעת באופן מאובטח ישירות דרך אפליקציית WhatsApp האישית שלכם.</li>
            <li>מצלמות האבטחה בגן מיועדות לשמירה על שלומם וביטחונם של הפעוטות לפי כללי החוק.</li>
          </ul>
        </div>
      ),
    },
    rules: {
      title: "תקנון הגן ונהלים",
      icon: "menu_book",
      content: (
        <div className="space-y-3 text-sm text-[#51443c] leading-relaxed">
          <p>
            תקנון "הבית של מאיה" נועד להבטיח את שלומם, בריאותם ורווחתם של כל הפעוטות בכוורת:
          </p>
          <h4 className="font-bold text-[#5f3414]">1. שעות פעילות וקבלת ילדים:</h4>
          <p>קבלת ילדים החל מ-07:30. איסוף עד 16:30 / 17:00 בימי חול, ועד 12:30 בימי שישי.</p>
          <h4 className="font-bold text-[#5f3414]">2. בריאות ורפואה:</h4>
          <p>
            ילד עם חום מעל 38 מעלות, שלשולים או מחלה מידבקת יישאר בבית עד להחלמה מלאה ואישור רופא.
          </p>
          <h4 className="font-bold text-[#5f3414]">3. תזונה:</h4>
          <p>תפריט עשיר, בריא וביתי המבושל טרי מדי יום בהשגחת רותם. התאמה לרגישויות ואלרגיות.</p>
        </div>
      ),
    },
    directions: {
      title: "דרכי הגעה וחניה באריאל",
      icon: "map",
      content: (
        <div className="space-y-3 text-sm text-[#51443c] leading-relaxed">
          <p>
            "הבית של מאיה" ממוקם במיקום מרכזי, שקט, בטוח ונגיש בעיר אריאל.
          </p>
          <div className="p-3 bg-[#fff9f3] rounded-xl border border-[#ffdcc6]">
            <h4 className="font-bold text-[#5f3414] mb-1">חניה נוחה:</h4>
            <p>חניה חופשית ונגישה לצד שער הגן, להורדה ואיסוף בטוחים של הילדים ללא לחץ.</p>
          </div>
          <p>
            לתיאום ביקור וקבלת כתובת מדויקת עם קישור ל-Waze, צרו קשר ישיר עם רותם בווטסאפ או בטלפון!
          </p>
        </div>
      ),
    },
  };

  const current = contentMap[type];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      <div className="w-full max-w-lg bg-[#ffffff] rounded-3xl p-6 shadow-2xl border border-[#d6c3b8] relative animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-[#efeeea] mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl text-[#7e5700] fill-icon">
              {current.icon}
            </span>
            <h3 className="text-lg font-bold text-[#5f3414]">{current.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#efeeea] hover:bg-[#eae8e4] text-[#51443c] flex items-center justify-center transition-all"
            aria-label="סגור חלון"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {current.content}

        <div className="mt-6 pt-3 border-t border-[#efeeea] flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-5 rounded-xl bg-[#7a4b29] text-white text-xs font-bold shadow-sm hover:bg-[#5f3414] transition-all"
          >
            סגור
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * WhatsApp message generation & phone utility for 'הבית של מאיה'
 */

export const ROTEM_PHONE = "972500000000";

export interface ParentFormData {
  parentName: string;
  childInfo: string;
  city: string;
  phone: string;
  notes?: string;
}

export interface CareerFormData {
  name: string;
  phone: string;
  city: string;
  experience: string;
}

/**
 * Formats parent registration message for WhatsApp
 */
export function formatParentWhatsAppMessage(data: ParentFormData): string {
  const name = data.parentName.trim();
  const child = data.childInfo.trim();
  const city = data.city.trim() || "אריאל";
  const phone = data.phone.trim();
  const notes = data.notes?.trim();

  let msg = `שלום רותם, הגעתי דרך האתר! אשמח לקבל פרטים נוספים על 'הבית של מאיה' באריאל.\n` +
    `שם ההורה: ${name}\n` +
    `שם הילד/ה וגיל: ${child}\n` +
    `עיר מגורים: ${city}\n` +
    `טלפון ליצירת קשר: ${phone}`;

  if (notes) {
    msg += `\nהערות נוספות: ${notes}`;
  }

  msg += `\nאשמח שנשתמע בהקדם!`;
  return msg;
}

/**
 * Formats career application message for WhatsApp
 */
export function formatCareerWhatsAppMessage(data: CareerFormData): string {
  const name = data.name.trim();
  const phone = data.phone.trim();
  const city = data.city.trim() || "אריאל";
  const exp = data.experience.trim();

  return (
    `שלום רותם, שמי ${name} ואשמח להגיש מועמדות לעבודה ב'הבית של מאיה' באריאל!\n` +
    `פרטי המועמד/ת:\n` +
    `שם מלא: ${name}\n` +
    `עיר: ${city}\n` +
    `טלפון: ${phone}\n` +
    `ניסיון קודם: ${exp}\n` +
    `אשמח לתאם שיחה/ראיון!`
  );
}

/**
 * Sanitizes phone number to standard international format (for Israel default)
 */
export function sanitizeIsraeliPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) {
    return "972" + digits.slice(1);
  }
  if (digits.startsWith("972")) {
    return digits;
  }
  return digits;
}

/**
 * Builds full WhatsApp web/app link
 */
export function buildWhatsAppUrl(message: string, targetPhone: string = ROTEM_PHONE): string {
  const sanitized = sanitizeIsraeliPhone(targetPhone);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${sanitized}?text=${encoded}`;
}

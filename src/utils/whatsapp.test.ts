import test from "node:test";
import assert from "node:assert/strict";
import {
  formatParentWhatsAppMessage,
  formatCareerWhatsAppMessage,
  sanitizeIsraeliPhone,
  buildWhatsAppUrl,
  ROTEM_PHONE,
} from "./whatsapp.ts";

test("formatParentWhatsAppMessage creates correct formatted message with Hebrew text", () => {
  const msg = formatParentWhatsAppMessage({
    parentName: "יעל כהן",
    childInfo: "איתי, שנה וחצי",
    city: "אריאל",
    phone: "050-1234567",
  });

  assert.ok(msg.includes("שלום רותם, הגעתי דרך האתר!"));
  assert.ok(msg.includes("שם ההורה: יעל כהן"));
  assert.ok(msg.includes("שם הילד/ה וגיל: איתי, שנה וחצי"));
  assert.ok(msg.includes("עיר מגורים: אריאל"));
  assert.ok(msg.includes("טלפון ליצירת קשר: 050-1234567"));
});

test("formatParentWhatsAppMessage falls back to אריאל if city is empty", () => {
  const msg = formatParentWhatsAppMessage({
    parentName: "דן שחר",
    childInfo: "מאיה, שנתיים",
    city: "",
    phone: "052-9876543",
  });

  assert.ok(msg.includes("עיר מגורים: אריאל"));
});

test("formatCareerWhatsAppMessage creates proper candidate text", () => {
  const msg = formatCareerWhatsAppMessage({
    name: "שרה לוי",
    phone: "054-1112233",
    city: "אריאל",
    experience: "3 שנים סייעת מובילה",
  });

  assert.ok(msg.includes("שלום רותם, שמי שרה לוי ואשמח להגיש מועמדות"));
  assert.ok(msg.includes("ניסיון קודם: 3 שנים סייעת מובילה"));
});

test("sanitizeIsraeliPhone handles local 05x and international numbers", () => {
  assert.equal(sanitizeIsraeliPhone("050-1234567"), "972501234567");
  assert.equal(sanitizeIsraeliPhone("052 987 6543"), "972529876543");
  assert.equal(sanitizeIsraeliPhone("+972501234567"), "972501234567");
});

test("buildWhatsAppUrl produces valid encoded wa.me link", () => {
  const url = buildWhatsAppUrl("בדיקה קצרה", ROTEM_PHONE);
  assert.ok(url.startsWith(`https://wa.me/${ROTEM_PHONE}?text=`));
  assert.ok(url.includes("%D7%91%D7%93%D7%99%D7%A7%D7%94"));
});

// lib/numberUtils.js

// نگاشت ارقام فارسی به لاتین
const persianToLatinMap = {
  '۰': '0',
  '۱': '1',
  '۲': '2',
  '۳': '3',
  '۴': '4',
  '۵': '5',
  '۶': '6',
  '۷': '7',
  '۸': '8',
  '۹': '9',
};

/**
 * تبدیل همهٔ ارقام فارسیِ درون یک رشته به معادل لاتین‌شان.
 * اگر مقدارِ ورودی رشته نباشد، بدون تغییر برمی‌گرداند.
 *
 * @param {string} str رشته‌ای که قرار است تبدیل شود
 * @returns {string}
 */
export function toLatinDigits(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/[۰-۹]/g, (c) => persianToLatinMap[c] || c);
}

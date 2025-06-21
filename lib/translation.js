// // ── /lib/translate.js ──
// import fa from '../locales/fa/common.json' assert { type: 'json' };
// import en from '../locales/en/common.json' assert { type: 'json' };

// // ما فعلاً فقط دو زبان 'fa' و 'en' داریم، اما می‌توانی بعداً هر زبانی اضافه کنی:
// const messages = { fa, en };

// /**
//  * t(key, locale)
//  * key: کلید ترجمه (مثلاً "header.home")
//  * locale: 'fa' یا 'en'
//  *
//  * اگر کلید موجود نبود، خودِ key را برمی‌گرداند تا بفهمی نیاز به اضافه کردن ترجمه هست.
//  */
// export function t(key, locale = 'fa') {
//   return messages[locale]?.[key] || key;
// }



// lib/translation.js
import fa from '../locales/fa/common.json';
import en from '../locales/en/common.json';

export const getTranslations = (locale) => {
  switch (locale) {
    case 'en':
      return en;
    case 'fa':
    default:
      return fa;
  }
};

export const t = (key, locale) => {
  const translations = getTranslations(locale);
  const keys = key.split(':'); // برای پشتیبانی از namespace مثل 'errors:related_products_fetch_failed'
  let value = translations;

  for (let k of keys) {
    value = value?.[k];
    if (value === undefined) return key; // اگه کلید پیدا نشد، خودش رو برمی‌گردونه
  }
  return value;
};
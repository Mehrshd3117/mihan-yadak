// ── /lib/translate.js ──
import fa from '../locales/fa/common.json' assert { type: 'json' };
import en from '../locales/en/common.json' assert { type: 'json' };

// ما فعلاً فقط دو زبان 'fa' و 'en' داریم، اما می‌توانی بعداً هر زبانی اضافه کنی:
const messages = { fa, en };

/**
 * t(key, locale)
 * key: کلید ترجمه (مثلاً "header.home")
 * locale: 'fa' یا 'en'
 *
 * اگر کلید موجود نبود، خودِ key را برمی‌گرداند تا بفهمی نیاز به اضافه کردن ترجمه هست.
 */
export function t(key, locale = 'fa') {
  return messages[locale]?.[key] || key;
}

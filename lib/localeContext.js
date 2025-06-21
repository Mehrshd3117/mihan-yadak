// // lib/localeContext.js
// import { createContext, useContext, useState } from 'react';
// import en from '../locales/en/common.json';
// import fa from '../locales/fa/common.json';

// const LocaleContext = createContext();

// export function LocaleProvider({ children }) {
//   const [locale, setLocale] = useState('fa');
//   // مقداردهی اولیه به translations
//   const translations = locale === 'fa' ? fa : en;

//   function resolveKey(key, dict) {
//     if (typeof key !== 'string' || !key.trim()) {
//       console.warn('Invalid translation key:', key);
//       return '';
//     }
//     return key.split('.').reduce((res, part) => {
//       if (res && res[part] != null) return res[part];
//       console.warn(`Translation not found for path “${key}”`);
//       return key;
//     }, dict);
//   }

//   function t(key) {
//     return resolveKey(key, translations) || key;
//   }

//   return (
//     <LocaleContext.Provider value={{ locale, setLocale, t }}>
//       {children}
//     </LocaleContext.Provider>
//   );
// }

// export function useLocale() {
//   const ctx = useContext(LocaleContext);
//   if (!ctx) throw new Error('useLocale must be inside LocaleProvider');
//   return ctx;
// }

// import { createContext, useContext, useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import en from '../locales/en/common.json';
// import fa from '../locales/fa/common.json';

// const LocaleContext = createContext();

// export function LocaleProvider({ children }) {
//   const router = useRouter();
//   const [locale, setLocale] = useState('fa'); // زبان پیش‌فرض

//   // تنظیم زبان بر اساس URL
//   useEffect(() => {
//     const path = router.asPath; // مسیر فعلی، مثلاً "/en" یا "/"
//     if (path.startsWith('/en')) {
//       setLocale('en');
//     } else {
//       setLocale('fa');
//     }
//   }, [router.asPath]); // هر وقت مسیر عوض شد، این کد اجرا می‌شه

//   // انتخاب ترجمه‌ها بر اساس زبان
//   const translations = locale === 'fa' ? fa : en;

//   // تابع پیدا کردن ترجمه
//   function resolveKey(key, dict) {
//     if (typeof key !== 'string' || !key.trim()) {
//       console.warn('Invalid translation key:', key);
//       return '';
//     }
//     return key.split('.').reduce((res, part) => {
//       if (res && res[part] != null) return res[part];
//       console.warn(`Translation not found for path “${key}”`);
//       return key;
//     }, dict);
//   }

//   // تابع ترجمه
//   function t(key) {
//     return resolveKey(key, translations) || key;
//   }

//   return (
//     <LocaleContext.Provider value={{ locale, setLocale, t }}>
//       {children}
//     </LocaleContext.Provider>
//   );
// }

// export function useLocale() {
//   const ctx = useContext(LocaleContext);
//   if (!ctx) throw new Error('useLocale must be inside LocaleProvider');
//   return ctx;
// }


import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en/common.json';
import fa from '../locales/fa/common.json';

const translations = { en, fa };
const LocaleContext = createContext();

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState('fa'); // Default to Persian

  // Update locale based on URL query
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLocale = urlParams.get('locale');
    if (urlLocale && ['en', 'fa'].includes(urlLocale)) {
      setLocale(urlLocale);
    }
  }, []);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[locale];
    for (const k of keys) {
      value = value ? value[k] : undefined;
    }
    return value || key;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
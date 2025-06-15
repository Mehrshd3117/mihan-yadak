// import React, {
//     useState,
//     useEffect,
//     useMemo,
//     useCallback,
//     memo,
// } from "react";
// import Fuse from "fuse.js";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import {
//     Menu,
//     X,
//     Search,
//     Loader2,
//     AlertCircle,
//     Sun,
//     Moon,
//     ChevronDown,
//     ChevronLeft,
// } from "lucide-react";
// import { useLocale } from "../../../lib/localeContext";

// // کامپوننت نتایج جستجو (بدون تغییر)
// const SearchResults = memo(({
//     filteredResults,
//     suggestedQueries,
//     isLoading,
//     clearSearch,
//     truncateDescription,
//     onSuggestionClick,
//     locale,
//     linkToProduct,
//     t,
// }) => (
//     <div
//         className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg z-50 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-gray-100 dark:scrollbar-thumb-orange-300 dark:scrollbar-track-gray-800 animate-fadeIn"
//     >
//         <div className="flex justify-between items-center p-2 border-b border-gray-200 dark:border-gray-700">
//             <h3 className="font-medium text-sm">{t("header.search_results")}</h3>
//             <button
//                 onClick={clearSearch}
//                 className="text-xs text-orange-500 hover:text-orange-700 dark:hover:text-orange-400"
//             >
//                 {t("header.clear")}
//             </button>
//         </div>

//         {isLoading ? (
//             <div className="text-center py-4 text-orange-500 flex justify-center items-center gap-2">
//                 <Loader2 className="animate-spin" />
//                 {t("header.searching")}
//             </div>
//         ) : filteredResults.length > 0 ? (
//             filteredResults.map((item) => (
//                 <Link
//                     key={item.slug}
//                     href={linkToProduct(item.slug)}
//                     className="flex items-start gap-3 py-2 px-4 hover:bg-orange-100 dark:hover:bg-gray-700 rounded"
//                     onClick={clearSearch}
//                 >
//                     <Image
//                         src={item.imgSrc || "/no-image.png"}
//                         alt={item.title}
//                         width={48}
//                         height={48}
//                         className="rounded-md border object-cover"
//                         unoptimized
//                     />
//                     <div>
//                         <div className="font-semibold text-sm">{item.title}</div>
//                         <div className="text-xs text-gray-500 dark:text-gray-400">
//                             {item.searchDesc && truncateDescription(item.searchDesc)}
//                         </div>
//                     </div>
//                 </Link>
//             ))
//         ) : (
//             <div className="p-4">
//                 <div className="text-center text-sm text-gray-500 pb-4">
//                     <AlertCircle className="mx-auto text-orange-500 mb-2" size={28} />
//                     {t("header.no_results")}
//                 </div>
//                 {suggestedQueries.length > 0 && (
//                     <div className="mt-2">
//                         <h4 className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                             {t("header.suggestions")}
//                         </h4>
//                         <div className="flex flex-wrap gap-2">
//                             {suggestedQueries.map((q, i) => (
//                                 <button
//                                     key={i}
//                                     onClick={() => onSuggestionClick(q)}
//                                     className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-1 rounded-full"
//                                 >
//                                     {q}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         )}
//     </div>
// ));
// SearchResults.displayName = "SearchResults";

// function Header() {
//     const router = useRouter();
//     const { locale, setLocale, t } = useLocale();

//     // states
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [darkMode, setDarkMode] = useState(false);
//     const [productDropdownOpen, setProductDropdownOpen] = useState(false);
//     const [showCategoryList, setShowCategoryList] = useState(false);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [filteredResults, setFilteredResults] = useState([]);
//     const [suggestedQueries, setSuggestedQueries] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [showMobileSearch, setShowMobileSearch] = useState(false);
//     const [categories, setCategories] = useState([]);
//     const [isSwitching, setIsSwitching] = useState(false);
//     const [allProducts, setAllProducts] = useState([]);

//     // helper: مسیر با توجه به زبان
//     const linkHref = useCallback(
//         (base) => {
//             if (locale === "en") {
//                 if (base === "/") return "/en";
//                 if (base.startsWith("/en")) return base;
//                 return "/en" + base;
//             } else {
//                 if (base.startsWith("/en/")) return base.replace(/^\/en/, "") || "/";
//                 if (base === "/en") return "/";
//                 return base;
//             }
//         },
//         [locale]
//     );

//     // helper: لینک محصول
//     const linkToProduct = useCallback(
//         (slug) => (locale === "en" ? `/en/products/${slug}` : `/products/${slug}`),
//         [locale]
//     );

//     // fetch categories once
//     useEffect(() => {
//         fetch("/api/categories")
//             .then((r) => r.json())
//             .then((res) => {
//                 if (res.status === 200) setCategories(res.data);
//             })
//             .catch(() => {
//             });
//     }, []);

//     // fetch products once
//     useEffect(() => {
//         fetch("/api/products")
//             .then((r) => r.json())
//             .then((data) => setAllProducts(data))
//             .catch(() => setAllProducts([]));
//     }, []);

//     // dark mode init
//     useEffect(() => {
//         const stored = localStorage.getItem("theme");
//         const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
//         const useDark = stored === "dark" || (!stored && prefersDark);
//         document.documentElement.classList.toggle("dark", useDark);
//         setDarkMode(useDark);
//     }, []);

//     const toggleDarkMode = () => {
//         const next = !darkMode;
//         document.documentElement.classList.toggle("dark", next);
//         localStorage.setItem("theme", next ? "dark" : "light");
//         setDarkMode(next);
//     };

//     // language switch
//     const handleLanguageSwitch = () => {
//         if (isSwitching) return;
//         setIsSwitching(true);
//         const newLang = locale === "fa" ? "en" : "fa";
//         setLocale(newLang);
//         let [path, hash = ""] = router.asPath.split("#");
//         let [pure, qs = ""] = path.split("?");
//         let target = "";
//         if (newLang === "en") {
//             target = pure === "/" ? "/en" : "/en" + pure;
//         } else {
//             target = pure.startsWith("/en") ? pure.replace(/^\/en/, "") || "/" : pure;
//         }
//         if (qs) target += "?" + qs;
//         if (hash) target += "#" + hash;
//         router.push(target).finally(() => setIsSwitching(false));
//     };

//     // Fuse.js instance
//     const fuse = useMemo(() => {
//         return new Fuse(allProducts, {
//             keys: ["title", "description"],
//             threshold: 0.4,
//             distance: 100,
//             minMatchCharLength: 1,
//             ignoreLocation: true,
//             includeScore: true,
//             findAllMatches: true,
//             includeMatches: true,
//         });
//     }, [allProducts]);

//     // search effect
//     useEffect(() => {
//         if (!searchQuery.trim()) {
//             setFilteredResults([]);
//             setSuggestedQueries([]);
//             setIsLoading(false);
//             return;
//         }
//         setIsLoading(true);
//         const handler = setTimeout(() => {
//             if (!fuse) {
//                 setIsLoading(false);
//                 return;
//             }
//             const results = fuse.search(searchQuery).map((r) => r.item);
//             setFilteredResults(results);
//             if (results.length === 0) {
//                 const fb = new Fuse(allProducts, {
//                     keys: ["title", "description"],
//                     threshold: 0.6,
//                     minMatchCharLength: 1,
//                     ignoreLocation: true,
//                 });
//                 setSuggestedQueries(
//                     fb.search(searchQuery).map((r) => r.item.title).slice(0, 5)
//                 );
//             } else {
//                 setSuggestedQueries([]);
//             }
//             setIsLoading(false);
//         }, 300);
//         return () => clearTimeout(handler);
//     }, [searchQuery, fuse, allProducts]);

//     // prevent scroll when mobile search open
//     useEffect(() => {
//         document.body.style.overflow = showMobileSearch ? "hidden" : "";
//     }, [showMobileSearch]);

//     const clearSearch = () => {
//         setSearchQuery("");
//         setFilteredResults([]);
//         setSuggestedQueries([]);
//     };
//     const truncateDescription = (desc, limit = 10) => {
//         if (!desc) return "";
//         const w = desc.trim().split(/\s+/);
//         return w.length <= limit
//             ? w.join(" ")
//             : w.slice(0, limit).join(" ") + "...";
//     };
//     const onSuggestionClick = (q) => setSearchQuery(q);

//     // تابع بازگشتی برای رندر سلسله‌مراتبی دسته‌بندی‌ها
//     const renderCategories = (cats) => (
//         <ul className="pl-4">
//             {cats.map((cat) => (
//                 <li key={cat.id} className="group">
//                     <Link href={linkHref(`/products?category=${cat.slug}`)} legacyBehavior>
//                         <a
//                             onClick={() => {
//                                 setProductDropdownOpen(false);
//                                 setShowCategoryList(false);
//                                 setMenuOpen(false);
//                             }}
//                             className="block px-4 py-2 hover:bg-orange-100 dark:hover:bg-gray-700 rounded flex justify-between items-center text-sm"
//                         >
//                             {t(`category.${cat.slug}`)}
//                             {cat.children?.length > 0 && (
//                                 <ChevronDown
//                                     size={16}
//                                     className="transition-transform group-hover:rotate-180"
//                                 />
//                             )}
//                         </a>
//                     </Link>
//                     {cat.children?.length > 0 && renderCategories(cat.children)}
//                 </li>
//             ))}
//         </ul>
//     );

//     return (
//         <header
//             id="site-header"
//             className="fixed top-2 z-50 w-full bg-white dark:bg-[#2c3e50] shadow-md border-b border-gray-200 dark:border-orange-500 py-3 px-4 text-black dark:text-white"
//         >
//             <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

//                 {/* لوگو */}
//                 <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 relative">
//                         <Link href="/">
//                         <Image
//                             src="/images/logos/Logo1.webp"
//                             alt="لوگو میهن یدک"
//                             fill
//                             sizes="40px"
//                             className="object-contain rounded"
//                             priority
//                         />
//                         </Link>
//                     </div>
//                     <div className="w-28 h-10 relative sm:w-32 md:w-40 lg:w-48">
//                         <Link href="/">
//                         <Image
//                             src={
//                                 darkMode
//                                     ? "/images/logos/Logo2-dark.webp"
//                                     : "/images/logos/Logo2.webp"
//                             }
//                             alt="لوگو نوشته"
//                             fill
//                             sizes="(min-width: 1024px) 192px, (min-width: 768px) 160px, (min-width: 640px) 128px, 112px"
//                             className="object-contain"
//                             priority
//                         />
//                         </Link>
//                     </div>
//                 </div>

//                 {/* منوی دسکتاپ */}
//                 <div className="hidden lg:flex flex-1 justify-center">
//                     <nav className="flex gap-6 font-semibold text-sm lg:text-base items-center">

//                         {/* محصولات */}
//                         <div className="relative">
//                             <button
//                                 onClick={() => {
//                                     setProductDropdownOpen(p => !p);
//                                     setShowCategoryList(false);
//                                 }}
//                                 className="flex items-center gap-1 hover:text-orange-500"
//                             >
//                                 {t("header.products")} <ChevronDown size={18} />
//                             </button>

//                             {productDropdownOpen && (
//                                 <div
//                                     onMouseLeave={() => {
//                                         setProductDropdownOpen(false);
//                                         setShowCategoryList(false);
//                                     }}
//                                     className="absolute top-full mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg w-56 text-sm p-2 z-50"
//                                 >
//                                     {/* مرحله‌ی اول: لیست محصولات */}
//                                     <button
//                                         onClick={() => setShowCategoryList(s => !s)}
//                                         className="w-full text-left px-4 py-2 hover:bg-orange-100 dark:hover:bg-gray-700 rounded flex justify-between items-center font-medium"
//                                     >
//                                         {t("header.product_list")}
//                                         <ChevronDown size={16}
//                                             className={`${showCategoryList ? "rotate-180" : ""} transition-transform`} />
//                                     </button>

//                                     {/* مرحله‌ی دوم: زیرمجموعه‌ها */}
//                                     {showCategoryList && renderCategories(categories)}
//                                 </div>
//                             )}
//                         </div>

//                         <Link href={linkHref("/about-us")} legacyBehavior>
//                             <a className="hover:text-orange-500">{t("header.about")}</a>
//                         </Link>
//                         <Link href={linkHref("/contact-us")} legacyBehavior>
//                             <a className="hover:text-orange-500">{t("header.contact")}</a>
//                         </Link>
//                         <Link href={linkHref("/inventions")} legacyBehavior>
//                             <a className="hover:text-orange-500">{t("header.inventions")}</a>
//                         </Link>
//                     </nav>
//                 </div>

//                 {/* آیکون موبایل */}
//                 <div className="flex flex-shrink-0 lg:hidden items-center gap-2 z-30 order-3">
//                     <button onClick={() => setMenuOpen(true)}>
//                         <Menu size={28} />
//                     </button>
//                 </div>

//                 {/* موبایل: جستجو، تاریک/روشن، زبان */}
//                 <div className="flex lg:hidden items-center gap-2 z-40 order-2">
//                     <button
//                         onClick={handleLanguageSwitch}
//                         disabled={isSwitching}
//                         className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm disabled:opacity-50"
//                     >
//                         {locale === "fa" ? "English" : "فارسی"}
//                     </button>
//                     <button onClick={toggleDarkMode} className="p-2">
//                         {darkMode ? <Moon size={24} /> : <Sun size={24} />}
//                     </button>
//                     <button onClick={() => setShowMobileSearch(true)} className="p-2">
//                         <Search size={24} />
//                     </button>
//                 </div>

//                 {/* دسکتاپ: جستجو، تاریک/روشن، زبان */}
//                 <div className="hidden lg:flex items-center gap-4">
//                     <button onClick={toggleDarkMode} className="p-2 rounded-full">
//                         {darkMode ? <Moon size={24} /> : <Sun size={24} />}
//                     </button>
//                     <button
//                         onClick={handleLanguageSwitch}
//                         disabled={isSwitching}
//                         className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm disabled:opacity-50"
//                     >
//                         {locale === "fa" ? "English" : "فارسی"}
//                     </button>
//                     <div className="relative w-64">
//                         <input
//                             type="text"
//                             placeholder={t("header.search_placeholder")}
//                             className="w-full pl-10 pr-4 bg-white dark:bg-gray-700 text-black dark:text-white py-2 rounded-full border text-sm shadow-sm focus:ring-2 focus:ring-orange-400"
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                         />
//                         <Search
//                             className="absolute left-3 top-1/2 -translate-y-1/2 text-black dark:text-white"
//                             size={20}
//                         />
//                         {searchQuery && (
//                             <SearchResults
//                                 filteredResults={filteredResults}
//                                 suggestedQueries={suggestedQueries}
//                                 isLoading={isLoading}
//                                 clearSearch={clearSearch}
//                                 truncateDescription={truncateDescription}
//                                 onSuggestionClick={onSuggestionClick}
//                                 locale={locale}
//                                 linkToProduct={linkToProduct}
//                                 t={t}
//                             />
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* موبایل: پنل جستجوی کامل */}
//             {showMobileSearch && (
//                 <div className="fixed inset-0 bg-black/60 z-40 flex items-start justify-center p-4 pt-24 lg:hidden">
//                     <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-md p-4 relative">
//                         <button
//                             onClick={() => setShowMobileSearch(false)}
//                             className="absolute top-1 left-2 text-gray-500 hover:text-red-500"
//                         >
//                             <X size={24} />
//                         </button>
//                         <div className="relative mt-6">
//                             <input
//                                 type="text"
//                                 placeholder={t("header.search_placeholder")}
//                                 className="w-full px-4 py-2 pr-10 rounded-full border text-sm"
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                             />
//                             <Search className="absolute left-4 top-1/2 -translate-y-1/2" size={20} />
//                             {searchQuery && (
//                                 <SearchResults
//                                     filteredResults={filteredResults}
//                                     suggestedQueries={suggestedQueries}
//                                     isLoading={isLoading}
//                                     clearSearch={clearSearch}
//                                     truncateDescription={truncateDescription}
//                                     onSuggestionClick={onSuggestionClick}
//                                     locale={locale}
//                                     linkToProduct={linkToProduct}
//                                     t={t}
//                                 />
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* موبایل: منوی کشویی */}
//             {menuOpen && (
//                 <div className="fixed inset-0 bg-black/60 z-40 flex flex-col" dir="rtl">
//                     <div className="bg-white dark:bg-gray-900 w-full h-full p-6 shadow-lg relative overflow-y-auto">
//                         <button
//                             onClick={() => setMenuOpen(false)}
//                             className="fixed top-6 left-6 text-gray-500 hover:text-red-500 bg-white dark:bg-gray-800 p-2 rounded-full z-10 shadow-xl border-2 border-gray-200 dark:border-gray-600 transition-all hover:scale-110"
//                         >
//                             <X size={28} />
//                         </button>
//                         <nav className="flex flex-col font-semibold text-lg mt-16 pb-8">
//                             <div className="flex flex-col divide-y divide-orange-100 dark:divide-gray-700 space-y-2">
//                                 {/* خانه */}
//                                 <Link href={linkHref("/")} legacyBehavior>
//                                     <a
//                                         onClick={() => setMenuOpen(false)}
//                                         className="py-4 px-4 hover:bg-orange-50 dark:hover:bg-gray-800 flex justify-between items-center"
//                                     >
//                                         <span>{t("menu.home")}</span>
//                                         <ChevronLeft size={20}
//                                             className="text-orange-500 opacity-0 group-hover:opacity-100" />
//                                     </a>
//                                 </Link>
//                                 {/* محصولات */}
//                                 <div className="py-4 px-4 hover:bg-orange-50 dark:hover:bg-gray-800">
//                                     <button
//                                         onClick={() => {
//                                             setProductDropdownOpen(p => !p);
//                                             setShowCategoryList(false);
//                                         }}
//                                         className="flex justify-between w-full"
//                                     >
//                                         <span>{t("menu.products")}</span>
//                                         <ChevronDown size={20}
//                                             className={`${productDropdownOpen ? "rotate-180" : ""}`} />
//                                     </button>
//                                     {productDropdownOpen && (
//                                         <div className="mt-2 pl-6 space-y-1">
//                                             <button
//                                                 onClick={() => setShowCategoryList(s => !s)}
//                                                 className="w-full text-left px-4 py-2 hover:bg-orange-100 dark:hover:bg-gray-700 rounded flex justify-between items-center font-medium text-base"
//                                             >
//                                                 لیست محصولات
//                                                 <ChevronDown size={16}
//                                                     className={`${showCategoryList ? "rotate-180" : ""} transition-transform`} />
//                                             </button>
//                                             {showCategoryList && renderCategories(categories)}
//                                         </div>
//                                     )}
//                                 </div>
//                                 {/* دیگر لینک‌ها */}
//                                 {[
//                                     { href: "/aboutUs", key: "menu.about" },
//                                     { href: "/contactUs", key: "menu.contact" },
//                                     { href: "/inventions", key: "menu.inventions" },
//                                 ].map(({ href, key }) => (
//                                     <Link href={linkHref(href)} legacyBehavior key={key}>
//                                         <a
//                                             onClick={() => setMenuOpen(false)}
//                                             className="py-4 px-4 hover:bg-orange-50 dark:hover:bg-gray-800 flex justify-between items-center"
//                                         >
//                                             <span>{t(key)}</span>
//                                             <ChevronLeft size={20}
//                                                 className="text-orange-500 opacity-0 group-hover:opacity-100" />
//                                         </a>
//                                     </Link>
//                                 ))}
//                             </div>
//                         </nav>
//                     </div>
//                 </div>
//             )}
//         </header>
//     );
// }

// export default memo(Header);



// import React, {
//     useState,
//     useEffect,
//     useMemo,
//     useCallback,
//     memo,
// } from "react";
// import Fuse from "fuse.js";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import {
//     Menu,
//     X,
//     Search,
//     Loader2,
//     AlertCircle,
//     Sun,
//     Moon,
//     ChevronDown,
//     ChevronLeft,
// } from "lucide-react";
// import { useLocale } from "../../../lib/localeContext";

// // کامپوننت نتایج جستجو (بدون تغییر)
// const SearchResults = memo(({
//     filteredResults,
//     suggestedQueries,
//     isLoading,
//     clearSearch,
//     truncateDescription,
//     onSuggestionClick,
//     locale,
//     linkToProduct,
//     t,
// }) => (
//     <div
//         className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg z-50 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-gray-100 dark:scrollbar-thumb-orange-300 dark:scrollbar-track-gray-800 animate-fadeIn"
//     >
//         <div className="flex justify-between items-center p-2 border-b border-gray-200 dark:border-gray-700">
//             <h3 className="font-medium text-sm">{t("header.search_results")}</h3>
//             <button
//                 onClick={clearSearch}
//                 className="text-xs text-orange-500 hover:text-orange-700 dark:hover:text-orange-400"
//             >
//                 {t("header.clear")}
//             </button>
//         </div>

//         {isLoading ? (
//             <div className="text-center py-4 text-orange-500 flex justify-center items-center gap-2">
//                 <Loader2 className="animate-spin" />
//                 {t("header.searching")}
//             </div>
//         ) : filteredResults.length > 0 ? (
//             filteredResults.map((item) => (
//                 <Link
//                     key={item.slug}
//                     href={linkToProduct(item.slug)}
//                     className="flex items-start gap-3 py-2 px-4 hover:bg-orange-100 dark:hover:bg-gray-700 rounded"
//                     onClick={clearSearch}
//                 >
//                     <Image
//                         src={item.imgSrc || "/no-image.png"}
//                         alt={item.title}
//                         width={48}
//                         height={48}
//                         className="rounded-md border object-cover"
//                         unoptimized
//                     />
//                     <div>
//                         <div className="font-semibold text-sm">{item.title}</div>
//                         <div className="text-xs text-gray-500 dark:text-gray-400">
//                             {item.searchDesc && truncateDescription(item.searchDesc)}
//                         </div>
//                     </div>
//                 </Link>
//             ))
//         ) : (
//             <div className="p-4">
//                 <div className="text-center text-sm text-gray-500 pb-4">
//                     <AlertCircle className="mx-auto text-orange-500 mb-2" size={28} />
//                     {t("header.no_results")}
//                 </div>
//                 {suggestedQueries.length > 0 && (
//                     <div className="mt-2">
//                         <h4 className="text-xs text-gray-500 dark:text-gray-400 mb-2">
//                             {t("header.suggestions")}
//                         </h4>
//                         <div className="flex flex-wrap gap-2">
//                             {suggestedQueries.map((q, i) => (
//                                 <button
//                                     key={i}
//                                     onClick={() => onSuggestionClick(q)}
//                                     className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-1 rounded-full"
//                                 >
//                                     {q}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         )}
//     </div>
// ));
// SearchResults.displayName = "SearchResults";

// function Header() {
//     const router = useRouter();
//     const { locale, setLocale, t } = useLocale();

//     // states
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [darkMode, setDarkMode] = useState(false);
//     const [productDropdownOpen, setProductDropdownOpen] = useState(false);
//     const [showCategoryList, setShowCategoryList] = useState(false);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [filteredResults, setFilteredResults] = useState([]);
//     const [suggestedQueries, setSuggestedQueries] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [showMobileSearch, setShowMobileSearch] = useState(false);
//     const [categories, setCategories] = useState([]);
//     const [isSwitching, setIsSwitching] = useState(false);
//     const [allProducts, setAllProducts] = useState([]);

//     // helper: مسیر با توجه به زبان
//     const linkHref = useCallback(
//         (base) => {
//             if (locale === "en") {
//                 if (base === "/") return "/en";
//                 if (base.startsWith("/en")) return base;
//                 return "/en" + base;
//             } else {
//                 if (base.startsWith("/en/")) return base.replace(/^\/en/, "") || "/";
//                 if (base === "/en") return "/";
//                 return base;
//             }
//         },
//         [locale]
//     );

//     // helper: لینک محصول
//     const linkToProduct = useCallback(
//         (slug) => (locale === "en" ? `/en/products/${slug}` : `/products/${slug}`),
//         [locale]
//     );

//     // fetch categories once
//     useEffect(() => {
//         fetch("/api/categories")
//             .then((r) => r.json())
//             .then((res) => {
//                 if (res.status === 200) setCategories(res.data);
//             })
//             .catch(() => {
//             });
//     }, []);

//     // fetch products once
//     useEffect(() => {
//         fetch("/api/products")
//             .then((r) => r.json())
//             .then((data) => setAllProducts(data))
//             .catch(() => setAllProducts([]));
//     }, []);

//     // dark mode init
//     useEffect(() => {
//         const stored = localStorage.getItem("theme");
//         const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
//         const useDark = stored === "dark" || (!stored && prefersDark);
//         document.documentElement.classList.toggle("dark", useDark);
//         setDarkMode(useDark);
//     }, []);

//     const toggleDarkMode = () => {
//         const next = !darkMode;
//         document.documentElement.classList.toggle("dark", next);
//         localStorage.setItem("theme", next ? "dark" : "light");
//         setDarkMode(next);
//     };

//     // language switch
//     const handleLanguageSwitch = () => {
//         if (isSwitching) return;
//         setIsSwitching(true);
//         const newLang = locale === "fa" ? "en" : "fa";
//         setLocale(newLang);
//         let [path, hash = ""] = router.asPath.split("#");
//         let [pure, qs = ""] = path.split("?");
//         let target = "";
//         if (newLang === "en") {
//             target = pure === "/" ? "/en" : "/en" + pure;
//         } else {
//             target = pure.startsWith("/en") ? pure.replace(/^\/en/, "") || "/" : pure;
//         }
//         if (qs) target += "?" + qs;
//         if (hash) target += "#" + hash;
//         router.push(target).finally(() => setIsSwitching(false));
//     };

//     // Fuse.js instance
//     const fuse = useMemo(() => {
//         return new Fuse(allProducts, {
//             keys: ["title", "description"],
//             threshold: 0.4,
//             distance: 100,
//             minMatchCharLength: 1,
//             ignoreLocation: true,
//             includeScore: true,
//             findAllMatches: true,
//             includeMatches: true,
//         });
//     }, [allProducts]);

//     // search effect
//     useEffect(() => {
//         if (!searchQuery.trim()) {
//             setFilteredResults([]);
//             setSuggestedQueries([]);
//             setIsLoading(false);
//             return;
//         }
//         setIsLoading(true);
//         const handler = setTimeout(() => {
//             if (!fuse) {
//                 setIsLoading(false);
//                 return;
//             }
//             const results = fuse.search(searchQuery).map((r) => r.item);
//             setFilteredResults(results);
//             if (results.length === 0) {
//                 const fb = new Fuse(allProducts, {
//                     keys: ["title", "description"],
//                     threshold: 0.6,
//                     minMatchCharLength: 1,
//                     ignoreLocation: true,
//                 });
//                 setSuggestedQueries(
//                     fb.search(searchQuery).map((r) => r.item.title).slice(0, 5)
//                 );
//             } else {
//                 setSuggestedQueries([]);
//             }
//             setIsLoading(false);
//         }, 300);
//         return () => clearTimeout(handler);
//     }, [searchQuery, fuse, allProducts]);

//     // prevent scroll when mobile search open
//     useEffect(() => {
//         document.body.style.overflow = showMobileSearch ? "hidden" : "";
//     }, [showMobileSearch]);

//     const clearSearch = () => {
//         setSearchQuery("");
//         setFilteredResults([]);
//         setSuggestedQueries([]);
//     };
//     const truncateDescription = (desc, limit = 10) => {
//         if (!desc) return "";
//         const w = desc.trim().split(/\s+/);
//         return w.length <= limit
//             ? w.join(" ")
//             : w.slice(0, limit).join(" ") + "...";
//     };
//     const onSuggestionClick = (q) => setSearchQuery(q);

//     // تابع بازگشتی برای رندر سلسله‌مراتبی دسته‌بندی‌ها
//     const renderCategories = (cats) => (
//         <ul className="pl-4">
//             {cats.map((cat) => (
//                 <li key={cat.id} className="group">
//                     <Link
//                         href={linkHref(`/products?category=${cat.slug}`)}
//                         className="block px-4 py-2 hover:bg-orange-100 dark:hover:bg-gray-700 rounded flex justify-between items-center text-sm"
//                         onClick={() => {
//                             setProductDropdownOpen(false);
//                             setShowCategoryList(false);
//                             setMenuOpen(false);
//                         }}
//                     >
//                         {t(`category.${cat.slug}`)}
//                         {cat.children?.length > 0 && (
//                             <ChevronDown
//                                 size={16}
//                                 className="transition-transform group-hover:rotate-180"
//                             />
//                         )}
//                     </Link>
//                     {cat.children?.length > 0 && renderCategories(cat.children)}
//                 </li>
//             ))}
//         </ul>
//     );

//     return (
//         <header
//             id="site-header"
//             className="fixed top-2 z-50 w-full bg-white dark:bg-[#2c3e50] shadow-md border-b border-gray-200 dark:border-orange-500 py-3 px-4 text-black dark:text-white"
//         >
//             <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

//                 {/* لوگو */}
//                 <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 relative">
//                         <Link href="/">
//                             <Image
//                                 src="/images/logos/Logo1.webp"
//                                 alt="لوگو میهن یدک"
//                                 fill
//                                 sizes="40px"
//                                 className="object-contain rounded"
//                                 priority
//                             />
//                         </Link>
//                     </div>
//                     {/* لوگو دوم فقط در دسکتاپ نمایش داده شود */}
//                     <div className="hidden md:block w-28 h-10 relative sm:w-32 md:w-40 lg:w-48">
//                         <Link href="/">
//                             <Image
//                                 src={
//                                     darkMode
//                                         ? "/images/logos/Logo2-dark.webp"
//                                         : "/images/logos/Logo2.webp"
//                                 }
//                                 alt="لوگو نوشته"
//                                 fill
//                                 sizes="(min-width: 1024px) 192px, (min-width: 768px) 160px, (min-width: 640px) 128px, 112px"
//                                 className="object-contain"
//                                 priority
//                             />
//                         </Link>
//                     </div>
//                 </div>

//                 {/* منوی دسکتاپ */}
//                 <div className="hidden lg:flex flex-1 justify-center">
//                     <nav className="flex gap-6 font-semibold text-sm lg:text-base items-center">

//                         {/* محصولات */}
//                         <div className="relative">
//                             <button
//                                 onClick={() => {
//                                     setProductDropdownOpen(p => !p);
//                                     setShowCategoryList(false);
//                                 }}
//                                 className="flex items-center gap-1 hover:text-orange-500"
//                             >
//                                 {t("header.products")} <ChevronDown size={18} />
//                             </button>

//                             {productDropdownOpen && (
//                                 <div
//                                     onMouseLeave={() => {
//                                         setProductDropdownOpen(false);
//                                         setShowCategoryList(false);
//                                     }}
//                                     className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg text-sm p-2 z-50 flex"
//                                 >
//                                     {/* مرحله‌ی اول: لیست محصولات */}
//                                     <div className="w-56">
//                                         <button
//                                             onClick={() => setShowCategoryList(s => !s)}
//                                             className="w-full text-left px-4 py-2 hover:bg-orange-100 dark:hover:bg-gray-700 rounded flex justify-between items-center font-medium"
//                                         >
//                                             {t("header.product_list")}
//                                             <ChevronDown size={16}
//                                                 className={`${showCategoryList ? "rotate-180" : ""} transition-transform`} />
//                                         </button>
//                                     </div>

//                                     {/* مرحله‌ی دوم: زیرمجموعه‌ها */}
//                                     {showCategoryList && (
//                                         <div className="w-56 border-l border-gray-200 dark:border-gray-700 pl-2">
//                                             {renderCategories(categories)}
//                                         </div>
//                                     )}
//                                 </div>
//                             )}
//                         </div>

//                         <Link
//                             href={linkHref("/about-us")}
//                             className="hover:text-orange-500"
//                         >
//                             {t("header.about")}
//                         </Link>
//                         <Link
//                             href={linkHref("/contact-us")}
//                             className="hover:text-orange-500"
//                         >
//                             {t("header.contact")}
//                         </Link>
//                         <Link
//                             href={linkHref("/inventions")}
//                             className="hover:text-orange-500"
//                         >
//                             {t("header.inventions")}
//                         </Link>
//                     </nav>
//                 </div>

//                 {/* آیکون موبایل */}
//                 <div className="flex flex-shrink-0 lg:hidden items-center gap-2 z-30 order-3">
//                     <button onClick={() => setMenuOpen(true)}>
//                         <Menu size={28} />
//                     </button>
//                 </div>

//                 {/* موبایل: جستجو، تاریک/روشن، زبان */}
//                 <div className="flex lg:hidden items-center gap-2 z-40 order-2">
//                     <button
//                         onClick={handleLanguageSwitch}
//                         disabled={isSwitching}
//                         className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm disabled:opacity-50"
//                     >
//                         {locale === "fa" ? "English" : "فارسی"}
//                     </button>
//                     <button onClick={toggleDarkMode} className="p-2">
//                         {darkMode ? <Moon size={24} /> : <Sun size={24} />}
//                     </button>
//                     <button onClick={() => setShowMobileSearch(true)} className="p-2">
//                         <Search size={24} />
//                     </button>
//                 </div>

//                 {/* دسکتاپ: جستجو، تاریک/روشن، زبان */}
//                 <div className="hidden lg:flex items-center gap-4">
//                     <button onClick={toggleDarkMode} className="p-2 rounded-full">
//                         {darkMode ? <Moon size={24} /> : <Sun size={24} />}
//                     </button>
//                     <button
//                         onClick={handleLanguageSwitch}
//                         disabled={isSwitching}
//                         className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm disabled:opacity-50"
//                     >
//                         {locale === "fa" ? "English" : "فارسی"}
//                     </button>
//                     <div className="relative w-64">
//                         <input
//                             type="text"
//                             placeholder={t("header.search_placeholder")}
//                             className="w-full pl-10 pr-4 bg-white dark:bg-gray-700 text-black dark:text-white py-2 rounded-full border text-sm shadow-sm focus:ring-2 focus:ring-orange-400"
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                         />
//                         <Search
//                             className="absolute left-3 top-1/2 -translate-y-1/2 text-black dark:text-white"
//                             size={20}
//                         />
//                         {searchQuery && (
//                             <SearchResults
//                                 filteredResults={filteredResults}
//                                 suggestedQueries={suggestedQueries}
//                                 isLoading={isLoading}
//                                 clearSearch={clearSearch}
//                                 truncateDescription={truncateDescription}
//                                 onSuggestionClick={onSuggestionClick}
//                                 locale={locale}
//                                 linkToProduct={linkToProduct}
//                                 t={t}
//                             />
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* موبایل: پنل جستجوی کامل */}
//             {showMobileSearch && (
//                 <div className="fixed inset-0 bg-black/60 z-40 flex items-start justify-center p-4 pt-24 lg:hidden">
//                     <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-md p-4 relative">
//                         <button
//                             onClick={() => setShowMobileSearch(false)}
//                             className="absolute top-1 left-2 text-gray-500 hover:text-red-500"
//                         >
//                             <X size={24} />
//                         </button>
//                         <div className="relative mt-6">
//                             <input
//                                 type="text"
//                                 placeholder={t("header.search_placeholder")}
//                                 className="w-full px-4 py-2 pr-10 rounded-full border text-sm"
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                             />
//                             <Search className="absolute left-4 top-1/2 -translate-y-1/2" size={20} />
//                             {searchQuery && (
//                                 <SearchResults
//                                     filteredResults={filteredResults}
//                                     suggestedQueries={suggestedQueries}
//                                     isLoading={isLoading}
//                                     clearSearch={clearSearch}
//                                     truncateDescription={truncateDescription}
//                                     onSuggestionClick={onSuggestionClick}
//                                     locale={locale}
//                                     linkToProduct={linkToProduct}
//                                     t={t}
//                                 />
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* موبایل: منوی کشویی */}
//             {menuOpen && (
//                 <div className="fixed inset-0 bg-black/60 z-40 flex flex-col" dir="rtl">
//                     <div className="bg-white dark:bg-gray-900 w-full h-full p-6 shadow-lg relative overflow-y-auto">
//                         <button
//                             onClick={() => setMenuOpen(false)}
//                             className="fixed top-6 left-6 text-gray-500 hover:text-red-500 bg-white dark:bg-gray-800 p-2 rounded-full z-10 shadow-xl border-2 border-gray-200 dark:border-gray-600 transition-all hover:scale-110"
//                         >
//                             <X size={28} />
//                         </button>

//                         {/* اضافه کردن لوگو دوم در بالای منوی موبایل */}
//                         <div className="flex justify-center mb-6 mt-16">
//                             <div className="w-48 h-16 relative">
//                                 <Image
//                                     src={
//                                         darkMode
//                                             ? "/images/logos/Logo2-dark.webp"
//                                             : "/images/logos/Logo2.webp"
//                                     }
//                                     alt="لوگو نوشته"
//                                     fill
//                                     className="object-contain"
//                                 />
//                             </div>
//                         </div>

//                         <nav className="flex flex-col font-semibold text-lg pb-8">
//                             <div className="flex flex-col divide-y divide-orange-100 dark:divide-gray-700 space-y-2">
//                                 {/* خانه */}
//                                 <Link
//                                     href={linkHref("/")}
//                                     className="py-4 px-4 hover:bg-orange-50 dark:hover:bg-gray-800 flex justify-between items-center"
//                                     onClick={() => setMenuOpen(false)}
//                                 >
//                                     <span>{t("menu.home")}</span>
//                                     <ChevronLeft size={20}
//                                         className="text-orange-500 opacity-0 group-hover:opacity-100" />
//                                 </Link>

//                                 {/* محصولات */}
//                                 <div className="py-4 px-4 hover:bg-orange-50 dark:hover:bg-gray-800">
//                                     <button
//                                         onClick={() => {
//                                             setProductDropdownOpen(p => !p);
//                                             setShowCategoryList(false);
//                                         }}
//                                         className="flex justify-between w-full"
//                                     >
//                                         <span>{t("menu.products")}</span>
//                                         <ChevronDown size={20}
//                                             className={`${productDropdownOpen ? "rotate-180" : ""}`} />
//                                     </button>
//                                     {productDropdownOpen && (
//                                         <div className="mt-2 pl-6 space-y-1">
//                                             <button
//                                                 onClick={() => setShowCategoryList(s => !s)}
//                                                 className="w-full text-left px-4 py-2 hover:bg-orange-100 dark:hover:bg-gray-700 rounded flex justify-between items-center font-medium text-base"
//                                             >
//                                                 لیست محصولات
//                                                 <ChevronDown size={16}
//                                                     className={`${showCategoryList ? "rotate-180" : ""} transition-transform`} />
//                                             </button>
//                                             {showCategoryList && renderCategories(categories)}
//                                         </div>
//                                     )}
//                                 </div>

//                                 {/* دیگر لینک‌ها */}
//                                 {[
//                                     { href: "/aboutUs", key: "menu.about" },
//                                     { href: "/contactUs", key: "menu.contact" },
//                                     { href: "/inventions", key: "menu.inventions" },
//                                 ].map(({ href, key }) => (
//                                     <Link
//                                         href={linkHref(href)}
//                                         key={key}
//                                         className="py-4 px-4 hover:bg-orange-50 dark:hover:bg-gray-800 flex justify-between items-center"
//                                         onClick={() => setMenuOpen(false)}
//                                     >
//                                         <span>{t(key)}</span>
//                                         <ChevronLeft size={20}
//                                             className="text-orange-500 opacity-0 group-hover:opacity-100" />
//                                     </Link>
//                                 ))}
//                             </div>
//                         </nav>
//                     </div>
//                 </div>
//             )}
//         </header>
//     );
// }

// export default memo(Header);
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  memo,
} from "react";
import Fuse from "fuse.js";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Menu,
  X,
  Search,
  Loader2,
  AlertCircle,
  Sun,
  Moon,
  ChevronDown,
  ChevronLeft,
} from "lucide-react";
import { useLocale } from "../../../lib/localeContext";

// کامپوننت نتایج جستجو (بدون تغییر)
const SearchResults = memo(({
  filteredResults,
  suggestedQueries,
  isLoading,
  clearSearch,
  truncateDescription,
  onSuggestionClick,
  locale,
  linkToProduct,
  t,
}) => (
  <div
    className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg z-50 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-gray-100 dark:scrollbar-thumb-orange-300 dark:scrollbar-track-gray-800 animate-fadeIn"
  >
    <div className="flex justify-between items-center p-2 border-b border-gray-200 dark:border-gray-700">
      <h3 className="font-medium text-sm">{t("header.search_results")}</h3>
      <button
        onClick={clearSearch}
        className="text-xs text-orange-500 hover:text-orange-700 dark:hover:text-orange-400"
      >
        {t("header.clear")}
      </button>
    </div>

    {isLoading ? (
      <div className="text-center py-4 text-orange-500 flex justify-center items-center gap-2">
        <Loader2 className="animate-spin" />
        {t("header.searching")}
      </div>
    ) : filteredResults.length > 0 ? (
      filteredResults.map((item) => (
        <Link
          key={item.slug}
          href={linkToProduct(item.slug)}
          className="flex items-start gap-3 py-2 px-4 hover:bg-orange-100 dark:hover:bg-gray-700 rounded"
          onClick={clearSearch}
        >
          <Image
            src={item.imgSrc || "/no-image.png"}
            alt={item.title}
            width={48}
            height={48}
            className="rounded-md border object-cover"
            unoptimized
          />
          <div>
            <div className="font-semibold text-sm">{item.title}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {item.searchDesc && truncateDescription(item.searchDesc)}
            </div>
          </div>
        </Link>
      ))
    ) : (
      <div className="p-4">
        <div className="text-center text-sm text-gray-500 pb-4">
          <AlertCircle className="mx-auto text-orange-500 mb-2" size={28} />
          {t("header.no_results")}
        </div>
        {suggestedQueries.length > 0 && (
          <div className="mt-2">
            <h4 className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              {t("header.suggestions")}
            </h4>
            <div className="flex flex-wrap gap-2">
              {suggestedQueries.map((q, i) => (
                <button
                  key={i}
                  onClick={() => onSuggestionClick(q)}
                  className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-1 rounded-full"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    )}
  </div>
));
SearchResults.displayName = "SearchResults";

function Header() {
  const router = useRouter();
  const { locale, setLocale, t } = useLocale();

  // states
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [showCategoryList, setShowCategoryList] = useState(null); // اکنون می‌تواند id دسته را نگه دارد
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [suggestedQueries, setSuggestedQueries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isSwitching, setIsSwitching] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  // helper: مسیر با توجه به زبان
  const linkHref = useCallback(
    (base) => {
      if (locale === "en") {
        if (base === "/") return "/en";
        if (base.startsWith("/en")) return base;
        return "/en" + base;
      } else {
        if (base.startsWith("/en/")) return base.replace(/^\/en/, "") || "/";
        if (base === "/en") return "/";
        return base;
      }
    },
    [locale]
  );

  // helper: لینک محصول
  const linkToProduct = useCallback(
    (slug) => (locale === "en" ? `/en/products/${slug}` : `/products/${slug}`),
    [locale]
  );

  // fetch categories once
  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((res) => {
        if (res.status === 200) setCategories(res.data);
      })
      .catch(() => {});
  }, []);

  // fetch products once
  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => setAllProducts(data))
      .catch(() => setAllProducts([]));
  }, []);

  // dark mode init
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const useDark = stored === "dark" || (!stored && prefersDark);
    document.documentElement.classList.toggle("dark", useDark);
    setDarkMode(useDark);
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setDarkMode(next);
  };

  // language switch
  const handleLanguageSwitch = () => {
    if (isSwitching) return;
    setIsSwitching(true);
    const newLang = locale === "fa" ? "en" : "fa";
    setLocale(newLang);
    let [path, hash = ""] = router.asPath.split("#");
    let [pure, qs = ""] = path.split("?");
    let target = "";
    if (newLang === "en") {
      target = pure === "/" ? "/en" : "/en" + pure;
    } else {
      target = pure.startsWith("/en") ? pure.replace(/^\/en/, "") || "/" : pure;
    }
    if (qs) target += "?" + qs;
    if (hash) target += "#" + hash;
    router.push(target).finally(() => setIsSwitching(false));
  };

  // Fuse.js instance
  const fuse = useMemo(() => {
    return new Fuse(allProducts, {
      keys: ["title", "description"],
      threshold: 0.4,
      distance: 100,
      minMatchCharLength: 1,
      ignoreLocation: true,
      includeScore: true,
      findAllMatches: true,
      includeMatches: true,
    });
  }, [allProducts]);

  // search effect
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredResults([]);
      setSuggestedQueries([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const handler = setTimeout(() => {
      if (!fuse) {
        setIsLoading(false);
        return;
      }
      const results = fuse.search(searchQuery).map((r) => r.item);
      setFilteredResults(results);
      if (results.length === 0) {
        const fb = new Fuse(allProducts, {
          keys: ["title", "description"],
          threshold: 0.6,
          minMatchCharLength: 1,
          ignoreLocation: true,
        });
        setSuggestedQueries(
          fb.search(searchQuery).map((r) => r.item.title).slice(0, 5)
        );
      } else {
        setSuggestedQueries([]);
      }
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery, fuse, allProducts]);

  // prevent scroll when mobile search open
  useEffect(() => {
    document.body.style.overflow = showMobileSearch ? "hidden" : "";
  }, [showMobileSearch]);

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredResults([]);
    setSuggestedQueries([]);
  };
  const truncateDescription = (desc, limit = 10) => {
    if (!desc) return "";
    const w = desc.trim().split(/\s+/);
    return w.length <= limit
      ? w.join(" ")
      : w.slice(0, limit).join(" ") + "...";
  };
  const onSuggestionClick = (q) => setSearchQuery(q);

  return (
    <header
      id="site-header"
      className="fixed top-2 z-50 w-full bg-white dark:bg-[#2c3e50] shadow-md border-b border-gray-200 dark:border-orange-500 py-3 px-4 text-black dark:text-white"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* لوگو */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 relative">
            <Link href="/">
              <Image
                src="/images/logos/Logo1.webp"
                alt="لوگو میهن یدک"
                fill
                sizes="40px"
                className="object-contain rounded"
                priority
              />
            </Link>
          </div>
          <div className="hidden md:block w-28 h-10 relative sm:w-32 md:w-40 lg:w-48">
            <Link href="/">
              <Image
                src={
                  darkMode
                    ? "/images/logos/Logo2-dark.webp"
                    : "/images/logos/Logo2.webp"
                }
                alt="لوگو نوشته"
                fill
                sizes="(min-width: 1024px) 192px, (min-width: 768px) 160px, (min-width: 640px) 128px, 112px"
                className="object-contain"
                priority
              />
            </Link>
          </div>
        </div>

        {/* منوی دسکتاپ */}
        <div className="hidden lg:flex flex-1 justify-center">
          <nav className="flex gap-6 font-semibold text-sm lg:text-base items-center">
            {/* محصولات */}
            <div className="relative">
              <button
                onClick={() => {
                  setProductDropdownOpen((p) => !p);
                  setShowCategoryList(null);
                }}
                className="flex items-center gap-1 hover:text-orange-500"
              >
                {t("header.products")} <ChevronDown size={18} />
              </button>

              {productDropdownOpen && (
                <div
                  onMouseLeave={() => {
                    setProductDropdownOpen(false);
                    setShowCategoryList(null);
                  }}
                  className="
                    absolute top-full left-0
                    w-screen max-w-7xl mx-auto
                    grid grid-cols-4
                    bg-white dark:bg-gray-800
                    rounded-b-lg
                    shadow-xl
                    z-50
                  "
                >
                  {/* ستون اول: لیست دسته‌ها */}
                  <div className="col-span-1 bg-orange-50 dark:bg-gray-700 p-6">
                    <h4 className="text-lg font-semibold mb-4">
                      {t("header.product_list")}
                    </h4>
                    <ul className="space-y-2">
                      {categories.map((cat) => (
                        <li key={cat.id}>
                          <button
                            onClick={() => setShowCategoryList(cat.id)}
                            className={`w-full text-left ${
                              showCategoryList === cat.id
                                ? "text-orange-600 font-bold"
                                : "text-gray-700 dark:text-gray-200"
                            } hover:text-orange-500`}
                          >
                            {t(`category.${cat.slug}`)}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* ستون‌های زیرمجموعه */}
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      className={`
                        col-span-1
                        p-6
                        border-l border-gray-200 dark:border-gray-700
                        ${showCategoryList === cat.id ? "block" : "hidden"}
                      `}
                    >
                      <h5 className="font-medium mb-3">
                        {t(`category.${cat.slug}`)}
                      </h5>
                      <ul className="space-y-2 text-sm">
                        {cat.children?.map((sub) => (
                          <li key={sub.id}>
                            <Link
                              href={linkHref(`/products?category=${sub.slug}`)}
                              className="block hover:text-orange-500"
                              onClick={() => {
                                setProductDropdownOpen(false);
                                setShowCategoryList(null);
                                setMenuOpen(false);
                              }}
                            >
                              {t(`category.${sub.slug}`)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* لینک‌های ثابت */}
            <Link href={linkHref("/about-us")} className="hover:text-orange-500">
              {t("header.about")}
            </Link>
            <Link href={linkHref("/contact-us")} className="hover:text-orange-500">
              {t("header.contact")}
            </Link>
            <Link href={linkHref("/inventions")} className="hover:text-orange-500">
              {t("header.inventions")}
            </Link>
          </nav>
        </div>

        {/* آیکون موبایل */}
        <div className="flex flex-shrink-0 lg:hidden items-center gap-2 z-30 order-3">
          <button onClick={() => setMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>

        {/* موبایل: جستجو، تاریک/روشن، زبان */}
        <div className="flex lg:hidden items-center gap-2 z-40 order-2">
          <button
            onClick={handleLanguageSwitch}
            disabled={isSwitching}
            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm disabled:opacity-50"
          >
            {locale === "fa" ? "English" : "فارسی"}
          </button>
          <button onClick={toggleDarkMode} className="p-2">
            {darkMode ? <Moon size={24} /> : <Sun size={24} />}
          </button>
          <button onClick={() => setShowMobileSearch(true)} className="p-2">
            <Search size={24} />
          </button>
        </div>

        {/* دسکتاپ: جستجو، تاریک/روشن، زبان */}
        <div className="hidden lg:flex items-center gap-4">
          <button onClick={toggleDarkMode} className="p-2 rounded-full">
            {darkMode ? <Moon size={24} /> : <Sun size={24} />}
          </button>
          <button
            onClick={handleLanguageSwitch}
            disabled={isSwitching}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm disabled:opacity-50"
          >
            {locale === "fa" ? "English" : "فارسی"}
          </button>
          <div className="relative w-64">
            <input
              type="text"
              placeholder={t("header.search_placeholder")}
              className="w-full pl-10 pr-4 bg-white dark:bg-gray-700 text-black dark:text-white py-2 rounded-full border text-sm shadow-sm focus:ring-2 focus:ring-orange-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black dark:text-white" size={20} />
            {searchQuery && (
              <SearchResults
                filteredResults={filteredResults}
                suggestedQueries={suggestedQueries}
                isLoading={isLoading}
                clearSearch={clearSearch}
                truncateDescription={truncateDescription}
                onSuggestionClick={onSuggestionClick}
                locale={locale}
                linkToProduct={linkToProduct}
                t={t}
              />
            )}
          </div>
        </div>
      </div>

      {/* موبایل: پنل جستجوی کامل */}
      {showMobileSearch && (
        <div className="fixed inset-0 bg-black/60 z-40 flex items-start justify-center p-4 pt-24 lg:hidden">
          <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-md p-4 relative">
            <button
              onClick={() => setShowMobileSearch(false)}
              className="absolute top-1 left-2 text-gray-500 hover:text-red-500"
            >
              <X size={24} />
            </button>
            <div className="relative mt-6">
              <input
                type="text"
                placeholder={t("header.search_placeholder")}
                className="w-full px-4 py-2 pr-10 rounded-full border text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2" size={20} />
              {searchQuery && (
                <SearchResults
                  filteredResults={filteredResults}
                  suggestedQueries={suggestedQueries}
                  isLoading={isLoading}
                  clearSearch={clearSearch}
                  truncateDescription={truncateDescription}
                  onSuggestionClick={onSuggestionClick}
                  locale={locale}
                  linkToProduct={linkToProduct}
                  t={t}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* موبایل: منوی کشویی */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 flex flex-col" dir="rtl">
          <div className="bg-white dark:bg-gray-900 w-full h-full p-6 shadow-lg relative overflow-y-auto">
            <button
              onClick={() => setMenuOpen(false)}
              className="fixed top-6 left-6 text-gray-500 hover:text-red-500 bg-white dark:bg-gray-800 p-2 rounded-full z-10 shadow-xl border-2 border-gray-200 dark:border-gray-600 transition-all hover:scale-110"
            >
              <X size={28} />
            </button>

            <div className="flex justify-center mb-6 mt-16">
              <div className="w-48 h-16 relative">
                <Image
                  src={
                    darkMode
                      ? "/images/logos/Logo2-dark.webp"
                      : "/images/logos/Logo2.webp"
                  }
                  alt="لوگو نوشته"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <nav className="flex flex-col font-semibold text-lg pb-8">
              <div className="flex flex-col divide-y divide-orange-100 dark:divide-gray-700 space-y-2">
                <Link
                  href={linkHref("/")}
                  className="py-4 px-4 hover:bg-orange-50 dark:hover:bg-gray-800 flex justify-between items-center group"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="text-base">{t("menu.home")}</span>
                  <ChevronLeft size={20} className="text-orange-500 opacity-0 group-hover:opacity-100" />
                </Link>

                <div className="py-4 px-4 hover:bg-orange-50 dark:hover:bg-gray-800">
                  <button
                    onClick={() => {
                      setProductDropdownOpen((p) => !p);
                      setShowCategoryList(null);
                    }}
                    className="flex justify-between w-full items-center"
                  >
                    <span className="text-base">{t("menu.products")}</span>
                    <ChevronDown size={20} className={`${productDropdownOpen ? "rotate-180" : ""} transition-transform`} />
                  </button>
                  {productDropdownOpen && (
                    <div className="mt-3 pl-4 space-y-3">
                      <button
                        onClick={() => setShowCategoryList((s) => (s ? null : "list"))}
                        className="w-full text-left px-4 py-2 hover:bg-orange-100 dark:hover:bg-gray-700 rounded flex justify-between items-center font-medium text-base bg-gray-50 dark:bg-gray-800"
                      >
                        <span>لیست محصولات</span>
                        <ChevronDown size={16} className={`${showCategoryList ? "rotate-180" : ""} transition-transform`} />
                      </button>
                      {showCategoryList && (
                        <div className="mt-2 pl-2 border-r-2 border-orange-400 dark:border-orange-500">
                          <ul className="space-y-2">
                            {categories.map((cat) => (
                              <li key={cat.id}>
                                <Link
                                  href={linkHref(`/products?category=${cat.slug}`)}
                                  className="block px-4 py-2 hover:bg-orange-100 dark:hover:bg-gray-700 rounded"
                                  onClick={() => {
                                    setMenuOpen(false);
                                    setProductDropdownOpen(false);
                                    setShowCategoryList(null);
                                  }}
                                >
                                  {t(`category.${cat.slug}`)}
                                </Link>
                                {cat.children?.length > 0 && (
                                  <ul className="pl-4 space-y-1">
                                    {cat.children.map((sub) => (
                                      <li key={sub.id}>
                                        <Link
                                          href={linkHref(`/products?category=${sub.slug}`)}
                                          className="block px-4 py-1 text-sm hover:bg-orange-50 dark:hover:bg-gray-800 rounded"
                                          onClick={() => setMenuOpen(false)}
                                        >
                                          {t(`category.${sub.slug}`)}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {[
                  { href: "/aboutUs", key: "menu.about" },
                  { href: "/contactUs", key: "menu.contact" },
                  { href: "/inventions", key: "menu.inventions" },
                ].map(({ href, key }) => (
                  <Link
                    href={linkHref(href)}
                    key={key}
                    className="py-4 px-4 hover:bg-orange-50 dark:hover:bg-gray-800 flex justify-between items-center group"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="text-base">{t(key)}</span>
                    <ChevronLeft size={20} className="text-orange-500 opacity-0 group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

export default memo(Header);

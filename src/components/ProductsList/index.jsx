// app/products/ProductsList.js

import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    useMemo
} from 'react';
import Link from 'next/link';
import {useSearchParams} from 'next/navigation';
import {
    XCircle,
    Search,
    AlertTriangle,
    ChevronDown
} from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import heavy components
const ProductSkeletonCard = dynamic(
    () => import('../ProductSkeletonCard'),
    {ssr: false}
);
const Pagination = dynamic(
    () => import('@mui/material/Pagination'),
    {ssr: false}
);
const Fuse = dynamic(
    () => import('fuse.js'),
    {ssr: false, loading: () => null}
);

const ITEMS_PER_PAGE = 9;
const DEBOUNCE_DELAY = 300;

// Memoized Product Card to avoid re-renders
const ProductCard = React.memo(({product}) => (
    <Link
        href={`/products/${product.slug}`}
        className="group relative w-full max-w-sm rounded-2xl overflow-hidden border border-orange-300 dark:border-orange-500 bg-white dark:bg-slate-800 hover:border-orange-400 transition-shadow shadow-md hover:shadow-xl flex flex-col"
    >
        <div
            className="absolute inset-0 bg-orange-100/50 dark:bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
      <span
          className="text-slate-900 dark:text-white text-sm font-semibold bg-white/70 dark:bg-slate-900/70 px-4 py-2 rounded-lg border border-white/10 shadow">
        برای مشاهده جزئیات کلیک کنید
      </span>
        </div>
        <div className="flex-1 p-5 flex items-center justify-center bg-orange-50 dark:bg-slate-900">
            <img
                src={product.imgSrc}
                alt={product.title}
                loading="lazy"
                decoding="async"
                className="h-52 w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
        </div>
        <div
            className="border-t border-orange-300 dark:border-orange-500 px-4 py-3 bg-gradient-to-r from-orange-100/60 via-white to-orange-100/60 dark:from-orange-500/10 dark:via-slate-800 dark:to-orange-500/10 backdrop-blur-md">
            <h3 className="text-slate-900 dark:text-white text-center font-bold drop-shadow-sm truncate">
                {product.title}
            </h3>
        </div>
    </Link>
));

export default function ProductsList() {
    // States
    const [categories, setCategories] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [overrideProducts, setOverrideProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [fuzzySuggestions, setFuzzySuggestions] = useState([]);
    const [capsLockOn, setCapsLockOn] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState({categories: false});
    const [isOnline, setIsOnline] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    // Refs
    const searchInputRef = useRef(null);
    const fuseRef = useRef(null);
    const searchTimeoutRef = useRef(null);

    const searchParams = useSearchParams();
    const selectedSlug = searchParams.get('category');

    // Fetch categories & products once at mount
    useEffect(() => {
        let cancelled = false;
        const fetchData = async () => {
            try {
                const [resCat, resProd] = await Promise.all([
                    fetch('/api/categories'),
                    fetch('/api/products')
                ]);
                const catJson = await resCat.json();
                const prodJson = await resProd.json();
                if (!cancelled) {
                    setCategories(Array.isArray(catJson.data) ? catJson.data : []);
                    setAllProducts(Array.isArray(prodJson) ? prodJson : []);
                }
            } catch (e) {
                console.error('Error fetching data:', e);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        fetchData();
        return () => {
            cancelled = true;
        };
    }, []);

    // Initialize Fuse.js for fuzzy search
    useEffect(() => {
        if (allProducts.length && !fuseRef.current) {
            import('fuse.js').then(({default: Fuse}) => {
                fuseRef.current = new Fuse(allProducts, {
                    keys: ['title', 'description'],
                    threshold: 0.4,
                    distance: 100,
                    ignoreLocation: true,
                    minMatchCharLength: 2
                });
            });
        }
    }, [allProducts]);

    // Online/offline detection
    useEffect(() => {
        const update = () => setIsOnline(navigator.onLine);
        window.addEventListener('online', update);
        window.addEventListener('offline', update);
        update();
        return () => {
            window.removeEventListener('online', update);
            window.removeEventListener('offline', update);
        };
    }, []);

    // Clear override when user types a new search
    useEffect(() => {
        if (search) setOverrideProducts(null);
    }, [search]);

    // Reset to first page on filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedSlug, search, overrideProducts]);

    // Compute filtered products
    const filteredProducts = useMemo(() => {
        if (search.trim()) {
            // ۱) کاربر داره جستجو می‌کنه ⇒ fuzzy match با Fuse روی همهٔ محصولات
            return fuseRef.current
                ? fuseRef.current.search(search).map(r => r.item)
                : [];
        }

        // ۲) اگر روی یک پیشنهاد کلیک شده
        if (overrideProducts) {
            return overrideProducts;
        }

        // ۳) وگرنه بر اساس دسته‌بندی فیلتر کن
        let result = allProducts;
        if (selectedSlug && selectedSlug !== 'products') {
            result = result.filter(p => p.categorySlug === selectedSlug);
        }
        return result;
    }, [allProducts, overrideProducts, selectedSlug, search]);


    // Sync displayedProducts
    useEffect(() => {
        setDisplayedProducts(filteredProducts);
    }, [filteredProducts]);

    // Debounced fuzzy suggestions
    useEffect(() => {
        clearTimeout(searchTimeoutRef.current);
        if (!search.trim()) {
            setFuzzySuggestions([]);
            return;
        }
        searchTimeoutRef.current = setTimeout(() => {
            if (fuseRef.current) {
                const items = fuseRef.current.search(search, {limit: 5}).map(r => r.item);
                setFuzzySuggestions(items);
            }
        }, DEBOUNCE_DELAY);
        return () => clearTimeout(searchTimeoutRef.current);
    }, [search]);

    // Handlers
    const handleSearchClear = useCallback(() => {
        setSearch('');
        setOverrideProducts(null);
        setFuzzySuggestions([]);
        searchInputRef.current?.focus();
    }, []);

    const handleKeyPress = useCallback(e => {
        setCapsLockOn(e.getModifierState('CapsLock'));
    }, []);

    const handleSuggestionClick = useCallback(item => {
        setOverrideProducts([item]);
        setSearch('');
        setFuzzySuggestions([]);
    }, []);

    const toggleDropdown = useCallback(key => {
        setDropdownOpen(prev => ({...prev, [key]: !prev[key]}));
    }, []);

    const handleCategoryClick = useCallback(() => {
        setSearch('');
        setOverrideProducts(null);
        setFuzzySuggestions([]);
    }, []);

    // Pagination logic
    const pageCount = Math.ceil(displayedProducts.length / ITEMS_PER_PAGE);
    const paginatedItems = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return displayedProducts.slice(start, start + ITEMS_PER_PAGE);
    }, [displayedProducts, currentPage]);

    const productCards = useMemo(
        () => paginatedItems.map(p => <ProductCard key={p.id} product={p}/>),
        [paginatedItems]
    );

    return (
        <section
            id="products"
            dir="rtl"
            className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white pt-12"
        >
            {/* Offline Indicator */}
            {!isOnline && (
                <div className="fixed top-0 inset-x-0 bg-orange-500 text-white p-4 text-center z-50">
                    <AlertTriangle className="inline-block mr-2" size={20}/>
                    اتصال اینترنت شما قطع است. لطفاً اتصال خود را بررسی کنید.
                </div>
            )}

            {/* Header / Hero */}
            <div className="py-20 px-4 text-center">
                <h1 className="text-4xl font-DimaYekanBold md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 mb-6">
                    محصولات میهن یدک
                </h1>
                <p className="text-lg max-w-2xl mx-auto text-slate-700 dark:text-slate-300">
                    اینجا می‌تونی همهٔ محصولات خودت رو ببینی، جستجو و فیلتر کنی.
                </p>
            </div>
            <div className="w-full h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 shadow-md"/>

            {/* Mobile Search & Categories */}
            <div className="lg:hidden px-4 space-y-4 my-8">
                {/* Search Input */}
                <div className="relative">
                    <input
                        ref={searchInputRef}
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        onKeyDown={handleKeyPress}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        placeholder="جستجو..."
                        className="w-full p-2 pl-10 pr-10 rounded-lg bg-orange-50 dark:bg-slate-700 border border-orange-400 dark:border-orange-500 text-slate-900 dark:text-white"
                    />
                    <Search className="absolute right-3 top-2.5 text-orange-500" size={20}/>
                    {search && (
                        <XCircle
                            className="absolute left-3 top-2.5 text-red-500 cursor-pointer"
                            size={20}
                            onClick={handleSearchClear}
                        />
                    )}
                </div>

                {/* Caps Lock Warning */}
                {capsLockOn && isSearchFocused && (
                    <div className="flex items-center text-yellow-600 dark:text-yellow-400 text-sm">
                        <AlertTriangle size={16}/>
                        <span className="mr-2">کلید Caps Lock روشن است</span>
                    </div>
                )}

                {/* No Results */}
                {search.trim() && displayedProducts.length === 0 && (
                    <div
                        className="w-full text-center py-4 px-3 bg-gradient-to-br from-orange-100 to-white dark:from-slate-800 dark:to-slate-900 border border-red-400 dark:border-red-500 rounded-xl">
                        <p className="text-red-500 mb-2">محصولی یافت نشد</p>
                    </div>
                )}

                {/* Fuzzy Suggestions */}
                {fuzzySuggestions.length > 0 && (
                    <div className="bg-orange-100 dark:bg-slate-700 rounded-md p-2 text-sm max-h-48 overflow-y-auto">
                        <p className="mb-1 text-orange-600 dark:text-orange-400">
                            آیا منظور شما این موارد است؟
                        </p>
                        <ul>
                            {fuzzySuggestions.map((item, idx) => (
                                <li
                                    key={idx}
                                    onMouseDown={() => handleSuggestionClick(item)}
                                    className="cursor-pointer hover:text-orange-500 dark:hover:text-orange-300"
                                >
                                    {item.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Categories Dropdown */}
                <div className="bg-orange-100 dark:bg-slate-800 border rounded-xl overflow-hidden">
                    <button
                        onClick={() => toggleDropdown('categories')}
                        className="w-full px-4 py-3 flex justify-between items-center text-orange-600 dark:text-orange-400 font-semibold"
                        aria-expanded={dropdownOpen.categories}
                    >
                        دسته‌بندی‌ها
                        <ChevronDown
                            className={`transition-transform ${
                                dropdownOpen.categories ? 'rotate-180' : 'rotate-0'
                            }`}
                        />
                    </button>
                    {dropdownOpen.categories && (
                        <ul className="p-4 space-y-3 border-t border-orange-300 dark:border-slate-600 max-h-48 overflow-y-auto">
                            {categories.map(cat => (
                                <li key={cat.slug}>
                                    <Link
                                        href={`/products?category=${cat.slug}#products`}
                                        onClick={handleCategoryClick}
                                        className={`block p-2 rounded-lg ${
                                            selectedSlug === cat.slug
                                                ? 'bg-orange-300 dark:bg-orange-700 font-bold'
                                                : 'hover:bg-orange-200 dark:hover:bg-slate-700'
                                        }`}
                                    >
                                        {cat.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Desktop Sidebar & Main */}
            <div className="container mx-auto px-4 py-10 lg:flex lg:gap-8">
                {/* Sidebar */}
                <aside
                    className="hidden lg:block lg:w-1/4 sticky top-24 bg-orange-100 dark:bg-slate-800 p-6 rounded-2xl max-h-[calc(100vh-6rem)] overflow-y-auto space-y-6">
                    {/* Search Section */}
                    <div>
                        <h2 className="text-xl font-bold text-orange-600 dark:text-orange-500 mb-4">
                            جستجوی محصول
                        </h2>
                        <div className="relative">
                            <input
                                ref={searchInputRef}
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                onKeyDown={handleKeyPress}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setIsSearchFocused(false)}
                                placeholder="جستجو..."
                                className="w-full p-2 pl-10 pr-10 rounded-lg bg-orange-50 dark:bg-slate-700 border border-orange-400 dark:border-orange-500 text-slate-900 dark:text-white"
                            />
                            <Search className="absolute right-3 top-2.5 text-orange-500" size={20}/>
                            {search && (
                                <XCircle
                                    className="absolute left-3 top-2.5 text-red-500 cursor-pointer"
                                    size={20}
                                    onClick={handleSearchClear}
                                />
                            )}
                        </div>
                        {capsLockOn && isSearchFocused && (
                            <div className="mt-2 flex items-center text-yellow-600 dark:text-yellow-400 text-sm">
                                <AlertTriangle size={16}/>
                                <span className="ml-2">کلید Caps Lock روشن است</span>
                            </div>
                        )}
                        {search.trim() && displayedProducts.length === 0 && (
                            <div className="mt-2 text-red-500 text-sm">محصولی یافت نشد</div>
                        )}
                        {fuzzySuggestions.length > 0 && (
                            <div
                                className="bg-orange-100 dark:bg-slate-700 rounded-md p-2 text-sm max-h-48 overflow-y-auto">
                                <p className="mb-1 text-orange-600 dark:text-orange-400">
                                    آیا منظور شما این موارد است؟
                                </p>
                                <ul>
                                    {fuzzySuggestions.map((item, idx) => (
                                        <li
                                            key={idx}
                                            onMouseDown={() => handleSuggestionClick(item)}
                                            className="cursor-pointer hover:text-orange-500 dark:hover:text-orange-300"
                                        >
                                            {item.title}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Categories Section */}
                    <div>
                        <h2 className="text-xl font-bold text-orange-600 dark:text-orange-500 mb-4">
                            دسته‌بندی محصولات
                        </h2>
                        <ul className="space-y-3">
                            {categories.map(cat => (
                                <li key={cat.slug}>
                                    <Link
                                        href={`/products?category=${cat.slug}#products`}
                                        onClick={handleCategoryClick}
                                        className={`block p-2 rounded-lg ${
                                            selectedSlug === cat.slug
                                                ? 'bg-orange-300 dark:bg-orange-500 font-bold'
                                                : 'hover:bg-orange-200 dark:hover:bg-slate-700'
                                        }`}
                                    >
                                        {cat.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="w-full lg:w-3/4 mt-10 lg:mt-0 px-2 flex flex-col">
                    {loading ? (
                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 flex-grow">
                            {Array.from({length: ITEMS_PER_PAGE}).map((_, i) => (
                                <ProductSkeletonCard key={i}/>
                            ))}
                        </div>
                    ) : search.trim() && !displayedProducts.length ? (
                        /* No Results View */
                        <div
                            className="w-full text-center py-12 px-6 bg-gradient-to-br from-orange-100 to-white dark:from-slate-800 dark:to-slate-900 border border-red-400 dark:border-red-500 rounded-xl shadow-xl animate-fadeIn flex-grow">
                            <AlertTriangle
                                className="mx-auto mb-6 text-red-400 dark:text-red-500 animate-bounce"
                                size={48}
                            />
                            <h2 className="text-2xl font-bold text-red-400 mb-2">محصولی یافت نشد</h2>
                            <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                                لطفاً عبارت را بررسی کنید یا از پیشنهادات زیر استفاده کنید.
                            </p>
                            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {fuzzySuggestions.map((item, idx) => (
                                    <li
                                        key={idx}
                                        onClick={() => handleSuggestionClick(item)}
                                        className="bg-orange-100 dark:bg-slate-700 hover:bg-orange-400 text-slate-900 dark:text-white hover:text-white cursor-pointer px-4 py-2 rounded-lg transition text-sm"
                                    >
                                        {item.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="flex flex-col flex-grow">
                            <div
                                className={`grid gap-6 ${
                                    paginatedItems.length < 3
                                        ? 'grid-cols-1 sm:grid-cols-2 place-items-center'
                                        : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
                                }`}
                            >
                                {productCards}
                            </div>

                            {pageCount > 1 && (
                                <div className="mt-auto py-6 bg-white dark:bg-slate-900">
                                    <div dir="ltr" className="flex justify-center">
                                        <Pagination
                                            count={pageCount}
                                            page={currentPage}
                                            onChange={(_, page) => setCurrentPage(page)}
                                            size="large"
                                            variant="outlined"
                                            shape="rounded"
                                            sx={theme => ({
                                                '& .MuiPaginationItem-root': {
                                                    fontSize: '1.1rem',
                                                    minWidth: '2.5rem',
                                                    minHeight: '2.5rem',
                                                    color: theme.palette.mode === 'dark' ? '#fbbf24' : '#f97316'
                                                },
                                                '& .MuiPaginationItem-root:hover': {
                                                    backgroundColor: theme.palette.mode === 'dark' ? '#92400e' : '#fdba74'
                                                },
                                                '& .Mui-selected': {
                                                    backgroundColor: '#ea580c',
                                                    color: '#fff',
                                                    '&:hover': {backgroundColor: '#c2410c'}
                                                }
                                            })}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </section>
    );
}

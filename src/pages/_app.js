// ── /src/pages/_app.js ──
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ThemeProvider } from "next-themes";
import { ProductProvider } from '../../lib/ProductContext';

// ⚠️ حتماً این را اضافه کنید:
import { LocaleProvider } from "../../lib/localeContext";


function MyApp({ Component, pageProps }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        // ✨ اینجا LocaleProvider را برای تمام صفحات بپیچانید
        <LocaleProvider>
            <ProductProvider>

                <QueryClientProvider client={queryClient}>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                        <Component {...pageProps} />
                    </ThemeProvider>
                </QueryClientProvider>
            </ProductProvider>
        </LocaleProvider>
    );
}

export default MyApp;

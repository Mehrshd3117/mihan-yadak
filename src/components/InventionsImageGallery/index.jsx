// import { useState, useRef, useEffect, useCallback, useMemo } from "react";
// import Image from "next/image";
// import {
//   X as CloseIcon,
//   ZoomIn,
//   ZoomOut,
//   RotateCw,
//   Lightbulb,
// } from "lucide-react";
// import Pagination from "@mui/material/Pagination";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import { useMediaQuery } from "@mui/material";

// const colorClasses = {
//   red: "bg-red-500 hover:bg-red-600",
//   blue: "bg-blue-500 hover:bg-blue-600",
//   gray: "bg-gray-500 hover:bg-gray-600",
// };

// // کامپوننت معمولی بدون useCallback
// const IconButton = ({ onClick, children, color = "gray", title }) => (
//   <button
//     onClick={onClick}
//     className={`w-9 h-9 flex items-center justify-center rounded-full text-white shadow-md ${colorClasses[color]}`}
//     title={title}
//     type="button"
//   >
//     {children}
//   </button>
// );

// const InventionsImageGallery = ({ gallery }) => {
//   const [selected, setSelected] = useState(null);
//   const [zoom, setZoom] = useState(1);
//   const [dragging, setDragging] = useState(false);
//   const [offset, setOffset] = useState({ x: 0, y: 0 });
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 3;
//   const startPos = useRef({ x: 0, y: 0 });

//   const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

//   const paginatedGallery = useMemo(
//     () => gallery?.slice((page - 1) * itemsPerPage, page * itemsPerPage),
//     [gallery, page]
//   );

//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//   const zoomIn = useCallback(
//     () => setZoom((prev) => Math.min(prev + 0.2, 3)),
//     []
//   );
//   const zoomOut = useCallback(
//     () => setZoom((prev) => Math.max(prev - 0.2, 0.5)),
//     []
//   );
//   const resetZoom = useCallback(() => {
//     setZoom(1);
//     setOffset({ x: 0, y: 0 });
//   }, []);

//   const handleMouseDown = useCallback(
//     (e) => {
//       e.preventDefault();
//       setDragging(true);
//       startPos.current = {
//         x: e.clientX - offset.x,
//         y: e.clientY - offset.y,
//       };
//     },
//     [offset]
//   );

//   useEffect(() => {
//     if (!dragging) return;

//     const handleMouseMove = (e) => {
//       setOffset({
//         x: e.clientX - startPos.current.x,
//         y: e.clientY - startPos.current.y,
//       });
//     };

//     const handleMouseUp = () => setDragging(false);

//     window.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("mouseup", handleMouseUp);

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, [dragging]);

//   const handleWheel = useCallback((e) => {
//     e.preventDefault();
//     const delta = e.deltaY > 0 ? -0.1 : 0.1;
//     setZoom((prev) => Math.min(Math.max(prev + delta, 0.5), 3));
//   }, []);

//   const handlePageChange = useCallback((event, value) => {
//     setPage(value);
//   }, []);

//   useEffect(() => {
//     if (selected) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }
//   }, [selected]);

//   useEffect(() => {
//     const header = document.getElementById("site-header");
//     if (!header) return;

//     header.style.display = selected ? "none" : "";
//   }, [selected]);

//   const muiTheme = useMemo(
//     () =>
//       createTheme({
//         direction: "rtl",
//         palette: {
//           mode: isDarkMode ? "dark" : "light",
//           primary: { main: "#f97316" },
//           background: { paper: isDarkMode ? "#1f2937" : "#f9fafb" },
//         },
//         components: {
//           MuiPaginationItem: {
//             styleOverrides: {
//               root: {
//                 color: isDarkMode ? "#d1d5db" : "#4b5563",
//                 backgroundColor: isDarkMode ? "#374151" : "#f3f4f6",
//                 border: `1px solid ${isDarkMode ? "#4b5563" : "#e5e7eb"}`,
//                 "&.Mui-selected": {
//                   backgroundColor: "#f97316",
//                   color: "#fff",
//                   borderColor: "#f97316",
//                   "&:hover": { backgroundColor: "#ea580c" },
//                 },
//                 "&:hover": {
//                   backgroundColor: isDarkMode ? "#4b5563" : "#e5e7eb",
//                 },
//               },
//               previousNext: {
//                 backgroundColor: isDarkMode ? "#4b5563" : "#e5e7eb",
//                 "&:hover": {
//                   backgroundColor: isDarkMode ? "#6b7280" : "#d1d5db",
//                 },
//               },
//             },
//           },
//         },
//       }),
//     [isDarkMode]
//   );

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-gray-100 dark:bg-slate-900 p-6 md:p-20">
//       <div className="absolute inset-0 z-0" />

//       <div className="relative z-10 mb-20 max-w-6xl mx-auto">
//         <div className="relative bg-white dark:bg-slate-800 border border-orange-400 rounded-3xl shadow-xl p-10 md:p-16 text-center z-10">
//           <div className="inline-flex items-center justify-center gap-3 mb-9">
//             <Lightbulb className="text-orange-500 w-8 h-8" />
//             <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
//               اختراعات ثبت‌ شده
//             </h2>
//           </div>
//           <div className="flex justify-center">
//             <div className="origin-center w-28 h-1 bg-orange-500 rounded-full mb-4 basis-full" />
//           </div>
//           <p className="text-slate-900 dark:text-gray-300 text-sm sm:text-base">
//             نگاهی بیندازید به اختراعات نوآورانه شرکت میهن یدک گرمسار
//           </p>
//         </div>
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto mt-10">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-20">
//           {paginatedGallery?.map(({ id, image, title }) => (
//             <div
//               key={id}
//               className="group cursor-pointer"
//               onClick={() => {
//                 setSelected({ id, image, title });
//                 resetZoom();
//               }}
//               tabIndex={0}
//               role="button"
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" || e.key === " ") {
//                   setSelected({ id, image, title });
//                   resetZoom();
//                 }
//               }}
//             >
//               <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
//                 <div className="relative w-full h-[400px]">
//                   <Image
//                     src={`${apiUrl}${image}`}
//                     alt={title}
//                     fill
//                     sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                     className="object-cover transition group-hover:scale-105"
//                     loading={id === gallery[0].id ? "eager" : "lazy"} // فقط اولین عکس eager باشه
//                   />
//                 </div>
//                 <div className="p-4">
//                   <h2 className="text-lg font-semibold text-black dark:text-white group-hover:text-orange-500 transition">
//                     {title}
//                   </h2>
//                   <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                     برای مشاهده بزرگ کلیک کنید
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {gallery?.length > itemsPerPage && (
//           <div className="flex justify-center mt-12">
//             <ThemeProvider theme={muiTheme}>
//               <div dir="rtl">
//                 <Pagination
//                   count={Math.ceil(gallery.length / itemsPerPage)}
//                   page={page}
//                   onChange={handlePageChange}
//                   color="primary"
//                   size="large"
//                   sx={{
//                     "& .MuiPagination-ul": {
//                       justifyContent: "center",
//                       gap: "6px",
//                     },
//                   }}
//                 />
//               </div>
//             </ThemeProvider>
//           </div>
//         )}

//         {selected && (
//           <div
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//             onWheel={handleWheel}
//             onMouseDown={handleMouseDown}
//             role="dialog"
//             aria-modal="true"
//             aria-labelledby="modal-title"
//           >
//             <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-5xl w-full overflow-hidden relative scale-100 transition-transform duration-300 ease-in-out">
//               <div className="absolute top-3 left-3 flex gap-2 z-10">
//                 <IconButton
//                   onClick={() => setSelected(null)}
//                   color="red"
//                   title="بستن"
//                 >
//                   <CloseIcon size={18} />
//                 </IconButton>
//                 <IconButton onClick={zoomIn} color="blue" title="زوم +">
//                   <ZoomIn size={18} />
//                 </IconButton>
//                 <IconButton onClick={zoomOut} color="blue" title="زوم -">
//                   <ZoomOut size={18} />
//                 </IconButton>
//                 <IconButton onClick={resetZoom} color="gray" title="ریست">
//                   <RotateCw size={18} />
//                 </IconButton>
//               </div>

//               <div className="relative flex items-center justify-center max-h-[80vh] overflow-hidden cursor-grab active:cursor-grabbing">
//                 <div
//                   className="max-w-full max-h-[80vh]"
//                   style={{
//                     transform: `scale(${zoom}) translate(${offset.x}px, ${offset.y}px)`,
//                     transition: dragging ? "none" : "transform 0.3s ease",
//                     willChange: "transform",
//                   }}
//                 >
//                   <Image
//                     src={`${apiUrl}${selected.image}`}
//                     alt={selected.title}
//                     width={1200}
//                     height={800}
//                     className="max-w-full max-h-[80vh] w-auto h-auto mx-auto"
//                     priority
//                     draggable={false}
//                     loading="eager"
//                   />
//                 </div>
//               </div>

//               <div className="p-4 text-center">
//                 <h2
//                   id="modal-title"
//                   className="text-xl font-semibold text-gray-800 dark:text-gray-100"
//                 >
//                   {selected.title}
//                 </h2>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InventionsImageGallery;

//این کار میکنههههه

// import { useState, useRef, useEffect, useCallback, useMemo } from "react";
// import Image from "next/image";
// import {
//   X as CloseIcon,
//   ZoomIn,
//   ZoomOut,
//   RotateCw,
//   Lightbulb,
// } from "lucide-react";
// import Pagination from "@mui/material/Pagination";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import { useMediaQuery } from "@mui/material";
// import { useLocale } from "../../../lib/localeContext";

// const colorClasses = {
//   red: "bg-red-500 hover:bg-red-600",
//   blue: "bg-blue-500 hover:bg-blue-600",
//   gray: "bg-gray-500 hover:bg-gray-600",
// };

// const IconButton = ({ onClick, children, color = "gray", titleKey }) => {
//   const { t } = useLocale();

//   return (
//     <button
//       onClick={onClick}
//       className={`w-9 h-9 flex items-center justify-center rounded-full text-white shadow-md ${colorClasses[color]}`}
//       title={t(titleKey)}
//       type="button"
//     >
//       {children}
//     </button>
//   );
// };

// const InventionsImageGallery = ({ gallery }) => {
//   const { t } = useLocale();
//   const [selected, setSelected] = useState(null);
//   const [zoom, setZoom] = useState(1);
//   const [dragging, setDragging] = useState(false);
//   const [offset, setOffset] = useState({ x: 0, y: 0 });
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 3;
//   const startPos = useRef({ x: 0, y: 0 });

//   const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

//   const paginatedGallery = useMemo(
//     () => gallery?.slice((page - 1) * itemsPerPage, page * itemsPerPage) || [],
//     [gallery, page]
//   );

//   const zoomIn = useCallback(() => setZoom((prev) => Math.min(prev + 0.2, 3)), []);
//   const zoomOut = useCallback(() => setZoom((prev) => Math.max(prev - 0.2, 0.5)), []);
//   const resetZoom = useCallback(() => {
//     setZoom(1);
//     setOffset({ x: 0, y: 0 });
//   }, []);

//   const handleMouseDown = useCallback(
//     (e) => {
//       e.preventDefault();
//       setDragging(true);
//       startPos.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
//     },
//     [offset]
//   );

//   useEffect(() => {
//     if (!dragging) return;

//     const handleMouseMove = (e) => {
//       setOffset({
//         x: e.clientX - startPos.current.x,
//         y: e.clientY - startPos.current.y,
//       });
//     };

//     const handleMouseUp = () => setDragging(false);

//     window.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("mouseup", handleMouseUp);

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, [dragging]);

//   const handleWheel = useCallback((e) => {
//     e.preventDefault();
//     const delta = e.deltaY > 0 ? -0.1 : 0.1;
//     setZoom((prev) => Math.min(Math.max(prev + delta, 0.5), 3));
//   }, []);

//   const handlePageChange = useCallback((event, value) => {
//     setPage(value);
//   }, []);

//   useEffect(() => {
//     if (selected) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }
//   }, [selected]);

//   useEffect(() => {
//     const header = document.getElementById("site-header");
//     if (!header) return;

//     header.style.display = selected ? "none" : "";
//   }, [selected]);

//   const muiTheme = useMemo(
//     () =>
//       createTheme({
//         direction: "rtl",
//         palette: {
//           mode: isDarkMode ? "dark" : "light",
//           primary: { main: "#f97316" },
//           background: { paper: isDarkMode ? "#1f2937" : "#f9fafb" },
//         },
//         components: {
//           MuiPaginationItem: {
//             styleOverrides: {
//               root: {
//                 color: isDarkMode ? "#d1d5db" : "#4b5563",
//                 backgroundColor: isDarkMode ? "#374151" : "#f3f4f6",
//                 border: `1px solid ${isDarkMode ? "#4b5563" : "#e5e7eb"}`,
//                 "&.Mui-selected": {
//                   backgroundColor: "#f97316",
//                   color: "#fff",
//                   borderColor: "#f97316",
//                   "&:hover": { backgroundColor: "#ea580c" },
//                 },
//                 "&:hover": {
//                   backgroundColor: isDarkMode ? "#4b5563" : "#e5e7eb",
//                 },
//               },
//               previousNext: {
//                 backgroundColor: isDarkMode ? "#4b5563" : "#e5e7eb",
//                 "&:hover": {
//                   backgroundColor: isDarkMode ? "#6b7280" : "#d1d5db",
//                 },
//               },
//             },
//           },
//         },
//       }),
//     [isDarkMode]
//   );

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-gray-100 dark:bg-slate-900 p-6 md:p-20">
//       <div className="absolute inset-0 z-0" />

//       <div className="relative z-10 mb-20 max-w-6xl mx-auto">
//         <div className="relative bg-white dark:bg-slate-800 border border-orange-400 rounded-3xl shadow-xl p-10 md:p-16 text-center z-10">
//           <div className="inline-flex items-center justify-center gap-3 mb-9">
//             <Lightbulb className="text-orange-500 w-8 h-8" />
//             <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
//               {t("inventions.registered_inventions")}
//             </h2>
//           </div>
//           <div className="flex justify-center">
//             <div className="origin-center w-28 h-1 bg-orange-500 rounded-full mb-4 basis-full" />
//           </div>
//           <p className="text-slate-900 dark:text-gray-300 text-sm sm:text-base">
//             {t("inventions.view_inventions")}
//           </p>
//         </div>
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto mt-10">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-20">
//           {paginatedGallery.map(({ id, image, title }) => (
//             <div
//               key={id}
//               className="group cursor-pointer"
//               onClick={() => {
//                 setSelected({ id, image, title });
//                 resetZoom();
//               }}
//               tabIndex={0}
//               role="button"
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" || e.key === " ") {
//                   setSelected({ id, image, title });
//                   resetZoom();
//                 }
//               }}
//             >
//               <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
//                 <div className="relative w-full h-[400px]">
//                   <Image
//                     src={image} // مستقیم از public
//                     alt={title}
//                     fill
//                     sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                     className="object-cover transition group-hover:scale-105"
//                     loading={id === gallery[0]?.id ? "eager" : "lazy"}
//                   />
//                 </div>
//                 <div className="p-4">
//                   <h2 className="text-lg font-semibold text-black dark:text-white group-hover:text-orange-500 transition">
//                     {title}
//                   </h2>
//                   <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                     {t("inventions.click_to_view_larger")}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {gallery?.length > itemsPerPage && (
//           <div className="flex justify-center mt-12">
//             <ThemeProvider theme={muiTheme}>
//               <div dir="rtl">
//                 <Pagination
//                   count={Math.ceil(gallery.length / itemsPerPage)}
//                   page={page}
//                   onChange={handlePageChange}
//                   color="primary"
//                   size="large"
//                   sx={{
//                     "& .MuiPagination-ul": {
//                       justifyContent: "center",
//                       gap: "6px",
//                     },
//                   }}
//                 />
//               </div>
//             </ThemeProvider>
//           </div>
//         )}

//         {selected && (
//           <div
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//             onWheel={handleWheel}
//             onMouseDown={handleMouseDown}
//             role="dialog"
//             aria-modal="true"
//             aria-labelledby="modal-title"
//           >
//             <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-5xl w-full overflow-hidden relative scale-100 transition-transform duration-300 ease-in-out">
//               <div className="absolute top-3 left-3 flex gap-2 z-10">
//                 <IconButton
//                   onClick={() => setSelected(null)}
//                   color="red"
//                   titleKey="inventions.close"
//                 >
//                   <CloseIcon size={18} />
//                 </IconButton>
//                 <IconButton onClick={zoomIn} color="blue" titleKey="inventions.zoom_in">
//                   <ZoomIn size={18} />
//                 </IconButton>
//                 <IconButton onClick={zoomOut} color="blue" titleKey="inventions.zoom_out">
//                   <ZoomOut size={18} />
//                 </IconButton>
//                 <IconButton onClick={resetZoom} color="gray" titleKey="inventions.reset">
//                   <RotateCw size={18} />
//                 </IconButton>
//               </div>

//               <div className="relative flex items-center justify-center max-h-[80vh] overflow-hidden cursor-grab active:cursor-grabbing">
//                 <div
//                   className="max-w-full max-h-[80vh]"
//                   style={{
//                     transform: `scale(${zoom}) translate(${offset.x}px, ${offset.y}px)`,
//                     transition: dragging ? "none" : "transform 0.3s ease",
//                     willChange: "transform",
//                   }}
//                 >
//                   <Image
//                     src={selected.image} // مستقیم از public
//                     alt={selected.title}
//                     width={1200}
//                     height={800}
//                     className="max-w-full max-h-[80vh] w-auto h-auto mx-auto"
//                     priority
//                     draggable={false}
//                     loading="eager"
//                   />
//                 </div>
//               </div>

//               <div className="p-4 text-center">
//                 <h2
//                   id="modal-title"
//                   className="text-xl font-semibold text-gray-800 dark:text-gray-100"
//                 >
//                   {selected.title}
//                 </h2>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InventionsImageGallery;



// components/InventionsImageGallery/index.jsx



// import { useState, useRef, useEffect, useCallback, useMemo } from "react";
// import Image from "next/image";
// import {
//   X as CloseIcon,
//   ZoomIn,
//   ZoomOut,
//   RotateCw,
//   Lightbulb,
// } from "lucide-react";
// import Pagination from "@mui/material/Pagination";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import { useLocale } from "../../../lib/localeContext";

// const colorClasses = {
//   red: "bg-red-500 hover:bg-red-600",
//   blue: "bg-blue-500 hover:bg-blue-600",
//   gray: "bg-gray-500 hover:bg-gray-600",
// };

// const IconButton = ({ onClick, children, color = "gray", titleKey }) => {
//   const { t } = useLocale();
//   return (
//     <button
//       onClick={onClick}
//       className={`w-9 h-9 flex items-center justify-center rounded-full text-white shadow-md ${colorClasses[color]}`}
//       title={t(titleKey)}
//       type="button"
//     >
//       {children}
//     </button>
//   );
// };

// const InventionsImageGallery = ({ gallery = [] }) => {
//   const { t } = useLocale();
//   const [selected, setSelected] = useState(null);
//   const [zoom, setZoom] = useState(1);
//   const [dragging, setDragging] = useState(false);
//   const [offset, setOffset] = useState({ x: 0, y: 0 });
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 3;
//   const startPos = useRef({ x: 0, y: 0 });

//   console.log("دریافت‌شده gallery:", gallery);

//   const paginatedGallery = useMemo(
//     () => gallery.slice((page - 1) * itemsPerPage, page * itemsPerPage),
//     [gallery, page]
//   );

//   console.log("گالری صفحه‌بندی‌شده:", paginatedGallery);

//   const zoomIn   = useCallback(() => setZoom(p => Math.min(p + 0.2, 3)), []);
//   const zoomOut  = useCallback(() => setZoom(p => Math.max(p - 0.2, 0.5)), []);
//   const resetZoom = useCallback(() => {
//     setZoom(1);
//     setOffset({ x: 0, y: 0 });
//   }, []);

//   const handleMouseDown = useCallback((e) => {
//     e.preventDefault();
//     setDragging(true);
//     startPos.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
//   }, [offset]);

//   useEffect(() => {
//     if (!dragging) return;
//     const handleMouseMove = e => {
//       setOffset({
//         x: e.clientX - startPos.current.x,
//         y: e.clientY - startPos.current.y,
//       });
//     };
//     const handleMouseUp = () => setDragging(false);
//     window.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("mouseup", handleMouseUp);
//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, [dragging]);

//   const handleWheel = useCallback((e) => {
//     e.preventDefault();
//     const delta = e.deltaY > 0 ? -0.1 : 0.1;
//     setZoom(p => Math.min(Math.max(p + delta, 0.5), 3));
//   }, []);

//   const handlePageChange = useCallback((e, value) => {
//     setPage(value);
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = selected ? "hidden" : "";
//   }, [selected]);

//   useEffect(() => {
//     const header = document.getElementById("site-header");
//     if (!header) return;
//     header.style.display = selected ? "none" : "";
//   }, [selected]);

//   const muiTheme = createTheme({
//     direction: "rtl",
//     palette: {
//       mode: "light",
//       primary: { main: "#f97316" },
//       background: { paper: "#f9fafb" },
//     },
//     components: {
//       MuiPaginationItem: {
//         styleOverrides: {
//           root: {
//             color: "#4b5563",
//             backgroundColor: "#f3f4f6",
//             border: "1px solid #e5e7eb",
//             "&.Mui-selected": {
//               backgroundColor: "#f97316",
//               color: "#fff",
//               borderColor: "#f97316",
//               "&:hover": { backgroundColor: "#ea580c" },
//             },
//             "&:hover": { backgroundColor: "#e5e7eb" },
//           },
//           previousNext: {
//             backgroundColor: "#e5e7eb",
//             "&:hover": { backgroundColor: "#d1d5db" },
//           },
//         },
//       },
//     },
//   });

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-gray-100 dark:bg-slate-900 p-6 md:p-20">
//       <div className="relative z-10 mb-20 max-w-6xl mx-auto">
//         <div className="relative bg-white dark:bg-slate-800 border border-orange-400 rounded-3xl shadow-xl p-10 md:p-16 text-center z-10">
//           <div className="inline-flex items-center justify-center gap-3 mb-9">
//             <Lightbulb className="text-orange-500 w-8 h-8" />
//             <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
//               {t("inventions.registered_inventions")}
//             </h2>
//           </div>
//           <div className="flex justify-center">
//             <div className="origin-center w-28 h-1 bg-orange-500 rounded-full mb-4 basis-full" />
//           </div>
//           <p className="text-slate-900 dark:text-gray-300 text-sm sm:text-base">
//             {t("inventions.view_inventions")}
//           </p>
//         </div>
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto mt-10">
//         {paginatedGallery.length === 0 ? (
//           <p className="text-center text-red-500">
//             هیچ داده‌ای برای نمایش وجود ندارد
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-20">
//             {paginatedGallery.map(({ id, image, title }) => (
//               <div
//                 key={id}
//                 className="group cursor-pointer"
//                 onClick={() => { setSelected({ id, image, title }); resetZoom(); }}
//                 tabIndex={0}
//                 role="button"
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" || e.key === " ") {
//                     setSelected({ id, image, title });
//                     resetZoom();
//                   }
//                 }}
//               >
//                 <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
//                   <div className="relative w-full h-[400px]">
//                     <Image
//                       src={image}
//                       alt={title || "No Title"}
//                       fill
//                       sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                       className="object-cover transition group-hover:scale-105"
//                       loading={id === gallery[0]?.id ? "eager" : "lazy"}
//                     />
//                   </div>
//                   <div className="p-4">
//                     <h2 className="text-lg font-semibold text-black group-hover:text-orange-500 transition">
//                       {title}
//                     </h2>
//                     <p className="text-sm text-gray-500 mt-1">
//                       {t("inventions.click_to_view_larger")}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {gallery.length > itemsPerPage && (
//           <div className="flex justify-center mt-12">
//             <ThemeProvider theme={muiTheme}>
//               <div dir="rtl">
//                 <Pagination
//                   count={Math.ceil(gallery.length / itemsPerPage)}
//                   page={page}
//                   onChange={handlePageChange}
//                   color="primary"
//                   size="large"
//                   sx={{
//                     "& .MuiPagination-ul": {
//                       justifyContent: "center",
//                       gap: "6px",
//                     },
//                   }}
//                 />
//               </div>
//             </ThemeProvider>
//           </div>
//         )}

//         {selected && (
//           <div
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//             onWheel={handleWheel}
//             onMouseDown={handleMouseDown}
//             role="dialog"
//             aria-modal="true"
//             aria-labelledby="modal-title"
//           >
//             <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full overflow-hidden relative">
//               <div className="absolute top-3 left-3 flex gap-2 z-10">
//                 <IconButton onClick={() => setSelected(null)} color="red" titleKey="inventions.close">
//                   <CloseIcon size={18} />
//                 </IconButton>
//                 <IconButton onClick={zoomIn} color="blue" titleKey="inventions.zoom_in">
//                   <ZoomIn size={18} />
//                 </IconButton>
//                 <IconButton onClick={zoomOut} color="blue" titleKey="inventions.zoom_out">
//                   <ZoomOut size={18} />
//                 </IconButton>
//                 <IconButton onClick={resetZoom} color="gray" titleKey="inventions.reset">
//                   <RotateCw size={18} />
//                 </IconButton>
//               </div>
//               <div className="relative flex items-center justify-center max-h-[80vh] overflow-hidden cursor-grab active:cursor-grabbing">
//                 <div
//                   className="max-w-full max-h-[80vh]"
//                   style={{
//                     transform: `scale(${zoom}) translate(${offset.x}px, ${offset.y}px)`,
//                     transition: dragging ? "none" : "transform 0.3s ease",
//                   }}
//                 >
//                   <Image
//                     src={selected.image}
//                     alt={selected.title || "No Title"}
//                     width={1200}
//                     height={800}
//                     className="max-w-full max-h-[80vh] w-auto h-auto mx-auto"
//                     priority
//                     draggable={false}
//                   />
//                 </div>
//               </div>
//               <div className="p-4 text-center">
//                 <h2 id="modal-title" className="text-xl font-semibold text-gray-800">
//                   {selected.title || "No Title"}
//                 </h2>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InventionsImageGallery;

// src/components/InventionsImageGallery/index.jsx
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import {
  X as CloseIcon,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Lightbulb,
} from "lucide-react";
import Pagination from "@mui/material/Pagination";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useLocale } from "../../../lib/localeContext";

const colorClasses = {
  red: "bg-red-500 hover:bg-red-600",
  blue: "bg-blue-500 hover:bg-blue-600",
  gray: "bg-gray-500 hover:bg-gray-600",
};

const IconButton = ({ onClick, children, color = "gray", titleKey }) => {
  const { t } = useLocale();
  return (
    <button
      onClick={onClick}
      className={`w-9 h-9 flex items-center justify-center rounded-full text-white shadow-md ${colorClasses[color]}`}
      title={t(titleKey)}
      type="button"
    >
      {children}
    </button>
  );
};

const InventionsImageGallery = ({ gallery = [] }) => {
  const { t } = useLocale();
  const [selected, setSelected] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;
  const startPos = useRef({ x: 0, y: 0 });

  // هر بار props.gallery تغییر کرد، page رو به ۱ برگردون
  useEffect(() => {
    setPage(1);
  }, [gallery]);

  const paginatedGallery = useMemo(
    () => gallery.slice((page - 1) * itemsPerPage, page * itemsPerPage),
    [gallery, page]
  );

  const zoomIn   = useCallback(() => setZoom(p => Math.min(p + 0.2, 3)), []);
  const zoomOut  = useCallback(() => setZoom(p => Math.max(p - 0.2, 0.5)), []);
  const resetZoom = useCallback(() => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setDragging(true);
    startPos.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
  }, [offset]);

  useEffect(() => {
    if (!dragging) return;
    const handleMouseMove = e =>
      setOffset({
        x: e.clientX - startPos.current.x,
        y: e.clientY - startPos.current.y,
      });
    const handleMouseUp = () => setDragging(false);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(p => Math.min(Math.max(p + delta, 0.5), 3));
  }, []);

  const handlePageChange = useCallback((e, value) => {
    setPage(value);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
  }, [selected]);

  useEffect(() => {
    const header = document.getElementById("site-header");
    if (header) header.style.display = selected ? "none" : "";
  }, [selected]);

  const muiTheme = createTheme({
    direction: "rtl",
    palette: {
      mode: "light",
      primary: { main: "#f97316" },
      background: { paper: "#f9fafb" },
    },
    components: {
      MuiPaginationItem: {
        styleOverrides: {
          root: {
            color: "#4b5563",
            backgroundColor: "#f3f4f6",
            border: "1px solid #e5e7eb",
            "&.Mui-selected": {
              backgroundColor: "#f97316",
              color: "#fff",
              borderColor: "#f97316",
              "&:hover": { backgroundColor: "#ea580c" },
            },
            "&:hover": { backgroundColor: "#e5e7eb" },
          },
          previousNext: {
            backgroundColor: "#e5e7eb",
            "&:hover": { backgroundColor: "#d1d5db" },
          },
        },
      },
    },
  });

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-100 dark:bg-slate-900 p-6 md:p-20">
      <div className="relative z-10 mb-20 max-w-6xl mx-auto">
        <div className="relative bg-white dark:bg-slate-800 border border-orange-400 rounded-3xl shadow-xl p-10 md:p-16 text-center z-10">
          <div className="inline-flex items-center justify-center gap-3 mb-9">
            <Lightbulb className="text-orange-500 w-8 h-8" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t("inventions.registered_inventions")}
            </h2>
          </div>
          <div className="flex justify-center">
            <div className="origin-center w-28 h-1 bg-orange-500 rounded-full mb-4 basis-full" />
          </div>
          <p className="text-slate-900 dark:text-gray-300 text-sm sm:text-base">
            {t("inventions.view_inventions")}
          </p>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto mt-10">
        {paginatedGallery.length === 0 ? (
          <p className="text-center text-red-500">
            هیچ داده‌ای برای نمایش وجود ندارد
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-20">
            {paginatedGallery.map(({ id, image, title }) => (
              <div
                key={id}
                className="group cursor-pointer"
                onClick={() => { setSelected({ id, image, title }); resetZoom(); }}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelected({ id, image, title });
                    resetZoom();
                  }
                }}
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
                  <div className="relative w-full h-[400px]">
                    <Image
                      src={image}
                      alt={title || "No Title"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition group-hover:scale-105"
                      loading={id === gallery[0]?.id ? "eager" : "lazy"}
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-black group-hover:text-orange-500 transition">
                      {title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {t("inventions.click_to_view_larger")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {gallery.length > itemsPerPage && (
          <div className="flex justify-center mt-12">
            <ThemeProvider theme={muiTheme}>
              <div dir="rtl">
                <Pagination
                  count={Math.ceil(gallery.length / itemsPerPage)}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  sx={{
                    "& .MuiPagination-ul": {
                      justifyContent: "center",
                      gap: "6px",
                    },
                  }}
                />
              </div>
            </ThemeProvider>
          </div>
        )}

        {selected && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full overflow-hidden relative">
              <div className="absolute top-3 left-3 flex gap-2 z-10">
                <IconButton onClick={() => setSelected(null)} color="red" titleKey="inventions.close">
                  <CloseIcon size={18} />
                </IconButton>
                <IconButton onClick={zoomIn} color="blue" titleKey="inventions.zoom_in">
                  <ZoomIn size={18} />
                </IconButton>
                <IconButton onClick={zoomOut} color="blue" titleKey="inventions.zoom_out">
                  <ZoomOut size={18} />
                </IconButton>
                <IconButton onClick={resetZoom} color="gray" titleKey="inventions.reset">
                  <RotateCw size={18} />
                </IconButton>
              </div>
              <div className="relative flex items-center justify-center max-h-[80vh] overflow-hidden cursor-grab active:cursor-grabbing">
                <div
                  className="max-w-full max-h-[80vh]"
                  style={{
                    transform: `scale(${zoom}) translate(${offset.x}px, ${offset.y}px)`,
                    transition: dragging ? "none" : "transform 0.3s ease",
                  }}
                >
                  <Image
                    src={selected.image}
                    alt={selected.title || "No Title"}
                    width={1200}
                    height={800}
                    className="max-w-full max-h-[80vh] w-auto h-auto mx-auto"
                    priority
                    draggable={false}
                  />
                </div>
              </div>
              <div className="p-4 text-center">
                <h2 id="modal-title" className="text-xl font-semibold text-gray-800">
                  {selected.title || "No Title"}
                </h2>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventionsImageGallery;

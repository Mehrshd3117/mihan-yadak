// import { memo } from "react";
// import dynamic from "next/dynamic";
// import { FaPhoneAlt, FaFax, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
//
// const MapIframe = dynamic(() => import("./MapIframe"), {
//   ssr: false,
//   loading: () => <p className="p-6 text-center">در حال بارگذاری نقشه...</p>,
// });
// const branches = [
//     {
//         title: "دفتر مرکزی و فروش",
//         address:
//             "تهران، خیابان مولوی، نرسیده به میدان رازی، پاساژ بهمن، طبقه سوم، واحد 310",
//         phones: ["55369166"],
//         fax: null,
//     },
//     {
//         title: "فروشگاه",
//         address:
//             "تهران، خیابان مولوی، نرسیده به میدان رازی، جنب پاساژ بهمن، کوچه میخچی، پلاک 50",
//         phones: ["55399341", "55399342"],
//         fax: null,
//     },
//     {
//         title: "سمنان - گرمسار",
//         address: "سمنان، گرمسار، شهرک صنعتی",
//         phones: ["34552124", "34552300", "34552301-023"],
//         fax: "34552072 – 34552310-023",
//     },
// ];
// function EmailList() {
//   const emails = ["mihan.store1402@gmail.com", "mihanyadak1401@gmail.com"];
//   return (
//     <div className="rounded-[20px] shadow-[0_0_0_1px_#FECBA1] dark:shadow-[0_0_0_1px_#FB923C] border bg-orange-50/80 dark:bg-slate-800">
//       <div className="flex items-center gap-2 px-6 pt-6 pb-3 border-b border-orange-200 dark:border-orange-700">
//         <div className="w-1.5 h-5 bg-orange-500 rounded-full" />
//         <p className="text-orange-800 dark:text-orange-100 font-bold text-lg">
//           ایمیل‌های رسمی مجموعه
//         </p>
//       </div>
//       <div className="p-6 md:flex md:gap-6">
//         {emails.map((email) => (
//           <a
//             key={email}
//             href={`mailto:${email}`}
//             className="flex items-center gap-2 text-orange-900 dark:text-orange-100 font-bold text-base"
//           >
//             <FaEnvelope className="text-orange-500" />
//             {email}
//           </a>
//         ))}
//       </div>
//     </div>
//   );
// }
//
// const BranchCard = memo(({ branch }) => (
//   <div className="rounded-[20px] shadow-[0_0_0_1px_#FECBA1] dark:shadow-[0_0_0_1px_#FB923C] border bg-orange-50 dark:bg-slate-800">
//     <div className="flex items-center gap-2 px-6 pt-6 pb-3 border-b border-orange-200 dark:border-orange-800">
//       <div className="w-1.5 h-5 bg-orange-500 rounded-full" />
//       <p className="text-orange-800 dark:text-orange-100 font-bold text-lg">
//         {branch.title}
//       </p>
//     </div>
//     <div className="p-6 space-y-3 text-sm">
//       <div className="flex items-start gap-2 text-orange-900 dark:text-orange-100 leading-relaxed">
//         <FaMapMarkerAlt className="mt-1 text-orange-500" />
//         <p>{branch.address}</p>
//       </div>
//       {branch.phones.map((phone) => (
//         <div
//           key={phone}
//           className="flex items-center gap-2 text-orange-900 dark:text-orange-100"
//         >
//           <FaPhoneAlt className="text-orange-500" />
//           <a
//             href={`tel:${phone.replace(/-/g, "")}`}
//             className="font-bold hover:underline"
//           >
//             {phone}
//           </a>
//         </div>
//       ))}
//       {branch.fax && (
//         <div className="flex items-center gap-2 text-orange-900 dark:text-orange-100">
//           <FaFax className="text-orange-500" />
//           <span className="font-bold">{branch.fax}</span>
//         </div>
//       )}
//     </div>
//   </div>
// ));
//
// export default function ContactSection({ branches = [] }) {
//   return (
//     <>
//       <section className=" py-40 px-4 md:px-20 bg-gray-100 dark:bg-slate-900 space-y-12 text-right">
//         <div className="text-center">
//           <h2 className="font-DimaYekanBold text-4xl md:text-5xl font-bold text-slate-600 dark:text-slate-300 mb-5">
//             <span className="text-orange-500 dark:text-orange-400">
//               میهن یدک گرمسار
//             </span>{" "}
//             قلب تپنده موتور سیکلت شما!
//           </h2>
//           <p className="text-gray-600 dark:text-orange-200 text-sm md:text-base">
//             برای ارتباط با تیم میهن یدک گرمسار می‌توانید با استفاده از روش‌های
//             زیر اقدام کنید.
//           </p>
//         </div>
//
//         <hr className="border-orange-300 dark:border-orange-500" />
//         <EmailList />
//
//         <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
//           {branches.map((b) => (
//             <BranchCard key={b.title} branch={b} />
//           ))}
//
//           <MapIframe />
//         </div>
//       </section>
//     </>
//   );
// }


// components/ContactSection.jsx

import { memo } from "react";
import dynamic from "next/dynamic";
import { FaPhoneAlt, FaFax, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { useLocale } from "../../../lib/localeContext";

const MapIframe = dynamic(() => import("./MapIframe"), {
  ssr: false,
  loading: () => <p className="p-6 text-center">در حال بارگذاری نقشه...</p>,
});

function EmailList() {
  const { t } = useLocale();
  const emails = t("contact.emailList.emails"); // آرایه‌ی رشته‌ها
  const title = t("contact.emailList.title");

  return (
    <div className="rounded-[20px] shadow-[0_0_0_1px_#FECBA1] dark:shadow-[0_0_0_1px_#FB923C] border bg-orange-50/80 dark:bg-slate-800">
      <div className="flex items-center gap-2 px-6 pt-6 pb-3 border-b border-orange-200 dark:border-orange-700">
        <div className="w-1.5 h-5 bg-orange-500 rounded-full" />
        <p className="text-orange-800 dark:text-orange-100 font-bold text-lg">
          {title}
        </p>
      </div>
      <div className="p-6 md:flex md:gap-6">
        {emails.map((email) => (
          <a
            key={email}
            href={`mailto:${email}`}
            className="flex items-center gap-2 text-orange-900 dark:text-orange-100 font-bold text-base"
          >
            <FaEnvelope className="text-orange-500" />
            {email}
          </a>
        ))}
      </div>
    </div>
  );
}

const BranchCard = memo(({ branch }) => (
  <div className="rounded-[20px] shadow-[0_0_0_1px_#FECBA1] dark:shadow-[0_0_0_1px_#FB923C] border bg-orange-50 dark:bg-slate-800">
    <div className="flex items-center gap-2 px-6 pt-6 pb-3 border-b border-orange-200 dark:border-orange-800">
      <div className="w-1.5 h-5 bg-orange-500 rounded-full" />
      <p className="text-orange-800 dark:text-orange-100 font-bold text-lg">
        {branch.title}
      </p>
    </div>
    <div className="p-6 space-y-3 text-sm">
      <div className="flex items-start gap-2 text-orange-900 dark:text-orange-100 leading-relaxed">
        <FaMapMarkerAlt className="mt-1 text-orange-500" />
        <p>{branch.address}</p>
      </div>
      {branch.phones.map((phone) => (
        <div
          key={phone}
          className="flex items-center gap-2 text-orange-900 dark:text-orange-100"
        >
          <FaPhoneAlt className="text-orange-500" />
          <a
            href={`tel:${phone.replace(/-/g, "")}`}
            className="font-bold hover:underline"
          >
            {phone}
          </a>
        </div>
      ))}
      {branch.fax && (
        <div className="flex items-center gap-2 text-orange-900 dark:text-orange-100">
          <FaFax className="text-orange-500" />
          <span className="font-bold">{branch.fax}</span>
        </div>
      )}
    </div>
  </div>
));

export default function ContactSection() {
  const { t } = useLocale();

  // خواندن تمام داده‌ها از فایل ترجمه
  const { highlight, title, description } = t("contact.section");
  const branches = t("contact.branches"); // آرایه‌‌ی شیء‌های شعب

  return (
    <section className="py-40 px-4 md:px-20 bg-gray-100 dark:bg-slate-900 space-y-12 text-right">
      <div className="text-center">
        <h2 className="font-DimaYekanBold text-4xl md:text-5xl font-bold text-slate-600 dark:text-slate-300 mb-5">
          <span className="text-orange-500 dark:text-orange-400" >
            {highlight}
          </span>{" "}
          {title}
        </h2>
        <p className="text-gray-600 dark:text-orange-200 text-sm md:text-base">
          {description}
        </p>
      </div>

      <hr className="border-orange-300 dark:border-orange-500" />

      <EmailList />

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {branches.map((b) => (
          <BranchCard key={b.title} branch={b} />
        ))}
        <MapIframe />
      </div>
    </section>
  );
}

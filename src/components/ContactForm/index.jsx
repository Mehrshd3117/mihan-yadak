// // components/ContactForm.jsx
// import React, {useCallback} from "react";
// import dynamic from "next/dynamic";
// import {useForm} from "react-hook-form";
// import {zodResolver} from "@hookform/resolvers/zod";
// import {toast, Slide} from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import InputField from "./InputField.jsx";
// import TextareaField from "./TextareaField";
// import {z} from "zod";
//
// const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), {
//     ssr: false,
// });
// const ToastContainer = dynamic(
//     () =>
//         import("react-toastify").then((mod) => ({
//             default: mod.ToastContainer,
//         })),
//     {ssr: false}
// );
//
// const schema = z.object({
//     fullName: z.string().min(3, {message: "حداقل 3 کاراکتر وارد کنید"}),
//     email: z.string().email({message: "ایمیل معتبر وارد کنید"}),
//     phone: z.string().regex(/^09\d{9}$/, {
//         message: "شماره موبایل معتبر وارد کنید",
//     }),
//     subject: z.string().min(8, {message: "حداقل 8 کاراکتر وارد کنید"}),
//     message: z.string().min(10, {message: "حداقل 10 کاراکتر وارد کنید"}),
//     recaptcha: z.string().min(1, {message: "لطفاً تأیید کنید"}),
// });
//
//
//
// export default function ContactForm() {
//     const {
//         register,
//         handleSubmit,
//         setValue,
//         reset,
//         formState: {errors, isSubmitting},
//     } = useForm({
//         resolver: zodResolver(schema),
//         mode: "onTouched",
//     });
//
//     const onSubmit = useCallback(
//         async (data) => {
//             try {
//                 const res = await axios.post("/api/sendEmail", data, {
//                     headers: {"Content-Type": "application/json"},
//                 });
//                 toast.success("✅ پیام شما با موفقیت ارسال شد");
//                 reset();
//             } catch (err) {
//                 const errorMsg =
//                     err.response?.data?.message || err.message || "خطا در ارسال فرم";
//                 toast.error(`❌ ${errorMsg}`);
//             }
//         },
//         [reset]
//     );
//
//
//     return (
//         <>
//             <section
//                 dir="rtl"
//                 className="border-t-[.35rem] border-orange-400 border-dashed bg-gray-100 dark:bg-slate-900 py-16 px-4 md:px-8"
//             >
//                 <div className="max-w-4xl mx-auto bg-orange-50 dark:bg-slate-800 p-6 md:p-10 rounded-2xl shadow-2xl">
//                     <h2 className="font-DimaYekanBold text-3xl md:text-5xl text-center text-orange-600 dark:text-orange-400 mb-8">
//                         فرم تماس با ما
//                     </h2>
//
//                     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                         <div className="grid md:grid-cols-2 gap-6">
//                             <InputField
//                                 label="نام و نام خانوادگی"
//                                 {...register("fullName")}
//                                 error={errors.fullName}
//                             />
//                             <InputField
//                                 label="ایمیل"
//                                 type="email"
//                                 {...register("email")}
//                                 error={errors.email}
//                             />
//                         </div>
//
//                         <div className="grid md:grid-cols-2 gap-6">
//                             <InputField
//                                 label="شماره موبایل"
//                                 type="tel"
//                                 {...register("phone")}
//                                 error={errors.phone}
//                             />
//                             <InputField
//                                 label="موضوع"
//                                 {...register("subject")}
//                                 error={errors.subject}
//                             />
//                         </div>
//
//                         <TextareaField
//                             label="توضیحات"
//                             {...register("message")}
//                             error={errors.message}
//                         />
//
//                         <div className="flex justify-center items-center flex-col">
//                             <ReCAPTCHA
//                                 sitekey="6LfKnTQrAAAAADQmf-o4gG7awMTa-dUauZemlikw"
//                                 onChange={(v) => setValue("recaptcha", v || "")}
//                                 onErrored={() => setValue("recaptcha", "")}
//                                 onExpired={() => setValue("recaptcha", "")}
//                             />
//                             {errors.recaptcha && (
//                                 <p className="text-red-600 dark:text-red-300 text-xs mt-1">
//                                     {errors.recaptcha.message}
//                                 </p>
//                             )}
//                         </div>
//
//                         <div className="flex justify-center">
//                             <button
//                                 type="submit"
//                                 disabled={isSubmitting}
//                                 className="w-60 py-3 rounded-lg font-bold text-lg transition-all
//                   bg-orange-600 hover:bg-orange-700 text-white
//                   dark:bg-orange-500 dark:hover:bg-orange-600
//                   focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-500/50
//                   disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 {isSubmitting ? "در حال ارسال..." : "ارسال پیام"}
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </section>
//
//             <ToastContainer transition={Slide}/>
//         </>
//     );
// }


// components/ContactForm.jsx

import React, {useCallback, useEffect} from "react";
import dynamic from "next/dynamic";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast, Slide} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import InputField from "./InputField.jsx";
import TextareaField from "./TextareaField";
import {z} from "zod";
import {useLocale} from "../../../lib/localeContext";

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), {
    ssr: false,
});
const ToastContainer = dynamic(
    () =>
        import("react-toastify").then((mod) => ({
            default: mod.ToastContainer,
        })),
    {ssr: false}
);

export default function ContactForm() {
    const {t, locale} = useLocale();

    // تعریف schema با پیام‌های ترجمه‌شده
    const schema = z.object({
        fullName: z.string().min(3, {
            message: t("contactForm.fields.fullName.validation.required"),
        }),
        email: z.string().email({
            message: t("contactForm.fields.email.validation.required"),
        }),
        phone: z.string().regex(/^09\d{9}$/, {
            message: t("contactForm.fields.phone.validation.required"),
        }),
        subject: z.string().min(8, {
            message: t("contactForm.fields.subject.validation.required"),
        }),
        message: z.string().min(10, {
            message: t("contactForm.fields.message.validation.required"),
        }),
        recaptcha: z.string().min(1, {
            message: t("contactForm.fields.recaptcha.validation.required"),
        }),
    });

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        trigger,
        clearErrors,
        formState: {errors, isSubmitting},
    } = useForm({
        resolver: zodResolver(schema),
        mode: "onTouched",
    });

    // وقتی زبان تغییر می‌کند، خطاها را پاک و مجدداً اعتبارسنجی کن
    useEffect(() => {
        clearErrors();
        trigger();
    }, [locale, clearErrors, trigger]);

    const onSubmit = useCallback(
        async (data) => {
            try {
                await axios.post("/api/sendEmail", data, {
                    headers: {"Content-Type": "application/json"},
                });
                toast.success(t("contactForm.toast.success"));
                reset();
            } catch (err) {
                const errorMsg = err.response?.data?.message || err.message || "";
                toast.error(t("contactForm.toast.error").replace("{message}", errorMsg));
            }
        },
        [reset, t]
    );

    return (
        <>
            <section
                dir="rtl"
                className="border-t-[.35rem] border-orange-400 border-dashed bg-gray-100 dark:bg-slate-900 py-16 px-4 md:px-8"
            >
                <div className="max-w-4xl mx-auto bg-orange-50 dark:bg-slate-800 p-6 md:p-10 rounded-2xl shadow-2xl">
                    <h2 className="font-DimaYekanBold text-3xl md:text-5xl text-center text-orange-600 dark:text-orange-400 mb-8">
                        {t("contactForm.heading")}
                    </h2>

                    <form
                        key={locale}
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="grid md:grid-cols-2 gap-6">
                            <InputField
                                label={t("contactForm.fields.fullName.label")}
                                {...register("fullName")}
                                error={errors.fullName}
                            />
                            <InputField
                                label={t("contactForm.fields.email.label")}
                                type="email"
                                {...register("email")}
                                error={errors.email}
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <InputField
                                label={t("contactForm.fields.phone.label")}
                                type="tel"
                                {...register("phone")}
                                error={errors.phone}
                            />
                            <InputField
                                label={t("contactForm.fields.subject.label")}
                                {...register("subject")}
                                error={errors.subject}
                            />
                        </div>

                        <TextareaField
                            label={t("contactForm.fields.message.label")}
                            {...register("message")}
                            error={errors.message}
                        />

                        <div className="flex justify-center items-center flex-col">
                            <ReCAPTCHA
                                sitekey="6LfKnTQrAAAAADQmf-o4gG7awMTa-dUauZemlikw"
                                onChange={(v) => setValue("recaptcha", v || "")}
                                onErrored={() => setValue("recaptcha", "")}
                                onExpired={() => setValue("recaptcha", "")}
                            />
                            {errors.recaptcha && (
                                <p className="text-red-600 dark:text-red-300 text-xs mt-1">
                                    {errors.recaptcha.message}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-60 py-3 rounded-lg font-bold text-lg transition-all
                  bg-orange-600 hover:bg-orange-700 text-white
                  dark:bg-orange-500 dark:hover:bg-orange-600
                  focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-500/50
                  disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting
                                    ? t("contactForm.buttons.submitting")
                                    : t("contactForm.buttons.submit")}
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <ToastContainer transition={Slide}/>
        </>
    );
}

import nodemailer from "nodemailer";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "فقط متد POST مجاز است" });
  }

  const { fullName, email, phone, subject, message, recaptcha } = req.body;

  if (!recaptcha) {
    return res.status(400).json({ message: "لطفاً تأیید کنید که ربات نیستید" });
  }

  try {
    const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify`;

    const recaptchaRes = await axios.post(
      recaptchaVerifyUrl,
      new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: recaptcha,
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (!recaptchaRes.data.success) {
      return res.status(400).json({
        message: "تأیید کپچا ناموفق بود. لطفاً مجدداً تلاش کنید.",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mehr3117@gmail.com",
        pass: "kqcnnlbljwgbeino",
      },
    });

    const mailOptions = {
      from: `"${fullName}" <${"mehr3117@gmail.com" || "test@gmail.com"}>`,
      to: "mehr3117@gmail.com",
      subject: `📩 فرم تماس جدید: ${subject}`,
      html: `
        <div dir="rtl" style="background-color: #f9fafb; padding: 32px; font-family: Tahoma, sans-serif;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 0.5rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); border: 1px solid #e5e7eb;">
            <div style="background-color: #fb923c; color: white; padding: 24px 32px; border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem;">
              <h2 style="font-size: 20px; margin: 0;">📬 فرم تماس جدید</h2>
            </div>

            <div style="padding: 32px;">
              <p style="margin: 0 0 16px;"><strong>👤 نام کامل:</strong> ${fullName}</p>
              <p style="margin: 0 0 16px;"><strong>📧 ایمیل:</strong> ${email}</p>
              <p style="margin: 0 0 16px;"><strong>📱 شماره تماس:</strong> ${phone}</p>
              <p style="margin: 0 0 16px;"><strong>📝 موضوع:</strong> ${subject}</p>

              <div style="margin-top: 24px;">
                <strong>💬 پیام:</strong>
                <div style="background-color: #f3f4f6; padding: 16px; border-radius: 0.375rem; margin-top: 8px; line-height: 1.625; color: #111827;">
                  ${message.replace(/\n/g, "<br>")}
                </div>
              </div>
            </div>

            <div style="background-color: #f3f4f6; padding: 16px 32px; font-size: 12px; color: #6b7280; border-bottom-left-radius: 0.5rem; border-bottom-right-radius: 0.5rem; text-align: center;">
              این پیام به‌صورت خودکار از طریق فرم تماس وب‌سایت ارسال شده است.
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "پیام شما با موفقیت ارسال شد",
    });
  } catch (error) {
    console.error("خطا در ارسال ایمیل:", error);
    return res.status(500).json({
      success: false,
      message: "خطا در ارسال پیام. لطفاً بعداً تلاش کنید.",
    });
  }
}

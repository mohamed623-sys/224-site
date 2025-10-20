// app/src/emailjsClient.js
import emailjs from "emailjs-com";

export async function sendOrderEmail({ user_name, user_email, message }) {
  try {
    const result = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      { user_name, user_email, message },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
    return { success: true, result };
  } catch (err) {
    console.error("EmailJS error:", err);
    return { success: false, error: err };
  }
}

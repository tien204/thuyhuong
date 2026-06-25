import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  recruiterName?: string;
  jobDescription?: string;
  phone?: string;
  email?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 11;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactPayload;

    const recruiterName = body.recruiterName?.trim() ?? "";
    const jobDescription = body.jobDescription?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const email = body.email?.trim() ?? "";

    if (!recruiterName || !jobDescription || !phone || !email) {
      return NextResponse.json(
        { success: false, message: "Thiếu thông tin bắt buộc." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Email không hợp lệ." },
        { status: 400 },
      );
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { success: false, message: "Số điện thoại không hợp lệ." },
        { status: 400 },
      );
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");
    const contactReceiver = process.env.CONTACT_RECEIVER;

    if (!gmailUser || !gmailPass || !contactReceiver) {
      return NextResponse.json(
        { success: false, message: "Cấu hình mail chưa đầy đủ." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio — Liên hệ công việc" <${gmailUser}>`,
      to: contactReceiver,
      replyTo: email,
      subject: `Liên hệ công việc từ ${recruiterName}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1b1b1b;">
          <h2 style="color: #00754a;">Liên hệ công việc mới</h2>

          <p><strong>Họ tên nhà tuyển dụng:</strong> ${escapeHtml(recruiterName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Số điện thoại:</strong> ${escapeHtml(phone)}</p>

          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />

          <p><strong>Mô tả / JD:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(jobDescription)}</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Gửi mail thành công.",
    });
  } catch (error) {
    console.error("Send mail error:", error);

    return NextResponse.json(
      { success: false, message: "Không gửi được mail." },
      { status: 500 },
    );
  }
}

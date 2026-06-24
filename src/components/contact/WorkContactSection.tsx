"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import ClaudeChatInput from "@/components/ui/claude-style-chat-input";
import { ContactInfoPanel } from "@/components/contact/ContactInfoPanel";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

type ContactForm = {
  recruiterName: string;
  jobDescription: string;
  phone: string;
  email: string;
};

type ContactStep = "name" | "jd" | "phone" | "email" | "done";

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "intro",
    role: "assistant",
    content:
      "Chào anh/chị! Mình là trợ lý của Hương. Anh/chị cho mình biết họ tên của anh/chị được không?",
  },
];

const STEP_PLACEHOLDERS: Record<Exclude<ContactStep, "done">, string> = {
  name: "Ví dụ: Nguyễn Văn A",
  jd: "Link JD hoặc mô tả ngắn về vị trí",
  phone: "Ví dụ: 0901 234 567",
  email: "Ví dụ: hr@congty.com",
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 11;
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 12 && hour < 18) return "Chào buổi chiều";
  if (hour >= 18) return "Chào buổi tối";
  return "Chào buổi sáng";
}

function buildMailtoLink(form: ContactForm) {
  const subject = encodeURIComponent(
    `Liên hệ công việc từ ${form.recruiterName}`,
  );
  const body = encodeURIComponent(
    [
      `Họ tên nhà tuyển dụng: ${form.recruiterName}`,
      `Mô tả / JD: ${form.jobDescription}`,
      `Số điện thoại: ${form.phone}`,
      `Email: ${form.email}`,
    ].join("\n"),
  );

  return `mailto:dinhthuyhuong11@gmail.com?subject=${subject}&body=${body}`;
}

export function WorkContactSection() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [step, setStep] = useState<ContactStep>("name");
  const [form, setForm] = useState<ContactForm>({
    recruiterName: "",
    jobDescription: "",
    phone: "",
    email: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const greeting = useMemo(() => getGreeting(), []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping, error]);

  const pushMessage = (role: ChatMessage["role"], content: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `${role}-${prev.length}`, role, content },
    ]);
  };

  const advanceConversation = (
    nextStep: ContactStep,
    assistantReply: string,
    delay = 500,
  ) => {
    setIsTyping(true);
    window.setTimeout(() => {
      pushMessage("assistant", assistantReply);
      setStep(nextStep);
      setIsTyping(false);
    }, delay);
  };

  const handleSendMessage = (message: string) => {
    const value = message.trim();
    if (!value || step === "done") return;

    setError(null);
    pushMessage("user", value);

    if (step === "name") {
      if (value.length < 2) {
        setError("Vui lòng nhập họ tên đầy đủ.");
        return;
      }

      setForm((prev) => ({ ...prev, recruiterName: value }));
      advanceConversation(
        "jd",
        `Cảm ơn ${value}! Anh/chị vui lòng gửi link JD hoặc mô tả ngắn về vị trí tuyển dụng ạ.`,
      );
      return;
    }

    if (step === "jd") {
      if (value.length < 5) {
        setError("Vui lòng nhập link JD hoặc mô tả vị trí (ít nhất 5 ký tự).");
        return;
      }

      setForm((prev) => ({
        ...prev,
        jobDescription: value,
      }));
      advanceConversation(
        "phone",
        "Số điện thoại để Hương liên hệ lại là gì ạ?",
      );
      return;
    }

    if (step === "phone") {
      if (!isValidPhone(value)) {
        setError("Số điện thoại không hợp lệ. Vui lòng nhập lại.");
        return;
      }

      setForm((prev) => ({ ...prev, phone: value }));
      advanceConversation("email", "Email của anh/chị là gì ạ?");
      return;
    }

    if (step === "email") {
      if (!isValidEmail(value)) {
        setError("Email không hợp lệ. Vui lòng nhập lại.");
        return;
      }

      const finalForm = { ...form, email: value };
      setForm(finalForm);
      setStep("done");

      advanceConversation(
        "done",
        `Cảm ơn ${finalForm.recruiterName}! Mình đã ghi nhận thông tin. Hương sẽ liên hệ lại sớm qua ${finalForm.phone} hoặc ${value}.`,
        600,
      );
    }
  };

  const mailtoLink = step === "done" ? buildMailtoLink(form) : null;

  return (
    <section
      id="work-contact"
      className="relative overflow-hidden bg-[var(--color-profile-cream)] py-12 sm:py-16 md:py-20"
    >
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl profile-reveal lg:mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-profile-muted)]">
            Mục 03
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight text-[var(--color-profile-navy)]">
            Liên hệ công việc
          </h2>
          <p className="mt-3 max-w-[65ch] text-sm leading-relaxed text-[var(--color-profile-body)] sm:text-base">
            Chat với trợ lý AI bên trái hoặc liên hệ trực tiếp qua thông tin bên
            phải.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="profile-reveal flex h-full min-h-[min(480px,62dvh)] flex-col overflow-hidden rounded-[var(--radius-profile)] border-2 border-[var(--color-profile-navy)] bg-white shadow-[0_12px_40px_-16px_rgba(0,49,139,0.2)] lg:min-h-0 lg:self-stretch">
          <header className="shrink-0 border-b border-[var(--color-profile-border)] bg-[var(--color-profile-cream)]/40 px-4 py-4 sm:px-5 sm:py-5">
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-[var(--color-profile-border)] bg-white sm:h-14 sm:w-14">
                <Image
                  src="/hero-avatar.png"
                  alt="Avatar Đinh Thị Thủy Hương"
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>

              <div className="min-w-0 text-left">
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-profile-muted)]">
                  Trợ lý liên hệ
                </p>
                <h2 className="font-[family-name:var(--font-serif)] text-lg font-light tracking-tight text-[var(--color-profile-navy)] sm:text-xl">
                  {greeting},{" "}
                  <span className="relative inline-block">
                    anh/chị
                    <svg
                      className="absolute -bottom-0.5 left-0 h-[10px] w-full text-[var(--color-green-accent)]"
                      viewBox="0 0 140 24"
                      fill="none"
                      preserveAspectRatio="none"
                      aria-hidden
                    >
                      <path
                        d="M6 16 Q 70 24, 134 14"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </h2>
                <p className="mt-0.5 truncate text-xs text-[var(--color-profile-muted)] sm:text-sm">
                  Liên hệ công việc với Hương — chỉ mất vài phút
                </p>
              </div>
            </div>
          </header>

          <div
            ref={scrollContainerRef}
            className="chat-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5"
            aria-label="Lịch sử trò chuyện"
          >
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[80%]",
                      message.role === "user"
                        ? "rounded-br-md bg-[var(--color-profile-navy)] text-white"
                        : "rounded-bl-md border border-[var(--color-profile-border)] bg-[var(--color-profile-cream)]/30 text-[var(--color-profile-body)]",
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {isTyping ? (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md border border-[var(--color-profile-border)] bg-[var(--color-profile-cream)]/30 px-4 py-3 text-sm text-[var(--color-profile-muted)]">
                    Đang nhập...
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <footer className="shrink-0 space-y-3 border-t border-[var(--color-profile-border)] bg-white px-4 py-4 sm:px-5">
            {error ? (
              <p className="text-center text-sm text-[var(--color-error)]">
                {error}
              </p>
            ) : null}

            <ClaudeChatInput
              embedded
              placeholder={
                step === "done"
                  ? "Đã hoàn tất — cảm ơn anh/chị!"
                  : STEP_PLACEHOLDERS[step]
              }
              disabled={step === "done" || isTyping}
              onSendMessage={handleSendMessage}
            />

            {mailtoLink ? (
              <div className="text-center">
                <a
                  href={mailtoLink}
                  className="inline-flex items-center justify-center rounded-full bg-[var(--color-profile-navy)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-green-accent)]"
                >
                  Gửi email xác nhận
                </a>
              </div>
            ) : null}
          </footer>
          </div>

          <ContactInfoPanel />
        </div>
      </div>
    </section>
  );
}

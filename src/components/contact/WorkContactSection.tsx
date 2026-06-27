"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import ClaudeChatInput from "@/components/ui/claude-style-chat-input";
import { ContactInfoPanel } from "@/components/contact/ContactInfoPanel";
import { CONTACT_CHAT_SHELL_CLASS } from "@/components/contact/contactLayout";
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

function getGreeting(date = new Date()) {
  const hour = date.getHours();

  if (hour >= 5 && hour < 11) return "Chào buổi sáng";
  if (hour >= 11 && hour < 13) return "Chào buổi trưa";
  if (hour >= 13 && hour < 18) return "Chào buổi chiều";
  return "Chào buổi tối";
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

function TypingIndicator() {
  return (
    <div className="flex justify-start chat-message-enter">
      <div
        className="rounded-2xl rounded-bl-md border border-[var(--color-profile-border)] bg-[var(--color-profile-cream)]/30 px-4 py-3"
        role="status"
        aria-label="Đang nhập"
      >
        <div className="chat-typing-indicator">
          <span className="chat-typing-dot" />
          <span className="chat-typing-dot" />
          <span className="chat-typing-dot" />
        </div>
      </div>
    </div>
  );
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
  const [sendStatus, setSendStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [greeting, setGreeting] = useState(() => getGreeting());
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contactPanelRef = useRef<HTMLElement>(null);
  const [chatHeight, setChatHeight] = useState<number | null>(null);

  useEffect(() => {
    const syncGreeting = () => setGreeting(getGreeting());

    syncGreeting();
    const interval = window.setInterval(syncGreeting, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const panel = contactPanelRef.current;
    if (!panel) return;

    const syncChatHeight = () => {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

      if (!isDesktop) {
        setChatHeight(null);
        return;
      }

      setChatHeight(panel.getBoundingClientRect().height);
    };

    syncChatHeight();

    const observer = new ResizeObserver(syncChatHeight);
    observer.observe(panel);
    window.addEventListener("resize", syncChatHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncChatHeight);
    };
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const shouldSmoothScroll = messages.length > 1 || isTyping;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: shouldSmoothScroll ? "smooth" : "auto",
    });
  }, [messages, isTyping, error, sendStatus]);

  useEffect(() => {
    if (step !== "done" || sendStatus !== "idle") return;
    if (!form.recruiterName || !form.jobDescription || !form.phone || !form.email) {
      return;
    }

    const sendContact = async () => {
      setSendStatus("sending");

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        const data = (await res.json()) as { message?: string };

        if (!res.ok) {
          throw new Error(data.message || "Gửi mail thất bại.");
        }

        setSendStatus("sent");
      } catch {
        setSendStatus("error");
      }
    };

    void sendContact();
  }, [step, form, sendStatus]);

  const retrySend = async () => {
    setSendStatus("sending");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = (await res.json()) as { message?: string };

      if (!res.ok) {
        throw new Error(data.message || "Gửi mail thất bại.");
      }

      setSendStatus("sent");
    } catch (sendError) {
      setSendStatus("error");
      setError(
        sendError instanceof Error
          ? sendError.message
          : "Không gửi được thông tin. Vui lòng thử lại.",
      );
    }
  };

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
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight text-[var(--color-profile-navy)]">
            Liên hệ công việc
          </h2>
          <p className="mt-3 max-w-[65ch] text-sm leading-relaxed text-[var(--color-profile-body)] sm:text-base">
            Chat với trợ lý AI bên trái hoặc liên hệ trực tiếp qua thông tin bên
            phải.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div
            className={cn(
              "profile-reveal shadow-[var(--shadow-profile-panel)]",
              CONTACT_CHAT_SHELL_CLASS,
            )}
            style={chatHeight ? { height: chatHeight } : undefined}
          >
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
                <h2
                  lang="vi"
                  className="font-[family-name:var(--font-vietnamese)] text-lg font-medium leading-snug tracking-normal text-[var(--color-profile-navy)] sm:text-xl"
                >
                  <span>{greeting},</span>{" "}
                  <span className="relative inline-block font-semibold">
                    anh/chị
                    <svg
                      className="absolute -bottom-0.5 left-0 h-[10px] w-full text-[var(--color-pink-strong)]"
                      viewBox="0 0 140 24"
                      fill="none"
                      preserveAspectRatio="none"
                      aria-hidden
                    >
                      <path
                        d="M6 16 Q 70 24, 134 14"
                        stroke="currentColor"
                        strokeWidth="3.5"
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
              {messages.map((message, index) => {
                const isLatest = index === messages.length - 1;

                return (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      isLatest && "chat-message-enter",
                      message.role === "user" ? "justify-end" : "justify-start",
                    )}
                    style={
                      isLatest
                        ? { animationDelay: `${Math.min(index, 10) * 55}ms` }
                        : undefined
                    }
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
                );
              })}

              {isTyping ? <TypingIndicator /> : null}
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

            {step === "done" ? (
              <div className="space-y-2 text-center">
                {sendStatus === "sending" ? (
                  <p className="text-sm text-[var(--color-profile-muted)]">
                    Đang gửi thông tin đến Hương...
                  </p>
                ) : null}

                {sendStatus === "sent" ? (
                  <p className="text-sm font-semibold text-[var(--color-primary-ink)]">
                    Thông tin đã được gửi. Hương sẽ phản hồi trong 24–48 giờ làm
                    việc.
                  </p>
                ) : null}

                {sendStatus === "error" ? (
                  <div className="space-y-2">
                    <p className="text-sm text-[var(--color-error)]">
                      Không gửi được tự động. Vui lòng thử lại hoặc dùng email
                      xác nhận.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => void retrySend()}
                        className="inline-flex items-center justify-center rounded-full bg-[var(--color-profile-navy)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-green-accent)]"
                      >
                        Gửi lại
                      </button>
                      {mailtoLink ? (
                        <a
                          href={mailtoLink}
                          className="inline-flex items-center justify-center rounded-full border border-[var(--color-profile-navy)] px-5 py-2.5 text-sm font-medium text-[var(--color-profile-navy)] transition-colors hover:bg-[var(--color-profile-cream)]"
                        >
                          Gửi email xác nhận
                        </a>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </footer>
          </div>

          <ContactInfoPanel ref={contactPanelRef} />
        </div>
      </div>
    </section>
  );
}

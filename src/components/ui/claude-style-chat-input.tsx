"use client";

import { ArrowUp, Loader2 } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  type KeyboardEvent,
} from "react";

import { cn } from "@/lib/utils";

type ClaudeChatInputProps = {
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
  embedded?: boolean;
  onSendMessage: (message: string) => void;
  className?: string;
};

export default function ClaudeChatInput({
  placeholder = "Nhập tin nhắn...",
  disabled = false,
  isLoading = false,
  embedded = false,
  onSendMessage,
  className,
}: ClaudeChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
  }, []);

  useEffect(() => {
    resizeTextarea();
  }, [placeholder, resizeTextarea]);

  const focusInput = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea || disabled || isLoading) return;
    textarea.focus({ preventScroll: true });
  }, [disabled, isLoading]);

  useEffect(() => {
    if (embedded || disabled || isLoading) return;

    const frame = requestAnimationFrame(() => {
      focusInput();
    });

    return () => cancelAnimationFrame(frame);
  }, [embedded, disabled, isLoading, placeholder, focusInput]);

  const handleSend = () => {
    const textarea = textareaRef.current;
    if (!textarea || disabled || isLoading) return;

    const value = textarea.value.trim();
    if (!value) return;

    onSendMessage(value);
    textarea.value = "";
    resizeTextarea();
    requestAnimationFrame(() => focusInput());
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={cn(
        "w-full",
        embedded
          ? "rounded-xl border border-[var(--color-profile-border)] bg-[var(--color-profile-cream)]/50 p-2"
          : "max-w-3xl rounded-2xl border border-[var(--color-profile-border)] bg-white p-3 shadow-[0_8px_30px_-12px_rgba(0,49,139,0.12)]",
        className,
      )}
    >
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          rows={1}
          disabled={disabled || isLoading}
          placeholder={placeholder}
          onInput={resizeTextarea}
          onKeyDown={handleKeyDown}
          className="max-h-40 min-h-[44px] flex-1 resize-none bg-transparent px-2 py-2.5 text-sm leading-relaxed text-[var(--color-profile-body)] outline-none placeholder:text-[var(--color-profile-muted)] disabled:cursor-not-allowed disabled:opacity-60"
        />
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={handleSend}
          disabled={disabled || isLoading}
          aria-label="Gửi tin nhắn"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-profile-navy)] text-white transition-all hover:bg-[var(--color-green-accent)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ) : (
            <ArrowUp className="h-4 w-4" aria-hidden />
          )}
        </button>
      </div>
    </div>
  );
}

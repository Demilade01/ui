import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[12px] font-medium text-ink-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-9 w-full rounded-lg border bg-surface-2 px-3.5",
            "text-[13px] text-ink placeholder:text-ink-4",
            "outline-none transition-colors",
            error
              ? "border-[rgba(239,68,68,0.5)] focus:border-red focus:ring-1 focus:ring-[rgba(239,68,68,0.2)]"
              : "border-line focus:border-line-2 focus:ring-1 focus:ring-brand-dim",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            className,
          )}
          {...props}
        />
        {error && <p className="text-[11px] text-red">{error}</p>}
        {hint && !error && <p className="text-[11px] text-ink-3">{hint}</p>}
      </div>
    );
  },
);
Input.displayName = "Input";

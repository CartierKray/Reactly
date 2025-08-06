import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-6 max-w-[125px] rounded-md border bg-white/5 px-2 text-sm text-white ring-offset-transparent/25 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/50 focus:outline-none focus:ring-[0.5px] focus:ring-white disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };

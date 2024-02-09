import { cn } from "@/lib/utils";
import React, { Children } from "react";

interface ColorRadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  color?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function CustomRadioButton({
  color,
  className,
  children,
  id,
  ...props
}: ColorRadioButtonProps) {
  return (
    <div className="flex items-center space-x-2">
      <input id={id} type="radio" className="peer hidden" {...props} readOnly />
      <label
        htmlFor={id}
        className="p-4 rounded-full cursor-pointer hover:bg-gray-200 transition peer-checked:bg-gray-200 peer-disabled:text-gray-500"
      >
        <div
          className={cn("w-5 h-5 rounded-full", className)}
          style={{
            backgroundColor: color,
          }}
        >
          <div
            className={
              "flex items-center justify-center leading-none font-semibold uppercase text-inherit"
            }
          >
            {children}
          </div>
        </div>
      </label>
    </div>
  );
}

import { ReactNode } from "react";

interface AlertProps {
  children: ReactNode;
  variant?: "warning" | "info" | "error" | "success";
  icon?: ReactNode;
}

export function Alert({ children, variant = "warning", icon }: AlertProps) {
  const variantStyles = {
    warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
    info: "bg-blue-50 text-blue-800 border-blue-200",
    error: "bg-red-50 text-red-800 border-red-200",
    success: "bg-green-50 text-green-800 border-green-200",
  };

  return (
    <div className={`p-3 rounded-lg border flex items-start gap-3 text-sm ${variantStyles[variant]}`}>
      {icon && <span className="flex-shrink-0 mt-0.5">{icon}</span>}
      <div>{children}</div>
    </div>
  );
}

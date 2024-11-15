'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { UserRoleType } from "@/types/auth.types";
import { formatUserId, isValidUserId } from "@/utils/id-formatter";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth.schema";
import { roleOptions } from "@/lib/constants/roles";
import { signIn, signInWithGoogle } from "@/services/auth/auth-service";
import { 
  Button,
  Input,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  initialRole: UserRoleType;
  onBack: () => void;
}

export default function LoginForm({ initialRole, onBack }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); 
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    clearErrors,
    setError: setErrorHook,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      role: initialRole,
    },
  });

  const selectedRoleOption = roleOptions.find(role => role.value === initialRole);
  const currentId = watch("userId");

  // Clear errors when typing
  useEffect(() => {
    if (currentId) {
      clearErrors("userId");
    }
  }, [currentId, clearErrors]);

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedId = formatUserId(e.target.value, selectedRoleOption?.value || "ADMIN");
    setValue("userId", formattedId, { shouldValidate: true });
  };

  const clearUserId = () => {
    setValue("userId", "");
    clearErrors("userId");
  };

  const onSubmit = async (data: LoginFormData) => {
    
    setError(""); 
    
    if (!isValidUserId(data.userId, data.role)) {
      setErrorHook("userId", {
        type: "manual",
        message: `Invalid ID format for ${selectedRoleOption?.label.toLowerCase()}. Example: ${selectedRoleOption?.idExample}`
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await signIn(data);

      if (response.success && response.redirect) {
        router.push(response.redirect);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        return;
      }
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header with back button and role info */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="light"
          size="sm"
          onClick={onBack}
          className="text-black dark:text-white"
          startContent={<span>←</span>}
        >
          Change Role
        </Button>
        <div className="flex items-center gap-2">
          {selectedRoleOption?.icon}
          <span className="font-medium">
            {selectedRoleOption?.label}
          </span>
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-danger-50 border-l-4 border-danger p-4 rounded-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 text-danger text-sm">{error}</div>
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onClick={() => setError("")}
              className="text-danger"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Controller
          name="userId"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              value={field.value || ''}
              onChange={handleIdChange}
              type="text"
              label="User ID"
              placeholder={selectedRoleOption?.idExample || "Enter your ID"}
              variant="bordered"
              errorMessage={errors.userId?.message}
              isInvalid={!!errors.userId}
              description={
                initialRole === 'ADMIN'
                  ? "Format: SYS-[A/B/C]-0000 (letters then numbers)"
                  : `Format: XXX-X-XX-0000 (letters then numbers)`
              }
              endContent={
                field.value && (
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    onClick={clearUserId}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
                )
              }
            />
          )}
        />

        <Input
          {...register("password")}
          type={isPasswordVisible ? "text" : "password"}
          label="Password"
          placeholder="Enter your password"
          variant="bordered"
          errorMessage={errors.password?.message}
          isInvalid={!!errors.password}
          endContent={
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                    clipRule="evenodd"
                  />
                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </Button>
          }
        />

        <input type="hidden" {...register("role")} value={initialRole} />

        <Button
          type="submit"
          color="primary"
          className="w-full"
          size="lg"
          isLoading={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-divider"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-default-500">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="bordered"
          onClick={() => signInWithGoogle()}
          className="w-full"
          size="lg"
          startContent={<FcGoogle className="w-5 h-5" />}
        >
          Sign in with Google
        </Button>
      </form>
    </div>
  );
}

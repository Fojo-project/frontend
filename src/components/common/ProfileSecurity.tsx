"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ChevronRight } from "lucide-react";
import { PasswordSettingsSchema, DeleteAccountSchema } from "@/validation/schema";
import { useDeleteAccountMutation, useResetAccountPasswordMutation } from "@/store/profile/profile.api";
import useToastify from "@/hooks/useToastify";
import { useRouter } from "next/navigation";
import PasswordInputForm from "../form/PasswordInputForm";

type PasswordFormData = yup.InferType<typeof PasswordSettingsSchema>;
type DeleteFormData = yup.InferType<typeof DeleteAccountSchema>;

const SwitchRow = ({
  label,
  description,
  active,
  onClick,
}: {
  label: string;
  description: string;
  active?: boolean;
  onClick: () => void;
}) => {
  const isDelete = label.toLowerCase().includes("delete");

  return (
    <div onClick={onClick} className="cursor-pointer group py-2 space-y-1">
      <div className="flex items-center gap-1">
        <p
          className={`text-sm font-semibold [font-family:var(--font-open-sans)] ${active && isDelete ? "text-red-500" : "text-black"
            }`}
        >
          {label}
        </p>
        <ChevronRight
          className={`transition duration-200 ${active && isDelete
            ? "text-red-500"
            : active
              ? "text-black"
              : "text-gray-400 group-hover:text-black"
            }`}
          size={16}
        />
      </div>
      <p className="text-gray-500 text-sm [font-family:var(--font-open-sans)]">
        {description}
      </p>
    </div>
  );
};

const ProfileSecurity = () => {
  const [activeSection, setActiveSection] = useState<"password" | "delete">("password");
  const { showToast } = useToastify();
  const router = useRouter();
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm<PasswordFormData>({
    resolver: yupResolver(PasswordSettingsSchema),
    mode: "onTouched",
  });

  const {
    register: registerDelete,
    handleSubmit: handleSubmitDelete,
    formState: { errors: deleteErrors },
    reset: resetDelete,
  } = useForm<DeleteFormData>({
    resolver: yupResolver(DeleteAccountSchema),
    mode: "onTouched",
  });

  const [resetAccountPassword, { isLoading: isResetting }] =
    useResetAccountPasswordMutation();
  const [deleteAccount, { isLoading: isDeleting }] = useDeleteAccountMutation();

  useEffect(() => {
    resetPassword();
    resetDelete();
  }, [activeSection]);

  const onSubmitPassword = async (data: PasswordFormData) => {
    try {
      await resetAccountPassword(data).unwrap();
      showToast("Password changed successfully", "success");
      resetPassword();
    } catch (error: any) {
      console.error("Reset password error", error);
      showToast(
        error?.data?.message ||
        error?.data?.errors?.new_password?.[0] ||
        "Password change failed",
        "error"
      );
    }
  };

  const onSubmitDelete = async (data: DeleteFormData) => {
    try {
      await deleteAccount(data).unwrap();
      showToast("Account deleted successfully", "success");

      // ✅ redirect to homepage after 1 second
      setTimeout(() => {
        router.push("/signout");
      }, 1000);
    } catch (error: any) {
      console.error("Delete account error", error);
      showToast(
        error?.data?.message || error?.data?.errors?.reason?.[0] || "Account deletion failed",
        "error"
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-20">
      <div className="w-full md:w-1/4 space-y-4 text-sm text-black">
        <SwitchRow
          label="Password Settings"
          description="Change to a new password."
          active={activeSection === "password"}
          onClick={() => setActiveSection("password")}
        />
        <SwitchRow
          label="Delete Account"
          description="Request permanent deletion of my account"
          active={activeSection === "delete"}
          onClick={() => setActiveSection("delete")}
        />
      </div>

      <div className="max-w-100 md:w-3/4 space-y-6 font-open-sans">
        {activeSection === "password" && (
          <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="space-y-6">
            <PasswordInputForm
              label="Current Password"
              name="current_password"
              placeholder=""
              register={registerPassword}
              error={passwordErrors.current_password}
            />
            <PasswordInputForm
              label="New Password"
              name="new_password"
              placeholder=""
              register={registerPassword}
              error={passwordErrors.new_password}
            />
            <PasswordInputForm
              label="Confirm New Password"
              name="new_password_confirmation"
              placeholder=""
              register={registerPassword}
              error={passwordErrors.new_password_confirmation}
            />
            <button
              type="submit"
              className="bg-black w-100 text-white py-3 px-6 rounded-md text-sm font-medium hover:bg-gray-800 transition"
              disabled={isResetting}
            >
              {isResetting ? "Updating..." : "Change Password"}
            </button>
          </form>
        )}

        {activeSection === "delete" && (
          <form onSubmit={handleSubmitDelete(onSubmitDelete)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Tell Us Why</label>
              <select
                {...registerDelete("reason")}
                className="w-full h-[56px] rounded-md p-3 border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
              >
                <option value="">Select a reason</option>
                <option value="compromised">I Am Compromised</option>
                <option value="no-longer-need">I No Longer Need This Account</option>
                <option value="other">Other</option>
              </select>
              {deleteErrors.reason && (
                <p className="text-red-500 text-xs mt-1">{deleteErrors.reason.message}</p>
              )}
            </div>

            <PasswordInputForm
              label="Password"
              name="deletePassword"
              placeholder="Confirm with password"
              register={registerDelete}
              error={deleteErrors.deletePassword}
            />

            <button
              type="submit"
              className="bg-black w-100 text-white py-3 px-6 rounded-md text-sm font-medium hover:bg-red-700 transition"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Account"}
            </button>

            <p className="text-xs text-gray-400 mt-1">
              This action is irreversible and will permanently delete all associated data and
              your account.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileSecurity;

"use client";
import { signout } from "@/app/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { authStore } from "@/store";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const LogoutDialog = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
          <AlertDialogDescription>
            You will need to log in again to access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Logout</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const useLogout = () => {
  const router = useRouter();
  const logout = authStore((state) => state.logout);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogout = async () => {
    setShowConfirmation(true);
  };

  const confirmLogout = async () => {
    try {
      logout();
      await signout();
      router.push("/signin");
    } catch (error) {
      console.error("Logout error:", error);
      throw new Error("An error occurred while logging out.");
    }
    setShowConfirmation(false);
  };

  return {
    handleLogout,
    showConfirmation,
    setShowConfirmation,
    confirmLogout,
  };
};

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
} from "@/Features/Api/authApi";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { data, isLoading, refetch } = useLoadUserQuery();
  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      isError,
      error,
      isSuccess,
    },
  ] = useUpdateUserMutation();

  const [
    updatePassword,
    {
      isLoading: updatePasswordIsLoading,
      isError: updatePasswordIsError,
      error: updatePasswordError,
      isSuccess: updatePasswordIsSuccess,
    },
  ] = useUpdatePasswordMutation();

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  const updatePasswordHandler = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("New passwords don't match!");
      return;
    }
    if (passwords.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }
    try {
      await updatePassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      }).unwrap();
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message || "Profile updated.");
    }
    if (isError) {
      toast.error(error.message || "Failed to update profile");
    }
  }, [error, updateUserData, isSuccess, isError]);

  useEffect(() => {
    if (updatePasswordIsSuccess) {
      toast.success("Password updated successfully!");
    }
    if (updatePasswordIsError) {
      toast.error(updatePasswordError?.data?.message || "Failed to update password");
    }
  }, [updatePasswordIsSuccess, updatePasswordIsError]);

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );

  const user = data?.user;

  return (
    <motion.div
      className=" max-w-5xl mx-auto px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="font-extrabold text-3xl text-center md:text-left mb-6">
        👤 Profile Overview
      </h1>

      <div className=" flex flex-col md:flex-row items-center md:items-start gap-10 bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
        <motion.div
          className="flex flex-col items-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          <Avatar className="h-28 w-28 md:h-36 md:w-36 shadow-md border">
            <AvatarImage
              src={user?.photoUrl || "https://github.com/shadcn.png"}
              alt="User Avatar"
            />
            <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex gap-2 mt-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="hover:scale-105 transition">
                  ✏️ Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit Your Profile</DialogTitle>
                  <DialogDescription>
                    Update your name or profile picture here.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Name</Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Photo</Label>
                    <Input
                      onChange={onChangeHandler}
                      type="file"
                      accept="image/*"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={updateUserHandler}
                    disabled={updateUserIsLoading}
                  >
                    {updateUserIsLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "💾 Save Changes"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="hover:scale-105 transition">
                  🔒 Change Password
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Change Your Password</DialogTitle>
                  <DialogDescription>
                    Make sure your new password is secure.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Current Password</Label>
                    <Input
                      type="password"
                      value={passwords.currentPassword}
                      onChange={(e) =>
                        setPasswords({
                          ...passwords,
                          currentPassword: e.target.value,
                        })
                      }
                      placeholder="Enter current password"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>New Password</Label>
                    <Input
                      type="password"
                      value={passwords.newPassword}
                      onChange={(e) =>
                        setPasswords({
                          ...passwords,
                          newPassword: e.target.value,
                        })
                      }
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Confirm New Password</Label>
                    <Input
                      type="password"
                      value={passwords.confirmPassword}
                      onChange={(e) =>
                        setPasswords({
                          ...passwords,
                          confirmPassword: e.target.value,
                        })
                      }
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={updatePasswordHandler}
                    disabled={updatePasswordIsLoading}
                  >
                    {updatePasswordIsLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "🔄 Update Password"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        <div className="space-y-3 text-center md:text-left w-full">
          <h2 className="text-lg font-medium">
            Name:
            <span className="ml-2 font-normal text-gray-700 dark:text-gray-300">
              {user.name}
            </span>
          </h2>
          <h2 className="text-lg font-medium">
            Email:
            <span className="ml-2 font-normal text-gray-700 dark:text-gray-300">
              {user.email}
            </span>
          </h2>
          <h2 className="text-lg font-medium">
            Role:
            <span className="ml-2 font-normal text-gray-700 dark:text-gray-300">
              {user.role.toUpperCase()}
            </span>
          </h2>
        </div>
      </div>

      <div className="mt-12">
        <h1 className="text-xl font-semibold mb-4 text-center md:text-left">
          📚 Courses You're Enrolled In
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {user.enrolledCourses.length === 0 ? (
            <motion.div
              className="text-center text-gray-600 col-span-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              You haven't enrolled in any courses yet.
            </motion.div>
          ) : (
            user.enrolledCourses.map((course) => (
              <motion.div
                key={course._id}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Course course={course} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;








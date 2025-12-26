import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Camera, Image as ImageIcon, Save, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { useAuthStore } from "@/features/auth/stores/auth-store";
import { useDocumentTitle, useScrollTop, useFileHandler } from "@/hooks";
import { ROUTES } from "@/constants/routes";
import { storageService } from "@/lib/firebase";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const profileSchema = z.object({
  fullname: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  address: z.string().optional(),
  mobile: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function EditAccountPage() {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuthStore();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingValues, setPendingValues] = useState<ProfileFormValues | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useScrollTop();
  useDocumentTitle("Edit Account | Lumina Boutique");

  const { files, onFileChange } = useFileHandler({
    avatar: { file: null, url: "" },
    banner: { file: null, url: "" },
  });

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullname: user?.fullname || "",
      email: user?.email || "",
      address: user?.address?.address || "",
      mobile: user?.mobile?.value || "",
    },
  });

  if (!user) {
    navigate(ROUTES.SIGNIN);
    return null;
  }

  const handleSaveClick = (values: ProfileFormValues) => {
    setPendingValues(values);
    setIsConfirmOpen(true);
  };

  const onConfirmUpdate = async () => {
    if (!pendingValues) return;
    setIsUpdating(true);
    setIsConfirmOpen(false);

    try {
      let avatarUrl = user.avatar;
      let bannerUrl = user.banner;

      // Upload images if they were changed
      if (files.avatar.file) {
        avatarUrl = await storageService.uploadImage(user.id, "avatars", files.avatar.file);
      }
      if (files.banner.file) {
        bannerUrl = await storageService.uploadImage(user.id, "banners", files.banner.file);
      }

      await updateProfile({
        fullname: pendingValues.fullname,
        address: { address: pendingValues.address || "", isInternational: user.address?.isInternational || false },
        mobile: {
          ...user.mobile,
          value: pendingValues.mobile || "",
          dialCode: user.mobile?.dialCode || "+63",
          countryCode: user.mobile?.countryCode || "PH"
        },
        avatar: avatarUrl,
        banner: bannerUrl,
      });

      toast({
        title: "Profile Updated",
        description: "Your account details have been successfully saved.",
      });
      navigate(ROUTES.ACCOUNT);
    } catch (error) {
      toast({
        title: "Update Failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <main className="container pb-20 pt-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Account</h1>
            <p className="text-muted-foreground">Manage your profile information and preferences.</p>
          </div>
          <Button variant="ghost" onClick={() => navigate(ROUTES.ACCOUNT)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Profile
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSaveClick)} className="space-y-12">
            {/* Banner & Avatar Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Profile Images</h2>
              <div className="relative">
                {/* Banner Edit */}
                <div className="group relative h-48 w-full overflow-hidden rounded-2xl bg-muted lg:h-64">
                  <img
                    src={files.banner.url || user.banner || "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000&auto=format&fit=crop"}
                    alt="Profile Banner"
                    className="h-full w-full object-cover transition-all group-hover:scale-105 group-hover:brightness-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                    <Label htmlFor="banner-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center gap-2 text-white">
                        <ImageIcon className="h-8 w-8" />
                        <span className="text-sm font-bold">Change Banner</span>
                      </div>
                      <Input
                        id="banner-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => onFileChange(e, { name: "banner" })}
                      />
                    </Label>
                  </div>
                </div>

                {/* Avatar Edit */}
                <div className="absolute -bottom-12 left-8 group">
                  <div className="relative h-32 w-32 lg:h-40 lg:w-40">
                    <Avatar className="h-full w-full border-4 border-background shadow-xl">
                      <AvatarImage
                        src={files.avatar.url || user.avatar}
                        alt={user.fullname}
                        className="object-cover group-hover:brightness-50 transition-all"
                      />
                      <AvatarFallback className="text-4xl bg-primary text-primary-foreground">
                        {user.fullname.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                      <Label htmlFor="avatar-upload" className="cursor-pointer">
                        <div className="flex flex-col items-center gap-1 text-white">
                          <Camera className="h-6 w-6" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Edit</span>
                        </div>
                        <Input
                          id="avatar-upload"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => onFileChange(e, { name: "avatar" })}
                        />
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Information Form */}
            <div className="mt-20 space-y-8 pt-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <h3 className="text-lg font-bold">Personal Details</h3>
                  <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" {...field} disabled />
                        </FormControl>
                        <p className="text-[10px] text-muted-foreground italic mt-1.5">* Email cannot be changed for security reasons</p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-bold">Contact Information</h3>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Shipping Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 pt-8 border-t">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => navigate(ROUTES.ACCOUNT)}
                  disabled={isUpdating}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isUpdating}
                  className="min-w-[150px]"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save changes to your profile?</AlertDialogTitle>
            <AlertDialogDescription>
              This will update your personal information and profile images across the platform.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirmUpdate}>Confirm & Save</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}

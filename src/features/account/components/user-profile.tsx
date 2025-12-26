import { Link } from "react-router-dom";
import { User, Mail, MapPin, Phone, Calendar, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageLoader } from "@/components/shared";
import { useAuthStore } from "@/features/auth/stores/auth-store";
import { format } from "date-fns";
import { ROUTES } from "@/constants/routes";

export function UserProfile() {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return (
    <div className="space-y-8">
      {/* Banner & Avatar Section */}
      <div className="relative">
        <div className="h-48 w-full overflow-hidden rounded-2xl bg-muted lg:h-64">
          {user.banner ? (
            <ImageLoader
              src={user.banner}
              alt="Profile Banner"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-r from-primary/10 to-secondary/10" />
          )}
        </div>

        <div className="absolute -bottom-12 left-8 flex items-end gap-6">
          <Avatar className="h-32 w-32 border-4 border-background shadow-xl lg:h-40 lg:w-40">
            <AvatarImage src={user.avatar} alt={user.fullname} className="object-cover" />
            <AvatarFallback className="text-4xl bg-primary text-primary-foreground">
              {user.fullname.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="mb-4 hidden sm:block">
            <h1 className="text-3xl font-bold tracking-tight">{user.fullname}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <Link to={ROUTES.ACCOUNT_EDIT} className="absolute -bottom-4 right-8">
          <Button size="sm" className="shadow-lg">
            <Edit3 className="mr-2 h-4 w-4" />
            Edit Account
          </Button>
        </Link>
      </div>

      {/* Details Section */}
      <div className="mt-20 grid grid-cols-1 gap-6 pt-8 lg:grid-cols-2">
        <Card className="border-none bg-muted/30 shadow-none">
          <CardContent className="p-6">
            <h3 className="mb-6 flex items-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              <User className="mr-2 h-4 w-4" />
              Personal Information
            </h3>

            <div className="space-y-6">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Full Name</label>
                <p className="text-lg font-medium">{user.fullname}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background shadow-sm">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Email Address</label>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none bg-muted/30 shadow-none">
          <CardContent className="p-6">
            <h3 className="mb-6 flex items-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              <MapPin className="mr-2 h-4 w-4" />
              Contact Details
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background shadow-sm">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Address</label>
                  <p className="font-medium">
                    {user.address ? user.address.address : (
                      <span className="italic text-muted-foreground">Address not set</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background shadow-sm">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Mobile Number</label>
                  <p className="font-medium">
                    {user.mobile ? user.mobile.value : (
                      <span className="italic text-muted-foreground">Mobile not set</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background shadow-sm">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Member Since</label>
                  <p className="font-medium">
                    {user.dateJoined ? format(new Date(user.dateJoined), "MMMM dd, yyyy") : "Not available"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

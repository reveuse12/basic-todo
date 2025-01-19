"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { Bell, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "./ui/scroll-area";
import { fetchProfile, updateProfile } from "@/app/actions";
import { User, UserSettings } from "@/types/user";

// Form Schema
const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export default function ProfilePage() {
  const { toast } = useToast();
  const [user, setUser] = useState<Partial<User>>({}); // Initially empty user data

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const fetchUserProfile = async () => {
    try {
      const res = await fetchProfile();
      setUser(res);
      form.reset({
        name: res.name || "",
        email: res.email || "",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to fetch the user profile.",
      });
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleFormSubmit = async (
    values: z.infer<typeof profileFormSchema>
  ) => {
    try {
      const res = await updateProfile(values);
      if (res) {
        setUser(res.user);
        toast({
          title: res.message,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to fetch the user profile.",
      });
    }
  };

  return (
    <ScrollArea className="h-auto container mx-auto py-10 rounded-md border p-4">
      <div className="space-y-8">
        {/* Profile Header */}
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/placeholder.svg" alt={user.name || ""} />
            <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">
              Member since{" "}
              {user.createdAt && format(new Date(user.createdAt), "MMMM yyyy")}
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your profile information and email address.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleFormSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Update Profile</Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Settings */}
          {user.settings && (
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                  Manage your notification preferences and app settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Email Notifications</Label>
                    <Switch
                      checked={user.settings?.emailNotifications ?? false}
                      onCheckedChange={(checked) =>
                        setUser((prev) => ({
                          ...prev,
                          settings: {
                            emailNotifications: checked ?? false,
                            pushNotifications:
                              prev?.settings?.pushNotifications ?? false,
                            theme: prev?.settings?.theme ?? "light",
                            timezone: prev?.settings?.timezone ?? "UTC",
                          } satisfies UserSettings,
                        }))
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <Label>Push Notifications</Label>
                    <Switch
                      checked={user.settings?.pushNotifications ?? false}
                      onCheckedChange={(checked) =>
                        setUser((prev) => ({
                          ...prev,
                          settings: {
                            emailNotifications:
                              prev?.settings?.emailNotifications ?? false,
                            pushNotifications: checked,
                            theme: prev?.settings?.theme ?? "light",
                            timezone: prev?.settings?.timezone ?? "UTC",
                          } satisfies UserSettings,
                        }))
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <Label>Theme</Label>
                    <Select
                      value={user.settings?.theme ?? "light"}
                      onValueChange={(value) =>
                        setUser((prev) => ({
                          ...prev,
                          settings: {
                            emailNotifications:
                              prev?.settings?.emailNotifications ?? false,
                            pushNotifications:
                              prev?.settings?.pushNotifications ?? false,
                            theme: value,
                            timezone: prev?.settings?.timezone ?? "UTC",
                          },
                        }))
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Teams */}
        <Card>
          <CardHeader>
            <CardTitle>Teams</CardTitle>
            <CardDescription>Teams you are a member of.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {user.teams?.map((teamMember, index) => (
                  <TableRow key={index}>
                    <TableCell>{teamMember.team.name}</TableCell>
                    <TableCell>{teamMember.team.description}</TableCell>
                    <TableCell>{teamMember.role}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
            <CardDescription>Your latest notifications.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user.notifications?.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-center gap-4 border p-4 rounded-lg"
                >
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p>{notification.content}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(notification.createdAt), "PPp")}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="h-2 w-2 bg-blue-500 rounded-full" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}

"use client";

import { useState } from "react";
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
import { ScrollArea } from "./ui/scroll-area";

// Types based on your Prisma schema
type User = {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
  settings: UserSettings;
  teams: TeamMember[];
  notifications: Notification[];
};

type UserSettings = {
  emailNotifications: boolean;
  pushNotifications: boolean;
  theme: string;
  timezone: string;
};

type TeamMember = {
  team: {
    name: string;
    description: string | null;
  };
  role: "OWNER" | "ADMIN" | "MEMBER";
};

type Notification = {
  id: string;
  type:
    | "TODO_ASSIGNED"
    | "TODO_DUE_SOON"
    | "TODO_COMPLETED"
    | "COMMENT_ADDED"
    | "TEAM_INVITATION";
  content: string;
  read: boolean;
  createdAt: Date;
};

// Form Schema
const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export default function ProfilePage() {
  const [user, setUser] = useState<User>({
    id: "1",
    email: "user@example.com",
    name: "John Doe",
    createdAt: new Date(),
    settings: {
      emailNotifications: true,
      pushNotifications: true,
      theme: "light",
      timezone: "UTC",
    },
    teams: [
      {
        team: {
          name: "Development Team",
          description: "Main development team",
        },
        role: "ADMIN",
      },
    ],
    notifications: [
      {
        id: "1",
        type: "TODO_ASSIGNED",
        content: "You have been assigned a new task",
        read: false,
        createdAt: new Date(),
      },
    ],
  });

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email,
    },
  });

  async function onSubmit(values: z.infer<typeof profileFormSchema>) {
    // Here you would update the user profile
    console.log(values);
  }

  return (
    <ScrollArea className="h-auto container mx-auto py-10  rounded-md border p-4">
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
              Member since {format(user.createdAt, "MMMM yyyy")}
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
                  onSubmit={form.handleSubmit(onSubmit)}
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
                  <Button type="submit">Update profile</Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Settings */}
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
                  <Label
                    htmlFor="email-notifications"
                    className="flex flex-col gap-1"
                  >
                    <span>Email Notifications</span>
                    <span className="font-normal text-muted-foreground">
                      Receive email notifications about your tasks
                    </span>
                  </Label>
                  <Switch
                    id="email-notifications"
                    checked={user.settings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setUser((prev) => ({
                        ...prev,
                        settings: {
                          ...prev.settings,
                          emailNotifications: checked,
                        },
                      }))
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="push-notifications"
                    className="flex flex-col gap-1"
                  >
                    <span>Push Notifications</span>
                    <span className="font-normal text-muted-foreground">
                      Receive push notifications about your tasks
                    </span>
                  </Label>
                  <Switch
                    id="push-notifications"
                    checked={user.settings.pushNotifications}
                    onCheckedChange={(checked) =>
                      setUser((prev) => ({
                        ...prev,
                        settings: {
                          ...prev.settings,
                          pushNotifications: checked,
                        },
                      }))
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <Label htmlFor="theme" className="flex flex-col gap-1">
                    <span>Theme</span>
                    <span className="font-normal text-muted-foreground">
                      Select your preferred theme
                    </span>
                  </Label>
                  <Select
                    value={user.settings.theme}
                    onValueChange={(value) =>
                      setUser((prev) => ({
                        ...prev,
                        settings: { ...prev.settings, theme: value },
                      }))
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a theme" />
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
                {user.teams.map((teamMember, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {teamMember.team.name}
                    </TableCell>
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

        {/* Recent Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
            <CardDescription>Your latest notifications.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user.notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-center gap-4 rounded-lg border p-4"
                >
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {notification.content}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(notification.createdAt, "PPp")}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
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

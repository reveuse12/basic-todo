import { DBprisma } from "@/lib/db";
import { verifyAuthToken } from "@/lib/helpers/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { success, data: tokenData, error } = await verifyAuthToken(req);
    if (!success || !tokenData) {
      return error;
    }

    const user = await DBprisma.user.findUnique({
      where: { email: tokenData.email },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        settings: {
          select: {
            emailNotifications: true,
            pushNotifications: true,
            theme: true,
            timezone: true,
          },
        },
        teams: {
          select: {
            role: true,
            team: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
          },
        },
        lists: {
          select: {
            id: true,
            name: true,
            color: true,
            icon: true,
            shared: true,
          },
        },
        notifications: {
          where: { read: false },
          select: {
            id: true,
            type: true,
            content: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Error fetching user profile" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { success, data: tokenData, error } = await verifyAuthToken(req);
    if (!success || !tokenData) {
      return error;
    }
    const body = await req.json();
    const { name, email, settings } = body;

    const updatedUser = await DBprisma.user.update({
      where: { email: tokenData.email },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(settings && {
          settings: {
            upsert: {
              create: {
                emailNotifications: settings.emailNotifications,
                pushNotifications: settings.pushNotifications,
                theme: settings.theme,
                timezone: settings.timezone,
              },
              update: {
                emailNotifications: settings.emailNotifications,
                pushNotifications: settings.pushNotifications,
                theme: settings.theme,
                timezone: settings.timezone,
              },
            },
          },
        }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        updatedAt: true,
        createdAt: true,
        settings: {
          select: {
            emailNotifications: true,
            pushNotifications: true,
            theme: true,
            timezone: true,
          },
        },
        teams: {
          select: {
            role: true,
            team: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
          },
        },
        lists: {
          select: {
            id: true,
            name: true,
            color: true,
            icon: true,
            shared: true,
          },
        },
        notifications: {
          where: { read: false },
          select: {
            id: true,
            type: true,
            content: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        },
      },
    });
    return NextResponse.json({
      message: "Profile Updated successfully !!",
      updatedUser,
    });
  } catch (error) {
    console.log(JSON.stringify(error));
    return NextResponse.json({ message: "Error Updating the profile" });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { success, data: tokenData, error } = await verifyAuthToken(req);
    if (!success || !tokenData) {
      return error;
    }
    return NextResponse.json({ message: "Profile Deleted successfully !!" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error Deleted the profile" });
  }
}

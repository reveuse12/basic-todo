import { DBprisma } from "@/lib/db";
import { hashPassword } from "@/lib/helpers/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, name, password } = await req.json();

    if (!email || !name || !password) {
      return NextResponse.json({ error: "Invalid Input" }, { status: 400 });
    }

    const user = await DBprisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // hash the password
    const hashedPassword = await hashPassword(password);

    const newUser = await DBprisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    if (!newUser) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }

    // TODO Send Email For SignUp

    return NextResponse.json({ message: "Signup Successful" });
  } catch (error) {
    console.log(JSON.stringify(error), "error");
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

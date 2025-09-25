import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "authority-data.txt");

export async function POST(req) {
  const { email, password } = await req.json();

  // Read data from file
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ success: false });
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const data = fileContent ? JSON.parse(fileContent) : [];

  const user = data.find((u) => u.email === email && u.password === password);

  if (user) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}

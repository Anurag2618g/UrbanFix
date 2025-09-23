import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "authority-data.txt");

export async function POST(req) {
  const { email, password } = await req.json();

  // Read existing data
  let data = [];
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    if (fileContent) {
      data = JSON.parse(fileContent);
    }
  }

  // Check if user already exists
  if (data.find((user) => user.email === email)) {
    return NextResponse.json({ success: false, message: "User already exists" });
  }

  // Add new user
  data.push({ email, password });

  // Save back to file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json({ success: true });
}

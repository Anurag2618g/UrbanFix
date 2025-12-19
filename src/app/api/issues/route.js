import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "issue-data", "issues.json");

    if (!fs.existsSync(filePath)) {
      return Response.json([]);
    }

    const data = fs.readFileSync(filePath, "utf8");
    const issues = JSON.parse(data);

    return Response.json(issues);
  } catch (err) {
    console.error("FETCH ISSUES ERROR:", err);
    return Response.json(
      { error: "Failed to fetch issues" },
      { status: 500 }
    );
  }
}

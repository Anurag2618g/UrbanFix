// app/api/submit/route.js
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();

    // ---- TEXT FIELDS ----
    const issueData = {
      issueTitle: formData.get("issueTitle"),
      issueCategory: formData.get("issueCategory"),
      priority: formData.get("priority"),
      textDescription: formData.get("textDescription"),
      reporterName: formData.get("reporterName"),
      reporterEmail: formData.get("reporterEmail"),
      createdAt: new Date().toISOString(),
      id: `ISS-${Date.now()}`
    };

    // Basic validation
    if (!issueData.issueTitle || !issueData.issueCategory || !issueData.reporterEmail) {
      return Response.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ---- DIRECTORIES ----
    const baseDir = path.join(process.cwd(), "issue-data");
    const fileDir = path.join(baseDir, issueData.id);
    fs.mkdirSync(fileDir, { recursive: true });

    // ---- FILE HANDLING ----
    const savedFiles = { images: [], videos: [], audio: null };

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        const buffer = Buffer.from(await value.arrayBuffer());
        const filePath = path.join(fileDir, value.name);
        fs.writeFileSync(filePath, buffer);

        if (key.startsWith("images")) savedFiles.images.push(value.name);
        if (key.startsWith("videos")) savedFiles.videos.push(value.name);
        if (key === "audio") savedFiles.audio = value.name;
      }
    }

    issueData.files = savedFiles;

    // ---- SAVE JSON ----
    const jsonPath = path.join(baseDir, "issues.json");
    let existing = [];

    if (fs.existsSync(jsonPath)) {
      existing = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    }

    existing.push(issueData);
    fs.writeFileSync(jsonPath, JSON.stringify(existing, null, 2));

    return Response.json({
      success: true,
      issueId: issueData.id
    });

  } catch (err) {
    console.error("SUBMIT ERROR:", err);
    return Response.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

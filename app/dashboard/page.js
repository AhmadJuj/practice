// app/dashboard/page.js
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import DashboardClient from "./dashboardcleint";

const JWT_SECRET = process.env.JWT_SECRET;
export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  console.log("Token found:", !!token); // Debug log

  if (!token) {
    console.log("No token, redirecting to signin");
    return redirect("/signin");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Token verified:", decoded); // Debug log
  } catch (error) {
    console.log("JWT verification failed:", error.message); // Debug log
    return redirect("/signin");
  }

  return <DashboardClient />;
}
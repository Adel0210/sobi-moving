import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { AdminHeader } from "../AdminHeader";
import { ContentClient } from "./ContentClient";

export const metadata: Metadata = { title: "Content" };
export const dynamic = "force-dynamic";

export default async function ContentPage() {
  const content = await getContent();
  return (
    <>
      <AdminHeader title="Content" sub="Edit business info and key homepage copy — no code needed." />
      <div className="admin-content">
        <ContentClient initial={content} />
      </div>
    </>
  );
}

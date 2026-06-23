"use client";

import { AdminHeader } from "../../AdminHeader";
import { PostEditor } from "../PostEditor";

export default function NewPostPage() {
  return (
    <>
      <AdminHeader title="New post" sub="Write and publish an SEO-optimized post." />
      <div className="admin-content">
        <PostEditor postId={null} />
      </div>
    </>
  );
}

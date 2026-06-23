import { AdminHeader } from "../../AdminHeader";
import { PostEditor } from "../PostEditor";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <>
      <AdminHeader title="Edit post" sub="Write and publish an SEO-optimized post." />
      <div className="admin-content">
        <PostEditor postId={id} />
      </div>
    </>
  );
}

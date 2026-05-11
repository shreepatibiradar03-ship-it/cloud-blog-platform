import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main style={{ padding: 20 }}>
      <h1>My Blog 🚀</h1>

      {error && <p>Error: {error.message}</p>}

      {data?.length === 0 && <p>No posts yet</p>}

      {data?.map((post) => (
        <div key={post.id} style={{ marginBottom: 20 }}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </main>
  );
}
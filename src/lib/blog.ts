import { api, type ApiResource } from "./api";

export type BlogStatus = "generating" | "published" | "failed";

export type BlogSection = {
  heading: string;
  body: string;
};

export type BlogFaq = {
  question: string;
  answer: string;
};

export type ApiBlog = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
  readTime: string;
  sections: BlogSection[];
  faq: BlogFaq[];
  resource: Pick<ApiResource, "_id" | "title" | "course" | "type"> & {
    file: { url: string; originalName: string; size: number };
  };
  uploadedBy: { _id: string; name: string; email: string };
  status: BlogStatus;
  aiModel: string;
  errorMessage: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiBlogSummary = Omit<
  ApiBlog,
  "sections" | "faq" | "keywords" | "errorMessage" | "aiModel"
>;

export type BlogListResponse = {
  status: string;
  results: number;
  total: number;
  page: number;
  pages: number;
  data: {
    blogs: ApiBlogSummary[];
    categories: string[];
  };
};

export type BlogSingleResponse = {
  status: string;
  data: { blog: ApiBlog };
};

/** POST /api/resources/:id/blog/generate — trigger AI generation */
export async function generateBlog(
  resourceId: string
): Promise<{ blog: { _id: string; status: string } }> {
  return api(`/resources/${resourceId}/blog/generate`, {
    method: "POST",
  });
}

/** GET /api/resources/:id/blog — get blog status for polling */
export async function getResourceBlog(
  resourceId: string
): Promise<BlogSingleResponse> {
  return api(`/resources/${resourceId}/blog`);
}

/** GET /api/blog — list published posts */
export async function listBlogs(params?: {
  category?: string;
  q?: string;
  page?: number;
  limit?: number;
}): Promise<BlogListResponse> {
  const searchParams = new URLSearchParams();
  if (params?.category && params.category !== "All")
    searchParams.set("category", params.category);
  if (params?.q) searchParams.set("q", params.q);
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));
  const query = searchParams.toString();
  return api(`/blog${query ? `?${query}` : ""}`);
}

/** GET /api/blog/:slug — fetch single published post */
export async function getBlogBySlug(
  slug: string
): Promise<BlogSingleResponse> {
  return api(`/blog/${encodeURIComponent(slug)}`);
}

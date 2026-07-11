import { api } from "./api";

export type LatestPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  readTime: string;
  createdAt: string;
  updatedAt: string;
  type: "news" | "resource";
  coverImage?: string;
  uploadedBy?: { name: string };
};

export type StatsData = {
  counts: { resources: number; blogs: number; news: number; students: number };
  latest: LatestPost[];
};

export type StatsResponse = {
  status: string;
  data: StatsData;
};

export async function fetchStats(): Promise<StatsData> {
  const res = await api<StatsResponse>("/stats");
  return res.data;
}

const BASE_URL = "/api";

const TOKEN_KEY = "vu_token";

export const getToken = () =>
  typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY);

export const setToken = (token: string | null) => {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
};

export class ApiError extends Error {
  status: number;
  errors?: { msg: string; param?: string }[];
  constructor(status: number, message: string, errors?: unknown) {
    super(message);
    this.status = status;
    this.errors = Array.isArray(errors) ? errors : undefined;
    this.name = "ApiError";
  }
}

type FetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export async function api<T = unknown>(
  path: string,
  { body, headers, ...rest }: FetchOptions = {}
): Promise<T> {
  const token = getToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    const errors = Array.isArray(data?.errors) ? data.errors : undefined;
    const fieldError = errors?.find(
      (e: { msg?: string }) => typeof e?.msg === "string"
    );
    const message =
      (data && (data.message as string)) ||
      (fieldError && fieldError.msg) ||
      `Request failed: ${res.status}`;
    throw new ApiError(res.status, message, errors);
  }

  return data as T;
}

export async function apiUpload<T = unknown>(
  path: string,
  formData: FormData,
  { headers, ...rest }: Omit<RequestInit, "body"> = {}
): Promise<T> {
  const token = getToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    method: rest.method || "POST",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    body: formData,
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    const message =
      (data && (data.message as string)) || `Upload failed: ${res.status}`;
    throw new ApiError(res.status, message, data?.errors);
  }

  return data as T;
}

export type ApiUser = {
  id: string;
  name: string;
  email: string;
  role: "student" | "admin";
};

export type ApiResource = {
  _id: string;
  title: string;
  description: string;
  type: "assignment" | "past-paper" | "handout" | "notes" | "other";
  course: string;
  semester: string;
  file: {
    key: string;
    originalName: string;
    mimeType: string;
    size: number;
    url: string;
  };
  uploadedBy: { _id: string; name: string; email: string } | string;
  createdAt: string;
  updatedAt: string;
};

export type AuthResponse = {
  status: string;
  token: string;
  data: { user: ApiUser };
};

export type ResourceListResponse = {
  status: string;
  results: number;
  data: { resources: ApiResource[] };
};

export type ResourceResponse = {
  status: string;
  data: { resource: ApiResource };
};

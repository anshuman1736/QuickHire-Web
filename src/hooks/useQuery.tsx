"use client";

import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { errorToast } from "@/lib/toast";
interface QueryProps<T = unknown> {
  queryKey: string[];
  queryFn: (
    options: { token?: string } & Record<string, unknown>
  ) => Promise<T>;
}

export function useModQuery<T = unknown>(query: QueryProps<T>) {
  const { token } = useAuth();

  return useQuery<T>({
    queryKey: query.queryKey,
    queryFn: () => {
      if (!token) {
        errorToast("Unauthorized access. Please login again.");
        throw new Error("Unauthorized access");
      }
      return query.queryFn({ token });
    },
    enabled: !!token,
  });
}

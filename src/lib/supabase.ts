import { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export const getPublicUrl = async ({
  supabase,
  bucket,
  filepath,
}: {
  supabase: SupabaseClient<Database>;
  bucket: string;
  filepath: string;
  expiresIn?: number;
}) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(filepath);

  return data;
};

export const createSignedUrl = async ({
  supabase,
  bucket,
  filepath,
  expiresIn = 60,
}: {
  supabase: SupabaseClient<Database>;
  bucket: string;
  filepath: string;
  expiresIn?: number;
}) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(filepath, expiresIn);

  if (error) {
    throw error;
  }
  return data;
};

export const downloadFile = async ({
  supabase,
  bucket,
  filepath,
}: {
  supabase: SupabaseClient<Database>;
  bucket: string;
  filepath: string;
}) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .download(filepath);

  if (error) {
    throw error;
  }
  return data;
};

export const getFilesInBucket = async ({
  supabase,
  bucket,
  folder,
  limit = 100,
  offset = 0,
  sortBy = { column: "created_at", order: "desc" },
}: {
  supabase: SupabaseClient<Database>;
  bucket: string;
  folder: string;
  limit?: number;
  offset?: number;
  sortBy?: { column: string; order: string };
}) => {
  const { data, error } = await supabase.storage.from(bucket).list(folder, {
    limit,
    offset,
    sortBy,
  });

  if (error) {
    throw error;
  }
  return data;
};

export const deleteFiles = async ({
  supabase,
  bucket,
  filepath,
}: {
  supabase: SupabaseClient<Database>;
  bucket: string;
  filepath: string[];
}) => {
  const { data, error } = await supabase.storage.from(bucket).remove(filepath);

  if (error) {
    throw error;
  }
  return data;
};

export const emptyBucket = async ({
  supabase,
  bucket,
}: {
  supabase: SupabaseClient<Database>;
  bucket: string;
}) => {
  const { data, error } = await supabase.storage.emptyBucket(bucket);

  if (error) {
    throw error;
  }
  return data;
};

export const uploadFile = async ({
  supabase,
  userId,
  bucket,
  filepath,
  file,
  options = {
    cacheControl: "3600",
    upsert: false,
  },
}: {
  supabase: SupabaseClient<Database>;
  userId: string;
  bucket: string;
  filepath: string;
  file: File;
  options?: {
    cacheControl?: string;
    upsert?: boolean;
  };
}) => {
  const time = new Date().getTime();

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(`${filepath}_${userId}_${time}`, file, options);

  if (error) {
    throw error;
  }
  return data;
};

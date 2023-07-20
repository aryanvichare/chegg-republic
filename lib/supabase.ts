import { StorageError } from "@supabase/storage-js";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

export type SupabaseUploadResponse = {
  path: string;
  publicUrl: string;
};

export const uploadToSubabase = async (
  file: any
): Promise<SupabaseUploadResponse | undefined> => {
  const storagePromise: Promise<
    | {
        data: {
          path: string;
        };
        error: null;
      }
    | {
        data: null;
        error: StorageError;
      }
  > = supabase.storage
    .from(process.env.SUPABASE_BUCKET!)
    .upload(`${Date.now()}.pdf`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  const { data, error } = await storagePromise;

  if (error) {
    console.log(error);
    return;
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from(process.env.SUPABASE_BUCKET!)
    .getPublicUrl(data.path);

  return { path: data.path, publicUrl };
};

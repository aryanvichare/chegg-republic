import { StorageError } from "@supabase/storage-js";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_KEY as string
);

export const uploadToSubabase = async (file: any) => {
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
    .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET!)
    .upload(`${Date.now()}.pdf`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  const { data, error } = await storagePromise;

  if (error) {
    console.log(error);
    return;
  }

  return data;
};

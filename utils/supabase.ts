import {createClient} from '@supabase/supabase-js'

const bucket = 'main-bucket'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export const uploadImage = async (image:File) => {
    const timestamp = Date.now();
    const newName = `${timestamp}-${image.name}`;
    const {data} = await supabase.storage.from(bucket).upload(newName, image,{cacheControl:'3600'});
    if(!data) throw new Error('Failed to upload image');
    return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
}

export const deleteImage = async(url:string) =>{
  const imageName = url.split('/').pop()
  if(!imageName) throw new Error('No image name found')
    return supabase.storage.from(bucket).remove([imageName])
}
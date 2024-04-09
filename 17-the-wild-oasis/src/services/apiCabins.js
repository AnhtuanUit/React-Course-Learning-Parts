import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');
  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const isEditCase = Boolean(id);
  console.log('newCabin', newCabin?.image);
  const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);

  // https://gqhwslzqmjbcshtxfxxn.supabase.co/storage/v1/object/public/cabin-images/cabin-008.jpg

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create cabin
  let query = supabase.from('cabins');
  // A) Create new cabin
  if (!isEditCase) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) Update exist cabin
  if (isEditCase)
    query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be created');
  }

  // 2. Upload image
  if (!imagePath) return data;

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error uploading image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data?.id);

    throw new Error(
      'Cabin image could be not uploaded and the cabin was not created'
    );
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }

  return data;
}

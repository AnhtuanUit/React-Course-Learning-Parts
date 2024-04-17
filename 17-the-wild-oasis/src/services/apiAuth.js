import supabase, { supabaseUrl } from "./supabase";

export async function login(email, password) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();
  if (sessionError) {
    console.error(sessionError);
    throw new Error(sessionError.message);
  }

  if (!session.session) throw new Error("User session not found");

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return;
}

export async function signup(email, password, fullName) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function updateUser(fullName, password, avatar) {
  // https://gqhwslzqmjbcshtxfxxn.supabase.co/storage/v1/object/public/avatars/cabin-001.jpg?t=2024-04-17T04%3A05%3A14.677Z

  // 1) Update avatar
  let imagePath;
  if (avatar) {
    const imageName = `${Math.random()}-${avatar.name}`.replaceAll("/", "");

    imagePath = `${supabaseUrl}/storage/v1/object/public/avatars/${imageName}`;

    const { error: storageError } = await supabase.storage
      .from("avatars")
      .upload(imageName, avatar);

    if (storageError) {
      throw new Error("Avatar image could be not uploaded");
    }
  }

  // 2) Update fullName or password and avatar URL
  let query = supabase.auth;

  if (password) {
    query = query.updateUser({
      password,
    });
  }
  if (fullName || imagePath) {
    const updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (imagePath) updateData.avatar = imagePath;

    query = query.updateUser({
      data: updateData,
    });
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return { data };
}

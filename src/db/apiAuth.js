import supabase, { supabaseUrl } from "./supabase";

export async function login({email, password}){
    const {data, error} = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if(error) throw new Error(error.message)

    return data
}

export async function getCurrentUser() {
    const { data: session, error } = await supabase.auth.getUser()
    if(!session.session) return null;
    if (error) throw new Error(error.message);
    return session.session?.user
}

export async function signup({ name, email, password, profilepic }) {
  const fileName = `dp-${name.split(" ").join("-")}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("profilepic")
    .upload(fileName, profilepic);

  if (storageError) throw new Error(storageError.message);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  // Now immediately update the user's metadata
  const { error: updateError } = await supabase.auth.updateUser({
    data: {
      name,
      profilepic: `${supabaseUrl}/storage/v1/object/public/profilepic/${fileName}`,
    },
  });

  if (updateError) throw new Error(updateError.message);

  return data;
}
  export async function logout() {
    const {error} = await supabase.auth.signOut()
    if (error) throw new Error(error.message);
  }
"use server"
import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../supabase";
import { createClient } from "@supabase/supabase-js";
import { error } from "console";
export const createCompanion = async (formData: CreateCompanion) =>{
    const {userId: author} = await auth();
    const supabase = createSupabaseClient();
    const {data, error} = await supabase
    .from('companions')
    .insert({...formData, author})
    .select()
    if(error || !data) throw new Error(error?.message || "Failed to create a companion")

      return data[0]
}

export const getAllCompanions = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllCompanions) => {
  const supabase = createSupabaseClient();

  let query = supabase.from('companions').select();

  // Add filters based on subject and topic
  if (subject && topic) {
    query = query
      .ilike('subject', `%${subject}%`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`); // Corrected `or` condition
  } else if (subject) {
    query = query.ilike('subject', `%${subject}%`);
  } else if (topic) {
    query = query.ilike('name', `%${topic}%`); // Assuming 'name' can be searched for topic
  }

  // Add pagination logic (for both filters and no filters)
  const offset = (page - 1) * limit;
  query = query.range(offset, offset + limit - 1);

  // Fetch data from Supabase
  const { data: companions, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return companions; // Return companions data
};

export const getCompanion = async(id: string) =>{
  const supabase = createSupabaseClient()
  const {data, error} =  await supabase
  .from('companion')
  .select()
  .eq('id', id);

  if(error) return console.log(error);
    return data[0];
}
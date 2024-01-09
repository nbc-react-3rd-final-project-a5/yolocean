import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

export const GET = async () => {
  let { data: post, error } = await supabase
    .from("product")
    .select("*,category(category_name),stock(count,store(address,name))");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(post);
};

// export const POST =async (req:NextRequest) => {
//   let {data:category , error} = await supabase.from("category").select("*")

// }

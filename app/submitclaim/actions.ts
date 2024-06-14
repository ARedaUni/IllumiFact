import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function submitMisinformationClaim(formData: FormData) {
    'use server'
    const supabase = createClient()
    const claimName = formData.get("claimName") as string;
    const claimSummary = formData.get("claimSummary") as string;
    const { data } = await supabase.auth.getUser();
  
    const { error } = await supabase.from("claims").insert({
      claim_name: claimName,
      claim_content: claimSummary,
      claim_author_email: data?.user?.email || "",
      claim_author_id: data?.user?.id || "",
    });
    if(error) throw Error(error.message)
  //   fetch('http://127.0.0.1:54321/functions/v1/submitMisinformation', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`
  //   },
  //   body: JSON.stringify({claim_name: claimName, claimSummary}),
  // })
  // .then(response => response.json())
  // .then(data => {
  //   console.log('Success:', data);
  // })
  // .catch((error) => {
  //   console.error('Error:', error);
  // });

    // if (error) {
    //         return new NextResponse(
    //           "You must write at least 5 characters for the name and more than 200 characters when summarising the claim",
    //           {
    //             status: 400,
    //           }
    //         );
    //     } 
    //     if(!error) return new NextResponse('claim successfully sent', {status:200})
  revalidatePath('/', 'layout')
  redirect('/')
}

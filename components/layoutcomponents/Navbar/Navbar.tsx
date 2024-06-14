import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { jwtDecode } from "jwt-decode";
import MobileDropdown from "./NavbarComponents/MobileDropdown";
//search grabbed from https://tailwindcomponents.com/component/search-input-full-rounded
import SearchBar from "./NavbarComponents/SearchBar";
import UserDetails from "./NavbarComponents/UserDetails";

export default async function Navbar() {  
  const supabase = createClient();
  const { data, role } = await fetchUser();
  async function fetchUser() {
    const user = await supabase.auth.getSession();
    let role;
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("id", user?.data?.session?.user.id as string);
    try {
      const roleDecoded = jwtDecode(user.data.session?.access_token);
      role = roleDecoded.user_role;
    } catch (e) {
      console.log(e);
    }

    return { data, role };
  }

  return (
    <nav className="w-full flex justify-center border-b lg:w-full  border-b-foreground/10 h-16">
      <div className="w-full navconfig:!max-w-[1500px]  flex justify-between items-center navconfig:flex-row    p-3 sm:mx-12  ">
        <Link href="/" className="text-shadow text-2xl font-extrabold">
          <span className="gradient-text text-lg sm:!text-4xl text">
            IllumiFact
          </span>
        </Link>
        <div className="w-full font-sans hidden navconfig:!flex justify-center items-center p-3 text-md text-extrabold navconfig2:!text-xl [&>*]:mx-1 navconfig2:[&>*]:!mx-3">
          <Link href="/factchecks">Fact Checks</Link>
          <Link href="/submitclaim">Submit a claim</Link>
          <Link href="/aboutus">Who We Are</Link>
          {data && role === "admin" ? (
            <div className="flex [&>*]:mx-3">
              <Link href="/protected/viewmisinformation">MC</Link>
              <Link href="/protected/admin">Write Article</Link>
              <Link href="/editarticles">Edit Articles</Link>
            </div>
          ) : (
            <> <Link href="https://www.patreon.com/MisinformationPlatform?utm_medium=clipboard_copy&utm_source=copyLink&utm_campaign=creatorshare_creator&utm_content=join_link">Donate</Link></>
          )}
        </div>
        <div className="sm:!inline-block navconfig:!hidden">        <MobileDropdown user={data} /></div>

        <div className="flex items-center">
          <SearchBar />
          <UserDetails user={data} />
        </div>
      </div>
    </nav>
  );
}

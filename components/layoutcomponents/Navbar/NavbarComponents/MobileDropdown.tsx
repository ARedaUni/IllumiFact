'use client'
import { users } from "@/Types/allTypes";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { MenuItem } from "@material-tailwind/react";
import { useEffect } from "react";
//import { Dropdown, initTWE } from "tw-elements";
export default function MobileDropdown({ user }: { user: users[] | null }) {
//useEffect(() => {initTWE({Dropdown})}, [])

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
  return (
    <Menu as="div" className="relative  inline-block text-left ">
      <div>
        <Menu.Button className="inline-flex navconfig:hidden w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
           Pages
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ focus }: any) => (
                <a
                  href="/factchecks"
                  className={classNames(
                    focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                 Fact Checks
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ focus }: any) => (
                <a
                  href="/submitclaim"
                  className={classNames(
                    focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Submit Claim
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ focus }: any) => (
                <a
                  href="/aboutus"
                  className={classNames(
                    focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Who we are
                </a>
              )}
            </Menu.Item>
          
              <Menu.Item>
                {({ focus }: any) => (
              <a
              href="https://www.patreon.com/MisinformationPlatform?utm_medium=clipboard_copy&utm_source=copyLink&utm_campaign=creatorshare_creator&utm_content=join_link"
              className={classNames(
                focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-sm'
              )}
            >
              Donate
            </a>
                )}
              </Menu.Item>
              {user && user[0].id === "04ce407b-236f-45e3-abc1-3105a1cda7a2" ? (
                 <>
                 <Menu.Item>
                 {({ focus }: any) => (
                  
               <a
               href="/protected/viewmisinformation"
               className={classNames(
                 focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                 'block px-4 py-2 text-sm'
               )}
             >
               MCs
             </a>
                 )}
               </Menu.Item>
               <Menu.Item>
               {({ focus }: any) => (
             <a
             href="/protected/admin"
             className={classNames(
               focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
               'block px-4 py-2 text-sm'
             )}
           >
             Write Article
           </a>
               )}
             </Menu.Item>
             <Menu.Item>
               {({ focus }: any) => (
             <a
             href="/editarticles"
             className={classNames(
               focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
               'block px-4 py-2 text-sm'
             )}
           >
             Edit Article
           </a>
               )}
             </Menu.Item>
             </>
                
                ):(<div></div>)}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>



    // <div className=" navconfig:hidden">
    // <div className="relative" data-twe-dropdown-ref="">
    //   <a
    //     className="flex cursor-pointer items-center px-2  text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80"
    //     type="button"
    //     id="dropdownMenuButton2"
    //     data-twe-dropdown-toggle-ref=""
    //     aria-expanded="false"
    //   >
    //     <span>Open Menu</span> 
    //     <span className="[&>svg]:h-5 [&>svg]:w-5">
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         viewBox="0 0 24 24"
    //         fill="currentColor"
    //         strokeWidth="1.5"
    //       >
    //         <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    //       </svg>
    //     </span>
    //     <span className="[&>svg]:w-5">
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         viewBox="0 0 20 20"
    //         fill="currentColor"
    //       >
    //         <path
    //           fillRule="evenodd"
    //           d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
    //           clipRule="evenodd"
    //         />
    //       </svg>
    //     </span>
    //   </a>
    //   <ul
    //     className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark"
    //     aria-labelledby="dropdownMenuButton1"
    //     data-twe-dropdown-menu-ref=""
    //     role="menu" 
    //   >
    //     <li>
    //       <a
    //         className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
    //         href="/factchecks"
    //         data-twe-dropdown-item-ref=""
    //       >
    //         Fact Checks
    //       </a>
    //       </li>
    //       <li>
    //         <a
    //           className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
    //           href="/submitclaim"
    //           data-twe-dropdown-item-ref=""
    //         >
    //           Submit Claim
    //         </a>
    //       </li>
    //       <li>
    //         <a
    //           className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
    //           href="/aboutus"
    //           data-twe-dropdown-item-ref=""
    //         >
    //           Who we are
    //         </a>
    //       </li>
    //       <li>
    //         <a
    //           className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
    //           href="https://www.patreon.com/MisinformationPlatform?utm_medium=clipboard_copy&utm_source=copyLink&utm_campaign=creatorshare_creator&utm_content=join_link"
    //           data-twe-dropdown-item-ref=""
    //         >
    //           Donate
    //         </a>
    //       </li>
    //       {user && user[0].id === "04ce407b-236f-45e3-abc1-3105a1cda7a2" ? (
    //         <div>
    //           <li>
    //             <a
    //               className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
    //               href="/protected/viewmisinformation"
    //               data-twe-dropdown-item-ref=""
    //             >
    //               Misinformation Claim
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               className="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
    //               href="/protected/admin"
    //               data-twe-dropdown-item-ref=""
    //             >
    //               Write Article
    //             </a>
    //           </li>
    //         </div>
    //       ) : (
    //         <div></div>
    //       )}
    //     </ul>
    //   </div>
    // </div>
  );
}

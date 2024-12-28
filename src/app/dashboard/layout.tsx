"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { links, Logo, LogoIcon } from "@/components/common";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-screen mx-auto border border-neutral-200  dark:border-neutral-700 overflow-hidden h-screen "
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between bg-gray-300 gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto  overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Prayag Bagthariya",
                href: "#",
                icon: (
                  <Image
                    src="/profile-pic.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  );
};

export default MainLayout;

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import type { SiteInfo } from "@/lib/wordpress.d";
import { useState } from "react";

export default function SiteLogo({ siteInfo }: { siteInfo: SiteInfo | null }) {
  const router = useRouter();
  const pathname = usePathname();

  if (!siteInfo?.logo || !siteInfo.logo.url) return null;

  const locale = pathname.split("/")[1] || "en";
  const homePath = `/${locale}`;
  const [logoSrc, setLogoSrc] = useState(
    siteInfo?.logo?.url || "/assets/blanco.png"
  )

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === homePath) {
      e.preventDefault();
      router.refresh();
    }
  };

  return (
    <Link
      href={homePath}
      onClick={handleClick}
      className="flex items-center h-full"
    >
      <Image
        src={logoSrc}
        alt={siteInfo.logo.alt || "Logo"}
        onError={() => setLogoSrc("/assets/blanco.png")}
        width={300}
        height={120}
        style={{ width: "200px", height: "auto" }}
        priority
        fetchPriority="high"
        className=" h-9 md:h-9 w-auto object-contain"
      />
    </Link>
  );
}
import Image from "next/image";
import Link from "next/link";

export default function HeaderLogo() {
  return (
    <Link href="/" className="shrink-0 block w-[14vw] ">
      <Image
        src="/logo/logos.png" 
        alt="CHIN Radio"
        width={158}
        height={137}
        priority
        className="w-full h-auto"
      />
    </Link>
  );
}
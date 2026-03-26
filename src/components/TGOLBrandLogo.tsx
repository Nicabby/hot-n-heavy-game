import Image from "next/image";

export default function TGOLBrandLogo() {
  return (
    <Image
      src="/images/TGOLbase.svg"
      alt="The Game of Lifestyle"
      width={120}
      height={120}
      className="block mx-auto mt-4 mb-6"
      priority
    />
  );
}
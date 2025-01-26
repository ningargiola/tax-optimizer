import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/images/LPL-logo-white.png"
      alt="LPL Financial Logo"
      width={150} // Adjust size as needed
      height={60}
    />
  );
}
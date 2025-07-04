import { titleFont } from '@/config/fonts';
import Link from 'next/link';

export const Footer = () => {
  return (
    <div className="flex w-full justify-center gap-3 text-xs mb-10">
      <Link href="/">
        <span className={`${ titleFont.className } antialiased font-bold`}>Teslo</span>
        <span> | Shop </span>
        <span>© { new Date().getFullYear() }</span>
      </Link>

      <Link href="/">Privacy & Legal</Link>

      <Link href="/">Locations</Link>
    </div>
  )
}

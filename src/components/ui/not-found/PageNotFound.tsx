import Image from 'next/image';
import Link from 'next/link';
import { titleFont } from '@/config/fonts';

export const PageNotFound = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle">
      <div className="text-center px-5 mx-5">
        <h2 className={`${ titleFont.className } antialiased text-9xl`}>404</h2>
        <p className="font-semibold text-xl">Whoops! We&apos;re sorry.</p>
        <p className="font-light">
          <span>You can go back to the </span>
          <Link href="/" className="font-normal hover:underline transition-all">homepage</Link>
        </p>
      </div>

      <div className="px-5 mx-5">
        <Image
          src="/imgs/starman_750x750.png"
          alt="Starman"
          className="p-5 sm:p-0"
          width={ 550 }
          height={ 550 }
          priority
        />
      </div>
    </div>
  )
}

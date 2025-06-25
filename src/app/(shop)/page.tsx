import { titleFont } from "@/config/fonts";

export default function Home() {
  return (
    <div className="">
      <h1>Hello World!</h1>
      <h1 className={`${ titleFont.className }`}>Hello World!</h1>
    </div>
  );
}


export default function ShopLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center px-5">
      <div className="w-full sm:w-[350px]">
        { children }
      </div>
    </div>
  );
}
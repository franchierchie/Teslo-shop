import { Footer, SideBar, TopMenu } from '@/components';

export default function ShopLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <TopMenu />
      <SideBar />
      
      <div className="px-0 sm:px-10">
        { children }
      </div>

      <Footer />
    </div>
  );
}
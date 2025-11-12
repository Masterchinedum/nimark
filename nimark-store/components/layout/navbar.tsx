import Link from 'next/link';
import MainNav from '@/components/layout/main-nav';
import NavbarActions from '@/components/layout/navbar-actions';
import MobileNavbar from '@/components/layout/mobile-navbar';
import getParentCategories from '@/actions/get-parent-categories';
import { auth } from '@/auth';

const Navbar = async () => {
  const categories = await getParentCategories();
  const session = await auth();

  return (
    <>
      {/* Mobile Navbar - Shows only on mobile/tablet */}
      <div className="lg:hidden">
        <MobileNavbar categories={categories} user={session?.user} />
      </div>

      {/* Desktop Navbar - Shows only on desktop */}
      <header className="hidden lg:block sticky top-0 z-50 w-full bg-background shadow-sm">
        {/* Top Promotional Banner */}
        <div className="bg-primary text-primary-foreground">
          <div className="container mx-auto">
            <div className="flex h-9 items-center justify-center text-xs md:text-sm font-medium">
              <p>🎉 Free shipping on orders over ₦50,000 • Same-day delivery available</p>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="bg-background border-b">
          <div className="container mx-auto">
            <div className="flex h-16 items-center gap-4 px-6">
              {/* Logo */}
              <Link href="/" className="flex shrink-0 items-center gap-2 group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg transition-transform group-hover:scale-105 shadow-sm">
                  N
                </div>
                <div className="flex flex-col">
                  <p className="text-2xl font-bold tracking-tight text-foreground leading-none">
                    NIMARK
                  </p>
                  <p className="text-xs text-muted-foreground -mt-0.5">Premium Electronics</p>
                </div>
              </Link>

              {/* Search Bar */}
              <div className="flex-1 mx-8 max-w-3xl">
                <MainNav data={categories} />
              </div>

              {/* User Actions */}
              <NavbarActions user={session?.user} />
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="bg-muted/30 border-b">
          <div className="container mx-auto">
            <div className="flex h-10 items-center gap-6 px-6 text-sm">
              <Link 
                href="/" 
                className="font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                All
              </Link>
              {categories.slice(0, 7).map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="text-muted-foreground hover:text-primary transition-colors whitespace-nowrap font-medium"
                >
                  {category.name}
                </Link>
              ))}
              {categories.length > 7 && (
                <Link 
                  href="/categories" 
                  className="text-primary font-semibold hover:underline flex items-center gap-1"
                >
                  More
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;

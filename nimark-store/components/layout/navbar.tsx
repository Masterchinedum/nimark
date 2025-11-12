import Link from 'next/link';
import MainNav from '@/components/layout/main-nav';
import NavbarActions from '@/components/layout/navbar-actions';
import getCategories from '@/actions/get-categories';
import { auth } from '@/auth';

const Navbar = async () => {
  const categories = await getCategories();
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-sm">
      {/* Top Promotional Banner - Hidden on mobile */}
      <div className="hidden sm:block bg-primary text-primary-foreground">
        <div className="container mx-auto">
          <div className="flex h-9 items-center justify-center text-xs md:text-sm font-medium">
            <p>🎉 Free shipping on orders over ₦50,000 • Same-day delivery available</p>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-background border-b">
        <div className="container mx-auto">
          <div className="flex h-14 md:h-16 items-center gap-2 md:gap-4 px-3 md:px-6">
            {/* Logo - Compact on mobile */}
            <Link href="/" className="flex shrink-0 items-center gap-1.5 md:gap-2 group">
              <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm md:text-lg transition-transform group-hover:scale-105 shadow-sm">
                N
              </div>
              <div className="flex flex-col">
                <p className="text-base md:text-xl lg:text-2xl font-bold tracking-tight text-foreground leading-none">
                  NIMARK
                </p>
                <p className="hidden sm:block text-[10px] md:text-xs text-muted-foreground -mt-0.5">Premium Electronics</p>
              </div>
            </Link>

            {/* Search Bar - Responsive sizing */}
            <div className="flex-1 mx-2 md:mx-4 lg:mx-8 max-w-3xl">
              <MainNav data={categories} />
            </div>

            {/* User Actions - Compact on mobile */}
            <NavbarActions user={session?.user} />
          </div>
        </div>
      </div>

      {/* Categories Bar - Desktop only */}
      <div className="hidden lg:block bg-muted/30 border-b">
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

      {/* Mobile Categories Strip */}
      <div className="lg:hidden bg-muted/30 border-b overflow-x-auto scrollbar-hide">
        <div className="flex h-10 items-center gap-3 px-3">
          <Link 
            href="/" 
            className="shrink-0 text-xs font-semibold text-foreground hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-primary/10"
          >
            All
          </Link>
          {categories.slice(0, 8).map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="shrink-0 text-xs font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap px-2 py-1 rounded-md hover:bg-primary/10"
            >
              {category.name}
            </Link>
          ))}
          {categories.length > 8 && (
            <Link 
              href="/categories" 
              className="shrink-0 text-xs font-semibold text-primary hover:underline px-2 py-1 flex items-center gap-0.5"
            >
              More
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

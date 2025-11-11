import Link from 'next/link';
import Container from '@/components/ui/container';
import MainNav from '@/components/layout/main-nav';
import NavbarActions from '@/components/layout/navbar-actions';
import getCategories from '@/actions/get-categories';
import { auth } from '@/auth';

const Navbar = async () => {
  const categories = await getCategories();
  const session = await auth();

  return (
    <div className="border-b">
      <Container>
        <div className="relative flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="ml-4 flex gap-x-2 lg:ml-0">
            <p className="text-xl font-bold">NIMARK</p>
          </Link>
          <MainNav data={categories} />
          <NavbarActions user={session?.user} />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;

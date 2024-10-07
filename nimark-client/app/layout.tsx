// import Footer from '@/components/footer';
// import Navbar from '@/components/navbar';
// import './globals.css';
// import type { Metadata } from 'next';
// import { Urbanist } from 'next/font/google';
// import ModalProvider from '@/providers/modal-provider';
// import ToastProvider from '@/providers/toast-provider';

// const urban = Urbanist({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Store',
//   description: 'Store',
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body className={urban.className}>
//         <ModalProvider />
//         <ToastProvider />
//         <Navbar />
//         {children}
//         <Footer />
//         </body>
//     </html>
//   )
// }

import { useBillboards } from '../lib/react-query-hooks';

function BillboardsComponent() {
  const { data, isLoading, error } = useBillboards();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      {data?.data.map(billboard => (
        <div key={billboard.id}>{billboard.label}</div>
      ))}
    </div>
  );
}

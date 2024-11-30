import Navbar from '@/app/components/navbar/Navbar';
import LoginModal from '@/app/components/modals/LoginModal';
import RegisterModal from '@/app/components/modals/RegisterModal';
import SearchModal from '@/app/components/modals/SearchModal';
import RentModal from '@/app/components/modals/RentModal';

import ToasterProvider from '@/app/providers/ToasterProvider';

import './globals.css';
import ClientOnly from './components/ClientOnly';  // ClientOnly component for client-side rendering.
import getCurrentUser from './actions/getCurrentUser';  // Function to fetch current user information.

export const metadata = {
  title: 'KioskMaps',  // Website title.
  description: 'Shops Near you',  // Website description.
}

/**
 * Root layout component that sets up the basic structure of the app.
 * @param children The content to be rendered within the layout.
 */
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();  // Fetching current user asynchronously.

  return (
    <html lang="en">
      <body className="font-serif">
        <ClientOnly>  {/* ClientOnly wrapper for components that require client-side rendering */}
          <ToasterProvider />  {/* Toast notifications provider */}
          <LoginModal />  {/* Modal component for user login */}
          <RegisterModal />  {/* Modal component for user registration */}
          <SearchModal />  {/* Modal component for search functionality */}
          <RentModal />  {/* Modal component for renting */}
          <Navbar currentUser={currentUser} />  {/* Navigation bar component */}
        </ClientOnly>
        <div className="pb-20 pt-28">
          {children}  {/* Main content of the application */}
        </div>
      </body>
    </html>
  );
}

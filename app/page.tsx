import Container from "@/app/components/Container";  // Container component for layout structure.
import ListingCard from "@/app/components/listings/ListingCard";  // ListingCard component to display individual listings.
import EmptyState from "@/app/components/EmptyState";  // EmptyState component for displaying when no listings are found.
import Map from "@/app/components/Map";  // Map component for displaying geographical locations.

import getListings, { 
  IListingsParams
} from "@/app/actions/getListings";  // Function to fetch listings based on parameters.
import getCurrentUser from "@/app/actions/getCurrentUser";  // Function to fetch current user information.
import ClientOnly from "./components/ClientOnly";  // ClientOnly component for client-side rendering.
import MaxWidthWrapper from "./components/MaxWidthWrapper";  // MaxWidthWrapper component for limiting content width.
import Search from "./components/navbar/Search";  // Search component for searching listings.

export const dynamic = "force-dynamic";  // Constant indicating forced dynamic import.

interface HomeProps {
  searchParams: IListingsParams;  // Interface defining search parameters for listings.
};

/**
 * Home component to display listings based on search parameters.
 * @param searchParams Parameters used to fetch listings.
 */
const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);  // Fetch listings based on search parameters.
  const currentUser = await getCurrentUser();  // Fetch current user information.

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />  {/* Display EmptyState component when no listings are found */}
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <MaxWidthWrapper>
        <Map />  {/* Display Map component for visualizing geographical locations */}
      </MaxWidthWrapper>
      <Container>
        <div 
          className="
            pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          {listings.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  )
}

export default Home;

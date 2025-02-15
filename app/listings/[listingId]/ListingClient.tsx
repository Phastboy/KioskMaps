'use client';

import { SafeListing, SafeUser } from "@/app/types";

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";

interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser;
    vendingMachine: string; 
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser
}) => {
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              description={listing.description}
              vendingMachine={listing.vendingMachine} 
              locationValue={listing.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ListingClient;

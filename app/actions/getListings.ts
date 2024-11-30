import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
}


// Function to fetch listings based on given parameters
export default async function getListings(
  params: IListingsParams
) {
  try {
    const {
      userId, 
      locationValue,
      startDate,
      endDate,
    } = params;

    let query: any = {};
 // Building query based on provided parameters
    if (userId) {
      query.userId = userId;
    }

    

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate }
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate }
              }
            ]
          }
        }
      }
    }
 // Fetching listings from Prisma based on constructed query, ordered by createdAt in descending order
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });
 // Mapping over listings to ensure createdAt is in ISO string format
    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}

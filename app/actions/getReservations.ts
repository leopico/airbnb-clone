import { db } from "../libs/prismadb"

interface IParams {
    listingId?: string
    userId?: string
    authorId?: string
}


//Note => This fn is finding listing and reservation and trip with listingId / userId / authorId 
//And also will handle for disable date after Reservd
export default async function getReservations(params: IParams) {
    try {
        const { listingId, userId, authorId } = params;

    const query: any = {};

    if (listingId) { //we gonna find all reservations for this single listing that we r looking at.
        query.listingId = listingId
    }

    if (userId) { //we gonna find all the trip that a user have
        query.userId = userId
    }

    if (authorId) { //will search  author reservations that other users make for our listing
        query.listing = {userId: authorId}
    }

    const reservations = await db.reservation.findMany({
        where: query,
        include: {
            listing: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
 
    const safeReservations = reservations.map((reservation) => ({ //have to check that not really understand
        ...reservation,
        createdAt: reservation.createdAt.toISOString(),
        startDate: reservation.startDate.toISOString(),
        endDate: reservation.endDate.toISOString(),
        listing: {
            ...reservation.listing,
            createdAt: reservation.listing.createdAt.toISOString(),
        }
    }))

    return safeReservations;
        
    } catch (error: any) {
        throw new Error(error)
    }
}
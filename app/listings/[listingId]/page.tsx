import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById"
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

interface IParams {
    listingId?: string
}

const ListingPage = async ({ params }: { params: IParams }) => {
    const listing = await getListingById(params); //this is directly communicated with database
    const currentUser = await getCurrentUser();
    const reservations = await getReservations(params)

    if (!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <ListingClient //this is not in components folder of main page route because of this is under listings route
                listing={listing}
                currentUser={currentUser}
                reservations={reservations}
            />
        </ClientOnly>
    )
}

export default ListingPage
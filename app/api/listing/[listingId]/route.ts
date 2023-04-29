import getCurrentUser from "@/app/actions/getCurrentUser"
import { db } from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
    listingId?: string
}

export async function DELETE(request: Request, {params} : {params: IParams}) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID')
    }

    const listing = await db.listing.deleteMany({
        //compare with listingId and userId to be able to delete
        where: {
            id: listingId,
            userId: currentUser.id
        }
    })

    return NextResponse.json(listing)
}
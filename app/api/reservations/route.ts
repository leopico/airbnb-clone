import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import { db } from "@/app/libs/prismadb";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();

    const { listingId, startDate, endDate, totalPrice } = body;
    
    if (!listingId || !startDate || !endDate || !totalPrice) {
        return NextResponse.error();
    }


    const listingAndReservation = await db.listing.update({
        where: {
            id: listingId //have to assign to listingId of reservation with listing's id
        },
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice,
                }
            }
        }   
    })
     return NextResponse.json(listingAndReservation)
}
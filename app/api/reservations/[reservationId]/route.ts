import getCurrentUser from "@/app/actions/getCurrentUser"
import { db } from "@/app/libs/prismadb";
import { NextResponse } from "next/server";


interface IParams {
    reservationId?: string
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error()
    }

    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== 'string') {
        throw new Error('Invalid ID');
    }

    //delete with two options
    const reservation = await db.reservation.deleteMany({
        where: {
            id: reservationId,
            //userId or listing
            OR: [
                { userId: currentUser.id }, //creater of reservation can delete
                {listing: { userId: currentUser.id}} //creater of listing can delete any reservations
            ]
        },
    })
    return NextResponse.json(reservation)
}
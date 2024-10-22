import { NextRequest, NextResponse } from "next/server";


const guestRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];

export function middleware(req:NextRequest){

    const {pathname} = req.nextUrl;

    
}
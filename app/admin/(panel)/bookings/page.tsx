import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { AdminHeader } from "../AdminHeader";
import { BookingsClient } from "./BookingsClient";
import type { Booking } from "@/lib/types";

export const metadata: Metadata = { title: "Bookings" };
export const dynamic = "force-dynamic";

export default async function BookingsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("move_date", { ascending: true, nullsFirst: false });

  if (error) {
    return (
      <>
        <AdminHeader title="Bookings" sub="Scheduled moves and their status." />
        <div className="admin-content">
          <div className="admin-note">
            <strong>The bookings table isn&apos;t set up yet.</strong> Run the CRM schema in Supabase, then
            booked moves will appear here.
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminHeader title="Bookings" sub="Scheduled moves and their status." />
      <div className="admin-content">
        <BookingsClient initial={(data ?? []) as Booking[]} />
      </div>
    </>
  );
}

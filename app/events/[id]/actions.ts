"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type RegistrationResult = {
  success: boolean;
  message: string;
};

export async function registerForEvent(eventId: string): Promise<RegistrationResult> {
  try {
    const supabase = await createClient();

    // 1. Get logged in user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return { success: false, message: "You must be signed in to register for events." };
    }

    // 2. Fetch the event details to verify it exists and check capacity
    const { data: event, error: eventError } = await supabase
      .from("events")
      .select("*")
      .eq("id", eventId)
      .single();

    // If event doesn't exist in Supabase (e.g. we are viewing mock data), handle gracefully
    if (eventError || !event) {
      // For mock events, return a simulated success message
      if (eventId === "1" || eventId === "2" || eventId === "3") {
        return {
          success: true,
          message: "Demo Mode: Successfully registered for the simulated event!",
        };
      }
      return { success: false, message: "Event not found." };
    }

    // 3. Check duplicate registration
    const { data: existingReg } = await supabase
      .from("registrations")
      .select("id")
      .eq("user_id", user.id)
      .eq("event_id", eventId)
      .maybeSingle();

    if (existingReg) {
      return { success: false, message: "You are already registered for this event." };
    }

    // 4. Check capacity
    const { count, error: countError } = await supabase
      .from("registrations")
      .select("*", { count: "exact", head: true })
      .eq("event_id", eventId);

    if (countError) {
      return { success: false, message: "Could not verify event capacity." };
    }

    const currentCount = count || 0;
    if (currentCount >= event.capacity) {
      return { success: false, message: "This event is fully booked." };
    }

    // 5. Insert registration using a secure random UUID as the unique ID and QR Code data
    const registrationId = crypto.randomUUID();

    const { error: insertError } = await supabase
      .from("registrations")
      .insert({
        id: registrationId,
        user_id: user.id,
        event_id: eventId,
        qr_code: registrationId, // Store the UUID directly as the QR code data string
      });

    if (insertError) {
      // Handle potential duplicate race condition
      if (insertError.code === "23505") {
        return { success: false, message: "You are already registered for this event." };
      }
      return { success: false, message: insertError.message || "Failed to register." };
    }

    // 6. Refresh the cache for the specific event detail page
    revalidatePath(`/events/${eventId}`);
    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Congratulations! You have successfully registered for the event.",
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || "An unexpected error occurred during registration.",
    };
  }
}

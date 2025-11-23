import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    const { id } = evt.data;
    const eventType = evt.type;
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`
    );
    console.log("Webhook payload:", evt.data);

    if (evt.type === "user.created") {
      console.log("Creating userId:", evt.data.id);
      const clerkId = evt.data.id;
      const email = evt.data.email_addresses[0].email_address;
      const name = `${evt.data.first_name} ${evt.data.last_name}`;

      console.log("New User Data: ", clerkId, name, email);
    } else if (evt.type === "user.deleted") {
      console.log("Deleting userId:", evt.data.id);
    } else if (evt.type === "user.updated") {
      console.log("Updating userId: ", evt.data.id);
    } else {
      return new Response("Error: Couldnot find the event type.");
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}

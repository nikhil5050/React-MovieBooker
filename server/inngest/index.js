import { Inngest } from "inngest";
import User from "../models/User.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });

// Inngest function to save user data to the database
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    try {
      const { id, first_name, last_name, email_addresses, image_url } = event.data;

      const userData = {
        _id: id,
        email: email_addresses[0].email_address, 
        name: `${first_name} ${last_name}`,
        image: image_url,
      };

      await User.create(userData);

      return { status: "completed" }; 
    } catch (error) {
      console.error("Error syncing user from Clerk:", error);
      throw error;
    }
  }
);

// Inngest function to delete user from database
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    try {
      const { id } = event.data;
      await User.findByIdAndDelete(id);
      return { status: "completed" };
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
);

// Inngest function to update user data in database
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    try {
      const { id, first_name, last_name, email_addresses, image_url } = event.data;

      const userData = {
        _id: id,
        email: email_addresses[0].email_address, 
        name: `${first_name} ${last_name}`,
        image: image_url,
      };

      await User.findByIdAndUpdate(id, userData);
      return { status: "completed" };
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }
);

export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];

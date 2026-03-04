import type { Express } from "express";
import { createServer, type Server } from "http";

interface ContactSubmission {
  name: string;
  email: string;
  sport: string;
  message: string;
  submittedAt: string;
}

const submissions: ContactSubmission[] = [];

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // POST /api/contact — save contact form submission
  app.post("/api/contact", (req, res) => {
    const { name, email, sport, message } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required." });
    }
    submissions.push({
      name,
      email,
      sport: sport || "",
      message: message || "",
      submittedAt: new Date().toISOString(),
    });
    return res.json({ ok: true });
  });

  // TODO: POST /api/payments/order — Razorpay order creation (future)
  // TODO: POST /api/bookings — Session booking (future)

  return httpServer;
}

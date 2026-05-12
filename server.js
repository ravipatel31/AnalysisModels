import express, { response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRoutes from "./routes/ai.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/ai", aiRoutes);


const MOCK_TRANSACTIONS = [
  {
    id: "000571ab-03c0-4a75-9d44-3bb4c5c37da3",
    dataHolderName: "Ankit Patel",
    accountId: "18d7fdf6-a98c-4111-af3d-a62573b61eb7",
    type: "PAYMENT",
    status: "POSTED",
    description: "Amazon Australia Services - Visa Purchase - Receipt 56528271 MELBOURNE Date 2026-05-06 Card 491684xxxxxx8665",
    postingDateTime: "2026-05-06T10:00:02+10:00",
    amount: "34",
    reference: "AK573459",   // ← put a real payment_reference_id from your DB here
    modifiedDate: "2026-05-06T10:00:03+10:00",
    isDetailAvailable: false,
  },
  {
    id: "000808f8-113e-430b-b0eb-29bb563ff1db",
    dataHolderName: "Ankit Patel",
    accountId: "7f930b35-bc36-4d34-8a31-004393c00000",
    type: "PAYMENT",
    status: "POSTED",
    description: "UNITED VINEY CREEK KARUAH - EFTPOS Purchase - Receipt 66014754 24 Dec 2026-04-28 Card 491684xxxxxx8665",
    postingDateTime: "2026-04-28T10:00:04+10:00",
    amount: "70",
    reference: "AK573459",   // ← put another real payment_reference_id from your DB here
    modifiedDate: "2026-04-28T10:00:05+10:00",
    isDetailAvailable: false,
  },
  {
    id: "000999aa-dead-beef-cafe-111111111111",
    dataHolderName: "Ankit Patel",
    accountId: "aaaabbbb-cccc-dddd-eeee-ffffffffffff",
    type: "PAYMENT",
    status: "POSTED",
    description: "WOOLWORTHS 1234 - EFTPOS Purchase",
    postingDateTime: "2026-05-10T08:30:00+10:00",
    amount: "69",
    reference: "AK573459", // ← intentionally no user → tests NO_USER path
    modifiedDate: "2026-05-10T08:30:01+10:00",
    isDetailAvailable: false,
  },
];

app.get("/", (req, res) => {
  res.send("AI Server is running...");
});

app.get("/transactions", (req, res) => {
  // res.send("AI Server is running...");
  return res.status(200).json(MOCK_TRANSACTIONS)
});

app.post("/create-transactions", (req, res) => {
  const transactions = req.body;

  // Validate that request body is an array
  if (!Array.isArray(transactions)) {
    return res.status(400).json({
      success: false,
      message: "Request body must be an array of transactions",
    });
  }

  // Clear existing transactions
  MOCK_TRANSACTIONS.length = 0;

  // Replace with new transactions
  MOCK_TRANSACTIONS.push(...transactions);

  // Return updated array
  return res.status(200).json({
    success: true,
    message: "Transactions replaced successfully",
    data: MOCK_TRANSACTIONS,
    count: MOCK_TRANSACTIONS.length,
  });
});



const server = app.listen(5000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

server.timeout = 600000;
server.keepAliveTimeout = 600000;
server.headersTimeout = 600000;
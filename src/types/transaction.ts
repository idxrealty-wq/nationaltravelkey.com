// ============================================
// NTK Transaction Types
// Collection: ntk_transactions/{transactionId}
// Status: LOCKED | Last Updated: 2026-04-09
// ============================================

import { Timestamp } from "firebase/firestore";
import {
  TransactionType,
  PaymentProcessor,
  TransactionStatus,
} from "./enums";

export interface NtkTransaction {
  transactionId: string;
  userId: string | null;
  supplierId: string | null;
  transactionType: TransactionType;
  amount: number;
  currency: string;
  paymentProcessor: PaymentProcessor;
  processorTransactionId: string;
  status: TransactionStatus;
  description: string;
  membershipId: string | null;
  invoiceUrl: string | null;
  refundedAt: Timestamp | null;
  refundAmount: number | null;
  refundReason: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

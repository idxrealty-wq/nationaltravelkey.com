// ============================================
// NTK Card Types
// Collection: ntk_cards/{userId}
// Status: LOCKED | Last Updated: 2026-04-09
// ============================================

import { Timestamp } from "firebase/firestore";
import { CardType, CardStatus } from "./enums";

export interface NtkCard {
  userId: string;
  cardNumber: string;
  cardType: CardType;
  qrCodeUrl: string;
  nfcEnabled: boolean;
  issueDate: Timestamp;
  expirationDate: Timestamp;
  status: CardStatus;
  blockedAt: Timestamp | null;
  blockReason: string | null;
  replacementCardId: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

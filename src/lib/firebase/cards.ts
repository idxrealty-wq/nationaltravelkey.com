// ============================================
// NTK Card Helpers
// Path: src/lib/firebase/cards.ts
// Status: LOCKED | Last Updated: 2026-04-09
// ============================================

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";
import { NtkCard } from "../../types/card";
import { CardType, CardStatus } from "../../types/enums";

export async function getCard(userId: string): Promise<NtkCard | null> {
  const snap = await getDoc(doc(db, "ntk_cards", userId));
  return snap.exists() ? (snap.data() as NtkCard) : null;
}

export async function issueCard(
  userId: string,
  cardNumber: string,
  cardType: CardType,
  qrCodeUrl: string,
  nfcEnabled: boolean,
  expirationDate: Timestamp
): Promise<void> {
  await setDoc(doc(db, "ntk_cards", userId), {
    userId,
    cardNumber,
    cardType,
    qrCodeUrl,
    nfcEnabled,
    issueDate: serverTimestamp(),
    expirationDate,
    status: CardStatus.ACTIVE,
    blockedAt: null,
    blockReason: null,
    replacementCardId: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function blockCard(
  userId: string,
  reason: string
): Promise<void> {
  await updateDoc(doc(db, "ntk_cards", userId), {
    status: CardStatus.BLOCKED,
    blockedAt: serverTimestamp(),
    blockReason: reason,
    updatedAt: serverTimestamp(),
  });
}

export async function unblockCard(userId: string): Promise<void> {
  await updateDoc(doc(db, "ntk_cards", userId), {
    status: CardStatus.ACTIVE,
    blockedAt: null,
    blockReason: null,
    updatedAt: serverTimestamp(),
  });
}

export async function replaceCard(
  userId: string,
  newCardNumber: string,
  newCardType: CardType,
  newQrCodeUrl: string,
  nfcEnabled: boolean,
  newExpirationDate: Timestamp
): Promise<void> {
  const oldCard = await getCard(userId);

  await updateDoc(doc(db, "ntk_cards", userId), {
    status: CardStatus.REPLACED,
    replacementCardId: newCardNumber,
    updatedAt: serverTimestamp(),
  });

  await setDoc(doc(db, "ntk_cards", userId), {
    userId,
    cardNumber: newCardNumber,
    cardType: newCardType,
    qrCodeUrl: newQrCodeUrl,
    nfcEnabled,
    issueDate: serverTimestamp(),
    expirationDate: newExpirationDate,
    status: CardStatus.ACTIVE,
    blockedAt: null,
    blockReason: null,
    replacementCardId: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function getCardStatus(userId: string): Promise<CardStatus | null> {
  const card = await getCard(userId);
  return card ? card.status : null;
}

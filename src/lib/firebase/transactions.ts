// ============================================
// NTK Transaction Helpers
// Path: src/lib/firebase/transactions.ts
// Status: LOCKED | Last Updated: 2026-04-09
// ============================================

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  limit,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";
import { NtkTransaction } from "../../types/transaction";
import {
  TransactionType,
  PaymentProcessor,
  TransactionStatus,
} from "../../types/enums";

export async function getTransaction(
  transactionId: string
): Promise<NtkTransaction | null> {
  const snap = await getDoc(doc(db, "ntk_transactions", transactionId));
  return snap.exists() ? (snap.data() as NtkTransaction) : null;
}

export async function createTransaction(
  data: Omit<NtkTransaction, "transactionId" | "createdAt" | "updatedAt">
): Promise<string> {
  const transactionId = doc(collection(db, "ntk_transactions")).id;
  await setDoc(doc(db, "ntk_transactions", transactionId), {
    ...data,
    transactionId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return transactionId;
}

export async function updateTransactionStatus(
  transactionId: string,
  status: TransactionStatus
): Promise<void> {
  await updateDoc(doc(db, "ntk_transactions", transactionId), {
    status,
    updatedAt: serverTimestamp(),
  });
}

export async function processRefund(
  transactionId: string,
  refundAmount: number,
  reason: string
): Promise<void> {
  await updateDoc(doc(db, "ntk_transactions", transactionId), {
    status: TransactionStatus.REFUNDED,
    refundedAt: serverTimestamp(),
    refundAmount,
    refundReason: reason,
    updatedAt: serverTimestamp(),
  });
}

export async function getTransactionsByUser(
  userId: string,
  maxResults: number = 50
): Promise<NtkTransaction[]> {
  const q = query(
    collection(db, "ntk_transactions"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
    limit(maxResults)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as NtkTransaction);
}

export async function getTransactionsBySupplier(
  supplierId: string,
  maxResults: number = 50
): Promise<NtkTransaction[]> {
  const q = query(
    collection(db, "ntk_transactions"),
    where("supplierId", "==", supplierId),
    orderBy("createdAt", "desc"),
    limit(maxResults)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as NtkTransaction);
}

export async function getTransactionsByType(
  transactionType: TransactionType,
  maxResults: number = 50
): Promise<NtkTransaction[]> {
  const q = query(
    collection(db, "ntk_transactions"),
    where("transactionType", "==", transactionType),
    orderBy("createdAt", "desc"),
    limit(maxResults)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as NtkTransaction);
}

export async function getTransactionsByStatus(
  status: TransactionStatus,
  maxResults: number = 50
): Promise<NtkTransaction[]> {
  const q = query(
    collection(db, "ntk_transactions"),
    where("status", "==", status),
    orderBy("createdAt", "desc"),
    limit(maxResults)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as NtkTransaction);
}

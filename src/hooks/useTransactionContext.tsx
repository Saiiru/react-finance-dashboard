import React, { ReactNode } from 'react'
import {
  STORAGE_KEY, Transaction, TransactionInput, addTransaction, readTransactions
} from '../services/transaction-store'

interface TransactionsProviderProps { children: ReactNode }
interface TransactionContextData {
  transactions: Transaction[]
  createTransaction: (input: TransactionInput) => Promise<void>
  resetTransactions: () => void
  isLocal: true
}
export const transactionContext = React.createContext<TransactionContextData>({} as TransactionContextData)

function initialTransactions() {
  return readTransactions({
    getItem: key => {
      try { return window.localStorage.getItem(key) } catch { return null }
    }
  })
}
function persist(transactions: Transaction[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
  } catch {
    // Storage may be disabled in private browsing; the in-memory demo still works.
  }
}

export function TransactionProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = React.useState<Transaction[]>(initialTransactions)

  async function createTransaction(input: TransactionInput) {
    const updated = addTransaction(transactions, input, window.crypto.randomUUID(), new Date().toISOString())
    setTransactions(updated)
    persist(updated)
  }
  function resetTransactions() {
    try { window.localStorage.removeItem(STORAGE_KEY) } catch { /* local state still resets */ }
    setTransactions(initialTransactions())
  }
  return <transactionContext.Provider value={{ transactions, createTransaction, resetTransactions, isLocal: true }}>
    {children}
  </transactionContext.Provider>
}
export function useTransactions() { return React.useContext(transactionContext) }

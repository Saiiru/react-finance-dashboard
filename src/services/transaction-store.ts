/**
 * Offline-only demo. There are no bank connections, remote APIs or real accounts.
 * Values are validated and rounded to two decimal places before storage.
 */
export const STORAGE_KEY = 'sairu-finance-dashboard-demo-v1'

export type Transaction = {
  id: string
  title: string
  amount: number
  type: 'deposit' | 'withdraw'
  category: string
  createdAt: string
}
export type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>

export const seedTransactions: Transaction[] = [
  { id: 'sample-1', title: 'Projeto freelancer (exemplo)', type: 'deposit', amount: 6000, category: 'Trabalho', createdAt: '2026-01-10T12:00:00.000Z' },
  { id: 'sample-2', title: 'Aluguel (exemplo)', type: 'withdraw', amount: 400, category: 'Moradia', createdAt: '2026-01-11T12:00:00.000Z' },
  { id: 'sample-3', title: 'Compras (exemplo)', type: 'withdraw', amount: 200, category: 'Casa', createdAt: '2026-01-12T12:00:00.000Z' }
]

export function validateTransaction(input: TransactionInput): TransactionInput {
  const title = typeof input.title === 'string' ? input.title.trim() : ''
  const category = typeof input.category === 'string' ? input.category.trim() : ''
  if (!title || title.length > 100 || !category || category.length > 60) {
    throw new Error('Preencha título e categoria (até 100 e 60 caracteres).')
  }
  if (input.type !== 'deposit' && input.type !== 'withdraw') {
    throw new Error('Tipo de transação inválido.')
  }
  if (!Number.isFinite(input.amount) || input.amount <= 0 || input.amount > 100000000) {
    throw new Error('O valor deve ser positivo e finito.')
  }
  const cents = Math.round(input.amount * 100)
  if (cents < 1) throw new Error('O valor mínimo é R$ 0,01.')
  return { title, category, type: input.type, amount: cents / 100 }
}

export function addTransaction(existing: Transaction[], input: TransactionInput, id: string, now: string): Transaction[] {
  const normalized = validateTransaction(input)
  if (!id || !Number.isFinite(Date.parse(now))) throw new Error('Identificador ou data inválidos.')
  return [...existing, { id, ...normalized, createdAt: now }]
}

export function readTransactions(storage: Pick<Storage, 'getItem'>): Transaction[] {
  try {
    const raw = storage.getItem(STORAGE_KEY)
    if (raw === null) return [...seedTransactions]
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed) || parsed.length > 1000) return [...seedTransactions]
    return parsed.map(item => {
      if (!item || typeof item !== 'object') throw new Error('Invalid stored entry')
      const record = item as Transaction
      const entry = validateTransaction(record)
      if (typeof record.id !== 'string' || !record.id || !Number.isFinite(Date.parse(record.createdAt))) {
        throw new Error('Invalid stored entry')
      }
      return { ...entry, id: record.id, createdAt: record.createdAt }
    })
  } catch {
    return [...seedTransactions]
  }
}

export function summarize(transactions: Transaction[]) {
  const cents = transactions.reduce((total, transaction) => {
    const amount = Math.round(transaction.amount * 100)
    if (transaction.type === 'deposit') total.deposits += amount
    else total.withdraws += amount
    return total
  }, { deposits: 0, withdraws: 0 })
  return { deposits: cents.deposits / 100, withdraws: cents.withdraws / 100, total: (cents.deposits - cents.withdraws) / 100 }
}

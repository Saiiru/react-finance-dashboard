import test from 'node:test'
import assert from 'node:assert/strict'
import { STORAGE_KEY, seedTransactions, validateTransaction, addTransaction, readTransactions, summarize } from '../src/services/transaction-store.ts'

test('fictitious samples and correct balance', () => {
  const list = readTransactions({ getItem: () => null })
  assert.equal(list.length, 3)
  assert(list.every(entry => entry.title.includes('(exemplo)')))
  assert.equal(summarize(list).total, 5400)
})

test('amount validation and rounding', () => {
  for (const amount of [-10, NaN, Infinity, 0, .001]) {
    assert.throws(() => validateTransaction({title:'Teste', category:'Casa', amount, type:'deposit'}))
  }
  const list = addTransaction([], {title:' Compra ', category:' Casa ', amount:10.119, type:'withdraw'}, 'id-1','2026-01-01T00:00:00Z')
  assert.equal(list[0].amount,10.12)
  assert.equal(list[0].title,'Compra')
  assert.equal(summarize(list).total,-10.12)
})

test('currency uses integer cents and avoids rounding error', () => {
  const entries = [
    ...addTransaction([], {title:'A',category:'B',amount:.1,type:'deposit'}, 'a','2026-01-01T00:00:00Z'),
    ...addTransaction([], {title:'B',category:'C',amount:.2,type:'deposit'}, 'b','2026-01-01T00:00:00Z')
  ]
  assert.equal(summarize(entries).total,.3)
})

test('local data persists and malformed storage falls back safely', () => {
  const value = JSON.stringify(addTransaction([],{title:'Teste',category:'A',amount:7,type:'deposit'},'abc','2026-01-01T00:00:00Z'))
  assert.equal(readTransactions({getItem:(key)=>{assert.equal(key,STORAGE_KEY);return value}}).length,1)
  assert.equal(readTransactions({getItem:()=>'{bad'}).length,seedTransactions.length)
  assert.equal(readTransactions({getItem:()=>JSON.stringify([{amount:-3,id:'broken'}])}).length,seedTransactions.length)
})

test('rejects invalid categories, transaction types, dates and IDs', () => {
  const valid = {title:'A',category:'B',amount:1,type:'deposit'}
  assert.throws(()=>validateTransaction({...valid,title:' '}))
  assert.throws(()=>validateTransaction({...valid,type:'unknown'}))
  assert.throws(()=>addTransaction([],valid,'','2026-01-01T00:00:00Z'))
  assert.throws(()=>addTransaction([],valid,'id','invalid'))
})

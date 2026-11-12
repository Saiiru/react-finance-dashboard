import React, { FormEvent } from "react";

import ReactModal from "react-modal";
import {Container, TransactionTypeContainer, RadioBox } from './style'
import CloseImg from '../../assets/Close.svg'
import IncomeImg from "../../assets/Entradas.svg";
import OutcomeImg from "../../assets/Saidas.svg";
import { useTransactions } from "../../hooks/useTransactionContext";

interface TransactionModalProps {
  onNewTransactionModalClosed: () => void,
  isNewTransactionModalOpen: boolean
}


export  function NewTransactionModal({onNewTransactionModalClosed, isNewTransactionModalOpen}: TransactionModalProps) {
  const [type, setType] =  React.useState<'deposit' | 'withdraw'>('deposit')
  const [title, setTitle] = React.useState("")
  const [amount, setAmount] = React.useState(0)
  const [category, setCategory] = React.useState("")
  const {createTransaction} = useTransactions()
  const [error, setError] = React.useState('')
 async function handleCreateNewTransaction(event:  FormEvent ) {
    event.preventDefault()
    try {
      await createTransaction({ title, amount, type, category })
      setError('')
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Não foi possível salvar a transação.')
      return
    }
    setTitle('')
    setAmount(0)
    setCategory('')
    setType('deposit')
    onNewTransactionModalClosed()
  }
  return (
      <ReactModal
       isOpen={isNewTransactionModalOpen}
       onRequestClose={onNewTransactionModalClosed}
       overlayClassName={"react-modal-overlay"}
       className={"react-modal-content"}
       >
         <button
          type="button"
          onClick={onNewTransactionModalClosed}
          className="react-modal-close">
          <img src={CloseImg} alt="Fechar Modal" 
           />
         </button> 
         <Container onSubmit={handleCreateNewTransaction} method="post">
           <h2>Nova transação de exemplo</h2>
           {error && <p role="alert" style={{color:'#c5003c',marginBottom:'12px'}}>{error}</p>}

           <input type="text" aria-label="Título da transação" required maxLength={100} placeholder="Título" value={title} onChange={event => setTitle(event.target.value)}/>
           <input type="number" aria-label="Valor da transação em reais" min="0.01" step="0.01" required placeholder="Valor em reais" value={amount} onChange={event => setAmount(Number(event.target.value))} />

            <TransactionTypeContainer>
              <RadioBox type="button" 
              onClick={()=> setType('deposit')}
              isActive={type === 'deposit'}
              activeColor="green"
              
              >
                <img src={IncomeImg} alt="Income"  />
                <span>Income</span>
              </RadioBox>
              <RadioBox type="button" 
              onClick={()=> setType('withdraw')}
              isActive={type === 'withdraw'}
              activeColor="red"
              >
                <img src={OutcomeImg} alt="Outcome" />
                <span>Withdraw</span>
              </RadioBox>
            </TransactionTypeContainer>

           <input aria-label="Categoria da transação" required maxLength={60} placeholder="Categoria" value={category} onChange={event => setCategory(event.target.value)}/>

           <button type="submit">Adicionar transação</button>

         </Container>
        
      </ReactModal>
    
  )
}

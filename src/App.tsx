import React from 'react';
import ReactModal from 'react-modal';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { NewTransactionModal } from './components/NewTransactionModal';
import { GlobalStyle } from './styles/global';
import {  TransactionProvider } from './hooks/useTransactionContext';

ReactModal.setAppElement("#root")

function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = React.useState(false)

  function handleOpenNewTransactionModal(){
    setIsNewTransactionModalOpen(true)
  }

  function handleCloseNewTransactionModal(){
    setIsNewTransactionModalOpen(false)

  }

  return (
    <TransactionProvider>
      <Header  onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
      <p role="status" className="demo-notice">DEMONSTRATIVO LOCAL · Dados fictícios armazenados apenas neste navegador. Sem conexão bancária.</p>
      <Dashboard />

      <NewTransactionModal onNewTransactionModalClosed={handleCloseNewTransactionModal} isNewTransactionModalOpen={isNewTransactionModalOpen}/>
      <GlobalStyle />
     
    </TransactionProvider>
  );
}

export default App;

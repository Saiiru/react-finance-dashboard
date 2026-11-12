import { useTransactions } from "../../hooks/useTransactionContext";
import { Container } from "./style";



export function TransactionTable() {
  const {transactions} = useTransactions()

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 && <tr><td colSpan={4}>Ainda não há transações neste demonstrativo.</td></tr>}
          {transactions.map(transaction=>(
              <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>{new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(transaction.amount)}</td>
              <td>{transaction.category}</td>
              <td>{new Intl.DateTimeFormat('pt-BR', {
                
              }).format(new Date(transaction.createdAt))}</td>
            </tr>))
          }
        
         
        </tbody>
      </table>
    </Container>
  );
}

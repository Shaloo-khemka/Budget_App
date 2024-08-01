import { Container, Button, Stack } from "react-bootstrap";
import BudgetCard from './components/BudgetCard'
import AddBudgetModal from "./components/AddBudgetModal";
import ViewExpensesModal from "./components/ViewExpensesModal";
import { useState } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";
import AddExpenseModal from "./components/AddExpenseModal";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard"

function App() {
  const [showAddbudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [AddExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const [ViewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState()

  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1> {/* margin at the end should be auto hence taking all possible space */}
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budgets</Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
        </Stack>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
          alignItems: "flex-start"
        }}>
          {
            budgets.map(budget => {
              const amount = getBudgetExpenses(budget.id).reduce((total,
                expense) => total + expense.amount, 0)
              return (
                <BudgetCard
                  key={budget.id}
                  name={budget.name}
                  amount={amount}
                  max={budget.max}
                  gray
                  onAddExpenseClick={()=>openAddExpenseModal(budget.id)}
                  onViewExpenseClick={()=>setViewExpenseModalBudgetId(budget.id)}
                   />)
            })
          }
          <UncategorizedBudgetCard 
          onAddExpenseClick={openAddExpenseModal}
          onViewExpenseClick={()=>setViewExpenseModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddbudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        handleClose={()=>setShowAddExpenseModal(false)}
        defaultBudgetId={AddExpenseModalBudgetId}
      />
      <ViewExpensesModal
      budgetId={ViewExpenseModalBudgetId}
      handleClose={()=>setViewExpenseModalBudgetId()}
       />
    </>
  )
}

export default App;

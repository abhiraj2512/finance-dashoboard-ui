import { FinanceProvider } from "./context/FinanceContext";
import { DashboardPage } from "./pages/DashboardPage";

function App() {
  return (
    <FinanceProvider>
      <DashboardPage />
    </FinanceProvider>
  );
}

export default App;

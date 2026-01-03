import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { BetPanel } from './components/BetPanel/BetPanel'
import { FieldWrapper } from './components/FieldWrapper/FieldWrapper'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}> 
    <div className='slot_container'>
      <BetPanel />
      <FieldWrapper/>
      </div>
    </QueryClientProvider>
  )
}

export default App

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


import './App.css'

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* <TooltipProvider> */}

    <h1>Welcome to the React App!</h1>

    {/* </TooltipProvider> */}
  </QueryClientProvider>
)
  


export default App

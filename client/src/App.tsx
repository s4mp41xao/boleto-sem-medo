import { ChatInterface } from './components/ChatInterface';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <ChatInterface />
      </div>
    </div>
  );
}

export default App;

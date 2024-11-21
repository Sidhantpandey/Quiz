import React from 'react';
import { Brain } from 'lucide-react';
import Quiz from './components/Quiz';
import ConsultationForm from './components/ConsultationForm';
import Login from './components/Login';
import { useAuth } from './context/AuthContext';

function App() {
  const [showConsultation, setShowConsultation] = React.useState(false);
  const { user, logout } = useAuth();

  if (!user) {
    return <Login />;
  }

  if (showConsultation) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Brain className="h-8 w-8 text-primary mr-3" />
                <h1 className="text-2xl font-bold text-card-foreground">Mental Health Assessment</h1>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowConsultation(false)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Back to Assessment
                </button>
                <button
                  onClick={logout}
                  className="text-sm text-rose-500 hover:text-rose-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>
        <main>
          <ConsultationForm />
        </main>
        <footer className="bg-card border-t border-border mt-8">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-muted-foreground">
              Note: This assessment is for informational purposes only and should not be considered as a substitute for professional medical advice.
            </p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-primary mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-card-foreground">Mental Health Assessment</h1>
                <p className="text-sm text-muted-foreground">Welcome, {user.name}!</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="text-sm text-rose-500 hover:text-rose-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main>
        <Quiz setShowConsultation={setShowConsultation} />
      </main>
      <footer className="bg-card border-t border-border mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            Note: This assessment is for informational purposes only and should not be considered as a substitute for professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
import { useState, useEffect } from 'react';
import { Package } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import TicketCard from './components/TicketCard';
import SettingsModal from './components/SettingsModal';
import MedicineRequestModal from './components/MedicineRequestModal';
import { useTicketNumbers } from './hooks/useTicketNumbers';
import { loadSettings, saveSettings } from './utils/localStorage';
import { DisplaySettings } from './types';
import { SignalRProvider } from './contexts/SignalRContext';
import { ServerSettingsProvider, useServerSettings } from './contexts/ServerSettingsContext';
import { UserProvider, useUser } from './contexts/UserContext';

function AppContent() {
  const { currentStationName, isLoading: isServerSettingsLoading } = useServerSettings();
  const { selectedUser, availableUsers, isLoggedIn, isLoading: isUserLoading } = useUser();
  const [settings, setSettings] = useState<DisplaySettings>(loadSettings());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMedicineRequestOpen, setIsMedicineRequestOpen] = useState(false);

  const handleMedicineRequest = () => {
    setIsMedicineRequestOpen(true);
  };

  const tickets = useTicketNumbers(settings);

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const visibleTickets = tickets.filter(ticket => ticket.visible);

  const getTicketColors = (id: string): { bgColor: string; textColor: string } => {
    switch (id) {
      case 'outpatient-odd':
        return { bgColor: 'bg-blue-500', textColor: 'text-white' };
      case 'outpatient-even':
        return { bgColor: 'bg-cyan-500', textColor: 'text-white' };
      case 'emergency':
        return { bgColor: 'bg-red-500', textColor: 'text-white' };
      case 'inpatient':
        return { bgColor: 'bg-green-500', textColor: 'text-white' };
      default:
        return { bgColor: 'bg-slate-500', textColor: 'text-white' };
    }
  };

  if (isServerSettingsLoading || isUserLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">載入中...</p>
        </div>
      </div>
    );
  }

  return (
    <SignalRProvider stationName={currentStationName} onMedicineRequest={handleMedicineRequest}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
        <Header
          stationName={currentStationName}
          userName={isLoggedIn ? selectedUser.name : '未登入'}
          userRole={isLoggedIn ? (selectedUser.role || '使用者') : ''}
          onSettingsClick={() => setIsSettingsOpen(true)}
        />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {visibleTickets.map(ticket => {
            const colors = getTicketColors(ticket.id);
            return (
              <TicketCard
                key={ticket.id}
                title={ticket.title}
                number={ticket.currentNumber}
                bgColor={colors.bgColor}
                textColor={colors.textColor}
              />
            );
          })}
        </div>

        {visibleTickets.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500 text-lg">請在設定中選擇要顯示的視窗</p>
          </div>
        )}
      </main>

      <button
        onClick={() => setIsMedicineRequestOpen(true)}
        disabled={!isLoggedIn}
        className={`fixed bottom-8 right-8 p-4 rounded-full shadow-lg transition-all ${
          isLoggedIn
            ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-110 cursor-pointer'
            : 'bg-gray-400 text-gray-200 cursor-not-allowed'
        }`}
        aria-label="藥品申領"
        title={!isLoggedIn ? '請先選擇登入人員' : '藥品申領'}
      >
        <Package className="w-6 h-6" />
      </button>

      <Footer />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSettingsChange={setSettings}
      />

        <MedicineRequestModal
          isOpen={isMedicineRequestOpen}
          onClose={() => setIsMedicineRequestOpen(false)}
          userName={isLoggedIn ? selectedUser.name : '未登入'}
          userID={isLoggedIn ? selectedUser.id : ''}
        />
      </div>
    </SignalRProvider>
  );
}

function App() {
  return (
    <ServerSettingsProvider>
      <AppWrapper />
    </ServerSettingsProvider>
  );
}

function AppWrapper() {
  const { currentStationName } = useServerSettings();

  return (
    <UserProvider currentStationName={currentStationName}>
      <AppContent />
    </UserProvider>
  );
}

export default App;

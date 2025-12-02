import { X } from 'lucide-react';
import { DisplaySettings } from '../types';
import { useServerSettings } from '../contexts/ServerSettingsContext';
import { useUser } from '../contexts/UserContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: DisplaySettings;
  onSettingsChange: (settings: DisplaySettings) => void;
}

export default function SettingsModal({ isOpen, onClose, settings, onSettingsChange }: SettingsModalProps) {
  const { stations, currentStationName, setCurrentStationName } = useServerSettings();
  const { availableUsers, selectedUser, setSelectedUser } = useUser();

  if (!isOpen) return null;

  const handleToggle = (key: keyof DisplaySettings) => {
    onSettingsChange({
      ...settings,
      [key]: !settings[key],
    });
  };

  const handleStationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentStationName(event.target.value);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = event.target.value;
    if (userId === '') {
      setSelectedUser(null);
    } else {
      const user = availableUsers.find(u => u.guid === userId);
      if (user) {
        setSelectedUser(user);
      }
    }
  };

  const options = [
    { key: 'showOutpatientOdd' as keyof DisplaySettings, label: '顯示門診單號' },
    { key: 'showOutpatientEven' as keyof DisplaySettings, label: '顯示門診雙號' },
    { key: 'showEmergency' as keyof DisplaySettings, label: '顯示急診' },
    { key: 'showInpatient' as keyof DisplaySettings, label: '顯示住院' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800">監控視窗顯示設定</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="關閉"
          >
            <X className="w-6 h-6 text-slate-600" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="pb-4 border-b border-slate-200">
            <label htmlFor="station-select" className="block text-lg text-slate-700 mb-2">
              調劑台選擇
            </label>
            <select
              id="station-select"
              value={currentStationName}
              onChange={handleStationChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
            >
              {stations.map((station) => (
                <option key={station.name} value={station.name}>
                  {station.name}
                </option>
              ))}
            </select>
          </div>

          <div className="pb-4 border-b border-slate-200">
            <label htmlFor="user-select" className="block text-lg text-slate-700 mb-2">
              登入人員
            </label>
            <select
              id="user-select"
              value={selectedUser?.guid || ''}
              onChange={handleUserChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
              disabled={availableUsers.length === 0}
            >
              {availableUsers.length === 0 ? (
                <option value="">未登入</option>
              ) : (
                <>
                  <option value="">請選擇登入人員</option>
                  {availableUsers.map((user) => (
                    <option key={user.guid} value={user.guid}>
                      {user.name} ({user.id})
                    </option>
                  ))}
                </>
              )}
            </select>
            {availableUsers.length === 0 && (
              <p className="mt-2 text-sm text-red-600">目前沒有登入人員</p>
            )}
          </div>

          {options.map(option => (
            <div key={option.key} className="flex items-center justify-between py-3">
              <label htmlFor={option.key} className="text-lg text-slate-700 cursor-pointer">
                {option.label}
              </label>
              <button
                id={option.key}
                role="switch"
                aria-checked={settings[option.key]}
                onClick={() => handleToggle(option.key)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  settings[option.key] ? 'bg-green-500' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings[option.key] ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-slate-200">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
}

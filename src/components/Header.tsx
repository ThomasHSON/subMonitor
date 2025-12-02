import { Settings } from 'lucide-react';

interface HeaderProps {
  stationName: string;
  userName: string;
  userRole: string;
  onSettingsClick: () => void;
}

export default function Header({ stationName, userName, userRole, onSettingsClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-md px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">
          {stationName}
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-slate-600">
            登入人員：<span className="font-medium">{userName}</span> / {userRole}
          </span>
          <button
            onClick={onSettingsClick}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="設定"
          >
            <Settings className="w-6 h-6 text-slate-600" />
          </button>
        </div>
      </div>
    </header>
  );
}

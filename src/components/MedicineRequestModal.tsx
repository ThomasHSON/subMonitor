import { useState, useEffect } from 'react';
import { X, Package, Pill } from 'lucide-react';
import { medicineRequestsStore, removeMedicineRequests } from '../contexts/SignalRContext';
import { MedicineRequest } from '../types';
import { addMedicineRequest, sendMessage } from '../services/medicineApi';
import { useServerSettings } from '../contexts/ServerSettingsContext';

interface MedicineRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  userID?: string;
}

export default function MedicineRequestModal({
  isOpen,
  onClose,
  userName = '王小明',
  userID = 'USER001'
}: MedicineRequestModalProps) {
  const { pharmacies } = useServerSettings();
  const [requests, setRequests] = useState<MedicineRequest[]>([...medicineRequestsStore]);
  const [isProcessing, setIsProcessing] = useState(false);

  const issuingUnit = pharmacies.length > 0 ? pharmacies[0].name : '';

  useEffect(() => {
    if (!isOpen) return;

    setRequests([...medicineRequestsStore]);

    const handleUpdate = () => {
      setRequests([...medicineRequestsStore]);
    };

    window.addEventListener('medicineRequestUpdate', handleUpdate);

    return () => {
      window.removeEventListener('medicineRequestUpdate', handleUpdate);
    };
  }, [isOpen]);

  const handleCreate = async (index: number) => {
    if (isProcessing) return;

    setIsProcessing(true);
    try {
      const requestToCreate = requests[index];
      const response = await addMedicineRequest([requestToCreate], userName, userID, issuingUnit);

      if (response.Code === 200) {
        let temp_data = response;
        temp_data.Data = [requestToCreate];
        await sendMessage(temp_data);
        console.log('申領單據建立成功');
      } else {
        console.error('建立申領單據失敗:', response);
        alert(`建立失敗: ${response.Message || '未知錯誤'}`);
      }
    } catch (error) {
      console.error('建立申領單據時發生錯誤:', error);
      alert('建立申領單據時發生錯誤');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCreateAll = async () => {
    if (isProcessing || requests.length === 0) return;

    setIsProcessing(true);
    try {
      const response = await addMedicineRequest(requests, userName, userID, issuingUnit);

      if (response.Code === 200) {
        let temp_data = response;
        temp_data.Data = requests
        await sendMessage(temp_data);
        console.log('所有申領單據建立成功');
      } else {
        console.error('建立申領單據失敗:', response);
        alert(`建立失敗: ${response.Message || '未知錯誤'}`);
      }
    } catch (error) {
      console.error('建立申領單據時發生錯誤:', error);
      alert('建立申領單據時發生錯誤');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-800">藥品申領通知</h2>
            {requests.length > 0 && (
              <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                {requests.length}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="關閉"
          >
            <X className="w-6 h-6 text-slate-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {requests.length === 0 ? (
            <div className="text-center text-slate-500 py-8">
              <Package className="w-16 h-16 mx-auto mb-4 text-slate-300" />
              <p className="text-lg">目前沒有申領訊息</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {requests.map((request, index) => {
                const isEmergency = request.actionType === '緊急申領';
                const bgColor = isEmergency ? 'bg-red-50' : 'bg-yellow-50';
                const borderColor = isEmergency ? 'border-red-200' : 'border-yellow-200';

                return (
                  <div
                    key={index}
                    className={`${bgColor} border ${borderColor} rounded-lg p-5 hover:shadow-md transition-shadow`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1 flex items-center">
                        <div className="pr-6">
                          <h3 className="text-lg font-bold text-slate-800 mb-1">
                            {request.name || '未知藥品'}
                          </h3>
                          <p className="text-base text-slate-700 font-medium">
                            {request.code || 'N/A'}
                          </p>
                        </div>
                        <button
                          onClick={() => handleCreate(index)}
                          disabled={isProcessing}
                          className="bg-blue-600 flex items-center text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap disabled:bg-slate-400 disabled:cursor-not-allowed"
                        >
                          {isProcessing ? '處理中...' : '建立'}
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        {isEmergency && (
                          <div className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            <span>{request.actionType}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white bg-opacity-50 rounded-lg p-3">
                        <p className="text-base font-semibold text-slate-800">
                          {request.requestingUnit || 'N/A'}
                        </p>
                      </div>
                      <div className="bg-white bg-opacity-50 rounded-lg p-3">
                        <p className="text-base font-semibold text-slate-800">
                          {request.requestedQuantity || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {requests.length > 0 && (
          <div className="p-4 border-t border-slate-200">
            <button
              onClick={handleCreateAll}
              disabled={isProcessing}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              {isProcessing ? '處理中...' : '全部建立'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

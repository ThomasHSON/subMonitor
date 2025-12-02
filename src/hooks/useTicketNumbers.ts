import { useState, useEffect } from 'react';
import { TicketDisplay, TicketType, DisplaySettings } from '../types';

const initialTickets: TicketDisplay[] = [
  {
    id: 'outpatient-odd',
    title: '門診單號',
    currentNumber: 1001,
    baseNumber: 1001,
    intervalMs: 5 * 60 * 1000,
    increment: 2,
    visible: true,
  },
  {
    id: 'outpatient-even',
    title: '門診雙號',
    currentNumber: 1002,
    baseNumber: 1002,
    intervalMs: 5 * 60 * 1000,
    increment: 2,
    visible: true,
  },
  {
    id: 'emergency',
    title: '急診',
    currentNumber: 9001,
    baseNumber: 9001,
    intervalMs: 2 * 60 * 1000,
    increment: 1,
    visible: true,
  },
  {
    id: 'inpatient',
    title: '住院',
    currentNumber: 6001,
    baseNumber: 6001,
    intervalMs: 3 * 60 * 1000 + 10 * 1000,
    increment: 1,
    visible: true,
  },
];

export function useTicketNumbers(settings: DisplaySettings) {
  const [tickets, setTickets] = useState<TicketDisplay[]>(initialTickets);

  useEffect(() => {
    setTickets(prev => prev.map(ticket => ({
      ...ticket,
      visible: getVisibility(ticket.id, settings),
    })));
  }, [settings]);

  useEffect(() => {
    const timers = tickets.map(ticket => {
      return setInterval(() => {
        setTickets(prev =>
          prev.map(t =>
            t.id === ticket.id
              ? { ...t, currentNumber: t.currentNumber + t.increment }
              : t
          )
        );
      }, ticket.intervalMs);
    });

    return () => {
      timers.forEach(timer => clearInterval(timer));
    };
  }, []);

  return tickets;
}

function getVisibility(id: TicketType, settings: DisplaySettings): boolean {
  switch (id) {
    case 'outpatient-odd':
      return settings.showOutpatientOdd;
    case 'outpatient-even':
      return settings.showOutpatientEven;
    case 'emergency':
      return settings.showEmergency;
    case 'inpatient':
      return settings.showInpatient;
    default:
      return true;
  }
}

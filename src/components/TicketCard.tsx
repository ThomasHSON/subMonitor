interface TicketCardProps {
  title: string;
  number: number;
  bgColor: string;
  textColor: string;
}

export default function TicketCard({ title, number, bgColor, textColor }: TicketCardProps) {
  return (
    <div className={`${bgColor} rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow`}>
      <h2 className={`text-3xl font-bold ${textColor} mb-6`}>{title}</h2>
      <div className="text-center">
        <p className={`text-7xl font-bold ${textColor} tabular-nums`}>{number}</p>
      </div>
    </div>
  );
}

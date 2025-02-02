import React from 'react';
import { FileCheck, FileX, Clock, Files } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => (
  <div className={`bg-navy-800 rounded-xl p-6 ${color} shadow-lg`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <h3 className="text-2xl font-bold mt-2 text-white">{value}</h3>
      </div>
      <div className="text-white opacity-80">{icon}</div>
    </div>
  </div>
);

export const DashboardOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Invoices"
        value={1234}
        icon={<Files size={24} />}
        color="hover:shadow-blue-500/20"
      />
      <StatCard
        title="Matched Invoices"
        value={987}
        icon={<FileCheck size={24} />}
        color="hover:shadow-green-500/20"
      />
      <StatCard
        title="Mismatched Invoices"
        value={158}
        icon={<FileX size={24} />}
        color="hover:shadow-red-500/20"
      />
      <StatCard
        title="Pending Verification"
        value={89}
        icon={<Clock size={24} />}
        color="hover:shadow-yellow-500/20"
      />
    </div>
  );
};
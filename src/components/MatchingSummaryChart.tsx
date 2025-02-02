import { BarChart as ChartDot, PieChart } from 'lucide-react';

export const MatchingSummaryChart = () => {
  const stats = {
    matched: 75,
    mismatched: 15,
    pending: 10
  };

  return (
    <div className="bg-navy-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Matching Summary</h2>
        <PieChart className="text-gray-400" size={24} />
      </div>
      
      <div className="space-y-4">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ChartDot 
                  className={`
                    ${key === 'matched' ? 'text-green-500' : ''}
                    ${key === 'mismatched' ? 'text-red-500' : ''}
                    ${key === 'pending' ? 'text-yellow-500' : ''}
                  `}
                  size={20}
                />
                <span className="text-gray-400 capitalize">{key}</span>
              </div>
              <span className="text-white font-medium">{value}%</span>
            </div>
            <div className="w-full bg-navy-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  key === 'matched' ? 'bg-green-500' :
                  key === 'mismatched' ? 'bg-red-500' : 'bg-yellow-500'
                }`}
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
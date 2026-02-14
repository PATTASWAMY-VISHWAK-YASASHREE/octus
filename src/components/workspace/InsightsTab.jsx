const InsightsTab = () => {
  const readinessScore = 78;
  const isReady = readinessScore >= 80;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Release Insights</h2>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-4">Release Readiness Score</div>
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke={readinessScore >= 80 ? '#10b981' : readinessScore >= 60 ? '#f59e0b' : '#ef4444'}
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(readinessScore / 100) * 351.86} 351.86`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-3xl font-bold text-gray-900">{readinessScore}%</div>
            </div>
            <div className={`mt-4 px-4 py-2 rounded-lg font-semibold ${
              isReady ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
            }`}>
              {isReady ? 'Ready to Release' : 'Not Ready'}
            </div>
          </div>
        </div>

        <div className="col-span-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
          <div className="flex items-start space-x-3">
            <div className="text-3xl">🤖</div>
            <div>
              <div className="font-semibold text-gray-900 mb-2">AI Executive Summary</div>
              <p className="text-sm text-gray-700 mb-3">
                Release readiness is 78%. Critical regression detected in Checkout Flow. 2 blocking issues remain.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span className="text-gray-700">Checkout API timeout issue (High Priority)</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span className="text-gray-700">Payment gateway integration failing (High Priority)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Defect Trend</h3>
          <div className="h-64 flex items-end justify-around space-x-2">
            {[12, 15, 10, 8, 6, 9, 5].map((value, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-primary-500 rounded-t"
                  style={{ height: `${(value / 15) * 100}%` }}
                ></div>
                <div className="text-xs text-gray-500 mt-2">W{idx + 1}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Test Coverage</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Unit Tests</span>
                <span className="font-medium text-gray-900">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Integration Tests</span>
                <span className="font-medium text-gray-900">72%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '72%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">E2E Tests</span>
                <span className="font-medium text-gray-900">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Task Hotspot Heatmap</h3>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }).map((_, idx) => {
            const intensity = Math.random();
            return (
              <div
                key={idx}
                className="aspect-square rounded"
                style={{
                  backgroundColor: intensity > 0.7 ? '#ef4444' : intensity > 0.4 ? '#f59e0b' : '#10b981',
                  opacity: 0.3 + intensity * 0.7
                }}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InsightsTab;

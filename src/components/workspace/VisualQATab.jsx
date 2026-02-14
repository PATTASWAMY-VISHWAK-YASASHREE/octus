import { useState } from 'react';

const VisualQATab = () => {
  const [baseline, setBaseline] = useState(null);
  const [comparison, setComparison] = useState(null);
  const [tolerance, setTolerance] = useState(5);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const handleAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResults({
        status: 'FAIL',
        changes: [
          { element: 'Header Logo', type: 'Position Shift', severity: 'High', shift: '12%' },
          { element: 'Login Button', type: 'Color Change', severity: 'Medium', shift: '8%' },
          { element: 'Footer Text', type: 'Font Size', severity: 'Low', shift: '3%' }
        ]
      });
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Visual QA Analysis</h2>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Baseline Screenshot (v1)</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg h-64 flex items-center justify-center">
            {baseline ? (
              <img src={baseline} alt="Baseline" className="max-h-full" />
            ) : (
              <label className="cursor-pointer text-center">
                <div className="text-4xl mb-2">📸</div>
                <div className="text-sm text-gray-600">Click to upload baseline</div>
                <input type="file" className="hidden" onChange={(e) => setBaseline(URL.createObjectURL(e.target.files[0]))} accept="image/*" />
              </label>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Comparison Screenshot (v2)</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg h-64 flex items-center justify-center">
            {comparison ? (
              <img src={comparison} alt="Comparison" className="max-h-full" />
            ) : (
              <label className="cursor-pointer text-center">
                <div className="text-4xl mb-2">📸</div>
                <div className="text-sm text-gray-600">Click to upload comparison</div>
                <input type="file" className="hidden" onChange={(e) => setComparison(URL.createObjectURL(e.target.files[0]))} accept="image/*" />
              </label>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Tolerance (%)</label>
        <input
          type="range"
          min="0"
          max="20"
          value={tolerance}
          onChange={(e) => setTolerance(e.target.value)}
          className="w-full"
        />
        <div className="text-sm text-gray-600 mt-1">{tolerance}%</div>
      </div>

      <button
        onClick={handleAnalysis}
        disabled={!baseline || !comparison || analyzing}
        className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {analyzing ? 'Analyzing...' : 'Run AI Visual Analysis'}
      </button>

      {results && (
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Analysis Results</h3>
            <span className={`px-4 py-2 rounded-lg font-semibold ${results.status === 'PASS' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {results.status}
            </span>
          </div>

          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Element</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Change Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Layout Shift</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {results.changes.map((change, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{change.element}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{change.type}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      change.severity === 'High' ? 'bg-red-100 text-red-700' :
                      change.severity === 'Medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {change.severity}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{change.shift}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VisualQATab;

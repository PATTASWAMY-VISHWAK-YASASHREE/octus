import { useState } from 'react';

const TestGenerationTab = () => {
  const [userStory, setUserStory] = useState('');
  const [acceptanceCriteria, setAcceptanceCriteria] = useState('');
  const [generating, setGenerating] = useState(false);
  const [testCases, setTestCases] = useState([]);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setTestCases([
        {
          id: 'TC001',
          scenario: 'User login with valid credentials',
          steps: '1. Navigate to login\n2. Enter valid email\n3. Enter valid password\n4. Click login',
          expected: 'User is redirected to dashboard',
          severity: 'High',
          edgeCase: false
        },
        {
          id: 'TC002',
          scenario: 'User login with invalid password',
          steps: '1. Navigate to login\n2. Enter valid email\n3. Enter invalid password\n4. Click login',
          expected: 'Error message displayed',
          severity: 'High',
          edgeCase: false
        },
        {
          id: 'TC003',
          scenario: 'User login with empty fields',
          steps: '1. Navigate to login\n2. Leave fields empty\n3. Click login',
          expected: 'Validation errors shown',
          severity: 'Medium',
          edgeCase: true
        }
      ]);
      setGenerating(false);
    }, 2000);
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(testCases, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'test-cases.json';
    a.click();
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Test Generation</h2>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">User Story</label>
            <textarea
              value={userStory}
              onChange={(e) => setUserStory(e.target.value)}
              rows="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="As a user, I want to log in to the system so that I can access my dashboard..."
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Acceptance Criteria</label>
            <textarea
              value={acceptanceCriteria}
              onChange={(e) => setAcceptanceCriteria(e.target.value)}
              rows="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="- User can login with email and password&#10;- Invalid credentials show error&#10;- Successful login redirects to dashboard"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!userStory || generating}
            className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50"
          >
            {generating ? 'Generating...' : 'Generate AI Test Cases'}
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Generated Test Cases</h3>
            {testCases.length > 0 && (
              <button
                onClick={exportJSON}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Export JSON
              </button>
            )}
          </div>

          {testCases.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-2">🤖</div>
              <p>Generate test cases to see results here</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {testCases.map((test) => (
                <div key={test.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-medium text-gray-900">{test.id}: {test.scenario}</div>
                    {test.edgeCase && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                        Edge Case
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 mb-2 whitespace-pre-line">{test.steps}</div>
                  <div className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Expected:</span> {test.expected}
                  </div>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    test.severity === 'High' ? 'bg-red-100 text-red-700' :
                    test.severity === 'Medium' ? 'bg-amber-100 text-amber-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {test.severity}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestGenerationTab;

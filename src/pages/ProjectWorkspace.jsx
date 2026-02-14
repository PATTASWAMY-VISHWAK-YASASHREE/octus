import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectById } from '../services/projectService';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import PlanningTab from '../components/workspace/PlanningTab';
import VisualQATab from '../components/workspace/VisualQATab';
import TestGenerationTab from '../components/workspace/TestGenerationTab';
import InsightsTab from '../components/workspace/InsightsTab';

const ProjectWorkspace = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('planning');

  useEffect(() => {
    loadProject();
  }, [projectId]);

  const loadProject = async () => {
    try {
      const data = await getProjectById(projectId);
      setProject(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!project) return <div>Project not found</div>;

  const tabs = [
    { id: 'planning', label: 'Planning', icon: '📋' },
    { id: 'visual-qa', label: 'Visual QA', icon: '👁️' },
    { id: 'test-generation', label: 'Test Generation', icon: '🧪' },
    { id: 'insights', label: 'Insights', icon: '📊' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex h-[calc(100vh-73px)]">
        <aside className="w-64 bg-white border-r border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 truncate">{project.name}</h2>
            <p className="text-sm text-gray-500 mt-1 truncate">{project.description}</p>
          </div>
          
          <nav className="p-4 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 overflow-auto">
          {activeTab === 'planning' && <PlanningTab projectId={projectId} />}
          {activeTab === 'visual-qa' && <VisualQATab projectId={projectId} />}
          {activeTab === 'test-generation' && <TestGenerationTab projectId={projectId} />}
          {activeTab === 'insights' && <InsightsTab projectId={projectId} />}
        </main>
      </div>
    </div>
  );
};

export default ProjectWorkspace;

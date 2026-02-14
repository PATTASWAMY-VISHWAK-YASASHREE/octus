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
  if (!project) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Project Not Found</h2>
        <p className="text-gray-500">The project you're looking for doesn't exist.</p>
      </div>
    </div>
  );

  const tabs = [
    { 
      id: 'planning', 
      label: 'Planning', 
      description: 'AI-Assisted Planning',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    { 
      id: 'visual-qa', 
      label: 'Visual QA', 
      description: 'Regression Detection',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    { 
      id: 'test-generation', 
      label: 'Test Generation', 
      description: 'AI Test Cases',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    { 
      id: 'insights', 
      label: 'Insights', 
      description: 'Release Analytics',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900">
      <Navbar showBackButton={true} backTo="/dashboard" pageTitle={project.name} />
      
      <div className="flex h-[calc(100vh-73px)]">
        <aside className="w-72 bg-black/80 backdrop-blur-xl border-r border-gray-800/50">
          <div className="p-6 border-b border-gray-800/50">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold text-white">{project.name}</h2>
                <p className="text-sm text-gray-400 mt-1 line-clamp-2">{project.description}</p>
              </div>
            </div>
          </div>
          
          <nav className="p-4 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all group ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-lg shadow-gray-900/50'
                    : 'text-gray-400 hover:bg-gray-900/50 hover:text-white'
                }`}
              >
                <div className={activeTab === tab.id ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}>
                  {tab.icon}
                </div>
                <div className="flex-1 text-left">
                  <div className={`font-semibold ${activeTab === tab.id ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                    {tab.label}
                  </div>
                  <div className={`text-xs ${activeTab === tab.id ? 'text-gray-400' : 'text-gray-600'}`}>
                    {tab.description}
                  </div>
                </div>
                {activeTab === tab.id && (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 overflow-auto bg-gradient-to-br from-gray-950 via-black to-gray-900">
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

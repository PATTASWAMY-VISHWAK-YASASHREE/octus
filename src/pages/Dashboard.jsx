import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getUserProjects, createProject } from '../services/projectService';
import { getProjectTasks } from '../services/taskService';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import { formatDateForDisplay } from '../utils/dateUtils.js';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [projectMetrics, setProjectMetrics] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '', tags: '' });
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, [currentUser]);

  const getRiskScore = (points) => Math.min(Math.floor((points || 0) * 10), 100);

  const loadProjects = async () => {
    if (!currentUser) return;
    try {
      setLoading(true);
      const data = await getUserProjects(currentUser.uid);
      setProjects(data);
      
      const metrics = {};
      for (const project of data) {
        try {
          const tasks = await getProjectTasks(project.id);
          const highRiskTasks = tasks.filter(t => getRiskScore(t.storyPoints) > 70).length;
          const avgRisk = tasks.length > 0 
            ? Math.floor(tasks.reduce((acc, t) => acc + getRiskScore(t.storyPoints), 0) / tasks.length) 
            : 0;
          
          metrics[project.id] = {
            totalTasks: tasks.length,
            highRiskTasks,
            avgRisk,
            completedTasks: tasks.filter(t => t.status === 'done').length,
            inProgressTasks: tasks.filter(t => t.status === 'in-progress').length
          };
        } catch (err) {
          metrics[project.id] = { totalTasks: 0, highRiskTasks: 0, avgRisk: 0, completedTasks: 0, inProgressTasks: 0 };
        }
      }
      
      setProjectMetrics(metrics);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (!currentUser || !currentUser.uid) {
        throw new Error('User not authenticated');
      }
      
      await createProject(newProject, currentUser.uid);
      setShowModal(false);
      setNewProject({ name: '', description: '', tags: '' });
      await loadProjects();
    } catch (err) {
      setError(err.message || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(p => 
    p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRiskColor = (risk) => {
    if (risk >= 70) return 'bg-red-500/10 text-red-400 border-red-500/30';
    if (risk >= 40) return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
    return 'bg-green-500/10 text-green-400 border-green-500/30';
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Your Projects</h1>
            <p className="text-gray-400">Manage and monitor your AI-powered projects</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3 rounded-xl font-semibold hover:from-gray-600 hover:to-gray-700 transition-all shadow-lg shadow-gray-900/50 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>New Project</span>
          </button>
        </div>

        <div className="mb-8">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-12 pr-4 py-3.5 bg-gray-900/50 backdrop-blur-xl border-2 border-gray-800 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-600 focus:border-gray-600 transition-all"
              style={{ 
                color: '#ffffff',
                WebkitTextFillColor: '#ffffff',
                caretColor: '#ffffff'
              }}
            />
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 flex items-start space-x-2">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const metrics = projectMetrics[project.id] || { totalTasks: 0, highRiskTasks: 0, avgRisk: 0, completedTasks: 0, inProgressTasks: 0 };
            const hasActivity = metrics.totalTasks > 0;
            
            return (
              <div
                key={project.id}
                onClick={() => navigate(`/project/${project.id}`)}
                className="group relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 hover:border-gray-700/50 transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-2xl hover:shadow-gray-900/50"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white group-hover:text-gray-200 transition-colors">{project.name}</h3>
                    {hasActivity && (
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getRiskColor(metrics.avgRisk)}`}>
                        Risk: {metrics.avgRisk}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-6 line-clamp-2">{project.description}</p>
                  
                  {hasActivity ? (
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3 border border-gray-800/50">
                        <div className="text-xs text-gray-500 mb-1">Total Tasks</div>
                        <div className="text-lg font-bold text-white">{metrics.totalTasks}</div>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3 border border-gray-800/50">
                        <div className="text-xs text-gray-500 mb-1">High Risk</div>
                        <div className="text-lg font-bold text-red-400">{metrics.highRiskTasks}</div>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3 border border-gray-800/50">
                        <div className="text-xs text-gray-500 mb-1">Completed</div>
                        <div className="text-lg font-bold text-green-400">{metrics.completedTasks}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 mb-4 text-center border border-gray-800/50">
                      <div className="text-sm text-gray-500">No tasks yet</div>
                      <div className="text-xs text-gray-600 mt-1">Click to add tasks</div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-800/50">
                    <span className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{project.createdAt?.toDate ? formatDateForDisplay(project.createdAt.toDate()) : 'Recently'}</span>
                    </span>
                    <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl mb-4">
              <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-gray-400 text-lg mb-2">
              {searchQuery ? 'No projects found' : 'No projects yet'}
            </p>
            <p className="text-gray-600 text-sm">
              {searchQuery ? 'Try a different search term' : 'Create your first project to get started'}
            </p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-2xl border border-gray-800 rounded-2xl shadow-2xl p-8 max-w-lg w-full">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Create New Project</h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setError('');
                  }}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleCreateProject} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Project Name</label>
                  <input
                    type="text"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-gray-900/40 backdrop-blur-xl border-2 border-gray-800 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-600 focus:border-gray-600 transition-all"
                    placeholder="My Awesome Project"
                    style={{ 
                      color: '#ffffff',
                      WebkitTextFillColor: '#ffffff',
                      caretColor: '#ffffff'
                    }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    required
                    rows="4"
                    className="w-full px-4 py-3 bg-gray-900/40 backdrop-blur-xl border-2 border-gray-800 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-600 focus:border-gray-600 transition-all resize-none"
                    placeholder="Brief description of your project goals and objectives"
                    style={{ 
                      color: '#ffffff',
                      WebkitTextFillColor: '#ffffff',
                      caretColor: '#ffffff'
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Tags (Optional)</label>
                  <input
                    type="text"
                    value={newProject.tags}
                    onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900/40 backdrop-blur-xl border-2 border-gray-800 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-600 focus:border-gray-600 transition-all"
                    placeholder="frontend, api, mobile"
                    style={{ 
                      color: '#ffffff',
                      WebkitTextFillColor: '#ffffff',
                      caretColor: '#ffffff'
                    }}
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setError('');
                    }}
                    disabled={loading}
                    className="flex-1 px-4 py-3 border border-gray-800 rounded-xl text-gray-400 hover:bg-gray-900/50 hover:text-white transition-all disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all shadow-lg shadow-gray-900/50 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Creating...</span>
                      </>
                    ) : (
                      <span>Create Project</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

import { useState, useEffect } from 'react';
import { getProjectTasks, createTask, updateTask, deleteTask } from '../../services/taskService';

const PlanningTab = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    assignee: '',
    dueDate: '',
    storyPoints: '',
    status: 'todo'
  });

  useEffect(() => {
    loadTasks();
  }, [projectId]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await getProjectTasks(projectId);
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await updateTask(editingTask.id, formData);
      } else {
        await createTask({ ...formData, projectId });
      }
      setShowModal(false);
      setEditingTask(null);
      setFormData({ name: '', assignee: '', dueDate: '', storyPoints: '', status: 'todo' });
      loadTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({
      name: task.name,
      assignee: task.assignee,
      dueDate: task.dueDate,
      storyPoints: task.storyPoints,
      status: task.status
    });
    setShowModal(true);
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Delete this task?')) {
      try {
        await deleteTask(taskId);
        loadTasks();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const getRiskBadge = (points) => {
    const risk = Math.min(Math.floor((points || 0) * 10), 100);
    const color = risk > 70 ? 'bg-red-100 text-red-700' : risk > 40 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700';
    return <span className={`px-2 py-1 rounded text-xs font-medium ${color}`}>{risk}</span>;
  };

  if (loading) return <div className="p-8">Loading tasks...</div>;

  return (
    <div className="p-8">
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-sm text-gray-600 mb-1">Overall Risk Score</div>
          <div className="text-3xl font-bold text-amber-600">63</div>
          <div className="text-xs text-gray-500 mt-1">Moderate Risk</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-sm text-gray-600 mb-1">Predicted Delay</div>
          <div className="text-3xl font-bold text-red-600">3 days</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-sm text-gray-600 mb-1">High-Risk Tasks</div>
          <div className="text-3xl font-bold text-gray-900">{tasks.filter(t => (t.storyPoints || 0) > 5).length}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-sm text-gray-600 mb-1">Total Tasks</div>
          <div className="text-3xl font-bold text-gray-900">{tasks.length}</div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6 mb-8">
        <div className="flex items-start space-x-3">
          <div className="text-2xl">🤖</div>
          <div>
            <div className="font-semibold text-gray-900 mb-1">AI Health Summary</div>
            <p className="text-sm text-gray-700">
              Project is at Moderate Risk (63%). 3 tasks likely to slip. Recommended to reprioritize high-complexity items.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Tasks</h2>
          <button
            onClick={() => {
              setEditingTask(null);
              setFormData({ name: '', assignee: '', dueDate: '', storyPoints: '', status: 'todo' });
              setShowModal(true);
            }}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700"
          >
            + Add Task
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Task Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assignee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Points</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Risk</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{task.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{task.assignee}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{task.dueDate}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{task.storyPoints}</td>
                  <td className="px-6 py-4">{getRiskBadge(task.storyPoints)}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <button onClick={() => handleEdit(task)} className="text-primary-600 hover:text-primary-700">Edit</button>
                    <button onClick={() => handleDelete(task.id)} className="text-red-600 hover:text-red-700">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {tasks.length === 0 && (
            <div className="text-center py-12 text-gray-500">No tasks yet. Add your first task to get started.</div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{editingTask ? 'Edit Task' : 'Create Task'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Task Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
                <input
                  type="text"
                  value={formData.assignee}
                  onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Story Points</label>
                <input
                  type="number"
                  value={formData.storyPoints}
                  onChange={(e) => setFormData({ ...formData, storyPoints: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  {editingTask ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanningTab;

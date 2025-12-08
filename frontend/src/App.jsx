import CreateTaskForm from "./components/createTaskForm";
import { useEffect, useState } from "react";
import { getAllTasks } from "./api/api";
import Banner from './components/Banner';

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const response = await getAllTasks();
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <Banner />
      <div className="p-4 max-w-4xl mx-auto">


        <div className="mt-6">
          <CreateTaskForm onSuccess={fetchTasks} />
        </div>

        <h2 className="text-xl font-semibold mt-10 mb-3">All Tasks</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map((t) => (
            <div
              key={t.id}
              className="bg-white shadow-sm rounded-lg p-4 border border-gray-200"
            >
              <h3 className="font-semibold text-lg text-gray-900">{t.title}</h3>

              {t.description && (
                <p className="text-gray-600 text-sm mt-1">{t.description}</p>
              )}

              <div className="flex justify-between text-sm text-gray-500 mt-3">
                <span className="capitalize">Status: {t.status}</span>
                <span>Due: {new Date(t.due_at).toLocaleDateString("en-GB")}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

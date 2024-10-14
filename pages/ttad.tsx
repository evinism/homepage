import dynamic from "next/dynamic";
import { usePersistentState } from "../lib/hooks";

type Task = {
  title: string;
  completed: boolean;
};

type TaskStore = {
  [date: string]: Task[];
};

const defaultTasks = [
  { title: "", completed: false },
  { title: "", completed: false },
  { title: "", completed: false },
];

const Ttad = () => {
  const currentDateString = new Date().toISOString().split("T")[0];
  const [taskStore, setTaskStore] = usePersistentState<TaskStore>(
    "taskStore",
    {}
  );
  const todaysTasks = taskStore[currentDateString] || defaultTasks;

  const previousTasks = Object.entries(taskStore);
  previousTasks.sort(([a], [b]) => (a < b ? 1 : -1));
  previousTasks.shift();

  return (
    <div>
      <h1>Three Things a Day</h1>
      <h2>{currentDateString}</h2>
      <ul>
        {todaysTasks.map((task, i) => (
          <li key={i}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) => {
                const newTasks = [...todaysTasks];
                newTasks[i] = {
                  ...newTasks[i],
                  completed: e.target.checked,
                };
                setTaskStore({
                  ...taskStore,
                  [currentDateString]: newTasks,
                });
              }}
            />
            <input
              type="text"
              value={task.title}
              onChange={(e) => {
                const newTasks = [...todaysTasks];
                newTasks[i] = {
                  ...newTasks[i],
                  title: e.target.value,
                };
                setTaskStore({
                  ...taskStore,
                  [currentDateString]: newTasks,
                });
              }}
            />
          </li>
        ))}
      </ul>
      <h2>Previous Days</h2>
      <ul>
        {previousTasks.map(([date, tasks]) => (
          <li key={date}>
            <h3>{date}</h3>
            <ul>
              {tasks.map((task, i) => (
                <li key={i}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={(e) => {
                      const newTasks = [...tasks];
                      newTasks[i] = {
                        ...newTasks[i],
                        completed: e.target.checked,
                      };
                      setTaskStore({
                        ...taskStore,
                        [date]: newTasks,
                      });
                    }}
                  />
                  <input
                    type="text"
                    value={task.title}
                    onChange={(e) => {
                      const newTasks = [...tasks];
                      newTasks[i] = {
                        ...newTasks[i],
                        title: e.target.value,
                      };
                      setTaskStore({
                        ...taskStore,
                        [date]: newTasks,
                      });
                    }}
                  />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Ttad), { ssr: false });

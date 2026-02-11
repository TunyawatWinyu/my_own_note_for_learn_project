import { useState, useEffect } from "react";

const Project = ({ selectedProject, project, setProject }) => {
  const [task, setTask] = useState("");
  const [arrayTask, setArrayTask] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedTask = localStorage.getItem(`task-${selectedProject.id}`);
    setArrayTask(savedTask ? JSON.parse(savedTask) : []);
  }, [selectedProject.id]);

  useEffect(() => {
    localStorage.setItem(
      `task-${selectedProject.id}`,
      JSON.stringify(arrayTask),
    );
  }, [arrayTask, selectedProject.id]);

  const taskSubmit = (e) => {
    e.preventDefault();
    try {
      if (!task) {
        throw new Error("missing field");
      }

      const newTask = {
        id: Date.now(),
        task: task,
      };

      setArrayTask((prev) => [...prev, newTask]);
      setTask("");
      setError("");
    } catch (err) {
      return setError(err.message);
    }
    console.log(error);
  };

  const formatDate = (date) => {
    if (!date) return "";

    const newDate = new Date(date);

    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(newDate);
  };

  const handlerDeleteTask = (id) => {
    const newTaskArray = arrayTask.filter((prev) => prev.id !== id);
    setArrayTask(newTaskArray);
  };

  const handlerDeleteProject = (id) => {
    const newProjectArray = project.filter((prev) => prev.id !== id);
    setProject(newProjectArray);
  };
  console.log(project);

  return (
    <main className="project-page w-full flex justify-center my-[100px] ">
      <article className="w-[900px]">
        <header className="flex justify-between">
          <div>
            <h1 className="text-4xl my-[20px]">{selectedProject.title}</h1>
            <time className="text-gray-600">
              {formatDate(selectedProject.date)}
            </time>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => handlerDeleteProject(selectedProject.id)}
              type="delete"
              className="text-xl bg-[#FA8112] py-[10px] px-[20px] rounded-xl text-white cursor-pointer transition duration-200 ease-in-out hover:bg-red-700"
            >
              delete
            </button>
          </div>
        </header>
        <section className="my-[60px]">
          <p>{selectedProject.description}</p>
        </section>
        <hr className="divider w-[900px] bg-gray-100 py-[1px]" />
        <form className="my-7 flex flex-col" onSubmit={(e) => taskSubmit(e)}>
          <fieldset>
            <legend htmlFor="task" className="text-5xl text-gray-600 mb-7">
              Task
            </legend>
            <div>
              <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                name="task"
                className={`w-[500px] bg-gray-100 border-b-2 border-b-gray-400 rounded-sm py-2 text-black mt-3`}
              />
              <button
                className="mx-[40px] text-xl bg-[#FA8112] py-[10px] px-[20px] rounded-xl text-white cursor-pointer transition duration-200 ease-in-out hover:-translate-y-2"
                type="submit"
              >
                Add Task
              </button>
            </div>
          </fieldset>
        </form>
        <div className="w-[800px]  h-auto">
          {arrayTask.length === 0 ? (
            <div>
              <p className="text-xl text-gray-500">
                This project does not have a task yet
              </p>
            </div>
          ) : (
            <ul>
              {arrayTask.map((el) => {
                return (
                  <div key={el.id} className="bg-[#7373735a]">
                    <li className="flex flex-row justify-between items-center text-black py-[20px]">
                      <article className="text-2xl mx-7">{el.task}</article>
                      <button
                        className="mx-8 text-3xl cursor-pointer transition duration-200 ease-in-out hover:text-red-600"
                        type="delete"
                        onClick={() => handlerDeleteTask(el.id)}
                      >
                        {" "}
                        &times;{" "}
                      </button>
                    </li>
                    <hr className="divider w-[800px] bg-gray-50 py-[1px]" />
                  </div>
                );
              })}
            </ul>
          )}
        </div>
      </article>
    </main>
  );
};

export default Project;

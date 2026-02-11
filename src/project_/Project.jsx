import { useState, useEffect } from "react";

const Project = ({ selectedProject }) => {
  const [task, setTask] = useState("");
  const [arrayTask, setArrayTask] = useState([]);
  const [error, setError] = useState("");

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

  useEffect(() => {
    console.log(arrayTask);
  }, [arrayTask]);

  const formatDate = (date) => {
    if (!date) return "";

    const newDate = new Date(date);

    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(newDate);
  };
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
        <div className="w-[800px] bg-gray-400 h-auto">
          <ul>
            {arrayTask.map((el) => {
              return (
                <li key={el.id} className="flex flex-row justify-between">
                  <article className="text-2xl mx-7">{el.task}</article>
                  <button className="mx-8" type="delete">
                    {" "}
                    &times;{" "}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </article>
    </main>
  );
};

export default Project;

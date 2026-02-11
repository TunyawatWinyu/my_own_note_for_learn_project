import SideBar from "./SideBar/SideBar";
import { useEffect, useState } from "react";
import FormAddProject from "./FormAddProject/FormAddProject";
import Project from "./project_/Project";

const App = () => {
  const [project, setProject] = useState(() => {
    const savedProject = localStorage.getItem("project");
    return savedProject ? JSON.parse(savedProject) : [];
  });
  const [addProject, setAddProject] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState("");

  const selectedProject = project.find((prev) => prev.id === selectedId);

  const initialForm = {
    title: "",
    description: "",
    date: "",
  };

  useEffect(() => {
    localStorage.setItem("project", JSON.stringify(project));
  }, [project]);

  const handlerChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    try {
      if (!form.date || !form.description || !form.date) {
        throw new Error("missing fields");
      }

      const newProject = {
        id: Date.now(),
        title: form.title,
        description: form.description,
        date: form.date,
      };

      setProject((prev) => [...prev, newProject]);
      setForm(initialForm);
      setAddProject(false);
      setError("");
    } catch (error) {
      setError(error.massage);
    }
  };

  const handlerAddProject = () => {
    setAddProject(!addProject);
    setSelectedId(null);
  };

  return (
    <div className="flex">
      <SideBar
        addProject={addProject}
        onAddProject={handlerAddProject}
        project={project}
        setSelectedId={setSelectedId}
      />
      {addProject ? (
        <FormAddProject
          onAddProject={handlerAddProject}
          onChange={handlerChange}
          onSubmit={handlerSubmit}
          form={form}
          setSelectedId={setSelectedId}
          error={error}
        />
      ) : selectedProject ? (
        <Project
          selectedProject={selectedProject}
          project={project}
          setProject={setProject}
        />
      ) : (
        <div className="empty-state-action w-full flex flex-col justify-center items-center">
          <h1 className="text-2xl my-[10px]">No Project Selected</h1>
          <p className="text-gray-500 text-xl">
            Select a project or get started with a new one
          </p>
          <div
            className="group flex justify-center my-[40px] py-[10px] px-[20px] bg-[#FA8112] rounded-xl cursor-pointer transition duration-200 ease-in-out hover:bg-[#222222]"
            onClick={() => handlerAddProject()}
          >
            <a className="add-button text-white transition duration-200 ease-in-out group-hover:text-[#F5E7C6]">
              Add project +
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

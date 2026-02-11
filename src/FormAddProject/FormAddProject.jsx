import { useState } from "react";

const FormAddProject = ({ onAddProject, onChange, form, onSubmit }) => {
  const [formSubmited, setFormSubmited] = useState(false);
  return (
    <form
      className="w-full flex justify-center flex-col items-center"
      onSubmit={(e) => {
        (onSubmit(e), setFormSubmited(true));
      }}
    >
      <div className="w-[80%] flex flex-col items-center">
        <div className="form-actions w-[50%] flex justify-end items-center ">
          <a
            className="mx-5 cursor-pointer"
            onClick={() => {
              onAddProject();
              // setSelectedId(null);
            }}
          >
            Cancel
          </a>
          <button
            type="submit"
            className="border-2 px-4 py-2 rounded-xl bg-[#222222] text-white transition duration-200 ease-in-out cursor-pointer hover:bg-[#FA8112]"
          >
            Save
          </button>
        </div>
        <div className="w-[50%]">
          <div className="flex flex-col my-4">
            <label for="tile">TITLE</label>
            <input
              className={`${formSubmited && !form.title ? "bg-red-100 border-1 border-red-600 rounded-sm py-2 text-black mt-3" : "bg-gray-100 border-b-2 border-b-gray-400 rounded-sm py-2 text-black mt-3"}`}
              value={form.title}
              onChange={(e) => onChange(e)}
              type="text"
              name="title"
            />
            {formSubmited && !form.title ? (
              <p className="my-1 text-red-600">missing title field</p>
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-col my-4">
            <label for="description">DESCRIPTION</label>
            <textarea
              className={`${formSubmited && !form.description ? "bg-red-100 border-1 border-red-600 rounded-sm py-2 text-black mt-3" : "bg-gray-100 border-b-2 border-b-gray-400 rounded-sm py-2 text-black mt-3"}`}
              value={form.description}
              onChange={(e) => onChange(e)}
              type="text"
              name="description"
            />
            {formSubmited && !form.description ? (
              <p className="my-1 text-red-600">missing description field</p>
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-col my-4">
            <label for="date">DUE DATE</label>
            <input
              className={`${formSubmited && !form.date ? "bg-red-100 border-1 border-red-600 rounded-sm py-2 text-black mt-3" : "bg-gray-100 border-b-2 border-b-gray-400 rounded-sm py-2 text-black mt-3"}`}
              value={form.date}
              onChange={(e) => onChange(e)}
              type="date"
              name="date"
            />
            {formSubmited && !form.date ? (
              <p className="my-1 text-red-600">missing date field</p>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormAddProject;

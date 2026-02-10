import "./sidebar.css";

const SideBar = ({ addProject, onAddProject, project, setSelectedId }) => {
  return (
    <div className=" bg-[#222222] w-[400px] h-[100vh] mt-[60px] rounded-tr-3xl">
      <div>
        <div className="pt-[60px] flex justify-center">
          <h1 className=" text-white text-3xl">YOUR PROJECT</h1>
        </div>
        <div
          className="group flex justify-center mx-[100px] py-[10px] mt-[60px] bg-[#FA8112] rounded-xl cursor-pointer transition duration-200 ease-in-out hover:bg-[#F5E7C6]"
          onClick={() => onAddProject()}
        >
          <a className="add-button text-white transition duration-200 ease-in-out group-hover:text-[#222222]">
            Add project +
          </a>
        </div>
      </div>
      <div className="project-sidebar flex flex-col justify-center items-center mt-[60px]">
        {project === 0 ? (
          <p>No Project</p>
        ) : (
          project.map((el) => {
            return (
              <a
                key={el.id}
                className="w-full text-center py-4 text-white my-2 text-1xl cursor-pointer transition duration-200 ease-in-out hover:bg-gray-600"
                onClick={(e) => {
                  setSelectedId(el.id);
                }}
              >
                {el.title}
              </a>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SideBar;

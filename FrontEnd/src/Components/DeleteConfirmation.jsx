const DeleteConfirmation = ({ setIsWantDelete, setShowBox }) => {
  return (
    <div className="overlay ">
      <div className="flex flex-col  rounded-2xl gap-4 w-72 h-32 bg-orange-300 justify-center items-center p-4 shadow-lg">
        <h1 className="text-black font-bold">Are you sure?</h1>
        <div className="flex p-4">
          <button
            className="!bg-red-500 text-black px-4 py-2 rounded-lg hover:!bg-red-600 transition duration-200"
            onClick={() => setIsWantDelete(true)}
          >
            Delete
          </button>
          <button
            className="bg-gray-300 !text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
            onClick={() => setShowBox(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;

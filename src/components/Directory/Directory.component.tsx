interface Props {
  myCollection: [];
  handleClick: () => void;
}

const Directory = ({ myCollection, handleClick }: Props) => {
  return (
    <div className="flex  justify-center flex-wrap gap-5">
      {myCollection.map((collection, id) => {
        const { name, iso2 } = collection;
        return (
          <div
            key={id}
            className="basis-64 bg-white font-semibold text-center rounded-3xl border shadow-lg p-10 max-w-xs"
          >
            <img
              className="mb-3 w-28 h-28 mx-auto shadow-md "
              src={`https://flagsapi.com/${iso2}/flat/64.png`}
              alt={`flag of ${name}`}
            />
            <h1 className="text-lg text-gray-700 overflow-hidden"> {name} </h1>

            <button
              name={`${name}`}
              onClick={() => handleClick()}
              className="bg-indigo-600 px-8 py-2 mt-8 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide"
            >
              Select
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Directory;

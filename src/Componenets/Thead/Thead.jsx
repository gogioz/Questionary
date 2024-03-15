// import Tbody from "../Tbody/Tbody";

function Thead() {
  const thead = [
    { id: 0, title: "Questions" },
    { id: 1, title: "Type" },
    { id: 2, title: "Choices" },
    { id: 3, title: "Stage" },
    { id: 4, title: "Parent Questions" },
    { id: 5, title: "Attach File" },
    { id: 6, title: "Delete" },
    { id: 7, title: "Sort" },
  ];
  return (
    <ul className="grid grid-flow-col text-xl grid-cols-8 pb-8 ">
      {thead.map((row) => (
        <li className="border border-gray-400 pl-2 py-1" key={row.id}>
          {row.title}
        </li>
      ))}
    </ul>
  );
}

export default Thead;

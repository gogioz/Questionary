import Filter from "./Componenets/Filter/Filter";
// import Tbody from "./Componenets/Tbody/Tbody";
// import Thead from "./Componenets/Thead/Thead";

function App() {
  return (
    <div className=" mx-36 my-16 ">
      <Filter />
      <div className="flex flex-col justify-between" style={{ height: "80vh" }}>
        <div className="flex flex-col ">{/* <Tbody /> */}</div>
      </div>
    </div>
  );
}

export default App;

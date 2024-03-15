import { useState } from "react";
import Tbody from "../Tbody/Tbody";
import Thead from "../Thead/Thead";

function Filter() {
  const [value, setValue] = useState("");
  return (
    <div>
      <div className="flex justify-end pb-3">
        <select
          name="sorting"
          id="sorting"
          className="py-2 px-3 bg-transparent border border-gray-400 rounded-md text-lg"
          onChange={(e) => setValue(e.target.value)}
        >
          <option value="">All Stages</option>
          <option value="opened">Opened</option>
          <option value="action">Action</option>
          <option value="closed">Closed</option>
        </select>
        <p>{value}</p>
      </div>
      <Thead />

      <Tbody value={value} />
    </div>
  );
}

export default Filter;

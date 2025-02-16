import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"
function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [marks, setMarks] = useState(["", "", "", "", ""]);

  useEffect(() => {
    fetchMarks();
  }, []);

  const fetchMarks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/marks");
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addMark = async () => {
    if (!name || marks.some((m) => m === "")) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/marks", {
        name,
        mark1: marks[0],
        mark2: marks[1],
        mark3: marks[2],
        mark4: marks[3],
        mark5: marks[4],
      });

      setStudents([...students, res.data]);
      setName("");
      setMarks(["", "", "", "", ""]);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMark = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/marks/${id}`);
      setStudents(students.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>Student Mark List</h1>
      <div className="form">
        <input type="text" placeholder="Student Name" value={name} onChange={(e) => setName(e.target.value)} />
        {marks.map((mark, index) => (
          <input
            key={index}
            type="number"
            placeholder={`Mark ${index + 1}`}
            value={mark}
            onChange={(e) => {
              const newMarks = [...marks];
              newMarks[index] = e.target.value;
              setMarks(newMarks);
            }}
          />
        ))}
        <button onClick={addMark}>Add</button>
      </div>

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mark 1</th>
            <th>Mark 2</th>
            <th>Mark 3</th>
            <th>Mark 4</th>
            <th>Mark 5</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.mark1}</td>
              <td>{student.mark2}</td>
              <td>{student.mark3}</td>
              <td>{student.mark4}</td>
              <td>{student.mark5}</td>
              <td>
                <button onClick={() => deleteMark(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

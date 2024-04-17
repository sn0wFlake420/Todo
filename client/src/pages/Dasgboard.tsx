import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ShowTodo from "../components/ShowTodo";

interface Todo {
  id: number;
  title: string;
  description: string;
  done: boolean;
  userId: number;
}

interface TodosArray extends Array<Todo> {}

export default function Dashboard() {
  const headers = {
    Authorization: localStorage.getItem("token"),
  };

  const [todos, setTodos] = useState<TodosArray>();
  const [input, setInput] = useState<string>("");
  const [edit, setEdit] = useState<Number>(0);
  const editRef = useRef("")
  //This hook is used explicitly to re-render the app when a todo is marked as completed, this is not a good method.
  const [forceRender, setForceRender] = useState<boolean>(false);

  //Function to fetch and set Todos state
  const getTodos = async () => {
    const todos = await axios.get("http://localhost:3000/bulk", { headers });
    setTodos(todos.data);
  };
  console.log(editRef.current)
  //Initially load all the todos and re-render when any of the todo gets marked as done
  useEffect(() => {
    getTodos();
  }, [forceRender]);
  
  if (headers.Authorization) {
    return (
      <div className="bg-[#181824] h-screen flex flex-col items-center justify-center">
        {/* New Todo Adder */}
        <div className="bg-[#25273c] rounded-lg mb-14 flex justify-center sm:w-96 w-auto">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-[#25273c] rounded-lg text-white text-lg pl-4 py-3 outline-0"
            type="text"
          />
          <button
            onClick={() => {
              setInput("");
              if (input) {
                axios
                  .post(
                    "http://localhost:3000/user/todo",
                    { title: input },
                    { headers }
                  )
                  .then(getTodos);
              }
            }}
            className="rounded-lg text-gray-500 hover:text-white transition-colors duration-200 pl-2 pr-2"
          >
            Add Todo
          </button>
        </div>

        {/* Todos Renderer, very bad fix for the re-render thingy */}
        <div className="flex flex-col gap-3">
          {todos?.map((todo) => (
            <div key={todo.id}
            >
              {ShowTodo(todo, setForceRender, forceRender, headers, setEdit, edit, editRef)}
            </div>
          ))}
        </div>

        {/* Control Center Renderer */}
        <div className="flex justify-between sm:w-96 gap-5 mt-8">
          <p className="text-gray-500 text-sm">
            {todos?.filter((todo) => !todo.done)?.length || 0} items left
          </p>
          <button
            onClick={() => {
              axios
                .delete("http://localhost:3000/user/todo", { headers })
                .then(() => setForceRender(!forceRender));
            }}
            className="text-gray-500 text-sm hover:text-white transition-colors duration-200"
          >
            Clear Completed
          </button>
          <Link
            className="text-gray-500 text-sm hover:text-white transition-colors duration-200"
            to={"/"}
            onClick={() => localStorage.removeItem("token")}
          >
            Logout
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-[#181824] h-screen flex flex-col items-center justify-center">
        <h2 className="text-white text-xl">☹️ You are not signed in</h2>
        <div className="mt-3">
          <Link
            className=" bg-gray-900 rounded-lg px-3 py-1 text-white hover:bg-gray-800 transition-colors duration-300"
            to="/"
          >
            Sign-in
          </Link>
          <Link
            className=" bg-gray-900 rounded-lg px-3 py-1 text-white hover:bg-gray-800 transition-colors duration-300"
            to="/signup"
          >
            Create an account
          </Link>
        </div>
      </div>
    );
  }
}

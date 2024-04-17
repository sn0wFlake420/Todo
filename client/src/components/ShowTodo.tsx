import axios from "axios";
import { useRef } from "react";

interface Todo {
  id: number;
  title: string;
  description: string;
  done: boolean;
  userId: number;
}

export default function showTodo(
  todo: Todo,
  setForceRender: React.Dispatch<React.SetStateAction<boolean>>,
  forceRender: boolean,
  headers: any,
  setEdit: React.Dispatch<React.SetStateAction<Number>>,
  edit: Number,
  editRef: React.MutableRefObject<string>
) {
  if (edit === todo.id) {
    return (
      <div className="bg-[#25273c] rounded-md sm:w-96 w-auto flex justify-between">
        <div className="inline-flex items-center">
        <input
        defaultValue={todo.title}
        //@ts-ignore
        ref={editRef}
        onChange={(e) => editRef.current = e.target.value}
            className="bg-[#25273c] mr-4 text-white text-lg px-4 py-2.5 rounded-md border border-gray-500"
            style={{ textDecoration: todo.done ? "line-through" : "none" }}
          >
          </input>
        </div>
        <button
          onClick={() => {setEdit(0)
            axios.put("http://localhost:3000/user/todo/update",
              {id: todo.id,
                title: editRef.current
              },
              {headers}
            ).then(() => setForceRender(!forceRender))
          }}
          className="pe-5 text-white hover:text-gray-400
          "
        >
          done
        </button>
      </div>
    );
  } else {
    return (
      <div className="bg-[#25273c] rounded-md sm:w-96 w-auto flex justify-between">
        <div className="inline-flex items-center">
          <label
            className="relative flex items-center px-3 py-2 rounded-full cursor-pointer"
            htmlFor="customStyle"
          >
            <input
              onClick={() =>
                axios
                  .put(
                    `http://localhost:3000/user/todo`,
                    { id: todo.id },
                    { headers }
                  )
                  .then(() => setForceRender(!forceRender))
              }
              type="checkbox"
              checked={todo.done}
              className="before:content[''] peer relative h-8 w-8 cursor-pointer appearance-none rounded-full border border-white bg-gray-900/10 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
              id="customStyle"
            />
            <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                ></path>
              </svg>
            </span>
          </label>
          <h2
            className="bg-[#25273c] mr-4 text-white text-lg pl-2"
            style={{ textDecoration: todo.done ? "line-through" : "none" }}
          >
            {todo.title}
          </h2>
        </div>
        <button
          onClick={() => setEdit(todo.id)}
          className="pe-5 text-white hover:text-gray-400
          "
        >
          edit
        </button>
      </div>
    );
  }
}

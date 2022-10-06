import React, { useContext } from "react";
import { ThemeContext } from "./App";

const style = {
  li: `list-none w-[100%] mb-4 flex justify-between items-center`,
  licomplete: `list-none mb-4 w-[100%] capitalize text-[color:var(--Dark-Grayish-Blue)] text-xl flex justify-between`,
  row: `flex w-screen px-2 py-4 bg-[color:var(--Very-Dark-Grayish-Blue)] rounded-md`,
  rowLight: `flex w-screen px-2 py-4 rounded-md bg-[color:var(--Very-Light-Grayish-Blue)]`,
  text: `ml-4 capitalize text-[color:var(--Dark-Grayish-Blue)] text-xl  cursor-pointer`,
  textComplete: `ml-4 cursor-pointer line-through`,
  button: `p-4 ml-2 bg-slate-400 text-black`,
  buttonLight: `p-4 ml-2 bg-slate-200 text-black`,
  check: `w-[10%]`,
};

const Todo = ({ todo, toggleComplete, deleteTodo }) => {

  const {isDark} = useContext(ThemeContext);
  
  return (
    <li className={todo.completed ? style.licomplete : style.li}>
      <div className={isDark ? style.row : style.rowLight}>
        <input
          type="radio"
          className={style.check}
          onClick={() => toggleComplete(todo)}
          checked={todo.completed ? "checked" : ""}
        />
        <p className={todo.completed ? style.textComplete : style.text}>
          {todo.text}
        </p>
      </div>
      <button onClick={() => deleteTodo(todo.id)} className={isDark ? style.button : style.buttonLight}>X</button>
    </li>
  );
};

export default Todo;

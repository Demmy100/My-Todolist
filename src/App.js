import { createContext, useEffect, useState } from "react";
import "./App.css";
import Moon from "./images/icon-moon.svg";
import Sun from './images/icon-sun.svg'
import Todo from "./Todo";
import { db } from "./Firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";

const style = {
  background: `bg-[color:var(--Very-Dark-Blue)] w-[100%] text-white h-screen`,
  bgLight: `bg-[color:var(--Very-Light-Gray)] w-[100%] h-screen`,
  main: `max-w-[500px] mx-auto flex flex-col items-center justify-center pt-20 mobile:mx-0 px-2`,
  header: `flex justify-between items-center w-[100%]`,
  heading: `text-white text-3xl tracking-[15px] uppercase`,
  form: `w-[100%] rounded-md border-none flex p-4 bg-[color:var(--Very-Dark-Grayish-Blue)] text-xl mt-6`,
  formLight: `w-[100%] rounded-md border-none flex p-4 bg-[color:var(--Very-Light-Grayish-Blue)] text-xl mt-6`,
  input: `w-[90%] border-none p-2 ml-2 outline-none bg-[color:var(--Very-Dark-Grayish-Blue)]`,
  inputLight: `w-[90%] border-none p-2 ml-2 outline-none bg-[color:var(--Very-Light-Grayish-Blue)]`,
  circle: `w-[6%]`,
  list: `max-w-[500px] mx-auto flex flex-col items-center justify-center mb-2 mt-6 mobile:mx-0 px-2`,
  darkImage: `w-[100%] h-[18rem] bg-[url("./images/bg-desktop-dark.jpg")] bg-no-repeat bg-cover`,
  lightImage: `w-[100%] h-[18rem] bg-[url("./images/bg-desktop-light.jpg")] bg-no-repeat bg-cover`,
};

//light and dark theme
export const ThemeContext = createContext();

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [isDark, setIsDark] = useState(true);

  const value = {
    isDark, setIsDark
  }

  //create data
  const createTodo = async (e) => {
    e.preventDefault(e);
    if(input === '') {
      alert('Please enter a valid todo');
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });
    setInput("");
  };

  //read data
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  //update data
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  //delete data
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id))
  }
  return (
    <ThemeContext.Provider value={value} >
     <div className={isDark ? style.background : style.bgLight}>
     <div className={isDark ? style.darkImage : style.lightImage}>
        <div className={style.main}>
          <div className={style.header}>
            <h1 className={style.heading}>todo</h1>
            <img src={isDark ? Sun : Moon} onClick={() => setIsDark(!isDark)} alt="" className="cursor-pointer"/>
          </div>
          <form className={isDark ? style.form : style.formLight} onSubmit={createTodo}>
            <input type="radio" onClick={createTodo} className={style.circle} />
            <input
              type="text"
              className={isDark ? style.input : style.inputLight}
              placeholder="Create a new todo"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
          </form>
        </div>
        <div className={style.list}>
          {todos.map((todo, index) => {
            return (
              <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo}/>
            );
          })}
          {todos.length < 1 ? null : <p className="text-center text-xl py-6">You have {`${todos.length}`}  Todos</p>}
            
        </div>
      </div>
     </div>
    </ThemeContext.Provider>
  );
}

export default App;

import styles from "../page.module.scss";
import trash from "../assets/trash.png";
import icon from "../assets/Icon.png";
import Image from "next/image";
import {useState, useEffect} from "react";
import ModalDelete from "./modals/ModalDelete";
import ModalCreate from "./modals/ModalCreate";

interface Task {
  title: string;
  completed: boolean;
}

function TasksCard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(storedTasks);
  }, []);

  function handleAddTask(newTask: string) {
    const updatedTasks = [...tasks, {title: newTask, completed: false}];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setShowCreateModal(false);
  }

  function handleDeleteModal(task: Task) {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  }

  function handleDeleteTask() {
    if (taskToDelete) {
      const updatedTasks = tasks.filter((task) => task !== taskToDelete);
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setTaskToDelete(null);
      setShowDeleteModal(false);
    }
  }

  function toggleTaskCompletion(task: Task) {
    const updatedTasks = tasks.map((t) => (t === task ? {...t, completed: !t.completed} : t));
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  const incompleteTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <>
      <div className={styles.tasksCard}>
        <p className={styles.pCard}>Suas tarefas de hoje</p>
        {incompleteTasks.map((task, index) => (
          <div key={index} className={styles.tasks}>
            <div className={styles.checkBox} onClick={() => toggleTaskCompletion(task)}></div>
            <p className={styles.pTasks}>{task.title}</p>
            <Image
              className={styles.logo}
              alt="trash icon"
              src={trash}
              width={24}
              height={24}
              onClick={() => handleDeleteModal(task)}
              style={{cursor: "pointer"}}
            />
          </div>
        ))}

        <p className={styles.pCard}>Tarefas finalizadas</p>

        {completedTasks.map((task, index) => (
          <div key={index} className={styles.tasks}>
            <div className={styles.checkBoxDone} onClick={() => toggleTaskCompletion(task)}>
              <Image
                className={styles.logo}
                alt="check icon"
                src={icon}
                width={12}
                height={8.25}
                style={{marginLeft: "5px"}}
              />
            </div>
            <p className={styles.pTasksDone}>{task.title}</p>
            <Image
              className={styles.logo}
              alt="trash icon"
              src={trash}
              width={24}
              height={24}
              onClick={() => handleDeleteModal(task)}
              style={{cursor: "pointer"}}
            />
          </div>
        ))}
      </div>

      {showDeleteModal && (
        <ModalDelete actionCancel={() => setShowDeleteModal(false)} actionConfirm={handleDeleteTask} />
      )}

      {showCreateModal && <ModalCreate actionCancel={() => setShowCreateModal(false)} actionConfirm={handleAddTask} />}

      <button className={styles.mainButton} onClick={() => setShowCreateModal(true)}>
        Adicionar Nova Tarefa
      </button>
    </>
  );
}

export default TasksCard;

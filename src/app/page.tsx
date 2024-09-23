"use client";

import styles from "./page.module.scss";
import Header from "./components/Header";
import TasksCard from "./components/TasksCard";
import {useState} from "react";
import ModalCreate from "./components/modals/ModalCreate";

export default function Home() {
  const [createModal, setCreateModal] = useState<boolean>(false);

  function handleButton() {
    setCreateModal(!createModal);
  }

  function createTask(taskTitle: string) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    tasks.push({title: taskTitle});

    localStorage.setItem("tasks", JSON.stringify(tasks));

    setCreateModal(false);
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <TasksCard />
      </main>
      {createModal && <ModalCreate actionConfirm={createTask} actionCancel={handleButton} />}
    </div>
  );
}

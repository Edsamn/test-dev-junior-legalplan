import "react-toastify/dist/ReactToastify.css";
import {useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import ModalStyled from "./ModalStyled";
import styles from "../../page.module.scss";

interface ModalCreateProps {
  actionCancel: () => void;
  actionConfirm: (taskTitle: string) => void;
}

function ModalCreate({actionCancel, actionConfirm}: ModalCreateProps) {
  const [taskTitle, setTaskTitle] = useState<string>("");

  function handleConfirm() {
    if (!taskTitle) {
      toast.error("Favor preencher o título da tarefa.");
      return;
    }

    actionConfirm(taskTitle);
  }

  return (
    <ModalStyled>
      <div className={styles.modalCreateCard}>
        <p className={styles.pWelcome}>Nova Tarefa</p>
        <p className={styles.pTasks}>Título</p>
        <input placeholder="Digite" value={taskTitle} onChange={(ev) => setTaskTitle(ev.target.value)}></input>
        <div className={styles.modalButtonsDiv}>
          <button className={styles.cancelButton} onClick={actionCancel}>
            <p className={styles.pCancel}>Cancelar</p>
          </button>
          <button className={styles.addButton} onClick={handleConfirm}>
            <p className={styles.pAction}>Adicionar</p>
          </button>
        </div>
        <ToastContainer />
      </div>
    </ModalStyled>
  );
}

export default ModalCreate;

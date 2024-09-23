import ModalStyled from "./ModalStyled";
import styles from "../../page.module.scss";

interface ModalDeleteProps {
  actionCancel: () => void;
  actionConfirm: () => void;
}

function ModalDelete({actionCancel, actionConfirm}: ModalDeleteProps) {
  return (
    <ModalStyled>
      <div className={styles.modalDeleteCard}>
        <p className={styles.pWelcome}>Deletar Tarefa</p>
        <p className={styles.pDelete}>Tem certeza que você deseja deletar essa tarefa?</p>
        <div className={styles.modalButtonsDiv}>
          <button className={styles.cancelButton} onClick={actionCancel}>
            <p className={styles.pCancel}>Cancelar</p>
          </button>
          <button className={styles.deleteButton} onClick={actionConfirm}>
            <p className={styles.pAction}>Deletar</p>
          </button>
        </div>
      </div>
    </ModalStyled>
  );
}

export default ModalDelete;

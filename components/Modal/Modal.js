// Packages
import classnames from "classnames";
// Styles
import styles from "./Modal.module.css";

function Modal({ show, onClose, children }) {
    return (
        <div className={classnames([styles.modal, show && styles.show])} >
            {show && <div onClick={onClose} className={styles.background} />}
            {show &&
                <div className={styles.modalBox}>
                    {children}
                </div>
            }
        </div>
    );
}

export default Modal;
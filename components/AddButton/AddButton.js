// React
import { Fragment, useState } from "react";
// Styles
import styles from "./AddButton.module.css";

function AddButton({ onTwosClick, onThreesClick }) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className={styles.addButtonContainer}>
            {isOpen &&
                <Fragment>
                    <div className={styles.addButtonMenuContainer}>
                        <ul className={styles.addButtonMenu}>
                            <li className={styles.addButtonMenuOption} onClick={() => { setIsOpen(false); onTwosClick() }}>Add 2s match</li>
                            <hr className={styles.liner} />
                            <li className={styles.addButtonMenuOption} onClick={() => { setIsOpen(false); onThreesClick() }}>Add 3s match</li>
                        </ul>
                    </div>
                    <div onClick={() => setIsOpen(false)} className={styles.overlay} />
                </Fragment>
            }
            <button className={styles.addButton} onClick={() => setIsOpen(!isOpen)}>+</button>
        </div>
    );
}

export default AddButton;
// Packages
import { useState } from "react";
// Styles
import styles from "./MatchForm.module.css";
// Components
import ClassSelector from "./../ClassSelector";
import Modal from "./../Modal";

function MatchForm({ show, onClose, onSubmit, threes = false }) {
    const [firstPlayer, setFirstPlayer] = useState('');
    const [secondPlayer, setSecondPlayer] = useState('');
    const [thirdPlayer, setThirdPlayer] = useState('');

    const isButtonEnabled = () => {
        if (threes) {
            return firstPlayer && secondPlayer && thirdPlayer;
        }

        return firstPlayer && secondPlayer;
    }

    return (
        <Modal show={show} onClose={onClose}>
            <form className={styles.form} onSubmit={onSubmit}>
                <h3>New 2s Match</h3>
                <label htmlFor={"firstPlayer"}>
                    <span>First Player</span>
                    <ClassSelector name={"firstPlayer"} id={"firstPlayer"} onChange={(value) => { setFirstPlayer(value.value) }} />
                </label>
                <label htmlFor={"secondPlayer"}>
                    <span>Second Player</span>
                    <ClassSelector name={"secondPlayer"} id={"secondPlayer"} onChange={(value) => { setSecondPlayer(value.value) }} />
                </label>
                {threes && <label htmlFor={"thirdPlayer"}>
                    <span>Third Player</span>
                    <ClassSelector name={"thirdPlayer"} id={"thirdPlayer"} onChange={(value) => { setThirdPlayer(value.value) }} />
                </label>}
                <div className={styles.oneLiner}>
                    <label htmlFor={"rating"}>
                        <span>Rating</span>
                        <input className={styles.input} type="number" step="0" name="rating" id="rating" />
                    </label>
                    <label className={styles.checkBoxContainer} htmlFor={"win"}>
                        <span>Win</span>
                        <input className={styles.checkBox} type="checkbox" name="win" />
                    </label>
                </div>
                <button disabled={!isButtonEnabled()} className={styles.button}>Add</button>
            </form>
        </Modal>
    );
}

export default MatchForm;

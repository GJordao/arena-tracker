// Styles
import styles from "./SpecCounter.module.css";

export default function SpecCounter({ value, onChange, name, icon }) {
    return (
        <div className={styles.SpecCounter}>
            <div>
                <img alt={name} src={icon} />
                <label htmlFor={name}>
                    {name}
                </label>
            </div>
            <div>
                <input id={name} readOnly value={value} />
                <button onClick={() => { onChange(name) }}>+</button>
            </div>
        </div>
    );
}
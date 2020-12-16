// Styles
import styles from "./ClassSeparator.module.css"

export default function ClassSeparator({ classname, icon, color, children }) {
    return (
        <section className={styles.ClassSeparator}>
            <div className={styles.ClassContainer}>

                <h3 className={styles.Title} style={{ color: color }}>
                    <img alt={classname} src={icon} className={styles.ClassIcon} />
                    {classname}
                </h3>
                {children}
            </div>
        </section>
    );
}
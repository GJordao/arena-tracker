// Styles
import styles from "./ClassDisplay.module.css";
// Data
import data from "./../../services/data";

let specList = [];
data.forEach(clss => {
    specList = specList.concat(clss.options)
});

function getIconAndNameForSpec(specKey) {
    const spec = specList.find(specInList => specInList.value === specKey);
    const classPath = spec.class.replace(" ", "").toLocaleLowerCase();
    const specPath = spec.label.replace(" ", "").toLocaleLowerCase();

    return {
        img: `./img/specs/${classPath}/${specPath}.png`,
        label: spec.label
    }
}

function ClassDisplay({ specKey, children }) {
    const iconAndName = getIconAndNameForSpec(specKey);
    return (
        <div className={styles.classDisplayContainer}>
            <img alt={iconAndName.label} className={styles.icon} src={iconAndName.img} />
            <span>{iconAndName.label}</span>
            {children}
        </div>
    );
}

export default ClassDisplay;
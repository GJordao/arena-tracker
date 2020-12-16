// Services
import data from "./../../services/data";
// Styles
import styles from "./ClassSelector.module.css";
// Components
import Select, { components } from 'react-select';

function getIcon(classname) {
    return classname.replace(" ", "").toLocaleLowerCase()
}

const formatGroupLabel = data => (
    <div className={styles.selectGroupHeader}>
        <img className={styles.selectIcon} src={`./img/class/${getIcon(data.label)}.png`} />
        <span style={{ color: data.color }}>{data.label}</span>
    </div>
);

const CustomOption = ({ innerProps, isDisabled, data }) => {
    if (isDisabled) {
        return null;
    }

    return (
        <div {...innerProps} className={styles.selectOption}>
            <img className={styles.selectIcon} src={`./img/specs/${getIcon(data.class)}/${getIcon(data.label)}.png`} />
            {data.label}
        </div>
    );
}

const SingleValue = ({ children, data, ...props }) => {
    return (
        <components.SingleValue {...props}>
            <div className={styles.selectedOption} >
                <img className={styles.selectIcon} src={`./img/specs/${getIcon(data.class)}/${getIcon(data.label)}.png`} />
                {data.label}
            </div>
        </components.SingleValue>
    );
}

function ClassSelector({ ...props }) {
    return (
        <Select
            components={{ Option: CustomOption, SingleValue }}
            options={data}
            formatGroupLabel={formatGroupLabel}
            {...props}
        />
    );
}

export default ClassSelector;
// Packages
import classnames from "classnames";
// Styles
import styles from "./MatchTable.module.css";
// Components
import { Cross, CheckMark } from "./../Icons";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
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

function renderColumn(column, columnKey) {
    if (columnKey === 'win') {
        return column ? <CheckMark className={styles.winIcon} /> : <Cross className={styles.loseIcon} />;
    }

    if (columnKey === 'date') {
        return new Date(column).toLocaleDateString();
    }

    if (columnKey === 'rating') {
        return Number(column);
    }

    const iconAndLabel = getIconAndNameForSpec(column)
    return (
        <div className={styles.classColumnContainer}>
            <img alt={iconAndLabel.label} className={styles.classIcon} src={iconAndLabel.img} />
            {iconAndLabel.label}
        </div>
    );
}

function MatchTable({ columns = [], data = [] }) {
    return (
        <div className={styles.tableContainer}>
            <Table className={styles.table}>
                <Thead>
                    <Tr className={styles.tableHeadTr}>
                        {columns.map((column, index) => {
                            return (
                                <Th className={(index + 1 === columns.length) ? styles.thAlignRight : styles.th} key={column.key}>{column.label}</Th>
                            );
                        })}
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((match, index) => {
                        return (
                            <Tr className={classnames([
                                styles.row,
                                index % 2 === 1 && styles.rowColored
                            ])} key={match.date} height={38}>
                                {columns.map(column => {
                                    return (
                                        <Td className={classnames([
                                            styles.td,
                                            column.key === "date" && styles.thAlignRight
                                        ])} key={`${match.date}${column.key}`}>{renderColumn(match[column.key], column.key)}</Td>
                                    );
                                })}
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </div>
    );
}

export default MatchTable;
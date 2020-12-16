// Packages
import { Fragment, useState } from "react"
// Components
import ClassSeparator from "./../components/ClassSeparator"
import SpecCounter from "./../components/SpecCounter"

function getIcon(classname) {
    return classname.replace(" ", "").toLocaleLowerCase()
}

export default function Old() {
    const [state, setState] = useState(
        [
            {
                class: "Death Knight",
                color: "#C41F3B",
                specs: [
                    { name: "Blood", counter: 0 },
                    { name: "Frost", counter: 0 },
                    { name: "Unholy", counter: 0 },
                ]
            },
            {
                class: "Demon Hunter",
                color: "#A330C9",
                specs: [
                    { name: "Havoc", counter: 0 },
                    { name: "Vengeance", counter: 0 },
                ]
            },
            {
                class: "Druid",
                color: "#FF7D0A",
                specs: [
                    { name: "Balance", counter: 0 },
                    { name: "Feral", counter: 0 },
                    { name: "Guardian", counter: 0 },
                    { name: "Restoration", counter: 0 },
                ]
            },
            {
                class: "Hunter",
                color: "#ABD473",
                specs: [
                    { name: "Beast Mastery", counter: 0 },
                    { name: "Marksman", counter: 0 },
                    { name: "Survival", counter: 0 },
                ]
            },
            {
                class: "Mage",
                color: "#69CCF0",
                specs: [
                    { name: "Arcane", counter: 0 },
                    { name: "Fire", counter: 0 },
                    { name: "Frost", counter: 0 },
                ]
            },
            {
                class: "Monk",
                color: "#00FF96",
                specs: [
                    { name: "Brewmaster", counter: 0 },
                    { name: "Mistweaver", counter: 0 },
                    { name: "Windwalker", counter: 0 },
                ]
            },
            {
                class: "Paladin",
                color: "#F58CBA",
                specs: [
                    { name: "Holy", counter: 0 },
                    { name: "Protection", counter: 0 },
                    { name: "Retribution", counter: 0 },
                ]
            },
            {
                class: "Priest",
                color: "#FFFFFF",
                specs: [
                    { name: "Discipline", counter: 0 },
                    { name: "Holy", counter: 0 },
                    { name: "Shadow", counter: 0 },
                ]
            },
            {
                class: "Rogue",
                color: "#FFF569",
                specs: [
                    { name: "Assassination", counter: 0 },
                    { name: "Outlaw", counter: 0 },
                    { name: "Subtlety", counter: 0 },
                ]
            },
            {
                class: "Shaman",
                color: "#0070DE",
                specs: [
                    { name: "Enhancement", counter: 0 },
                    { name: "Elemental", counter: 0 },
                    { name: "Restoration", counter: 0 },
                ]
            },
            {
                class: "Warlock",
                color: "#9482C9",
                specs: [
                    { name: "Affliction", counter: 0 },
                    { name: "Demonology", counter: 0 },
                    { name: "Destruction", counter: 0 },
                ]
            },
            {
                class: "Warrior",
                color: "#C79C6E",
                specs: [
                    { name: "Arms", counter: 0 },
                    { name: "Fury", counter: 0 },
                    { name: "Protection", counter: 0 },
                ]
            },
        ]
    )

    const onSpecCounterChange = (clss, spec) => {
        const stateCopy = JSON.parse(JSON.stringify(state))
        const classToUpdate = stateCopy.find(c => c.class === clss);
        const specToChange = classToUpdate.specs.find(s => s.name === spec);
        specToChange.counter = specToChange.counter + 1;

        setState(stateCopy)
    }

    return (
        <Fragment>
            <header
                style={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                }}>
                <h1>World of Warcraft</h1>
                <h2>Arena Tracker</h2>
            </header>
            <main style={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
            }}>
                {state.map(wowClass => {
                    return (
                        <ClassSeparator
                            key={wowClass.class}
                            classname={wowClass.class}
                            color={wowClass.color}
                            icon={`./img/class/${getIcon(wowClass.class)}.png`}
                        >
                            {wowClass.specs.map(spec => {
                                return (
                                    <SpecCounter
                                        key={`${wowClass.class}${spec.name}`}
                                        name={spec.name}
                                        icon={`./img/specs/${getIcon(wowClass.class)}/${getIcon(spec.name)}.png`}
                                        value={spec.counter}
                                        onChange={() => onSpecCounterChange(wowClass.class, spec.name)}
                                    />
                                );
                            })}
                        </ClassSeparator>
                    );
                })}
            </main>
        </Fragment>
    )
}

// Packages
import { Fragment, useState, useEffect } from "react"
// Services
import DB from "./../../services/db"
// Styles
import styles from "./Home.module.css";
// Components
import AddButton from "./../../components/AddButton";
import MatchForm from "./../../components/MatchForm";
import MatchTable from "./../../components/MatchTable";

let db;
if (process.browser) {
    db = new DB();
}

const twosColumns = [
    { key: "playerOne", label: "Spec One" },
    { key: "playerTwo", label: "Spec Two" },
    { key: "rating", label: "Rating" },
    { key: "win", label: "Win" },
    { key: "date", label: "Date" },
];

const threesColumns = [
    { key: "playerOne", label: "Spec One" },
    { key: "playerTwo", label: "Spec Two" },
    { key: "playerThree", label: "Spec Three" },
    { key: "rating", label: "Rating" },
    { key: "win", label: "Win" },
    { key: "date", label: "Date" },
];

export default function Home() {
    const [showTwosModal, setShowTwosModal] = useState(false)
    const [showThreesModal, setShowThreesModal] = useState(false)
    const [twos, setTwos] = useState([])
    const [threes, setThrees] = useState([])

    const updateState = () => {
        setTwos(db.getTwoVsTwoMatches())
        setThrees(db.getThreeVsThreeMatches())
    }

    useEffect(() => {
        if (db) {
            updateState()
        }
    }, []);

    const toggleTwosModal = () => {
        setShowTwosModal(!showTwosModal)
    }

    const toggleThreesModal = () => {
        setShowThreesModal(!showThreesModal)
    }

    const onTwosSubmit = (event) => {
        event.preventDefault();
        const firstPlayer = event.target.firstPlayer.value;
        const secondPlayer = event.target.secondPlayer.value;
        const rating = event.target.rating.value;
        const win = event.target.win.checked;
        db.addTwoVsTwoMatch(firstPlayer, secondPlayer, rating, win);
        updateState();
        toggleTwosModal();
    }

    const onThreesSubmit = (event) => {
        event.preventDefault();
        const firstPlayer = event.target.firstPlayer.value;
        const secondPlayer = event.target.secondPlayer.value;
        const thirdPlayer = event.target.thirdPlayer.value;
        const rating = event.target.rating.value;
        const win = event.target.win.checked;
        db.addThreeVsThreeMatch(firstPlayer, secondPlayer, thirdPlayer, rating, win);
        updateState();
        toggleThreesModal();
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>World of Warcraft</h1>
                <h2>Arena Tracker</h2>
            </header>
            <main className={styles.content}>
                <MatchTable columns={twosColumns} data={twos} />
                <MatchTable columns={threesColumns} data={threes} />
                <AddButton onTwosClick={toggleTwosModal} onThreesClick={toggleThreesModal} />
            </main>
            <MatchForm show={showTwosModal} onClose={toggleTwosModal} onSubmit={onTwosSubmit} />
            <MatchForm show={showThreesModal} onClose={toggleThreesModal} onSubmit={onThreesSubmit} threes />
        </div>
    )
}

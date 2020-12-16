const TWOS = 'twos';
const THREES = 'threes';

class DB {
    constructor() {
        this.twos = [];
        this.threes = [];

        const storageTwos = localStorage.getItem(TWOS)
        if (storageTwos && storageTwos !== 'undefined') {
            this.twos = JSON.parse(storageTwos)
        }

        const storageThrees = localStorage.getItem(THREES)
        if (storageThrees && storageTwos !== 'undefined') {
            this.threes = JSON.parse(storageThrees)
        }
    }

    /**
     * Adds a new 2v2 match to the db
     * @param {string} firstPlayer 
     * @param {string} secondPlayer 
     * @param {number} rating 
     * @param {boolean} win 
     */
    addTwoVsTwoMatch(playerOne, playerTwo, rating, win = false) {
        const date = new Date().valueOf();
        this.twos.push({
            date,
            playerOne,
            playerTwo,
            rating,
            win,
        })
        this.twos = this._sortByDate(this.twos);

        localStorage.setItem(TWOS, JSON.stringify(this.twos))
    }

    /**
     * Adds a new 3v3 match to the db
     * @param {string} firstPlayer 
     * @param {string} secondPlayer 
     * @param {string} thirdPlayer 
     * @param {number} rating 
     * @param {boolean} win 
     */
    addThreeVsThreeMatch(playerOne, playerTwo, playerThree, rating, win = false) {
        const date = new Date().valueOf();
        this.threes.push({
            date,
            playerOne,
            playerTwo,
            playerThree,
            rating,
            win,
        })
        this.threes = this._sortByDate(this.threes);
        localStorage.setItem(THREES, JSON.stringify(this.threes))
    }

    getTwoVsTwoMatches() {
        return this.twos;
    }

    getThreeVsThreeMatches() {
        return this.threes;
    }

    _sortByDate(arr) {
        return arr.sort(function compare(a, b) {
            var dateA = new Date(a.date);
            var dateB = new Date(b.date);
            return dateB - dateA;
        });
    }
}

export default DB;
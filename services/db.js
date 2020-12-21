import _ from "lodash";

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
        if (!playerOne || playerTwo) {
            return;
        }

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
        if (!playerOne || playerTwo || playerThree) {
            return;
        }

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

    getTwosMostPlayed() {
        const twosSpecs = [];
        _.forEach(this.twos, match => {
            let inArray = twosSpecs.find(spec => spec.spec === match.playerOne);
            if (inArray) {
                inArray.count++;
            } else {
                twosSpecs.push({ spec: match.playerOne, count: 1 });
            }

            inArray = twosSpecs.find(spec => spec.spec === match.playerTwo);
            if (inArray) {
                inArray.count++;
            } else {
                twosSpecs.push({ spec: match.playerTwo, count: 1 });
            }
        });

        return _.sortBy(twosSpecs, "count", "dsc").reverse().slice(0, 3)
    }

    getTwosMostLostPercentage() {
        const twosSpecs = [];
        _.forEach(this.twos, match => {
            let inArray = twosSpecs.find(spec => spec.spec === match.playerOne);
            if (inArray) {
                if (match.win) {
                    inArray.wins++;
                } else {
                    inArray.losses++;
                }
            } else {
                twosSpecs.push({
                    spec: match.playerOne,
                    wins: match.win ? 1 : 0,
                    losses: match.win ? 0 : 1
                });
            }

            if (match.playerOne === match.playerTwo) {
                return;
            }

            inArray = twosSpecs.find(spec => spec.spec === match.playerTwo);
            if (inArray) {
                if (match.win) {
                    inArray.wins++;
                } else {
                    inArray.losses++;
                }
            } else {
                twosSpecs.push({
                    spec: match.playerTwo,
                    wins: match.win ? 1 : 0,
                    losses: match.win ? 0 : 1
                });
            }
        });

        twosSpecs.sort((value1, value2) => {
            const value1TotalGames = value1.wins + value1.losses;
            const value2TotalGames = value2.wins + value2.losses;
            const value1WinRate = value1.wins / value1TotalGames;
            const value2WinRate = value2.wins / value2TotalGames;

            if (value1WinRate > value2WinRate) {
                return 1;
            } else if (value1WinRate < value2WinRate) {
                return -1;
            } else {
                return 0;
            }
        });

        return _.map(twosSpecs, spec => ({
            spec: spec.spec,
            winRatio: spec.losses / (spec.wins + spec.losses) * 100
        })).slice(0, 2);
    }

    getTwosMostLost() {
        const twosSpecs = [];
        _.forEach(this.twos, match => {
            let inArray = twosSpecs.find(spec => spec.spec === match.playerOne);
            if (inArray) {
                if (match.win) {
                    inArray.wins++;
                } else {
                    inArray.losses++;
                }
            } else {
                twosSpecs.push({
                    spec: match.playerOne,
                    wins: match.win ? 1 : 0,
                    losses: match.win ? 0 : 1
                });
            }

            if (match.playerOne === match.playerTwo) {
                return;
            }

            inArray = twosSpecs.find(spec => spec.spec === match.playerTwo);
            if (inArray) {
                if (match.win) {
                    inArray.wins++;
                } else {
                    inArray.losses++;
                }
            } else {
                twosSpecs.push({
                    spec: match.playerTwo,
                    wins: match.win ? 1 : 0,
                    losses: match.win ? 0 : 1
                });
            }
        });

        return _.sortBy(twosSpecs, "losses").reverse().slice(0, 2);
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
export class HistoryService {
    constructor() {
        "ngInject";

        this.history = angular.fromJson(window.localStorage.getItem('football.history')) || [];
        this.sync();
    }
    
    getHistory(player) {
        if (!player) {
            return this.history;
        }

        if (player && player.id) {
            return this.history.filter((item) => {
                return (item.home.id === player.id || item.away.id === player.id)
            });
        }
    }

    getHistoryByPlayers(a, b) {
        return this.history.filter((item) => {
            return (item.home === a.id && item.away === b.id) || (item.home === b.id && item.away === a.id)
        });
    }

    addMatch(match = {
        home: 'id', 
        away: 'id', 
        score: { 
            home: 0, 
            away: 0
        } 
    }) {
        this.history.push(match);

        this.sync();
    }

    sync() {
        window.localStorage.setItem('football.history', angular.toJson(this.history));
    }

}

HistoryService.$inject = ['$q'];

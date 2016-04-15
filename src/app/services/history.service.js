export class HistoryService {
    constructor(Common) {
        "ngInject";

        this.Common = Common;

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
        home: 'player object',
        away: 'player object',
        score: { 
            home: 0, 
            away: 0
        } 
    }) {
        match.id = this.Common.generateId();
        this.history.push(match);

        this.sync();
    }
    
    removeMatch(match) {
        this.history = this.history.filter((item) => {
            return item.id !== match.id;
        });

        this.sync();
    }

    clear() {
        this.history = [];
        this.sync();
    }

    sync() {
        window.localStorage.setItem('football.history', angular.toJson(this.history));
    }

}

HistoryService.$inject = ['Common'];

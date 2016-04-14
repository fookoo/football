export class PlayersService {
    constructor() {
        "ngInject";

        this.players = angular.fromJson(window.localStorage.getItem('football.players') || []) ;
        this.sync();


        console.info (`PlayersService ${this.players}`);
    }

    getPlayers() {

        return this.players;
    }

    addPlayer(player = 'Player #') {
        console.info ('PlayersService:addPlayer', player);
        this.players.push({
            id: this.generateId(),
            name: player
        });

        this.sync();
    }

    sync() {
        window.localStorage.setItem('football.players', angular.toJson(this.players));
    }

    generateId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }

}

PlayersService.$inject = ['$q'];

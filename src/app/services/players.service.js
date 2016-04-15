export class PlayersService {
    constructor(Common) {
        "ngInject";

        this.Common = Common;

        this.players = angular.fromJson(window.localStorage.getItem('football.players') || []) ;
        this.sync();
    }

    getPlayers() {

        return this.players;
    }

    addPlayer(player = 'Player #') {
        console.info ('PlayersService:addPlayer', player);
        this.players.push({
            id: this.Common.generateId(),
            name: player
        });

        this.sync();
    }
    
    clear() {
        this.players = [];
        this.sync();
    }

    sync() {
        window.localStorage.setItem('football.players', angular.toJson(this.players));
    }
}

PlayersService.$inject = ['Common'];

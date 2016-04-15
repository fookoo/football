export class TableController {
    constructor(Players, History, $mdDialog) {
        "ngInject";

        // bindings
        this.Players = Players;
        this.History = History;
        this.$mdDialog = $mdDialog;

        this.matches = [{
            home: {},
            away: {},
            score: {
                home: 0, away: 0
            }
        }];

        this.sort = 'item.points';

        this.sync();

    }

    addPlayer() {
        console.info ('addplayer', this.nickname);
        if (this.nickname) {
            this.Players.addPlayer(this.nickname);

            this.nickname = '';
            this.sync();
        }
    }

    addMatch(match) {
        console.info ('addMatch', match);
        this.History.addMatch(angular.copy(match));
        this.sync();
    }

    removeMatch(match, event) {
        let confirm = this.$mdDialog.confirm()
            .title('Na pewno chcesz usunąć mecz?')
            .content('Wpłynie to na sytuację w tabeli, jesteś pewien')
            .targetEvent(event)
            .ok('Tak usuń')
            .cancel('Ups');

        this.$mdDialog.show(confirm).then(() => {
            this.History.removeMatch(match);
            this.sync();
        });

    }

    reset() {
        let confirm = this.$mdDialog.confirm()
            .title('Na pewno chcesz wykonać reset')
            .content('Spowoduje to usunięcie wszystkich zawodników oraz meczów')
            .targetEvent(event)
            .ok('Tak usuń')
            .cancel('Ups');

        this.$mdDialog.show(confirm).then(() => {
            this.Players.clear();
            this.History.clear();
            this.sync();
        });
    }

    sync() {
        this.players = this.Players.getPlayers();
        this.table = this.generateTable();
    }

    setSort(column) {
        console.info('sort ' + column);
        this.sort = this.sort == '-' + column ? column : '-' + column;
    }

    generateTable() {
        let table = [];

        // populating players into table
        this.players.forEach((player) => {
            let history = this.History.getHistory(player);
            let games = {
                    win: 0,
                    draw: 0,
                    lose: 0
                    };
            let goals = {
                    shoot: 0,
                    lose: 0
                    };

            history.forEach((match) => {
                // points
                let home = parseInt(match.score.home);
                let away = parseInt(match.score.away);

                if (home > away) {
                    // home wins

                    if (match.home.id === player.id) {
                        //player is home
                        //player win
                        games.win++;
                        goals.shoot += home;
                        goals.lose += away;
                    } else {
                        //player is away
                        //player lose
                        games.lose++;
                        goals.shoot += away;
                        goals.lose += home;
                    }

                } else if (away > home) {
                    // away wins
                    if (match.home.id === player.id) {
                        //player is home
                        //player lose
                        games.lose++;
                        goals.shoot += home;
                        goals.lose += away;
                    } else {
                        //player is away
                        //player win
                        games.win++;
                        goals.shoot += away;
                        goals.lose += home;
                    }
                } else {
                    // draw
                    games.draw++;
                    goals.shoot += home;
                    goals.lose += home;
                }
            });

            table.push({
                player: angular.copy(player),
                points: (games.win * 3) + games.draw,
                history: history,
                games: games,
                goals: goals,
                show: false
            });
        });
        
        return table;
    }
}

TableController.$inject = ['Players', 'History', '$mdDialog'];

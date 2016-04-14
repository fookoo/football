export class TableController {
    constructor(Players, History) {
        "ngInject";

        // bindings
        this.Players = Players;
        this.History = History;

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
                console.info(home + ":" + away);

                if (home > away) {
                    // home wins
                    console.info ('home>away');


                    if (match.home.id === player.id) {
                        //player is home
                        //player win
                        console.info ('win');

                        games.win++;
                        goals.shoot += home;
                        goals.lose += away;
                    } else {
                        //player is away
                        //player lose
                        console.info ('lose');

                        games.lose++;
                        goals.shoot += away;
                        goals.lose += home;
                    }

                } else if (away > home) {
                    // away wins
                    console.info ('home<away');


                    if (match.home.id === player.id) {
                        //player is home
                        //player lose
                        console.info ('lose');

                        games.lose++;
                        goals.shoot += home;
                        goals.lose += away;
                    } else {
                        //player is away
                        //player win
                        console.info ('win');

                        games.win++;
                        goals.shoot += away;
                        goals.lose += home;
                    }
                } else {
                    // draw
                    console.info ('draw');
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

TableController.$inject = ['Players', 'History'];

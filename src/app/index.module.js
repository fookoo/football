import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';

/* Controllers */
import { TableController } from "./controllers/table.controller";

/* Directives */

/* Service */
import { CommonService } from "./services/common.service";
import { HistoryService } from "./services/history.service";
import { PlayersService } from "./services/players.service";

angular
    .module('app.core', [
        /* Angular modules */
        'ngAnimate',
        'ngCookies',
        'ngSanitize',
        'ngAria',
        'ngMaterial',
        'ngMessages',

        'ui.router'
    ]);

angular
    .module('anything', [
        'app.core',
        'app.templates'
    ])

    /* Controllers */
    .controller('TableController', TableController)

    /* Directives */

    /* Services */
    .service("Common", CommonService)
    .service("History", HistoryService)
    .service("Players", PlayersService)

    /* Filters */

    .config(config)
    .config(routerConfig)
    .run(runBlock);

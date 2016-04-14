export function routerConfig($stateProvider, $urlRouterProvider) {
    'ngInject';

    $stateProvider
        .state('widgets', {
            url: '/',
            templateUrl: 'app/state/table/index.html',
            controller: 'TableController as ctrl'
        });
        

    $urlRouterProvider.otherwise('/');
}

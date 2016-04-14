export function config($mdThemingProvider) {
    'ngInject';

    // theme
    $mdThemingProvider
        .theme('default')
        .primaryPalette('blue')
        .accentPalette('yellow');
}



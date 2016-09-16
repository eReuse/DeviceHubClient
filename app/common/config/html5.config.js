

function html5($locationProvider, CONSTANTS){
    $locationProvider.html5Mode(CONSTANTS.html5mode);
    $locationProvider.hashPrefix('!');
}

module.exports = html5;
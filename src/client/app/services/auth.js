angular.module('app')
    .service('authService', ['$http', '$cookies', function($http, $cookies){
        this.isAuthed = function(){
            let session = $cookies.get('currentUser');
            let expiration = $cookies.get('expiration');
            let userID = $cookies.get('userID');
            return (session && userID && expiration && (expiration > Date.now()));
        }
        this.logout = function(){
            return $http.delete('/api/auth/logout');
        }
    }]);

angular.module('app.translations', []);

angular.module('app.translations').config(['$translateProvider', function ($translateProvider) {
<% languages.forEach(function (language) { %>
  $translateProvider.translations('<%= language.locale %>',
    <%= JSON.stringify(language.data) %>
  );
<% }); %>
}]);

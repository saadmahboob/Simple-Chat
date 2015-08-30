/**
	Application configuration
*/
require.config({
				
				paths:{
					angular: 'libs/angular.min',
					ngResource : 'libs/angular-resource.min',
					ngRoute : 'libs/angular-route',
					bootstrap : 'libs/bootstrap.min',
					domReady: 'libs/domReady',
					velocity: 'libs/velocity.min'
				},
				shim: {
					angular: { exports: 'angular'},
					ngResource : { deps: ['angular'], exports: 'ngResource' },
					ngRoute : { deps: ['angular'],exports:'ngRoute' },
					velocity: { exports: 'velocity' }

				},
				deps: ['main']
});

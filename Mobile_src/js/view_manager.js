define(
	['jquery',
	 'Models/Signin',
	 'Models/Signup',
	 'Models/Main',
	 'Models/Agenda',
	 'Models/Settings',
	 'Views/Signin',
	 'Views/Signup',
	 'Views/Main',
	 'Views/Agenda',
	 'Views/Settings'], 
	function ($, SigninModel, SignupModel, MainModel, AgendaModel, SettingsModel, SigninView, SignupView, MainView, AgendaView, SettingsView) {
		
	var ViewManager = function () {
		
		
		var Models = {
			signin: SigninModel,
			signup: SignupModel,
			agenda: AgendaModel,
			main: MainModel,
			settings: SettingsModel
		},
			Views = {
				signin: SigninView,
				signup: SignupView,
				agenda: AgendaView,
				main: MainView,
				settings: SettingsView
			};
		return {
			init: function () {
				var router;

				router = Backbone.Router.extend({
					routes: {
						'*notFound': 'test'
					},
					test: function () {
						console.log('test hit');
					}
					
				})
				
				if (!Backbone.History.started) {
					Backbone.history.start();
				}
				
				HOUSER.router = new router();
				
				HOUSER.router.on('route', function (x, params) {
					var route = params[0],
						view = Views[route],
						model = Models[route],
						data = JSON.parse(params[1]);
					console.log(view);
					console.log(model);
					//$.mobile.changePage( '#' + route , { reverse: false, changeHash: false } );
					new view(new model(data));
					HOUSER.router.trigger('router-kill-view');
				});
			},
			navigate: function (type, data) {
				
			}
		};
	};
	return new ViewManager();
});
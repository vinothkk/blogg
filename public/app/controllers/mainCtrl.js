angular.module('mainCtrl',[])
		.controller('mainController',function($rootScope,$location,Auth){
			var vm = this;
			vm.loggedIn = Auth.isLoggedIn();
			$rootScope.$on('$routeChangeStart',function(){
				vm.loggedIn= Auth.isLoggedIn();

				Auth.getUser()
					.then(function(data){
						vm.user=data.data;
						if(vm.user.username == "admin")
							vm.isAdmin = true;
						else
							vm.isAdmin = false;
					});

				
				

			}); 

			vm.doLogin = function(){
				vm.processing =true;
				vm.error='';	
				Auth.login(vm.loginData.username,vm.loginData.password)
					.success(function(data){
						vm.processing=false;
						if(data.success)
						{
							// console.log(data);
							$location.path('/bpost');
						}							
						else
							vm.error=data.message;	
					});

				
			};

			vm.doLogout =function(){
				Auth.logout();
				vm.user={};
			vm.isAdmin = false;
				$location.path('/login');
			};
			
			});
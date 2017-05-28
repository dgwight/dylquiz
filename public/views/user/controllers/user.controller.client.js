/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("DylQuiz")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            user = UserService.findUserByCredentials(user.username, user.password);
            if (user) {
                $location.url("/user/" + user._id);
            } else {
                vm.alert = "Unable to login";
            }
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(user) {
            if (user.password !== user.passwordConfirm) {
                vm.alert = "Passwords do not match";
                return;
            }
            if (UserService.findUserByUsername(user.username)) {
                vm.alert = "Username is taken";
                return;
            }
            user = UserService.createUser(user);
            if (user) {
                $location.url("/user/" + user._id);
            } else {
                vm.alert = "Unable to register";
            }
        }
    }

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.update = update;

        vm.uid = $routeParams["uid"];
        function init() {
            var user = UserService.findUserById(vm.uid);
            vm.user = {
                "_id": user._id,
                "username": user.username,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "email": user.email
            };
        }

        init();

        function update(user) {
            UserService.updateUser(user._id, user);
        }
    }

})();

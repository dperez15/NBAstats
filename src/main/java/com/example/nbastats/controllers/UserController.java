package com.example.nbastats.controllers;

import com.example.nbastats.models.User;
import com.example.nbastats.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/users")            //  this will add users to the start of all URL endpoints
public class UserController {

    @Autowired
    //    @Autowired will request SpringBoot to find the UserService class and instantiate one for us
    //    and assign (INJECT) the class property with the value. This is Dependency Injection.
    //    our class depends on this service and SpringBoot will inject it into our class
    private UserService userService;

    @RequestMapping("/teams")                                    //  this code will be reached by /users/
    public String teams(Model model) {

        //  the the userList page will be happy to display it
        return "nbaTeams";
    }

    @RequestMapping("/")                                    //  this code will be reached by /users/
    public String index(Model model) {
        //  get a list of all users add to the model and list them
        Iterable<User> users = userService.listAllUsers();
        model.addAttribute("users", users);

        //  the the userList page will be happy to display it
        return "userList";
    }

    //  let's CREATE a new user
    @RequestMapping("/new")
    public String newUser(Model model){
        //  since we do not have a user, let's send an empty user to the userEdit page
        model.addAttribute("user", new User());
        return "userEdit";
    }

    //  id will be the key to the user we want to READ from the database
    @RequestMapping("/{id}")
    public String readUser(@PathVariable Integer id, Model model){
        //  find in the database a user with id = to our PathVariable
        User user = userService.getUserById(id);

        //  did we find a user?
        if ( user != null ) {
            //  yes. add the user to the model and display the userDetails page
            model.addAttribute("user", user);
            return "userDetails";
        }
        else {
            //  no, we did not find a user. Display an error message
            model.addAttribute("message", "The User Id: " + id + " was not found in the database");
            return "404";       //  user (page) not found
        }
    }

    //  id will be the key to the user we want to UPDATE
    @RequestMapping("/edit/{id}")
    public String updateUser(@PathVariable Integer id, Model model){
        //  find the user in the database and send that data to the userEdit page
        model.addAttribute("user", userService.getUserById(id));
        return "userEdit";
    }

    //  we have finished making our changes to our user. The data is POSTed back to the server
    //  all of the data is saved in a User object and UPDATEd in the database.
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public String saveUser(User user){
        //  all we have to do is save the user
        userService.saveUser(user);
        //  go to the list all users page when complete
        return "redirect:/users/";
    }

    //  using the id from the URL find and DELETE our user
    @RequestMapping("/delete/{id}")
    public String deleteUser(@PathVariable Integer id){
        userService.deleteUser(id);
        //  go to the list all users page when complete
        return "redirect:/users/";
    }

/*
    //  using the whatever from the search form get all users by this whatever
    @RequestMapping(value = "/search", method = RequestMethod.POST)
    public String searchUser(@RequestParam String Whatever, Model model ){
        //  SEARCH for all users by Whatever
        Iterable<User> list = userService.findByWhatever(Whatever);

        //  pass the list of users by Whatever
        model.addAttribute("Whatever", Whatever);
        model.addAttribute("users", list);

        //  the the userList page will be happy to display it
        return "userList";
    }
*/
}

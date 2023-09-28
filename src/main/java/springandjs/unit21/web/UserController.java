package springandjs.unit21.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import springandjs.unit21.domain.User;
import springandjs.unit21.repository.UserRepository;

import java.util.Optional;


@RestController
@RequestMapping("/users")
public class UserController {

    private UserRepository userRepository;

    public UserController(UserRepository userRepository) {//instead of @Autowired this is constructor injection, better approach
        this.userRepository = userRepository;
    }

    @RequestMapping("/exists")
    public boolean exists(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            return user.get().getPassword().equals(password);
        }
        return false;
    }



    @PostMapping("/create")
    public Boolean postExists(@RequestBody User creatUser) {// make sure to use @RequestBody when using post because were going to use the body of the request
        Optional<User> user = userRepository.findByUsername(creatUser.getUsername());
        if (user.isPresent()) {
            return false;
        }
        User userNew = new User();
        userNew.setUsername(creatUser.getUsername());
        userNew.setPassword(creatUser.getPassword());
        userRepository.save(userNew);

        return true;
    }

    @GetMapping("/validateUsername")
    public boolean validateUsername(String username) {
        return true;
    }

    @GetMapping("/validatePassword")
    public boolean validatePassword(String password) {
        return true;
    }
}


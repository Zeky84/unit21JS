package springandjs.unit21.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import springandjs.unit21.domain.User;

@Controller
public class LoginController {
    @GetMapping("/login")
    public String getLogin(ModelMap model) {
        model.put("user",new User());
        return "login";
    }
}

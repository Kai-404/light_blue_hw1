//for test purpose only

package gameplay.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;

@Controller
public class TestController {
//    @RequestMapping("/")
//    public String index() {
//        return "index.html";
//    }

    @RequestMapping("/test-the-controller")
    @ResponseBody
    public int[] sayhello(){
        int[] a = {1,2,3};
        return a ;
    }
}

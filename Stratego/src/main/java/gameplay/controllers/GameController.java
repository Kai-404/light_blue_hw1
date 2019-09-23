package gameplay.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import gameplay.gameEngine.Board;

@Controller
public class GameController {
    Board board = new Board();

    @RequestMapping("/game/init")
    @ResponseBody
    public String[] initGame(){

        board.setBoard();

        return board.getBoardState();

    }

    @RequestMapping("/game/p")
    @ResponseBody
    public String[] printsomthing(){

        String[] a ={"S","B","U"};
        return a;

    }

}
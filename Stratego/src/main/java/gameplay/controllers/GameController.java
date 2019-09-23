package gameplay.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import gameplay.gameEngine.Board;

import java.util.ArrayList;

@CrossOrigin
@RestController
public class GameController {
    Board board = new Board();

    @RequestMapping("/game/init")
    @ResponseBody
    public ArrayList<String[]> initGame(){

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
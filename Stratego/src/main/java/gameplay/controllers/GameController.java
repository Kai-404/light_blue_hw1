package gameplay.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import gameplay.gameEngine.Board;

import java.util.ArrayList;
import java.util.Map;

@CrossOrigin
@RestController
public class GameController {
    Board board = new Board();

    @RequestMapping("/game/init")
    @ResponseBody
    public ArrayList<Map<String,String>> initGame(){

        board.setBoard();

        board.printBoard();

        return board.getBoardState();

    }

    @RequestMapping("/game/p")
    @ResponseBody
    public String[] printsomthing(){

        String[] a ={"S","B","U"};
        return a;

    }

}
package gameplay.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import gameplay.gameEngine.Board;

import java.util.ArrayList;
import java.util.Map;

@CrossOrigin
@RestController
public class GameController {
    Board board;

    @RequestMapping("/game/init")
    @ResponseBody
    public ArrayList<Map<String,String>> initGame(){

        board = new Board();
        board.setBoard();

        board.printBoard();

        return board.getBoardState();

    }

    @RequestMapping("/game/move")
    @ResponseBody
    public boolean battle(@RequestParam int startIndex, @RequestParam int distIndex){

        // true if valid move
        // false if not valid move
        return board.move(startIndex,distIndex);

    }

    @RequestMapping("/game/swap")
    @ResponseBody
    public ArrayList<Map<String,String>> swap(@RequestParam int startIndex, @RequestParam int distIndex){


        board.swapPieces( startIndex,distIndex );
        return board.getBoardState();

    }

    @RequestMapping("/game/boardstatus")
    @ResponseBody
    public ArrayList<Map<String,String>> getBoard(){

        board.printBoard();

        return board.getBoardState();

    }

    //for test only
    @RequestMapping("/game/p")
    @ResponseBody
    public String[] printsomthing(){

        String[] a ={"S","B","U"};
        return a;

    }

}
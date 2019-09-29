package gameplay.controllers;

import gameplay.model.GameResult;
import gameplay.model.GameResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import gameplay.gameEngine.Board;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
public class GameController {
    Board board;

    @Autowired
    private GameResultRepository gameResultRepository;

    @RequestMapping("/game/init")
    @ResponseBody
    public ArrayList<Map<String,String>> initGame(){

        board = new Board();
        board.setBoard();

        board.printBoard();

        return board.getBoardState();

    }


    //request a new board setup
    @RequestMapping("/game/setup")
    @ResponseBody
    public ArrayList<Map<String,String>> setup(){

        board.setBoard();

        board.printBoard();

        return board.getBoardState();

    }

    //move piece during game play
    @PostMapping("/game/move")
    @ResponseBody
    public boolean movePiece(@RequestParam int startIndex, @RequestParam int distIndex){
        System.out.println(startIndex + " " + distIndex);
        // true if valid move
        // false if not valid move
        return board.move(startIndex,distIndex);

    }

    // return 0: No winner yet
    //        1: Player one win
    //        2: Player two win
    @RequestMapping("/game/termination")
    @ResponseBody
    public int termination(){

        return board.getWinner();
    }

    //If player don't like the current setup, swap two selected pieces before game start.
    @RequestMapping("/game/swap")
    @ResponseBody
    public ArrayList<Map<String,String>> swap(@RequestParam int startIndex, @RequestParam int distIndex){
        System.out.println("\n" + startIndex + " " + distIndex);

        board.swapPieces( startIndex,distIndex );

        return board.getBoardState();

    }

    //get updated board after move or swap pieces
    @RequestMapping("/game/boardstatus")
    @ResponseBody
    public ArrayList<Map<String,String>> getBoard(){

        board.printBoard();

        return board.getBoardState();

    }

    //Player One's remaining pieces
    //Format:
    //[{"Type": "10", "Player":"1"}, ....]
    @RequestMapping("/game/getplayeronepiece")
    @ResponseBody
    public Map<String,Integer> getPlayerOnePiece(){

        return board.getRemainingPiece( 1 );

    }

    //Player Two's remaining pieces
    //Format:
    //[{"Type": "10", "Player":"2"}, ....]
    @RequestMapping("/game/getplayertwopiece")
    @ResponseBody
    public Map<String,Integer> getPlayerTwoPiece(){

        return board.getRemainingPiece( 2 );

    }

    //for test only
    @RequestMapping("/game/p")
    @ResponseBody
    public String[] printsomthing(){

        String[] a ={"S","B","U"};
        return a;

    }

    @RequestMapping("/game/AI")
    @ResponseBody
    public boolean aiMove(){
        return board.aiMove(2);
    }


    @RequestMapping("/game/savehistory")
    @ResponseBody
    public void saveHistory(GameResult results) {
        gameResultRepository.save(results);
    }

    @RequestMapping("/game/gethistory")
    @ResponseBody
    public List<GameResult> getHistory(@RequestParam(name="userid") String userid) {
        return gameResultRepository.findAllByUserIdOrderByDate(userid);
    }
}
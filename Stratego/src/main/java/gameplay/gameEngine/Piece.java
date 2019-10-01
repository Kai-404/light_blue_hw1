package gameplay.gameEngine;

import java.security.PublicKey;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Piece {

    // 1: player one piece
    // 2: player two piece
    // 0: River or Empty
    int whosePiece;

    // 10: 1 Marshall
    //  9: 1 General
    //  8: 2 Colonels
    //  7: 3 Majors
    //  6: 4 Captains
    //  5: 4 Lieutenants
    //  4: 4 Sergeants
    //  3: 5 Miners
    //  2: 8 Scouts
    //  1: 1 Spy
    //  B: 6 Bombs
    //  F: 1 Flag
    //  R: 8 River
    //  E: 12 Empty Block
    String PieceType;

    boolean display;

    public Piece(int whosePiece, String type, boolean display){

        this.whosePiece = whosePiece;
        this.PieceType = type;
        this.display = display;

    }

    public String getType(){
        return this.PieceType;
    }

    public int getWhosePiece(){
        return this.whosePiece;
    }

    public String getIfDisplay() {

        return this.display ? "yes" : "no";
    }

    public Map<String,String> getPiece(){

        Map< String,String> piece = new HashMap< String,String>();

        piece.put( "Type",this.getType() );
        piece.put( "Player",Integer.toString( this.getWhosePiece() ) );
        piece.put( "Display",this.getIfDisplay());

        return piece;

    }


    public boolean isPlayerOnePiece(){
        return this.whosePiece == 1 ;
    }

    public boolean isPlayerTwoPiece(){
        return this.whosePiece == 2 ;
    }

    public boolean isRiver(){
        return this.PieceType.equals( "R" );
    }

    public boolean isFlag(){
        return this.PieceType.equals( "F" );
    }

    public boolean isEmptyBlock(){
        return this.PieceType.equals( "E" );
    }

    public boolean isBomb(){
        return this.PieceType.equals( "B" );
    }

    public void setPieceType(String type){
        this.PieceType = type;
    }

    public void setWhosePiece(int whose){
        this.whosePiece = whose;
    }

    public void setDisplay(boolean displayStatus){
        this.display = displayStatus;
    }




}

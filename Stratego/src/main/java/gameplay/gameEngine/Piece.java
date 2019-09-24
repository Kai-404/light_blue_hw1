package gameplay.gameEngine;

import java.security.PublicKey;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Piece {

    // 1: player one piece
    // 2: player two piece
    // 0: river
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
    String PieceType;

    public Piece(int whosePiece, String type){

        this.whosePiece = whosePiece;
        this.PieceType = type;

    }

    public String getType(){
        return this.PieceType;
    }

    public int getWhosePiece(){
        return this.whosePiece;
    }

    public Map<String,String> getPiece(){

        Map< String,String> piece = new HashMap< String,String>();

        piece.put( "Type",this.getType() );
        piece.put( "Player",Integer.toString( this.getWhosePiece() ) );

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

    public void setPieceType(String type){
        this.PieceType = type;
    }

    public void setWhosePiece(int whose){
        this.whosePiece = whose;
    }




}

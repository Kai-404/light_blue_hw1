package gameplay.gameEngine;

import java.util.*;

public class Board {

    Piece[] boardState;
    Boolean isPlayerOneTurn;

    // 1: player one win
    // 2: player two win
    // 0: no winner yet
    int winner;

    ArrayList<Piece> playerOnePieces;
    ArrayList<Piece> playerTwoPieces;

    public Board(){

        this.boardState = new Piece[100];
        this.isPlayerOneTurn = true;
        playerOnePieces = new ArrayList<>();
        playerTwoPieces = new ArrayList<>();
        winner = 0;

    }

    public ArrayList<Map<String,String>> getBoardState(){
        ArrayList<Map<String,String>> boardStateStringArray = new ArrayList<>(  );

        for(int i =0; i<100;i++){
            if(boardState[i]!=null) {
                boardStateStringArray.add( boardState[i].getPiece() );
            }else{
                boardStateStringArray.add( null );
            }

        }


        return boardStateStringArray;
    }

    //for console test only
    public void printBoard(){
        ArrayList<Map<String,String>> boardStateStringArray = getBoardState();

        for(int i =0; i<100;i++){
            if(i%10==0){
                System.out.println(  );
            }

            if (boardStateStringArray.get( i )!=null){
                System.out.print(boardStateStringArray.get( i ).get("Type") + " " );
            }else{
                System.out.print("  ");
            }

        }
    }


    public void setBoard(){
        initPieces( this.playerOnePieces,1 );
        initPieces( this.playerTwoPieces,2 );
        setupPlayerTwo( this.boardState, this.playerTwoPieces );
        setupPlayerOne(this.boardState, this.playerOnePieces  );
        setRiver( this.boardState );

        //printBoard();

    }

    public Piece[] getBoardMap(){
        return this.boardState;
    }

    public ArrayList<Integer> allValidMove(int pieceIndex){

        int leftBound = (pieceIndex/10)*10 ;
        int rightBound = (leftBound + 9);
        int whose = boardState[pieceIndex].getWhosePiece();

        ArrayList<Integer> validMoveIndexes = new ArrayList<>();

        String pieceType = boardState[pieceIndex].getType();

        if (pieceType.equals( "F" )){
            return validMoveIndexes;
        }else if (pieceType.equals( "B" )){
            return validMoveIndexes;
        }else if (pieceType.equals( "2" )){

            int tempIndex= pieceIndex;
            while (tempIndex<rightBound){
                tempIndex +=1 ;
                if (boardState[tempIndex]==null){
                    validMoveIndexes.add( tempIndex );
                } else if (boardState[tempIndex].getWhosePiece()==whose || boardState[tempIndex].getWhosePiece()==0){
                    break;
                }else {
                    validMoveIndexes.add( tempIndex );
                }
            }

            tempIndex= pieceIndex;
            while (tempIndex>leftBound){
                tempIndex -=1 ;
                if (boardState[tempIndex]==null){
                    validMoveIndexes.add( tempIndex );
                } else if (boardState[tempIndex].getWhosePiece()==whose || boardState[tempIndex].getWhosePiece()==0){
                    break;
                }else {
                    validMoveIndexes.add( tempIndex );
                }
            }

            tempIndex= pieceIndex;
            while (tempIndex<89){
                tempIndex +=10 ;
                if (boardState[tempIndex]==null){
                    validMoveIndexes.add( tempIndex );
                } else if (boardState[tempIndex].getWhosePiece()==whose || boardState[tempIndex].getWhosePiece()==0){
                    break;
                }else {
                    validMoveIndexes.add( tempIndex );
                }
            }

            tempIndex= pieceIndex;
            while (tempIndex>9){
                tempIndex -=10 ;
                if (boardState[tempIndex]==null){
                    validMoveIndexes.add( tempIndex );
                } else if (boardState[tempIndex].getWhosePiece()==whose || boardState[tempIndex].getWhosePiece()==0){
                    break;
                }else {
                    validMoveIndexes.add( tempIndex );
                }
            }

        }else{
            int tempIndex= pieceIndex;

            if (tempIndex<rightBound){
                tempIndex +=1 ;
                if (boardState[tempIndex]==null){
                    validMoveIndexes.add( tempIndex );
                } else if (!(boardState[tempIndex].getWhosePiece()==whose || boardState[tempIndex].getWhosePiece()==0)) {
                    validMoveIndexes.add( tempIndex );
                }
            }

            tempIndex= pieceIndex;
            if (tempIndex>leftBound){
                tempIndex -=1 ;
                if (boardState[tempIndex]==null){
                    validMoveIndexes.add( tempIndex );
                } else if (!(boardState[tempIndex].getWhosePiece()==whose || boardState[tempIndex].getWhosePiece()==0)) {
                    validMoveIndexes.add( tempIndex );
                }
            }

            tempIndex= pieceIndex;
            if (tempIndex<89){
                tempIndex +=10 ;
                if (boardState[tempIndex]==null){
                    validMoveIndexes.add( tempIndex );
                } else if (!(boardState[tempIndex].getWhosePiece()==whose || boardState[tempIndex].getWhosePiece()==0)) {
                    validMoveIndexes.add( tempIndex );
                }
            }

            tempIndex= pieceIndex;
            if (tempIndex>9){
                tempIndex -=10 ;
                if (boardState[tempIndex]==null){
                    validMoveIndexes.add( tempIndex );
                } else if (!(boardState[tempIndex].getWhosePiece()==whose || boardState[tempIndex].getWhosePiece()==0)) {
                    validMoveIndexes.add( tempIndex );
                }
            }
        }


        return validMoveIndexes;
    }

    public boolean isValidMove(int start, int dist){

        return allValidMove(start).contains( dist );

    }

    public void initPieces(ArrayList<Piece> pieceList, int whose){

        //  F: 1 Flag
        Piece piece = new Piece( whose,"F" );
        pieceList.add( piece );

        //  B: 6 Bombs
        piece = new Piece( whose,"B" );
        for(int i =0; i<6;i++){
            pieceList.add( piece );
        }

        // 10: 1 Marshall
        piece = new Piece( whose,"10" );
        pieceList.add( piece );

        // 9: 1 Marshall
        piece = new Piece( whose,"9" );
        pieceList.add( piece );

        //  8: 2 Colonels
        piece = new Piece( whose,"8" );
        for(int i =0; i<2;i++){
            pieceList.add( piece );
        }

        //  7: 3 Majors
        piece = new Piece( whose,"7" );
        for(int i =0; i<3;i++){
            pieceList.add( piece );
        }

        //  6: 4 Captains
        piece = new Piece( whose,"6" );
        for(int i =0; i<4;i++){
            pieceList.add( piece );
        }

        //  5: 4 Lieutenants
        piece = new Piece( whose,"5" );
        for(int i =0; i<4;i++){
            pieceList.add( piece );
        }

        //  4: 4 Sergeants
        piece = new Piece( whose,"4" );
        for(int i =0; i<4;i++){
            pieceList.add( piece );
        }

        //  3: 5 Miners
        piece = new Piece( whose,"3" );
        for(int i =0; i<5;i++){
            pieceList.add( piece );
        }

        //  2: 8 Scouts
        piece = new Piece( whose,"2" );
        for(int i =0; i<8;i++){
            pieceList.add( piece );
        }

        //  1: 1 Spy
        piece = new Piece( whose,"1" );
        pieceList.add( piece );
    }

    public void setupPlayerTwo(Piece[] boardArray, ArrayList<Piece> pieceList){

        Queue<Piece> pieceQueue = new LinkedList<>(pieceList);


        Random rand = new Random();
        int flagIndex = rand.nextInt(30);

        if(flagIndex == 0){
            boardArray[0] = pieceQueue.remove();
            boardArray[1] = pieceQueue.remove();
            boardArray[10] = pieceQueue.remove();
        }else if (flagIndex == 9){
            boardArray[9] = pieceQueue.remove();
            boardArray[8] = pieceQueue.remove();
            boardArray[19] = pieceQueue.remove();
        }else if (flagIndex == 10 || flagIndex == 20){
            boardArray[flagIndex] = pieceQueue.remove();
            boardArray[flagIndex+1] = pieceQueue.remove();
            boardArray[flagIndex+10] = pieceQueue.remove();
            boardArray[flagIndex-10] = pieceQueue.remove();
        }else if(flagIndex == 19 || flagIndex == 29){
            boardArray[flagIndex] = pieceQueue.remove();
            boardArray[flagIndex-1] = pieceQueue.remove();
            boardArray[flagIndex+10] = pieceQueue.remove();
            boardArray[flagIndex-10] = pieceQueue.remove();

        }else if(flagIndex>0 && flagIndex<10){
            boardArray[flagIndex] = pieceQueue.remove();
            boardArray[flagIndex+1] = pieceQueue.remove();
            boardArray[flagIndex-1] = pieceQueue.remove();
            boardArray[flagIndex+10] = pieceQueue.remove();
        }else {
            boardArray[flagIndex] = pieceQueue.remove();
            boardArray[flagIndex+1] = pieceQueue.remove();
            boardArray[flagIndex-1] = pieceQueue.remove();
            boardArray[flagIndex+10] = pieceQueue.remove();
            boardArray[flagIndex-10] = pieceQueue.remove();
        }


        while (!pieceQueue.isEmpty()){
            int pieceIndex = rand.nextInt(40);

            while (boardArray[pieceIndex] != null){
                pieceIndex = rand.nextInt(40);
            }

            boardArray[pieceIndex] = pieceQueue.remove();
        }

    }

    public void setupPlayerOne(Piece[] boardArray, ArrayList<Piece> pieceList){

        Queue<Piece> pieceQueue = new LinkedList<>(pieceList);


        Random rand = new Random();
        int flagIndex = rand.nextInt(30);
        flagIndex+=70;

        if(flagIndex == 90){
            boardArray[90] = pieceQueue.remove();
            boardArray[91] = pieceQueue.remove();
            boardArray[80] = pieceQueue.remove();
        }else if (flagIndex == 99){
            boardArray[99] = pieceQueue.remove();
            boardArray[89] = pieceQueue.remove();
            boardArray[98] = pieceQueue.remove();
        }else if (flagIndex == 70 || flagIndex == 80){
            boardArray[flagIndex] = pieceQueue.remove();
            boardArray[flagIndex+1] = pieceQueue.remove();
            boardArray[flagIndex+10] = pieceQueue.remove();
            boardArray[flagIndex-10] = pieceQueue.remove();
        }else if(flagIndex == 79 || flagIndex == 89){
            boardArray[flagIndex] = pieceQueue.remove();
            boardArray[flagIndex-1] = pieceQueue.remove();
            boardArray[flagIndex+10] = pieceQueue.remove();
            boardArray[flagIndex-10] = pieceQueue.remove();
        }else if(flagIndex>90 && flagIndex<99){
            boardArray[flagIndex] = pieceQueue.remove();
            boardArray[flagIndex+1] = pieceQueue.remove();
            boardArray[flagIndex-1] = pieceQueue.remove();
            boardArray[flagIndex-10] = pieceQueue.remove();
        }else{
            boardArray[flagIndex] = pieceQueue.remove();
            boardArray[flagIndex+1] = pieceQueue.remove();
            boardArray[flagIndex-1] = pieceQueue.remove();
            boardArray[flagIndex+10] = pieceQueue.remove();
            boardArray[flagIndex-10] = pieceQueue.remove();
        }

        while (!pieceQueue.isEmpty()){
            int pieceIndex = rand.nextInt(40);
            pieceIndex+=60;

            while (boardArray[pieceIndex] != null){
                pieceIndex = rand.nextInt(40);
                pieceIndex+=60;
            }

            boardArray[pieceIndex] = pieceQueue.remove();
        }

    }

    public void setRiver(Piece[] boardArray){

        Piece river = new Piece( 0,"R" );
        boardArray[42] = river;
        boardArray[43] = river;
        boardArray[46] = river;
        boardArray[47] = river;
        boardArray[52] = river;
        boardArray[53] = river;
        boardArray[56] = river;
        boardArray[57] = river;

    }


}

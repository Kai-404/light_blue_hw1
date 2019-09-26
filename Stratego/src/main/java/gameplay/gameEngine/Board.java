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

    public ArrayList<Map<String,String>> getRemainingPiece (int whose){
        ArrayList<Map<String,String>> remainingPiece = new ArrayList<>(  );

        ArrayList<Piece> list= whose==1?playerOnePieces:playerTwoPieces;

        for(Piece piece: list){

            if (piece!=null){
                remainingPiece.add(piece.getPiece());
            }
        }

        return remainingPiece;
    }

    public void setWinner(int winner){
        this.winner = winner;
    }

    public int getWinner(){
        return winner;
    }

    public void swapPieces(int pieceOne, int pieceTwo){

        Piece tempPiece = boardState[pieceOne];
        boardState[pieceOne]=boardState[pieceTwo];
        boardState[pieceTwo]=tempPiece;

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
        initPieces( this.playerOnePieces,1 ,true);
        initPieces( this.playerTwoPieces,2 ,false);
        setupPlayerTwo( this.boardState, this.playerTwoPieces );
        setupPlayerOne(this.boardState, this.playerOnePieces  );
        setRiver( this.boardState );
        setEmptyBlock( this.boardState  );

        //printBoard();

    }

    public Piece[] getBoardMap(){
        return this.boardState;
    }


    public boolean move(int startIndex, int distIndex){

        if(isValidMove( startIndex,distIndex )){

            if (boardState[distIndex].isEmptyBlock()){

                if (boardState[startIndex].getType().equals( "2" ) ){

                    if (!(distIndex == startIndex+1
                            ||distIndex == startIndex-1
                            ||distIndex == startIndex+10
                            ||distIndex == startIndex-10)){

                        boardState[startIndex].setDisplay( true );
                    }
                }
                swapPieces( startIndex,distIndex );

            }else {

                this.battle(startIndex,distIndex);

            }

            return true;
        }else {
            return false;
        }
    }

    public void battle(int atkIndex, int defIndex){

        Piece atkPiece = boardState[atkIndex];
        Piece defPiece = boardState[defIndex];
        Piece emptyPiece = new Piece( 0,"E",true );

        if (defPiece.getType().equals( "F" )){
            boardState[defIndex] = emptyPiece;
            swapPieces( atkIndex,defIndex );
            boardState[defIndex].setDisplay( true );
            if (boardState[defIndex].getWhosePiece()==1){
                removePiece( 1,"F" );
            }else {
                removePiece( 2,"F" );
            }
        }else if(defPiece.getType().equals( "B" )){

            if (!(atkPiece.getType().equals("3"))){

                boardState[atkIndex]=emptyPiece;
                removePiece( atkPiece.getWhosePiece(),atkPiece.PieceType );
                boardState[defIndex].setDisplay( true );
            }else {
                boardState[defIndex]=emptyPiece;
                boardState[atkIndex].setDisplay( true );
                swapPieces( atkIndex,defIndex );
                removePiece( defPiece.getWhosePiece(),defPiece.getType() );
            }
        }else if(defPiece.getType().equals( "10" )){

            if (!(atkPiece.getType().equals("1"))){

                boardState[atkIndex]=emptyPiece;
                removePiece( atkPiece.getWhosePiece(),atkPiece.PieceType );
                boardState[defIndex].setDisplay( true );
            }else {
                boardState[defIndex]=emptyPiece;
                boardState[atkIndex].setDisplay( true );
                swapPieces( atkIndex,defIndex );
                removePiece( defPiece.getWhosePiece(),defPiece.getType() );
            }
        }else {

            int atkRank = Integer.parseInt( atkPiece.getType() );
            int defRank = Integer.parseInt( defPiece.getType() );

            if (atkRank>defRank){

                boardState[defIndex]=emptyPiece;
                boardState[atkIndex].setDisplay( true );
                removePiece( defPiece.getWhosePiece(),defPiece.getType() );
                swapPieces( atkIndex,defIndex );
            }else if (atkRank<defRank){
                boardState[atkIndex]=emptyPiece;
                boardState[defIndex].setDisplay( true );
                removePiece( atkPiece.getWhosePiece(),atkPiece.getType() );
            }else {
                boardState[defIndex]=emptyPiece;
                boardState[atkIndex]=emptyPiece;
                removePiece( defPiece.getWhosePiece(),defPiece.getType() );
                removePiece( atkPiece.getWhosePiece(),atkPiece.getType() );
            }

        }

        termination( playerOnePieces,playerTwoPieces );

    }

    public void termination(ArrayList<Piece> list1, ArrayList<Piece> list2){

        boolean findFlag1 =false;
        boolean findFlag2 =false;
        boolean findMovablePiece1 =false;
        boolean findMovablePiece2 =false;

        for(Piece piece : list1){
            if(piece != null){
                String type = piece.getType();

                if (type.equals( "F" )){
                    findFlag1 =true;
                }else{
                    findMovablePiece1=true;
                }
            }
        }

        for(Piece piece : list2){
            if(piece != null){
                String type = piece.getType();

                if (type.equals( "F" )){
                    findFlag2 =true;
                }else{
                    findMovablePiece2=true;
                }
            }
        }

        if (!(findFlag1) || !(findMovablePiece1)){
            setWinner( 2 );
        }else if( !(findFlag2) || !(findMovablePiece2) ){
            setWinner( 1 );
        }



    }

    public void removePiece(int whose, String type){

        ArrayList<Piece> list;

        list= (whose ==1 ? playerOnePieces : playerTwoPieces);
        for (Piece piece : list) {
            if (piece.getType().equals( type )){
                list.remove( piece );
                break;
            }
        }
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
                if (boardState[tempIndex].isEmptyBlock()){
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
                if (boardState[tempIndex].isEmptyBlock()){
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
                if (boardState[tempIndex].isEmptyBlock()){
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
                if (boardState[tempIndex].isEmptyBlock()){
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
                if (boardState[tempIndex].isEmptyBlock()){
                    validMoveIndexes.add( tempIndex );
                } else if (!(boardState[tempIndex].getWhosePiece()==whose || boardState[tempIndex].getWhosePiece()==0)) {
                    validMoveIndexes.add( tempIndex );
                }
            }

            tempIndex= pieceIndex;
            if (tempIndex>leftBound){
                tempIndex -=1 ;
                if (boardState[tempIndex].isEmptyBlock()){
                    validMoveIndexes.add( tempIndex );
                } else if (!(boardState[tempIndex].getWhosePiece()==whose || boardState[tempIndex].getWhosePiece()==0)) {
                    validMoveIndexes.add( tempIndex );
                }
            }

            tempIndex= pieceIndex;
            if (tempIndex<89){
                tempIndex +=10 ;
                if (boardState[tempIndex].isEmptyBlock()){
                    validMoveIndexes.add( tempIndex );
                } else if (!(boardState[tempIndex].getWhosePiece()==whose || boardState[tempIndex].getWhosePiece()==0)) {
                    validMoveIndexes.add( tempIndex );
                }
            }

            tempIndex= pieceIndex;
            if (tempIndex>9){
                tempIndex -=10 ;
                if (boardState[tempIndex].isEmptyBlock()){
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

    public void initPieces(ArrayList<Piece> pieceList, int whose, boolean display){

        //  F: 1 Flag
        Piece piece = new Piece( whose,"F", display );
        pieceList.add( piece );

        //  B: 6 Bombs
        piece = new Piece( whose,"B",display );
        for(int i =0; i<6;i++){
            pieceList.add( piece );
        }

        // 10: 1 Marshall
        piece = new Piece( whose,"10",display );
        pieceList.add( piece );

        // 9: 1 Marshall
        piece = new Piece( whose,"9" ,display);
        pieceList.add( piece );

        //  8: 2 Colonels
        piece = new Piece( whose,"8",display );
        for(int i =0; i<2;i++){
            pieceList.add( piece );
        }

        //  7: 3 Majors
        piece = new Piece( whose,"7",display );
        for(int i =0; i<3;i++){
            pieceList.add( piece );
        }

        //  6: 4 Captains
        piece = new Piece( whose,"6",display );
        for(int i =0; i<4;i++){
            pieceList.add( piece );
        }

        //  5: 4 Lieutenants
        piece = new Piece( whose,"5",display );
        for(int i =0; i<4;i++){
            pieceList.add( piece );
        }

        //  4: 4 Sergeants
        piece = new Piece( whose,"4",display );
        for(int i =0; i<4;i++){
            pieceList.add( piece );
        }

        //  3: 5 Miners
        piece = new Piece( whose,"3",display );
        for(int i =0; i<5;i++){
            pieceList.add( piece );
        }

        //  2: 8 Scouts
        piece = new Piece( whose,"2",display );
        for(int i =0; i<8;i++){
            pieceList.add( piece );
        }

        //  1: 1 Spy
        piece = new Piece( whose,"1",display );
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

        //row 50: _ _ R R _ _ R R _ _
        //row 60: _ _ R R _ _ R R _ _

        Piece river = new Piece( 0,"R",true );

        boardArray[42] = river;
        boardArray[43] = river;
        boardArray[46] = river;
        boardArray[47] = river;
        boardArray[52] = river;
        boardArray[53] = river;
        boardArray[56] = river;
        boardArray[57] = river;

    }

    public void setEmptyBlock(Piece[] boardArray){

        //row 50: E E _ _ E E _ _ E E
        //row 60: E E _ _ E E _ _ E E

        Piece empty = new Piece( 0,"E",true );

        boardArray[40] = empty;
        boardArray[41] = empty;
        boardArray[44] = empty;
        boardArray[45] = empty;
        boardArray[48] = empty;
        boardArray[49] = empty;

        boardArray[50] = empty;
        boardArray[51] = empty;
        boardArray[54] = empty;
        boardArray[55] = empty;
        boardArray[58] = empty;
        boardArray[59] = empty;

    }


}

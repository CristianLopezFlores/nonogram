let rows=0;
let columns=0;
let type;
let level=0;
let clues;
let size='47px';
let backGroundColor='initial'; 
let selectColorCell='black';
let gameState={};
let moveCounter=0;
let totalBlocks=0;
let activeBlocks=0;
let timer;
let watch;
let userInputs=false;
let matrix=[];
let maxRowSize;
let maxColSize;
let img;
let bWimg;
let errorCounter=0;
let gameCompleted=0;
let attackGameStarted=false;
//let arcade=false;
let attack=false;
///let canvas;
let countDown=0;
var httpRequest=new XMLHttpRequest();
document.getElementById('arcade').onclick=function(){
    document.getElementById('gameTypeMenu').style.display='none'
    document.getElementById('menu').style.display='block';
}
document.getElementById('attack').onclick=function(){
    document.getElementById('gameTypeMenu').style.display='none'
    document.getElementById('attackMenu').style.display='block';
    document.getElementById('wonGameCounter').style.display='block';

    attack=true;

}
function fiveByFive(){
    rows=5;
    columns=5;
    type='5X5';
    size='40';
    if(attack==false){
        document.getElementById('gameLevels').style.display='block';
        document.getElementById('menu').style.display='none';
    }
    else{
        document.getElementById('attackMenu').style.display='none';
        document.getElementById('attackLevels').style.display='block'
    }
}
function tenByTen(){
    document.getElementById('menu').style.display='none';
    rows=10;
    columns=10;
    size='23';
    type='10X10';
    if(attack==false){
        document.getElementById('gameLevels').style.display='block';
        document.getElementById('menu').style.display='none';
    }
    else{
        document.getElementById('attackMenu').style.display='none';
        document.getElementById('attackLevels').style.display='block'
    }
}
function tenByFive(){
    document.getElementById('menu').style.display='none';
    rows=10;
    columns=5;
    size='35';
    type='10X5';
    if(attack==false){
        document.getElementById('gameLevels').style.display='block';
        document.getElementById('menu').style.display='none';
    }
    else{
        document.getElementById('attackMenu').style.display='none';
        document.getElementById('attackLevels').style.display='block'
    }
}   
function fifteenByFifteen(){

    document.getElementById('menu').style.display='none';
    rows=15;
    columns=15;
    size='15';
    type='15X15';
    
    if(attack==false){
        document.getElementById('gameLevels').style.display='block';
        document.getElementById('menu').style.display='none';
    }
    else{
        document.getElementById('attackMenu').style.display='none';
        document.getElementById('attackLevels').style.display='block'
    }
}
document.getElementById('20X20').onclick=function(){

    document.getElementById('menu').style.display='none';
    rows=20;
    columns=20;
    size='10';
    type='20X20';
    if(attack==false){
        document.getElementById('gameLevels').style.display='block';
        document.getElementById('menu').style.display='none';
    }
    else{
        document.getElementById('attackMenu').style.display='none';
        document.getElementById('attackLevels').style.display='block'
    }
}
document.getElementById('uploadImage').onclick=function(){
    document.getElementById('uploadImageCtn').style.display='block';
    document.getElementById('menu').style.display='none';
    rows=15;
    columns=15;
    size='15';
    type='15X15';

}
document.getElementById('level1').onclick=function(){
    document.getElementById('gameCtn').style.display='block';
    document.getElementById('gameLevels').style.display='none';
    level=this.id; 
    requestJson();
    createNonogramTable(type);
    document.getElementById('clock').style.display='block';
}
document.getElementById('level2').onclick=function(){
    document.getElementById('gameCtn').style.display='block';
    document.getElementById('gameLevels').style.display='none';
    level=this.id;
    requestJson();
    createNonogramTable(type);
    document.getElementById('clock').style.display='block';
}
document.getElementById('level3').onclick=function(){
    document.getElementById('gameCtn').style.display='block';
    document.getElementById('gameLevels').style.display='none';
    level=this.id;
    requestJson();
    createNonogramTable(type);
    document.getElementById('clock').style.display='block';
}
document.getElementById('level4').onclick=function(){
    document.getElementById('gameCtn').style.display='block';
    document.getElementById('gameLevels').style.display='none';
    level=this.id;
    requestJson();
    createNonogramTable(type);
    document.getElementById('clock').style.display='block';
}
document.getElementById('level5').onclick=function(){
    document.getElementById('gameCtn').style.display='block';
    document.getElementById('gameLevels').style.display='none';
    level=this.id;
    requestJson();
    createNonogramTable(type);
    document.getElementById('clock').style.display='block';
}
document.getElementById('time1').onclick=function(){
    document.getElementById('gameCtn').style.display='block';
    document.getElementById('attackLevels').style.display='none';
    countDown=3;
    randomButton();
}
document.getElementById('time2').onclick=function(){
    document.getElementById('gameCtn').style.display='block';
    document.getElementById('attackLevels').style.display='none';
    countDown=5;
    document.getElementById('timer').innerHTML=countDown;
    randomButton();
}
document.getElementById('time3').onclick=function(){
    document.getElementById('gameCtn').style.display='block';
    document.getElementById('attackLevels').style.display='none';
    countDown=10;
    document.getElementById('timer').innerHTML=countDown;
    randomButton();
}
document.getElementById('time4').onclick=function(){
    document.getElementById('gameCtn').style.display='block';
    document.getElementById('attackLevels').style.display='none';
    document.getElementById('timer').innerHTML=countDown;
    countDown=15;
    randomButton();
}
document.getElementById('time5').onclick=function(){
    document.getElementById('gameCtn').style.display='block';
    document.getElementById('attackLevels').style.display='none';
    document.getElementById('timer').innerHTML=countDown;
    countDown=20;
    randomButton();
}
function requestJson(){
    
    var requestURL='games'+"/"+type+"/"+level+".json";
    httpRequest.onreadystatechange=getGameData;
    httpRequest.open('GET',requestURL); 
    httpRequest.send();
}
document.getElementById('changeType').onclick=function(){
    clearCurrentGame();
    watch.end();
    document.getElementById('gameCtn').style.display='none';
    attackGameStarted=false;
    if(attack==true){
        document.getElementById('attackMenu').style.display='block';
        gameCompleted=0;
    }
    else{
        document.getElementById('menu').style.display='block';
    }
}
document.getElementById('changeLevel').onclick=function(){
    clearCurrentGame();
    watch.end();
    document.getElementById('gameCtn').style.display='none';
    attackGameStarted=false;
    if(attack==true){
        document.getElementById('attackLevels').style.display='block';
        gameCompleted=0;
    }
    else{
        document.getElementById('gameLevels').style.display='block';
    }
    
}
document.getElementById("changeGameMode").onclick=function(){
    clearCurrentGame();
    watch.end();
    document.getElementById('gameCtn').style.display='none';
    attackGameStarted=false;
    document.getElementById('gameTypeMenu').style.display='block';
}
function clearCurrentGame(){
    document.getElementById('clueColumnTable').remove();
    document.getElementById('clueRowTable').remove();
    document.getElementById('createdGame').remove();
    document.getElementById('moveCounter').innerHTML=0;
    document.getElementById('errorCounter').innerHTML=0;
    document.getElementById('active').innerHTML=0;
    errorCounter=0;
    gameState={};
    moveCounter=0;
    totalBlocks=0;
    activeBlocks=0;
    userInputs=false;
    matrix=[];

    
}
//var img = new Image()
//var bWimg = new Image();

function loadFile(e){
    img=new Image();
    bWimg = new Image();
    var reader = new FileReader();
    
    reader.onload = function(event){
        
        img.onload = function(){
            //let canvas=document.getElementById('canvas');
            canvas=document.createElement('canvas');
            let ctx=canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img,0,0);
        }

        img.src = event.target.result;
        //document.getElementById('output').src=img.src;
    }
    reader.readAsDataURL(e.target.files[0]);    
}
document.getElementById('playGame').onclick=function(){
    //var canvas = document.getElementById('canvas');
    //img=document.getElementById('output');
    var ctx = canvas.getContext('2d');

    ctx.drawImage(img,0,0); 
    var imageData = ctx.getImageData(0, 0,  canvas.width, canvas.height);
    
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        let Y = 0.2126*avg  + 0.7152*avg + 0.0722*avg;
        let c = Y < 128 ? 000 : 255;
        data[i]     = c;
        data[i + 1] =c;
        data[i + 2] = c;
        }
  
        ctx.putImageData(imageData, 0, 0);
        img.src='';
        bWimg.src = canvas.toDataURL("image/jpg");
      //document.getElementById('display').src=bWimg.src;
        setTimeout(function(){
        createImageBlocks();
    }, 1000);
     // createImageBlocks();
}
function createImageBlocks(){
    //var canvas = document.getElementById('canvas');
    let spaceX=(Math.ceil((canvas.width)/15));
    let spaceY=(Math.ceil((canvas.height)/15));
    //let divCtn=document.getElementById('multiCanvas');

    var canvas1 = document.createElement('canvas');
    //divCtn.appendChild(canvas1);
    var ctx1 = canvas1.getContext('2d');
    ctx1.canvas.width=spaceX;
    ctx1.canvas.height=spaceY;
    for(let i=0;i<canvas.height;i+=spaceY){
        let matrixRow=[];
      //divCtn.appendChild(document.createElement("BR"));
      //divCtn.appendChild(document.createElement("BR"));
        for(let j=0;j<canvas.width;j+=spaceX){
        

        ctx1.drawImage(bWimg,j,i,spaceX,spaceY,0, 0, spaceX, spaceY);
        let newImageData = ctx1.getImageData(0, 0, spaceX, spaceY)
        let newData = newImageData.data;
        let black=0;
        let white=0;
        for (var k = 0; k < newData.length; k += 4) {
            if(newData[k]==255){
                white++;
            }
            else{
                black++;
            }
            }
            if(white>black){
            matrixRow.push(false);
            }
            else{
            matrixRow.push(true);
            }
    
        
       // matrixIndexJ++;
        ctx1.clearRect(0,0, spaceX, spaceY);
        }
        //matrixIndexI++;
        matrix.push(matrixRow);
        
    }
    canvas1.remove();
    canvas.remove();
    bWimg.src='';
    
    createClues();
    }
function createClues(){
    let columnClues=[];
    let rowClues=[];
    for(let i=0;i<15;i++){
        let counter=0
        let clues=[]
        for(let j=0;j<15;j++){
        if(matrix[i][j]==true){
            counter++;
        }
        if((matrix[i][j]==false&&counter>0)||(counter>0&&j==14)){
            
            clues.push(counter);
            counter=0;
        }
        
        }
        rowClues.push(clues);
    }
    for(let i=0;i<15;i++){
        let counter=0
        let clues=[]
        for(let j=0;j<15;j++){
        if(matrix[j][i]==true){
            counter++;
        }
        if((matrix[j][i]==false&&counter>0)||(counter>0&&j==14)){
            clues.push(counter);
            counter=0;
        
        }
        
        }
        columnClues.push(clues);
    }
    let clueTable=[];
    clueTable.push(rowClues);
    clueTable.push(columnClues);
    
    userInputs=true;
    document.getElementById('gameCtn').style.display='block';
    document.getElementById('uploadImageCtn').style.display='none';
    document.getElementById('clock').style.display='block';
    document.getElementById('gameLevels').style.display='none';
    createNonogramTable(type);
    clues=JSON.stringify(clueTable);
    createClueTables(JSON.stringify(clueTable));
    } 
function randomButton(){
    let randomMatrix=[];
    
    for(let i=0;i<rows;i++){
        let matrixRow=[];
        let decrement=0;
        let rowClue=0;
        while(decrement<columns){
            rowClue=Math.floor(Math.random() * (columns-decrement)) + 1;
            if(rowClue==columns){
                decrement+=(rowClue)
            }
            else{
                decrement+=(rowClue+1)
            }
            
            matrixRow.push(rowClue);
            
            if(Math.random() >= 0.7){
                break;
            }
        }
        randomMatrix.push(matrixRow);
        
        
    }
    placeRandomCluesInMatrix(randomMatrix);
}
function clueSum(randomClues,index){ 
    let sum=0;
    for(let i=index;i<randomClues.length;i++){
        sum+=(randomClues[i]+1);
    }
    return sum;
}
function backwardClueSum(randomClues,index){ 
    let sum=0;
    for(let i=index;i>=0;i--){
        sum+=(randomClues[i]+1);
    }
    return sum;
}
function placeRandomCluesInMatrix(randMatrix){
    let randomMatrixTable=[];
    for(let i=0; i<rows;i++){
        let randomRow=randMatrix[i];
        let randomRowTable=new Array(columns);
        randomRowTable.fill(false);
        let availableIndex=0;
        let clueCounter=0;
        for(let j=0;j<randomRow.length;j++){
            
            let sum=clueSum(randomRow,j+1);
    
            let availableSlots=columns-sum;
            let maxRangeIndex=availableSlots-randomRow[j];
        
            selectIndex= Math.floor(Math.random() * (maxRangeIndex-availableIndex)) + (availableIndex);
            
            for(let k=0;k<randomRow[j];k++){
                randomRowTable[selectIndex]=true;
                availableIndex=selectIndex+2;
                selectIndex++;
            }
        }
        randomMatrixTable.push(randomRowTable);
        
    }
    let columnClueMatrix=[];
    for(let i=0;i<columns;i++){
        let counter=0
        let clues=[]
        for(let j=0;j<rows;j++){
        
            if(randomMatrixTable[j][i]==true){
            
                counter++;
                }
            if((randomMatrixTable[j][i]==false&&counter>0)||(counter>0&&j==rows-1)){
                clues.push(counter);
                counter=0;
            }

        }
        columnClueMatrix.push(clues);
    }
    matrix.push(randMatrix);
    matrix.push(columnClueMatrix);
    userInputs=true;
    document.getElementById('gameCtn').style.display='block';
    document.getElementById('clock').style.display='block';
    document.getElementById('gameLevels').style.display='none';
    createNonogramTable(type);
    clues=JSON.stringify(matrix);
    createClueTables(JSON.stringify(matrix));
}
function getGameData(){
    try{
        if(httpRequest.readyState===XMLHttpRequest.DONE){
            if(httpRequest.status===200){
            clues=httpRequest.responseText; 
            createClueTables(clues);
            }
        }
    }
    catch(e){
    }
}
function getMaxClueLength(cluesData){
    let len=0;
    for(let i=0;i<cluesData.length;i++)
    {   
        if(len<cluesData[i].length){
            len=cluesData[i].length;
        }
    }
    return len
}
function createClueTables(gameClues){
    let clueData=JSON.parse(gameClues);
    let rowsClues;
    let columnsClues;
        if(userInputs==false){
            rowsClues=clueData[0].row;
            columnsClues=clueData[1].column;
        }
        else{
            
            rowsClues=clueData[0];
            columnsClues=clueData[1];
        }


    let rowMaxClues=getMaxClueLength(rowsClues);
    let columnMaxClues=getMaxClueLength(columnsClues);
        maxRowSize=rowMaxClues;
        maxColSize=columnMaxClues;
    let clueColumnCtn=document.getElementById('columnClues');
    let clueRowCtn=document.getElementById('rowClues');
    let clueColumnTable=document.createElement('table');
    let clueColumnTbody=document.createElement('Tbody');
    let clueRowTable=document.createElement('table')
    let clueRowTbody=document.createElement('Tbody');
        clueColumnTable.id='clueColumnTable';
        clueRowTable.id='clueRowTable';

    for(let i=0;i<columnMaxClues;i++){

        let clueRow=document.createElement('tr');
        for(let j=0;j<columns;j++){
    
            let clueColumnCell=document.createElement('td');
            let clueColumnDiv=document.createElement('div');
            clueColumnCell.className='tableCell';
            clueColumnDiv.id='c:'+i+j;
            clueColumnDiv.className='clueCell';
            clueColumnCell.style.width=size;
            clueColumnCell.style.height=size;
            clueColumnCell.appendChild(clueColumnDiv);
            clueColumnDiv.style.width='100%';
            clueColumnDiv.style.height='100%';
            clueRow.appendChild(clueColumnCell);
        }
        clueColumnTbody.appendChild(clueRow);
    }
    clueColumnTable.appendChild(clueColumnTbody);
    clueColumnCtn.appendChild(clueColumnTable);
    for(let i=0;i<columns;i++){
        let cluesList=columnsClues[i];
        let k=columnMaxClues-1;
        for(let j=cluesList.length-1;j>-1;j--){
            let clueCtn=document.getElementById('c:'+k+i);
            k--;
            if(type=='15X15'){
                clueCtn.style.fontSize='10px';
            }
            clueCtn.innerHTML=cluesList[j];  
        }
    }
    for(let i=0;i<rows;i++){
        let clueRow=document.createElement('tr');
        for(let j=0;j<rowMaxClues;j++){
            let clueRowCell=document.createElement('td');
            let clueRowDiv=document.createElement('div');
            clueRowCell.className='tableCell';
            clueRowDiv.id='r:'+i+j;
            clueRowDiv.className='clueCell';
            clueRowCell.style.width=size;
            clueRowCell.style.height=size;
            clueRowCell.appendChild(clueRowDiv);
            clueRowDiv.style.width='100%';
            clueRowDiv.style.height='100%';
            clueRow.appendChild(clueRowCell);
        }
        clueRowTbody.appendChild(clueRow);
    }
    clueRowTable.appendChild(clueRowTbody);
    clueRowCtn.appendChild(clueRowTable);
    for(let i=0;i<rows;i++){
        let cluesList=rowsClues[i];
        let k=rowMaxClues-1;
        
        for(let j=cluesList.length-1;j>-1;j--){
            let clueCtn=document.getElementById('r:'+i+k);
            k--;
            if(type=='15X15'){
                clueCtn.style.fontSize='10px';
            }
            clueCtn.innerHTML=cluesList[j];  

        }
    }


    document.getElementById('previewWindow').style.width=clueRowCtn.getBoundingClientRect().width-2;
    document.getElementById('previewWindow').style.height=clueColumnCtn.getBoundingClientRect().height-2;

    
}

function createNonogramTable(type){
    let gameCtn=document.getElementById('gameTable');
    let table=document.createElement('table');
    let tableBody=document.createElement('tbody');
    for(let i=0;i<rows;i++){
        let tableRow=document.createElement('tr');
        for(let j=0;j<columns;j++){
            gameState[' '+i+","+j]=false;
            let tableCell=document.createElement('td');
            let tableCellDiv=document.createElement('div');
            tableCellDiv.id=' '+i+","+j;
            tableCell.className='tableCell';
            tableCellDiv.className='gameCell';
            tableCellDiv.style.backgroundColor=backGroundColor;
            tableCellDiv.style.display='inline-block';
            tableCell.appendChild(tableCellDiv);
            if(type=='5X5'){
                tableCell.style.width=size;
                tableCell.style.height=size;
                tableCellDiv.style.fontSize='10px';

            }
            else if(type=='10X10'){
                tableCell.style.width=size;
                tableCell.style.height=size;
                tableCellDiv.style.fontSize='43px';

            }
            else if(type=='10X5'){
                tableCell.style.width=size;
                tableCell.style.height=size;
                tableCellDiv.style.fontSize='43px';
                
            }
            else if(type=='15X15'){
                tableCell.style.width=size;
                tableCell.style.height=size;
                tableCellDiv.style.fontSize='43px';
            }
            else if(type=='20X20'){
                tableCell.style.width=size;
                tableCell.style.height=size;
                tableCellDiv.style.fontSize='43px';
            }
            tableCellDiv.style.width='100%';
            tableCellDiv.style.height='100%';
            tableCellDiv.style.textAlign='center';
            tableCellDiv.onclick=function(){
                if(this.style.backgroundColor==selectColorCell){
        
                    this.style.backgroundColor=backGroundColor;
                    gameState[this.id]=false;
                    moveCounter++
                    activeBlocks--;
                    document.getElementById('active').innerHTML= activeBlocks;
                    document.getElementById('moveCounter').innerHTML= moveCounter;
                    
                }
                else{
                
                    this.style.backgroundColor=selectColorCell;
                    gameState[this.id]=true;
                    moveCounter++
                    activeBlocks++;
                    document.getElementById('active').innerHTML= activeBlocks;
                    document.getElementById('moveCounter').innerHTML= moveCounter;
                    
                }
                checkError(this.id);
                winState(); 
            
            }
            tableRow.appendChild(tableCell);
            
        }
        tableBody.appendChild(tableRow);
    }

    table.appendChild(tableBody);
    table.id='createdGame';
    gameCtn.appendChild(table);
    
    if(attackGameStarted==false){
        attackGameStarted=true;
        startTimer();
    }

    //startTimer();
} 


function startTimer(){
	timer=document.getElementById('timer');
	watch=new clock(timer);

	watch.start();
}
function clock(watch){
    let time=0;
    if(attack==true){
        time=new Date();
        time.setMinutes(countDown);
        time.setSeconds(0);
        time.setMilliseconds(0);
    }

	
	let offset;
	let int;

	function updating(){
        if(attack==true){
            time-=passingTime();
        }
        else{
            time+=passingTime();
        }
        watch.textContent=setTimer(time);
	}

    function passingTime(){
        var currentTime=Date.now();
        var timePassed=currentTime-offset;;
        offset=currentTime;
        return timePassed;
    }
    function setTimer(time){
            time= new Date(time)
            var min=time.getMinutes().toString();
            var sec=time.getSeconds().toString();
            var milli=time.getMilliseconds().toString();

        if(min.length<2){
            min='0'+min;
        }
        if(sec.length<2){
            sec='0'+sec;
        }
        while(milli.length<3){
            milli='0'+milli;
        }
        return min+':'+sec+'.'+milli;
    }
    this.start = function() {
        int = setInterval(updating.bind(this), 10);
        offset = Date.now();

        };
    this.end=function(){
        clearInterval(int);
    }  
}
function borderColor(){
    var tableCells=document.getElementsByClassName('tableCell');
    var newColor=document.getElementById('borderColor').value;
    for(let i=0;i<tableCells.length;i++){
        
        tableCells[i].style.borderColor=newColor;
    }
}
function gridColor(){
    var gameBackground=document.getElementsByClassName('game');
    var newColor=document.getElementById('gridColor').value;
    backGroundColor=newColor;
    for(let i=0;i<gameBackground.length;i++){
        
        gameBackground[i].style.backgroundColor=newColor;
    }
}
function selectColor(){
    var gameCells=document.getElementsByClassName('gameCell');
    var newColor=document.getElementById('selectedColor').value;
    for(let i=0;i<gameCells.length;i++){
        if(gameCells[i].style.backgroundColor==selectColorCell){
        gameCells[i].style.backgroundColor=newColor;
        }
    }
    selectColorCell=newColor;
}
function winState(){
    let clueCounter=0;
    
    let gameClues=JSON.parse(clues);

    let rowsClues;
    let columnsClues;
    let win=true;
    if(userInputs==false){
        rowsClues=gameClues[0].row;
        columnsClues=gameClues[1].column;
    }
    else{
        
        rowsClues=gameClues[0];
        columnsClues=gameClues[1];

    }

    let currentClueIndex=0;

    for(let j=0;j<columns;j++){
            currentClueIndex=0;
            let currentClues=columnsClues[j];
            if(currentClues.length==0){
                continue;
            }
            clueCounter=0;
            
        for(i=0;i<rows;i++){
            
            if(currentClueIndex==currentClues.length){
                if(gameState[' '+i+","+j]==true){
                    win=false;
                }
                continue;
            }
            if(gameState[' '+i+","+j]==true){
                clueCounter++               
            }

            if((gameState[' '+i+","+j]==false&&clueCounter>0)||i==rows-1){
                if(currentClues[currentClueIndex]!=clueCounter){
                    if(currentClues[currentClueIndex]<clueCounter){
                    }
                    win=false;
                }
                
                currentClueIndex++
                clueCounter=0;
            }   

        
        }
        if(currentClueIndex!=currentClues.length){
            win=false;
        }
    }
    for(let i=0;i<rows;i++){
        currentClueIndex=0;
        let currentClues=rowsClues[i];
        if(currentClues.length==0){
            continue;
        }
        clueCounter=0;
        for(j=0;j<columns;j++){
            if(currentClueIndex==currentClues.length){
                if(gameState[' '+i+","+j]==true){
        
                    win=false;
                }
                continue;
            }
            if(gameState[' '+i+","+j]==true){
                clueCounter++               
            }

            if((gameState[' '+i+","+j]==false&&clueCounter>0)||j==columns-1){
                if(currentClues[currentClueIndex]!=clueCounter){
                    if(currentClues[currentClueIndex]<clueCounter){
                    }
                    win=false;
                }
                
                currentClueIndex++
                clueCounter=0;
            }   
        }
        if(currentClueIndex!=currentClues.length){
            win=false;
        }

    }
    if(win==true){
        if(attack==true){
            gameCompleted++;
            document.getElementById('gamesCompletedCounter').innerHTML=gameCompleted;
            clearCurrentGame();
            randomButton();
        }
        else{
            displayWinMessage()
            watch.end();
        }
    
    }
}
function checkErrorHelperRow(clues,clueIndex,clueRanges,nextAvailableIndex,rowIndex,selectedSlotCnt,selectedCntCounter){

    if(clueIndex>clues.length-1&&selectedCntCounter==0){
        return true;
    }
    if(clueIndex>clues.length-1&&selectedCntCounter!=0){
        return false;
    }
    let currentClue=clues[clueIndex];
    let maxClueRange=clueRanges[clueIndex][1];
    let minClueRange=clueRanges[clueIndex][0];
    let maxStartingIndex=maxClueRange-currentClue+1;
    let minEndingIndex=minClueRange+currentClue-1;
    let endingIndex=0;
    let clueCompleteCounter=0;
    let selectedSlotsRange=0;
    for(let i=nextAvailableIndex;i<=maxStartingIndex;i++){
        selectedSlotsRange=0;
        endingIndex=i+(currentClue);
        if(gameState[" "+rowIndex+","+endingIndex]==true||gameState[" "+rowIndex+","+(i-1)]==true){
            continue;
        }  
        
        for (let keys in selectedSlotCnt){
            let selectedSlotRange=parseInt(keys)+selectedSlotCnt[keys]-1;
            if(parseInt(keys)>endingIndex){
                break;
            }
            if(parseInt(keys)>=i&&selectedSlotRange<=endingIndex-1){
                selectedSlotsRange++;
            }
            
        }
        selectedCntCounter-=selectedSlotsRange;
        let success=checkErrorHelperRow(clues,clueIndex+1,clueRanges,endingIndex+1,rowIndex,selectedSlotCnt,selectedCntCounter);
        if(success==true){
            clueCompleteCounter++;
        }
        selectedCntCounter+=selectedSlotsRange;
    
    }
    if(clueCompleteCounter<1){
        return false;
    }   
    else {
        return true;
    }
 }
function checkErrorHelperColumn(clues,clueIndex,clueRanges,nextAvailableIndex,columnIndex,selectedSlotCnt,selectedCntCounter){

    if(clueIndex>clues.length-1&&selectedCntCounter==0){
        return true;
    }
    if(clueIndex>clues.length-1&&selectedCntCounter!=0){
        return false;
    }
    let currentClue=clues[clueIndex];
    let maxClueRange=clueRanges[clueIndex][1];
    let minClueRange=clueRanges[clueIndex][0];
    let maxStartingIndex=maxClueRange-currentClue+1;
    let minEndingIndex=minClueRange+currentClue-1;
    let endingIndex=0;
    let clueCompleteCounter=0;
    let selectedSlotsRange=0;
    for(let i=nextAvailableIndex;i<=maxStartingIndex;i++){
        selectedSlotsRange=0;
        endingIndex=i+(currentClue);
        if(gameState[" "+endingIndex+","+columnIndex]==true||gameState[" "+(i-1)+","+columnIndex]==true){
            continue;
        }  
        
        for (let keys in selectedSlotCnt){
            let selectedSlotRange=parseInt(keys)+selectedSlotCnt[keys]-1;
            if(parseInt(keys)>endingIndex){
                break;
            }
            if(parseInt(keys)>=i&&selectedSlotRange<=endingIndex-1){
                selectedSlotsRange++;
            }
            
        }
        selectedCntCounter-=selectedSlotsRange;
        let success=checkErrorHelperColumn(clues,clueIndex+1,clueRanges,endingIndex+1,columnIndex,selectedSlotCnt,selectedCntCounter);
        if(success==true){
            clueCompleteCounter++;
        }
        selectedCntCounter+=selectedSlotsRange;
    
    }
    if(clueCompleteCounter<1){
        return false;
    }   
    else {
        return true;
    }
    }
function checkError(clueCorr){
    let corr=clueCorr.split(',');
    let r=parseInt(corr[0]);
    let c=parseInt(corr[1]);
    let gameClues=JSON.parse(clues); 
    let rowsClues;
    let columnsClues;
    let win=true;
    if(userInputs==false){
        rowsClues=gameClues[0].row;
        columnsClues=gameClues[1].column;
    }
    else{     
        rowsClues=gameClues[0];
        columnsClues=gameClues[1];
    }
    let selectedRow=rowsClues[r];
    let selectedColumn=columnsClues[c]; 
    
    let consecutiveContainer={};
    let containerCounter=0;
    let consecutiveBlocks=0;   
    let startingConsecutiveIndex=0;
    let clueIndex=[];
    let clueRangeMatrix=[]
    for(let i=0;i<columns;i++){
        if(gameState[" "+r+","+i]==true){
            if(consecutiveBlocks==0){
                startingConsecutiveIndex=i;
            }
            if(consecutiveBlocks<1){
                clueIndex.push(i);
            }
            consecutiveBlocks++; 
        }
        if(gameState[" "+r+","+i]==false||i==columns-1){
            if(consecutiveBlocks>0){
                consecutiveContainer[''+startingConsecutiveIndex]=consecutiveBlocks;
                containerCounter++;  
            }
            consecutiveBlocks=0;
        }
    }
    for(let i=0;i<selectedRow.length;i++){
        let range=[];
        let sum=clueSum(selectedRow,i+1);
        let maxIndex=columns-sum-1;
        let minIndex=backwardClueSum(selectedRow,i-1);
        
        range.push(minIndex);
        range.push(maxIndex);
        clueRangeMatrix.push(range);
    }
    let rowErrorDetected=checkErrorHelperRow(selectedRow,0,clueRangeMatrix,0,r,consecutiveContainer,containerCounter);
    consecutiveContainer={};
    containerCounter=0;
    consecutiveBlocks=0;   
    startingConsecutiveIndex=0;
    clueIndex=[];
    clueRangeMatrix=[]
    for(let i=0;i<rows;i++){
        if(gameState[" "+i+","+c]==true){
            if(consecutiveBlocks==0){
                startingConsecutiveIndex=i;
            }
            if(consecutiveBlocks<1){
                clueIndex.push(i);
            }
            consecutiveBlocks++; 
        }
        if(gameState[" "+i+","+c]==false||i==rows-1){
            if(consecutiveBlocks>0){
                consecutiveContainer[''+startingConsecutiveIndex]=consecutiveBlocks;
                containerCounter++;  
            }
            consecutiveBlocks=0;
        }
    }
    for(let i=0;i<selectedColumn.length;i++){
        let range=[];
        let sum=clueSum(selectedColumn,i+1);
        let maxIndex=rows-sum-1;
        let minIndex=backwardClueSum(selectedColumn,i-1);
        
        range.push(minIndex);
        range.push(maxIndex);
        clueRangeMatrix.push(range);
    } 
    let columnErrorDetected=checkErrorHelperColumn(selectedColumn,0,clueRangeMatrix,0,c,consecutiveContainer,containerCounter);

    if(columnErrorDetected==false){
        errorCounter++;
    }
    if(rowErrorDetected==false){
        errorCounter++;
    }
    document.getElementById('errorCounter').innerHTML= errorCounter;
    for(let i=0;i<maxRowSize;i++){
        if(!rowErrorDetected){
        document.getElementById('r:'+r+i).style.backgroundColor='red';
        }
        else{
            document.getElementById('r:'+r+i).style.backgroundColor='initial';
        }
    }
    for(let i=0;i<maxColSize;i++){
        if(!columnErrorDetected){
        document.getElementById('c:'+i+c).style.backgroundColor='red';
        }
        else{
            document.getElementById('c:'+i+c).style.backgroundColor='initial';
        }
    }
}
function displayWinMessage(){

    let displayMessage=document.createElement('div');
    let dltBtn=document.createElement('button');
    displayMessage.appendChild(dltBtn);
    dltBtn.style.display='block';
    
    dltBtn.innerHTML='X';
    dltBtn.onclick=function(){
        this.parentElement.remove();
    }
    displayMessage.id='displayMessage';
    let image=document.createElement('img');
    image.setAttribute('src','win.gif');
    displayMessage.appendChild(image);
    document.getElementById('container').appendChild(displayMessage);

}
/*()
function checkObj(){
    for (var prop in gameState) {
        console.log(prop);
        console.log(gameState[prop]);
        }
}
*/

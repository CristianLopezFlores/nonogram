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
var httpRequest=new XMLHttpRequest();
document.getElementById('5X5').onclick=function(){
    document.getElementById('gameLevels').style.display='block';
    document.getElementById('menu').style.display='none';
    rows=5;
    columns=5;
    type='5X5';
    size='40';
}
document.getElementById('10X10').onclick=function(){
    document.getElementById('gameLevels').style.display='block';
    document.getElementById('menu').style.display='none';
    rows=10;
    columns=10;
    size='23';
    type='10X10';
}
document.getElementById('10X5').onclick=function(){
    document.getElementById('gameLevels').style.display='block';
    document.getElementById('menu').style.display='none';
    rows=10;
    columns=5;
    size='35';
    type='10X5';
}   
document.getElementById('15X15').onclick=function(){
    document.getElementById('gameLevels').style.display='block';
    document.getElementById('menu').style.display='none';
    rows=15;
    columns=15;
    size='15';
    type='15X15';
    
}
document.getElementById('20X20').onclick=function(){
    document.getElementById('gameLevels').style.display='block';
    document.getElementById('menu').style.display='none';
    rows=20;
    columns=20;
    type='20X20';
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
function requestJson(){
    
    var requestURL='games'+"/"+type+"/"+level+".json";
    httpRequest.onreadystatechange=getGameData;
    httpRequest.open('GET',requestURL); 
    httpRequest.send();
}
document.getElementById('changeType').onclick=function(){
    
    document.getElementById('clueColumnTable').remove();
    document.getElementById('clueRowTable').remove();
    document.getElementById('createdGame').remove();
    document.getElementById('gameCtn').style.display='none';
    document.getElementById('menu').style.display='block';
    gameState={};
    moveCounter=0;
    totalBlocks=0;
    activeBlocks=0;
    watch.end();
}
document.getElementById('changeLevel').onclick=function(){
    document.getElementById('clueColumnTable').remove();
    document.getElementById('clueRowTable').remove();
    document.getElementById('createdGame').remove();
    document.getElementById('gameCtn').style.display='none';
    document.getElementById('gameLevels').style.display='block';
    gameState={};
    moveCounter=0;
    totalBlocks=0;
    activeBlocks=0;
    watch.end();
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

    let rowsClues=clueData[0].row;
    let columnsClues=clueData[1].column;

    let rowMaxClues=getMaxClueLength(rowsClues);
    let columnMaxClues=getMaxClueLength(columnsClues);

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
            totalBlocks+=cluesList[j];
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
            gameState[' '+i+j]=false;
            let tableCell=document.createElement('td');
            let tableCellDiv=document.createElement('div');
            tableCellDiv.id=' '+i+j;
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
                if(moveCounter>=totalBlocks){
                    winState(); 
                }   
            }
            tableRow.appendChild(tableCell);
            
        }
        tableBody.appendChild(tableRow);
    }

    table.appendChild(tableBody);
    table.id='createdGame';
    gameCtn.appendChild(table);
    
    
    startTimer();
} 


function startTimer(){
	timer=document.getElementById('timer');
	watch=new clock(timer);

	watch.start();
}
function clock(watch){
	
	let time=0;
	let offset;
	let int;

	function updating(){
	time+=passingTime();
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
    let rowsClues=gameClues[0].row;
    let columnsClues=gameClues[1].column;
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
                if(gameState[' '+i+j]==true){
                    return false;
                }
                continue;
            }
            if(gameState[' '+i+j]==true){
                    
                clueCounter++               
            }

            if((gameState[' '+i+j]==false&&clueCounter>0)||i==rows-1){
                if(currentClues[currentClueIndex]!=clueCounter){
                    return false;
                }
                
                currentClueIndex++
                clueCounter=0;
            }   

        
        }
        if(currentClueIndex!=currentClues.length){

            return false;
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
                if(gameState[' '+i+j]==true){
                    return false;
                }
                continue;
            }
            if(gameState[' '+i+j]==true){
                clueCounter++               
            }

            if((gameState[' '+i+j]==false&&clueCounter>0)||j==columns-1){
                if(currentClues[currentClueIndex]!=clueCounter){
                    
                    return false;
                }
                
                currentClueIndex++
                clueCounter=0;
            }   
        }
        if(currentClueIndex!=currentClues.length){
            return false;
        }

    }
    displayWinMessage()
    watch.end();
 
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
function checkObj(){
    for (var prop in gameState) {
       console.log(prop);
    }
}
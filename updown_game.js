// 랜덤번호 지정
// 유저가 번호를 입력한다 그리고 go 라는 버튼을 누름
// 만약에 유저가 랜덤번호를 맞추면. 맞췄습니다!
// 랜덤번호가 < 유저번호 Down!!!
// 랜덤번호가 > 유저번호 Up!!
// Reset 버튼을 누르면 게임이 리셋된다
// 5번의 기회를 다 쓰면 게임이 끝난다 (더이상 추측 불가, 버튼이 disable)
// 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다
// 유저가 이미 입력한 숫자를 또 입력하면 알려준다. 기회를 깍지 않는다

let computerNum = 0; // 컴퓨터 랜덤번호
let userInput = document.getElementById("user-input"); // 사용자 입력칸
let playButton = document.getElementById("play-button"); // 시작버튼
let resultArea = document.getElementById("result-area"); // 결과 창
let resetButton = document.getElementById("reset-button"); // 리셋버튼
let chanceArea = document.getElementById("chance-area"); // 남은기회 창
let resultUp = document.getElementById("result-up"); // Up 표시창
let resultDown = document.getElementById("result-down"); // Down 표시창
let upArea = document.getElementById("up-area"); 
let downArea = document.getElementById("down-area");

let chances = 5; // 남은기회
let gameOver = false; // 게임종료
let history = []; // 유저가 입력한 숫자 배열로 저장
let upHistory = [];
let downHistory = [];
let minNum = 100;
let maxNum = 1;



let number = Math.min(downHistory);


playButton.addEventListener("click",play); // Go버튼을 누를때 동작
resetButton.addEventListener("click",reset); // Reset버튼을 누를때 동작
userInput.addEventListener("focus",function(){userInput.value=""}) //사용자 입력칸 포커스 이벤트 실행

function pickRandomNum(){
    computerNum = Math.floor(Math.random()*100)+1; // 1~100 컴퓨터 랜덤값 생성
    console.log(computerNum);
}



function play(){ // Go버튼 함수
    let userValue = userInput.value; // 유저가 입력한 숫자 값
    console.log(userValue);
    
    

    if(userValue > 100 || userValue < 1){ //유저가 1~100 범위 밖에 숫자를 입력시
        resultArea.textContent = "1~100범위 안의 숫자를 다시 입력해주세요";
        return
    }
    
    if(upHistory.includes(userValue) || downHistory.includes(userValue)){ // 유저가 입력한 값이 중복될 시
        resultArea.textContent = "중복된 값을 입력하셨습니다";
        return
    }

    chances --; // 남은기회 감소
    chanceArea.textContent = `남은기회 : ${chances}번` // 남은 기회 알림창


    if(userValue < computerNum){ // 유저 입력 숫자가 컴퓨터 랜덤 숫자보다 작을때
        resultArea.textContent = "오답입니다"
        resultUp.textContent = "Up!!"
        
        // resultDown.textContent = ""
        downHistory.push(userValue); // 유저가 입력한 숫자를 downHistory라는 배열에 push

    }else if(userValue > computerNum){ // 유저 입력 숫자가 컴퓨터 랜덤 숫자보다 클때
        resultArea.textContent = "오답입니다"
        resultDown.textContent = "Down!!"
        // resultUp.textContent = ""
        upHistory.push(userValue); // 유저가 입력한 숫자를 upHistory라는 배열에 push

    }else if(userValue == computerNum){
        resultArea.textContent = "정답입니다!" // 유저 입력 숫자와 컴퓨터 랜덤 숫자가 같을때
        gameOver = true;
    }
    
    


    

    for(var i = 0; i <= upHistory.length; i++) {
        // minNum의 값과 유저 입력값을 비교해서 가장 작은 값을 표시
        if (minNum > upHistory[i]) {
          minNum = upHistory[i];
          downArea.textContent = `${minNum}`;
        }
      }
      console.log(minNum);
    
      for(var i = 0; i <= downHistory.length; i++) {
        // minNum의 값과 유저 입력값을 비교해서 가장 큰 값을 표시
        if (maxNum < downHistory[i]) {
            maxNum = downHistory[i];
            upArea.textContent = `${maxNum}`;
        }
      }
      console.log(maxNum);
    
      
    
    console.log(upHistory);
    console.log(downHistory);
    
    
    
    
    
    

    if(chances<1){ // 만약 남은기회가 0번이 되었을때 게임 종료
        gameOver = true;
        resultArea.textContent = "남은 기회가 끝났습니다 리셋 후 다시 시작해주세요."    
    }
    if(gameOver == true){ // 게임이 종료가 되었을때
        playButton.disabled = true; // 실행버튼 비활성화
    }

}



function reset(){ // Reset버튼 함수
    gameOver = false;
    playButton.disabled = false; // Go버튼 활성화 취소
    userInput.value = "";
    pickRandomNum(); // 새로운 랜덤번호 생성
    chances = 5; // 남은 기회 5번으로 초기화
    chanceArea.textContent = `남은기회 : ${chances}번`
    resultArea.textContent = "결과가 나옵니다";
    upHistory=[]; // 유저가 입력했던 Up 숫자 배열 초기화
    downHistory=[]; // 유저가 입력했던 Down 숫자 배열 초기화
    minNum = 100;
    maxNum = 1;
    downArea.textContent = `${minNum}`;
    upArea.textContent = `${maxNum}`;
}




pickRandomNum();
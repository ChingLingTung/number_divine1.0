document.addEventListener("DOMContentLoaded", function(){
  Array.from(document.getElementsByClassName('numberField')).forEach((field, index) => {
    field.addEventListener("keyup", function(){
      moveNext(field, index);
    });
  });

  document.getElementById("Number1").focus();
});

function moveNext(obj,i){
  if(!validateNumber(obj.value)){
    obj.value="";
  }
  if(obj.value.length == 1){
    document.numberForm[i+1].focus();
  }
}
  
function validateNumber(number) {
    const re= /^[1-9]{1}?$/;
    return re.test(parseInt(number));
}

function reset(){
  document.getElementById('result_Hexagram').innerHTML = '';
  document.getElementById('result_HexagramFigure').innerHTML = '';
  document.getElementById('HexagramName').innerHTML = '';
  document.getElementById('HexagramOriginExplanation').innerHTML = '';
  document.getElementById('HexagramModernExplanation').innerHTML = '';
  document.getElementById('HexagramFigure').innerHTML = '';
  document.getElementById('HexagramFigureOriginExplanation').innerHTML = '';
  document.getElementById('HexagramFigureModernExplanation').innerHTML = '';
}

function processString(value){
  return value.replace(/\|/g,"<br>");
}

function sendData(e) {
  // 取消表單預設的傳統的送出方式，相當於在form標籤內設定onsubmit="return false" 
  e.preventDefault();
  let error = 0;
  Array.from(document.getElementsByClassName('numberField')).forEach(field => {
    // error = validateNumber(field.value) ? error:++error;
    if(!validateNumber(field.value)){
      error++;
    }
  });

    if (error > 0) {
      reset();
      alert('占卜失敗，請再次嘗試，每個欄位都要輸入1-9的數字');
      return;
    }
    // 建立只有資料的表單
    const fd = new FormData(document.numberForm);
    // 設定ajax的送出方式fetch('資料運送的目的地', {送出方式}
    fetch('number_divine-api.php', {
      method: 'POST',
      // 送出的格式會自動是 multipart/form-data
      body: fd, 
      // 因在add-api.php的檔案中設定資料檔案形式是JSON因此要求response傳回的JSON檔轉回原始的data資料
    }).then(r => r.json())
    // 取得轉譯後的原始data資料
    .then(data => {
        document.getElementById('result_Hexagram').innerHTML = '占得<br><p style="color:red">「' + data.HexagramName + '」<p/>的';
        document.getElementById('result_HexagramFigure').innerHTML = '<span style="color:red">'+ processString(data.individualExplanation.HexagramFigure)+'</span><hr>';
        document.getElementById('HexagramName').innerHTML = data.HexagramName;
        document.getElementById('HexagramOriginExplanation').innerHTML =processString(data.originExplanation);
        document.getElementById('HexagramModernExplanation').innerHTML = processString(data.modernExplanation);
        document.getElementById('HexagramFigure').innerHTML = processString(data.individualExplanation.HexagramFigure);
        document.getElementById('HexagramFigureOriginExplanation').innerHTML = processString(data.individualExplanation.originExplanation);
        document.getElementById('HexagramFigureModernExplanation').innerHTML = processString(data.individualExplanation.modernExplanation);
    })
    // 設定若有錯誤會透過log記錄
    .catch(ex => {
      reset();
      console.log(ex)
    })
}




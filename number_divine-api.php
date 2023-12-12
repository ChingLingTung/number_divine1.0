<?php
header('Content-Type: application/json');
$output = [
  'postData' => $_POST,
  'success' => false,
];
// $number = number,
$Number1 = $_POST['Number1'];
$Number2 = $_POST['Number2'];
$Number3 = $_POST['Number3'];
$Number4 = $_POST['Number4'];
$Number5 = $_POST['Number5'];
$Number6 = $_POST['Number6'];

// $validation="/^[1-9]{1}?$/"

$newnumber1 = intval($Number1)%2;
$newnumber2 = intval($Number2)%2;
$newnumber3 = intval($Number3)%2;
$newnumber4 = intval($Number4)%2;
$newnumber5 = intval($Number5)%2;
$newnumber6 = intval($Number6)%2;
$residue =
(intval($Number1)
+intval($Number2)
+intval($Number3)
+intval($Number4)
+intval($Number5)
+intval($Number6))%6;
$newnumber = 
strval($newnumber1)
.strval($newnumber2)
.strval($newnumber3)
.strval($newnumber4)
.strval($newnumber5)
.strval($newnumber6);

if ($residue == 0){
  $residue=5;
}else{
  $residue--;
}  

$json_string = file_get_contents('data/number_divine.json');
$data = json_decode($json_string, true);
// var_dump($data['number']);
$resultData = $data[$newnumber];

$list = array_values($resultData['individualExplanation']);

$resultData['individualExplanation'] = $list[$residue];
$resultData['id'] = $newnumber;

// echo($newnumber); 
echo json_encode($resultData);

?>

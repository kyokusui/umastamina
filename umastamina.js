$('#speedInput').on("keypress", function(event){return leaveOnlyNumber(event);});
$('#gutsInput').on("keypress", function(event){return leaveOnlyNumber(event);});

function leaveOnlyNumber(e){
  // 数字以外の不要な文字を削除
  var st = String.fromCharCode(e.which);
  if ("0123456789".indexOf(st,0) < 0) { return false; }
  return true;  
};
// ボタンを押すと、ブロック内のプログラムが実行される
$("#btn1").on("click", function()  {
  let speed = document.getElementById("speedInput").value;
  let guts = document.getElementById("gutsInput").value;
  let motiva = document.getElementById("motivation").value;
  let wisdom = 400;
  let power = 1200;
  let style = document.getElementById("running_style").value;

  let style_a = 1;
  let distance = document.getElementById("distance").value;
  let distance_a = document.getElementById("distance_aptitude").value;
  let distance_a_s = 1;
	let baba_a = 1;

 let style_table = [
	[0.950,  1.000, 0.980, 0.962,  1.000, 1.000, 0.996],
	[0.890,  0.978, 0.991, 0.975,  0.985, 1.000, 0.996],
	[1.000,  0.938, 0.998, 0.994,  0.975, 1.000, 1.000],
	[0.995,  0.931, 1.000, 1.000,  0.945, 1.000, 0.997]
	];




  let c_speed = speed*motiva*1;
  let c_guts = guts*motiva*1;
  let c_wisdom = wisdom*motiva*1;
  let c_power = power*motiva*1;
  let v_base = 20+(2000-distance)/1000;

  let v_ph0 = v_base * style_table[style][1] + ((c_wisdom / 5500) * Math.log10(c_wisdom * 0.1) - 0.65 / 2) * 0.01 * v_base;
  let v_ph1 = v_base * style_table[style][2] + ((c_wisdom / 5500) * Math.log10(c_wisdom * 0.1) - 0.65 / 2) * 0.01 * v_base;
  let v_ph2 = v_base * style_table[style][3] + Math.sqrt(500 * c_speed) * distance_a * 0.002 + ((c_wisdom / 5500) * Math.log10(c_wisdom * 0.1) - 0.65 / 2) * 0.01 * v_base;
  let v_spurt = (v_ph2 + 0.01 * v_base) * 1.05 + Math.sqrt(500 * c_speed) * distance_a * 0.002;

let babaHPc = 1;
let gutsHPc = 1 + (200 / Math.sqrt(600 * c_guts));
let a = 0.0006 * Math.sqrt(500.0 * c_power) * style_a * distance_a * baba_a
let HP_sum = 0;

let a_start = 24 + a;
let v_start = v_base * 0.85;
let t_a_start = (v_start - 3.0)/a_start;
let HP_a_start = 20 * babaHPc * (Math.pow(a_start,2) / 3 * Math.pow(t_a_start,3)  + a_start * (3.0 - v_base + 12) * Math.pow(t_a_start,2) + Math.pow(3.0 - v_base + 12,2) * t_a_start) / 144;
let d_start = (3.0 + v_start)/2 * t_a_start;

let a_ph0 = a;
let t_a_ph0 = (v_ph0 - v_start)/a_ph0;
let HP_a_ph0 = 20 * babaHPc *           (Math.pow(a_ph0,2) / 3 * Math.pow(t_a_ph0,3)  + a_ph0 * (v_start - v_base + 12) * Math.pow(t_a_ph0,2) + Math.pow(v_start - v_base + 12,2) * t_a_ph0) / 144;
let d_a_ph0 = (v_ph0 + v_start)/2 * t_a_ph0;
let d_s_ph0 = distance/6 - d_start - d_a_ph0;
let t_s_ph0 = d_s_ph0/v_ph0;
let HP_s_ph0 = 20 * babaHPc *           Math.pow(v_ph0 - v_base + 12.0, 2) / 144 * t_s_ph0;

let a_ph1 = a;
if (v_ph1 <= v_ph0) {a_ph1 = -0.8;};
let t_a_ph1 = (v_ph1 - v_ph0)/a_ph1;
let HP_a_ph1 = 20 * babaHPc *           (Math.pow(a_ph1,2) / 3 * Math.pow(t_a_ph1,3)  + a_ph1 * (v_ph0 - v_base + 12) * Math.pow(t_a_ph1,2) + Math.pow(v_ph0 - v_base + 12,2) * t_a_ph1) / 144;
let d_a_ph1 = (v_ph1 + v_ph0)/2 * t_a_ph1;
let d_s_ph1 = distance/2 - d_a_ph1;
let t_s_ph1 = d_s_ph1/v_ph1;
let HP_s_ph1 = 20 * babaHPc *           Math.pow(v_ph1 - v_base + 12.0, 2) / 144 * t_s_ph1;


let a_ph2 = a;
let t_a_ph2 = (v_ph2 - v_ph1)/a_ph2;
let HP_a_ph2 = 20 * babaHPc * gutsHPc * (Math.pow(a_ph2,2) / 3 * Math.pow(t_a_ph2,3)  + a_ph2 * (v_ph1 - v_base + 12) * Math.pow(t_a_ph2,2) + Math.pow(v_ph1 - v_base + 12,2) * t_a_ph2) / 144;

let a_ph3 = a;
let t_a_ph3 = (v_spurt - v_ph2)/a_ph3;
let HP_a_ph3 = 20 * babaHPc * gutsHPc * (Math.pow(a_ph3,2) / 3 * Math.pow(t_a_ph3,3)  + a_ph3 * (v_ph2 - v_base + 12) * Math.pow(t_a_ph3,2) + Math.pow(v_ph2 - v_base + 12,2) * t_a_ph3) / 144;

let d_a_spurt = ((v_spurt + v_ph1)/2) * ((v_spurt - v_ph1)/a_ph3);
let d_s_spurt = distance/3 - d_a_spurt;	//60m減速無し
let t_s_spurt = d_s_spurt / v_spurt;
let HP_s_spurt = 20 * babaHPc * gutsHPc * Math.pow(v_spurt - v_base + 12,2) / 144 * t_s_spurt;
let HP_sum_ph01 = HP_a_ph0 + HP_s_ph0 + HP_a_ph1 + HP_s_ph1;
let HP_sum_1 = HP_sum_ph01 + HP_a_ph2 + HP_a_ph3 + HP_s_spurt;
let stamina_1 = (HP_sum_1 / (1 + 0 / 10000) - distance)/(0.8*style_table[style][0])/motiva;

  let energy_need = Math.ceil(HP_sum_1);
  let stamina_need = Math.ceil(stamina_1);
  $("#log").val(
"v_ph0:" + v_ph0 + "\n" +
"v_ph1:" + v_ph1 + "\n" +
"v_ph2:" + v_ph2 + "\n" +
"v_spurt:" + v_spurt + "\n" +
"HP_a_ph0:" + HP_a_ph0 + "\n" +
"HP_s_ph0:" + HP_s_ph0 + "\n" +
"HP_a_ph1:" + HP_a_ph1 + "\n" +
"HP_s_ph1:" + HP_s_ph1 + "\n" +
"HP_a_ph2:" + HP_a_ph2 + "\n" +
"HP_s_spurt:" + HP_s_spurt + "\n" +
"HP_a_ph3:" + HP_a_ph3 + "\n" +
"HP_sum_ph01:" + HP_sum_ph01 + "\n" +
"HP_sum_1:" + HP_sum_1 + "\n" +
"stamina_1:" + Math.ceil(stamina_1) + "\n" +
"HP_sum_1:" + HP_sum_1 + "\n" +
"HP_sum_1:" + HP_sum_1 + "\n" +

":");

  let blue_stamina = Math.round(energy_need * 0.055);
  let white_stamina = Math.round(energy_need * 0.015);
  //let message = `${stamina_need}`
  // jQueryを使って画面にメッセージを表示する
  $("#tBox").val(stamina_need);
  $("#tBox2").val(blue_stamina);
  $("#tBox3").val(white_stamina);


});

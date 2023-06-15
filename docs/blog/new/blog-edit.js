const preview = document.getElementById('preview');
const mdMain = document.getElementById('mdMain');


const sampleText = `# 大見出し

本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文






## 中見出し

本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文。


本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文。



* リスト1
* リスト2
* リスト3

本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文


- リスト4
  - リストサブ1
- リスト5
    - リストサブ2
- リスト6
    - リストサブ3




### 小見出し

本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文


|a|b|c|
|-|-|-|
|1|2|3|
|4|5|6|
|7|8|9|


[ハイストのWebサイトへ](https://highsto.net)


> 引用引用引用引用引用引用引用引用引用引用引用引用引用引用引用引用引用引用引用引用引用引用引用引用引用引用引用引用引用引用
引用引用引用引用引用引用引用引用引用引用引用引用引用引用引用引用引用引用引用引用



`

mdMain.value = sampleText;



const update = () => {
    preview.innerHTML = marked.parse(mdMain.value);
}

update();



mdMain.addEventListener("change", (e) => {
    update();
})

mdMain.addEventListener("keyup", (e)=> {
    // if(e.key == "Enter") {
    //     update();
    // }
    update();
});
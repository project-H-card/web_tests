
const sampleText = `# 大見出し

本文本文 **太字太字太字太字** 本文 ~~取り消し線取り消し線取り消し線~~ 本文本文 __太字太字太字太字__ 本文本文本文 _斜体斜体斜体斜体_ 本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文


1. 番号付きリスト1
2. 番号付きリスト2
3. 番号付きリスト3
 



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





`;



const preview = document.getElementById('preview');
const mdMain = document.getElementById('mdMain');
const editMD = document.getElementById('editMD');
const separateRadio = document.getElementById('separate');
const previewOnlyRadio = document.getElementById('previewOnly');
const editOnlyRadio = document.getElementById('editOnly');

mdMain.value = sampleText;



const update = () => {
    preview.innerHTML = marked.parse(mdMain.value);
}

update();



mdMain.addEventListener("change", (e) => {
    update();
})

mdMain.addEventListener("keyup", (e)=> {
    update();
});

separateRadio.addEventListener("change", (e) => {
    preview.style.display = "block";
    editMD.style.display = "block";
    preview.style.width = "50%";
    editMD.style.width = "50%";
});

previewOnlyRadio.addEventListener("change", (e) => {
    preview.style.display = "block";
    editMD.style.display = "none";
    preview.style.width = "100%";
    editMD.style.width = "50%";
});

editOnlyRadio.addEventListener("change", (e) => {
    preview.style.display = "none";
    editMD.style.display = "block";
    preview.style.width = "50%";
    editMD.style.width = "100%";
});


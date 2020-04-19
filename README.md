# 위지윅에디터
텍스트를 입력할 수 있고 B I U S 스타일을 적용 할 수 있는 간단한 에디터 입니다.  
contenteditable로 구현되어 있으며, 편집은 Web API를 사용하고 있습니다.  
지원 브라우저는 IE9이상, Chrome입니다.

<br>

![image](https://user-images.githubusercontent.com/11675666/61179644-d8afdd80-a641-11e9-8855-61fc8aeca485.png)

<br>

### 현재 지원 하는 편집  
**B** - 선택된 텍스트에 굵게 적용.  
**I** - 선택된 텍스트에 기울기 적용.  
**U** - 선택된 텍스트에 밑줄 적용.  
**S** - 선택된 텍스트에 취소선 적용.  
![image](https://user-images.githubusercontent.com/11675666/61179643-d057a280-a641-11e9-9585-acf567156fcb.png)


<br>


## 설치 방법
~~~
git clone https://github.com/editorteam/interview-h2ck4u.git

npm install // 에디터에 필요한 패키지를 다운로드 합니다.

npm run build // 프로젝트를 빌드 합니다.

~~~

<br>

## 테스트 코드 실행
~~~
npm run test // 테스트 코드를 실행합니다.  
~~~

<br>



## 연동 방법
~~~html
<!DOCTYPE html>
<html>

<head>
  <title>Comment Editor</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">

  <script src="./dist/editor.js"></script> <!-- 빌드된 에디터 파일 -->
  <script src="./resource/config.js"></script> <!-- 설정파일 -->

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script> <!-- jqeury -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> <!-- fontawesom -->
</head>

<body onload="createEditor();">
  <div id="editor"></div> // 에디터를 생성할 태그
  <script>
    function createEditor() {
      new EditorJS('editor', config); // 첫번째 인자는 에디터를 생성할 태그의 id와 일치 시켜야 합니다. 두번째 인자는
    }
  </script>
</body>
</html>
~~~

<br>

### 에디터를 여러개 생성하는 방법.
~~~html
<div id="editor1"></div> 
<div id="editor2"></div> 
<div id="editor3"></div> 

new EditorJS('editor1', config);
new EditorJS('editor2', config);
new EditorJS('editor3', config);
~~~
![image](https://user-images.githubusercontent.com/11675666/61179756-48bf6300-a644-11e9-8a9e-5d1efc8b22b8.png)

<br>


## 설정 파일  
편집창의 최대 글자수를 설정 할 수 있습니다.
~~~
var config = {
    MAX_TEXT_COUNT: 3000 // 편집창의 최대 글자수를 설정합니다.
}
~~~
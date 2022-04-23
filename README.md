# Drawing Lots Program (제비뽑기 프로그램)

회사에서 매주 독서 발표자를 뽑는데  
제비뽑기 통을 직접 만든 것을 보고, 간단한 프로그램을 만들어 보았습니다.  
명단은 파일로 관리하도록 했고, 비개발자도 사용할 수 있도록 xlsx 파일을 사용하도록 했습니다.

### 개발 환경

nodeJs 환경에서 ejs 템플릿을 사용해 만들어 보았습니다.

### 실행 방법

```
$ npm install
$ npm run start
```

### 파일 구조

```
C:.
|   .babelrc
|   .env
|   package-lock.json
|   package.json
|   README.md
|
+---service
|   |   app.js
|   |   upload.js // 파일 업로드 관리
|   |
|   \---uploads
|          member.xlsx
|
+---statics
|   +---images
|   |       upload.png
|   |
|   +---scripts
|   |       ejs.js
|   |
|   \---styles
|           common.css
|
\---views
        index.ejs
```

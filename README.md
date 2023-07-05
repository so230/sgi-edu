# SGI 역량강화프로그램 데모 WebApp

## 동일한 결과의 Web App을 모놀리틱 아키텍처 와 MSA 아키텍처로 적용해 본다.

### 모놀리틱 아키텍처

- monolithic 폴더
- nodejs + express 의 전톡적인 형태
- 회사, 조직 두개의 도메인으로 분리

### MSA 아키텍처

- msa 폴더
- 회사, 조직 두개의 서비스로 분리
- 회사 서비스: nodejs api
- 조직 서비스: spring boot
- UI 서비스: ReactJS

## 실행

```sh
node server.js
gradle bootRun
```

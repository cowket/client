# Cowket

- Next.js
- socket.io-client
- material-ui

---

1. 사용자 인증

- 이메일, 비밀번호 > formik을 쓰려했으나 material에서 validation 지원해주는듯

(2021.09.05)
validation을 내가체크해야하는거였음..ㅋㅋ > formik을 사용해보겠다

(2021.09.08)

- next > react로 마이그레이션 : spa로 배포하기위해??

2. 채팅

- 팀, 채널을 구분

## Yarn PnP

1. zero install (zip 형태로 아카이브된 패키지들이 git에 같이 올라가므로 설치할 필요 x)
2. `git clone` or `git pull` 후 바로 `yarn start`로 개발 서버 실행
3. `node_modules`를 사용하지 않는 특성 때문에 패키지 `import`시 해당 패키지가 `export`하는 정보를 얻지 못함
4. `yarn dlx @yarnpkg/sdks vscode` yarn에서 공식적으로 지원하는 sdk 설치 후 vscode에서 `zipfs` 라는 확장 프로그램 설치
5. 즐코딩

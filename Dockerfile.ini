# 공식 Node.js 런타임 이미지 사용
FROM node:20-slim

# 작업 디렉토리 설정 (컨테이너 내부에서 앱이 실행될 경로)
WORKDIR /usr/src/app

# package.json 및 package-lock.json (또는 yarn.lock) 복사
# 이는 npm install 캐싱을 활용하여 빌드 속도를 높입니다.
COPY package*.json ./

# Node.js 의존성 설치
# --omit=dev는 개발 의존성(devDependencies)을 설치하지 않아 이미지 크기를 줄입니다.
RUN npm install --omit=dev

# 모든 소스 코드 복사
# .gitignore에 명시된 파일들은 제외하고 복사됩니다.
COPY . .

# Node.js 앱이 리스닝할 포트 노출 (Cloud Run은 기본적으로 8080 포트로 요청을 보냅니다)
EXPOSE 8080

# 컨테이너가 시작될 때 Node.js 앱을 실행하는 명령어
CMD [ "npm", "start" ]
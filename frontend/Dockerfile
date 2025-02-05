# 1. Node.js 이미지 사용 (Next.js에 적합한 버전 선택)
FROM node:18

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. 프로젝트 파일을 컨테이너로 복사
COPY . .

# 4. 의존성 설치 및 Next.js 빌드
RUN npm install
RUN npm run build

# 5. Next.js 앱 실행 (Production 모드)
CMD ["npm", "start"]

# 6. Next.js 기본 포트 개방
EXPOSE 3000

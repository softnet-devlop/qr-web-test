# 1) 빌드
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

# 2) 정적 파일 서빙 (nginx 기본 설정, 80 포트)
FROM nginx:1.27-alpine
# nginx 기본 설정에 두 가지만 추가 (적용 안 되면 빌드 실패)
#  - /appRedirect 같은 경로도 index.html 로 응답 (없으면 404)
#  - iOS Universal Link 파일(apple-app-site-association)을 application/json 으로 응답
RUN sed -i 's#index  index.html index.htm;#&\n        try_files $uri $uri/ /index.html;#' /etc/nginx/conf.d/default.conf \
 && sed -i 's#^    location / {#    location = /.well-known/apple-app-site-association {\n        root   /usr/share/nginx/html;\n        default_type application/json;\n    }\n\n&#' /etc/nginx/conf.d/default.conf \
 && grep -q 'try_files' /etc/nginx/conf.d/default.conf \
 && grep -q 'apple-app-site-association' /etc/nginx/conf.d/default.conf \
 && nginx -t
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

FROM nginx:stable-alpine

# 清掉預設的 nginx html
RUN rm -rf /usr/share/nginx/html/*

# 把 build 出來的 dist 丟進去
COPY dist /usr/share/nginx/html

# 複製我們自己設定的 nginx.conf 進去
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

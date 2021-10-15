FROM jekyll/jekyll as builder

WORKDIR /srv/jekyll

COPY . .

RUN jekyll build

FROM nginx

COPY --from=builder /srv/jekyll/_site /usr/share/nginx/html
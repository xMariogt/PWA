FROM nginx:alpine

COPY dist/emprendimiento/browser /usr/share/nginx/html

EXPOSE 80


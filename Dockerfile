# Build image dua tren image cua node
FROM node:18-alpine
# Tao mot working directory ben trong image de chua code cua ung dung ben trong image
WORKDIR /app
# Copy (resource dest) toan bo code cua ung dung vao ben trong working directory 
COPY . .
# thuc thi mot cau lenh ben trong working diretory (add cac lib trong package.json)
RUN npm install
# Cho phep quyen thuc thi
RUN chmod +x wait-for
# xuat ra port 
EXPOSE 4000
# thuc thi: chay ung dung
CMD ["node", "src/index.js"]
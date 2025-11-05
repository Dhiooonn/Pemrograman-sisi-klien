Buka vscode dari projek kalian. new terminal dengan git bash

1. ketik di terminal bash: npm create vite@5 lat3 -- --template react
2. ketik di terminal bash: cd lat3
    2.1. ketik: code .
3. ketik di terminal bash: npm install
4. ketik di terminal bash: npm run dev

Install Talwind
1. Googling aja weh: tailwind react vite
2. ketik terminal bash: npm install tailwindcss @tailwindcss/vite
3. masukkan di file vite.config.js: 
    ....
    import tailwindcss from '@tailwindcss/vite'
    ....

    plugins: [
        ...
        tailwindcss(),
    ],
4. masukkan ke src/App.css: @import "tailwindcss";
5. tambahkan di App.jsx: import './App.css'
6. coba di home: 
    <h1 class="text-3xl font-bold underline">
        Hello world!
    </h1>
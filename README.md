# Development
Steps to use the app in development.

1. Clone the repository.
2. Create a copy of the ```.env.template``` file and rename it to ```.env``` and change the environtment vairables.
3. Install dependencies ```npm install```.
4. DB ```docker compose up -d```.
5. Run Prisma migrations ```npx prisma migrate dev```.  
6. Execute the SEED ```npm run seed```.
7. Run the project ```npm run dev```.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
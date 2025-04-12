# Fullstack Lab 1

This is an individual project developed as part of the Fullstack course at Kristianstad University.  
The project focuses on building a REST API using Express.js and MongoDB with Mongoose.

## Quickstart Overview

1. Clone the repository  
2. Install dependencies  
3. Create a `.env` file  
4. Insert example recipe (optional)  
5. Run the project  
6. Access in browser at `http://localhost:3000`


## Technologies Used

- Node.js
- Express.js
- MongoDB (via Mongoose)
- dotenv
- nodemon (for development)

---

## Getting Started

### 1. Clone the repository

```
git clone https://github.com/marcusgostasson/fullstack-lab1.git
cd fullstack-lab1
```

### 2. Install dependencies

```
npm install
```

### 3. Create a `.env` file in the root directory

Example of `.env`:

```
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

### 4. Run the project

```bash
npm start
```

---

## Accessing the Project in the Browser

After running `npm install` and starting the project with:

```
npm start
```

Open your browser and go to:

```
http://localhost:3000
```

---

## Example of a Recipe Document (to insert manually in MongoDB)

Copy and paste this command directly in MongoDB playground to add the recipe to your database:

```
use yourDatabaseName

db.dishes.insertOne({
  name: "Mormor's Apple Cake",
  ingredients: [
    "apples",
    "flour",
    "butter",
    "sugar",
    "cinnamon",
    "baking powder",
    "egg",
    "milk"
  ],
  preparationSteps: [
    "Peel and slice apples",
    "Mix dry ingredients together.",
    "Add egg, milk, and melted butter to form batter.",
    "Pour batter into baking dish and add apples on top.",
    "Bake until golden and cooked through."
  ],
  cookingTime: 45,
  origin: "Sweden (Family Recipe)",
  difficulty: "easy",
  servings: 8
})
```

Replace `yourDatabaseName` with the name of your database.

---

## Author

Marcus Göstasson  
Fullstack Development Student @ Kristianstad University

GitHub: [https://github.com/marcusgostasson/fullstack-lab1](https://github.com/marcusgostasson/fullstack-lab1)

---

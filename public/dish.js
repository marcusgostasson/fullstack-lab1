document.addEventListener('DOMContentLoaded', async () => {
  
  async function fetchDishes() {
    try {
      const dishRes = await fetch(`http://localhost:5001/api/dishes`);
      const dishData = await dishRes.json();
      console.log(dishData)
      renderPage(dishData);
    } catch (error) {
      console.error('Error fetching dish data:', error);
    }
  }

  // TABLE

  async function renderPage() {
    
  }


  // FORM 

  // Add extra ingredient 
  const addIngredientButton = document.getElementById('addIngredientButton');

  addIngredientButton.addEventListener('click', (event) => {
    event.preventDefault();
    addIngredient();
  });

  async function addIngredient() {
    const addIngredientToForm = document.getElementById('addIngredient');
    const newInput = document.createElement('input');
    addIngredientToForm.appendChild(newInput);
  }

  // Add more steps
  const addStepsButton = document.getElementById('addStepsButton');

  addStepsButton.addEventListener('click', (event) => {
    event.preventDefault();
    addSteps();
  });

  async function addSteps() {
    const stepsToForm = document.getElementById('addSteps');
    const newInput = document.createElement('input');
    stepsToForm.appendChild(newInput);
  }

  const dishForm = document.getElementById('dish-form');

dishForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('dish-name').value;
  const cookingTime = document.getElementById('dish-cooking-time').value;
  const origin = document.getElementById('dish-origin').value;
  const difficulty = document.getElementById('dish-difficulty').value;
  const servings = document.getElementById('dish-servings').value;

  const ingredients = Array.from(document.querySelectorAll('#addIngredient input')).map(input => input.value);
  const steps = Array.from(document.querySelectorAll('#addSteps input')).map(input => input.value);

  const nameRegex = /^[A-Za-zÅÄÖåäö\s]{2,}$/; 
  const numberRegex = /^\d+$/;
  
  if (!nameRegex.test(name)) {
    alert('Name must be at least 2 letters and only letters');
    return;
  }
  
  if (!numberRegex.test(cookingTime)) {
    alert('Cooking time must be a number');
    return;
  }
  
  if (!numberRegex.test(servings)) {
    alert('Servings must be a number');
    return;
  }
  
  if (!nameRegex.test(origin)) {
    alert('Origin must be at least 2 letters and only letters');
    return;
  }
  
  if (ingredients.length === 0 || ingredients.some(ingredient => ingredient.trim() === '')) {
    alert('All ingredient fields must be filled');
    return;
  }
  
  if (steps.length === 0 || steps.some(step => step.trim() === '')) {
    alert('All preparation steps must be filled');
    return;
  }
  
  const newDish = {
    name,
    cookingTime,
    origin,
    difficulty,
    servings,
    ingredients,
    steps
  };

  const response = await fetch('http://localhost:5001/api/dishes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newDish)
  });

  if (response.ok) {
    alert('Dish saved!');
    location.reload();
  } else {
    alert('Failed to save dish');
  }
});
fetchDishes()
});


document.addEventListener('DOMContentLoaded', async () => {
  // Fetch data from API

  async function fetchDishes() {
    try {
      const dishRes = await fetch(`http://localhost:5001/api/dishes`);
      const dishData = await dishRes.json();
      renderPage(dishData);
    } catch (error) {
      console.error('Error fetching dish data:', error);
    }
  }

  // TABLE

  async function renderPage(dishData) {
    const table = document.getElementById('dish-table');
    const fragment = document.createDocumentFragment();

    const tableHeader = document.createElement('tr');
    const headers = [
      'Name',
      'Ingredients',
      'Preparation Steps',
      'Cooking Time',
      'Difficulty',
      'Origin',
      'Servings',
      'Actions',
    ];

    // HEADER ROW
    headers.forEach((headerText) => {
      const th = document.createElement('th');
      th.textContent = headerText;
      th.classList.add('table-header-cell');
      tableHeader.appendChild(th);
    });

    fragment.appendChild(tableHeader);

    // ROWS WITH DISHES
    dishData.forEach((dish) => {
      const row = document.createElement('tr');
      row.id = 'row-cell';

      // Name
      const nameCell = document.createElement('td');
      nameCell.textContent = dish.name;
      nameCell.classList.add('name-cell');

      // Ingredients
      const ingredientsCell = document.createElement('td');
      ingredientsCell.classList.add('ingredients-cell');
      const ingredientsList = document.createElement('ol');

      dish.ingredients.forEach((ingredient) => {
        const li = document.createElement('li');
        li.classList.add('ingrediens-item');

        const span = document.createElement('span');
        span.textContent = ingredient;

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-ingredient-button');
        editBtn.dataset.id = dish._id;
        editBtn.dataset.ingredient = ingredient;

        const btnGroup = document.createElement('div');
        btnGroup.classList.add('button-group');
        btnGroup.appendChild(editBtn);

        li.appendChild(span);
        li.appendChild(btnGroup);
        ingredientsList.appendChild(li);
      });
      ingredientsCell.appendChild(ingredientsList);

      // Steps
      const stepsCell = document.createElement('td');
      stepsCell.classList.add('steps-cell');
      const stepsList = document.createElement('ol');

      dish.preparationSteps.forEach((step, index) => {
        const li = document.createElement('li');
        li.classList.add('step-item');

        const span = document.createElement('span');
        span.textContent = `${index + 1}. ${step}`;

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-step-button');
        editBtn.dataset.id = dish._id;
        editBtn.dataset.step = step;

        const btnGroup = document.createElement('div');
        btnGroup.classList.add('button-group');
        btnGroup.appendChild(editBtn);

        li.appendChild(span);
        li.appendChild(btnGroup);
        stepsList.appendChild(li);
      });

      stepsCell.appendChild(stepsList);

      // Time
      const timeCell = document.createElement('td');
      timeCell.textContent = `${dish.cookingTime} min`;
      timeCell.classList.add('cookingTime-cell');

      // Difficulty
      const difficultyCell = document.createElement('td');
      difficultyCell.textContent = dish.difficulty;
      difficultyCell.classList.add('difficulty-cell');

      // Origin
      const originCell = document.createElement('td');
      originCell.textContent = dish.origin;
      originCell.classList.add('origin-cell');

      // Servings
      const servingsCell = document.createElement('td');
      servingsCell.textContent = dish.servings;
      servingsCell.classList.add('servings-cell');

      // Action
      const actionCell = document.createElement('td');
      actionCell.classList.add('actions-cell');

      // Delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.classList.add('delete-button');
      deleteBtn.dataset.id = dish._id;
      actionCell.appendChild(deleteBtn);
      deleteBtn.addEventListener('click', async () => {
        const confirmDelete = confirm(
          'Are you sure you want to delete the dish?'
        );
        if (confirmDelete) {
          await deleteDish(dish._id);
        }
      });

      // To fragment
      row.appendChild(nameCell);
      row.appendChild(ingredientsCell);
      row.appendChild(stepsCell);
      row.appendChild(timeCell);
      row.appendChild(difficultyCell);
      row.appendChild(originCell);
      row.appendChild(servingsCell);
      row.appendChild(actionCell);

      fragment.appendChild(row);
    });

    table.appendChild(fragment);
  }

  // Ingredient button
  document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('edit-ingredient-button')) {
      const id = event.target.dataset.id;
      const oldIngredient = event.target.dataset.ingredient;
      const newIngredient = prompt('Change ingredient:', oldIngredient);

      if (newIngredient && newIngredient.trim() !== '') {
        const res = await updateDish(id, { oldIngredient, newIngredient });
        if (res) notyf.success('Ingredient updated!');
      }
    }
  });

  // Steps button
  document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('edit-step-button')) {
      const id = event.target.dataset.id;
      const oldStep = event.target.dataset.step;
      const newStep = prompt('Change step:', oldStep);

      if (newStep && newStep.trim() !== '') {
        const res = await updateDish(id, { oldStep, newStep });
        if (res) notyf.success('Step updated!');
      }
    }
  });

  // Update a dish
  async function updateDish(id, updates) {
    try {
      const response = await fetch(`http://localhost:5001/api/dishes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        setTimeout(() => {
          location.reload();
        }, 1500);
        return true;
      } else {
        const result = await response.json();
        notyf.error(result.message);
        return false;
      }
    } catch (error) {
      console.error('Error updating dish:', error);
    }
  }

  // DELETE a dish
  async function deleteDish(id) {
    try {
      const response = await fetch(`http://localhost:5001/api/dishes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        notyf.success('Dish deleted!');
        setTimeout(() => {
          location.reload();
        }, 1500);
      } else {
        const result = await response.json();
        notyf.error(result.message);
      }
    } catch (error) {
      console.error('Error deleting dish:', error);
    }
  }

  // FORM //

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

  // POST a new dish
  const dishForm = document.getElementById('dish-form');

  dishForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // all values
    const name = document.getElementById('dish-name').value;

    const ingredients = Array.from(
      document.querySelectorAll('#addIngredient input')
    ).map((input) => input.value);

    const preparationSteps = Array.from(
      document.querySelectorAll('#addSteps input')
    ).map((input) => input.value);

    const cookingTime = document.getElementById('dish-cooking-time').value;
    const origin = document.getElementById('dish-origin').value;
    const difficulty = document.getElementById('dish-difficulty').value;
    const servings = document.getElementById('dish-servings').value;

    // Regex and check
    const nameRegex = /^[A-Za-zÅÄÖåäö\s]{2,}$/;
    const numberRegex = /^\d+$/;

    if (!nameRegex.test(name)) {
      notyf.error('Name must be at least 2 letters and only letters');
      return;
    }

    if (
      ingredients.length === 0 ||
      ingredients.some((ingredient) => ingredient.trim() === '')
    ) {
      notyf.error('All ingredient fields must be filled');
      return;
    }

    if (
      preparationSteps.length === 0 ||
      preparationSteps.some((step) => step.trim() === '')
    ) {
      notyf.error('All preparation steps must be filled');
      return;
    }

    if (!numberRegex.test(cookingTime)) {
      notyf.error('Cooking time must be filled');
      return;
    }

    if (!nameRegex.test(origin)) {
      notyf.error('Origin must be at least 2 letters and only letters');
      return;
    }

    if (!numberRegex.test(servings)) {
      notyf.error('Servings must be filled');
      return;
    }

    const newDish = {
      name,
      ingredients,
      preparationSteps,
      cookingTime,
      origin,
      difficulty,
      servings,
    };

    // POST
    const response = await fetch('http://localhost:5001/api/dishes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDish),
    });

    if (response.ok) {
      notyf.success('Dish saved!');
      setTimeout(() => {
        location.reload();
      }, 1500);
    } else {
      const result = await response.json();
      notyf.error(result.message);
    }
  });

  fetchDishes();
});

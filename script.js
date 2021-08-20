const getMealBtn = document.getElementById('get_meal') ;
const mealContainer = document.getElementById('meal') ;

getMealBtn.addEventListener('click' , ()=> {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(res => {
        createMeal(res.meals[0]) ;
        console.log(res.meals[0]) ;
    })
}) ;

function createMeal(meal){
    const ingredient = [];
	// Get all ingredients from the object. Up to 20
	for(let i=1; i<=20; i++) {
		if(meal[`strIngredient${i}`]) {
			ingredient.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
		} 
		
	}

    mealContainer.innerHTML = `
    <div class="meal" id="meal">
            <div class="row">
                <div class="column col-lg-5">
                    <img src="${meal.strMealThumb}" alt="">
                    <p><strong>Category: </strong>${meal.strCategory}</p>
                    <p><strong>Tags: </strong>${meal.strTags}</p>
                    <p><strong>Area: </strong>${meal.strArea}</p>
                    <h5>Ingredients</h5>
                    <ul>
					            ${ingredient.map(ingredient => `<li>${ingredient}</li>`).join('')}
				            </ul>
             </div>
             <div class="column col-lg-7">
                 <h4>${meal.strMeal}</h4>
                 <p>${meal.strInstructions}</p>
             </div>
             <div class="column col-lg-12">
             <h5>Video Recipe</h5>
               <div class="videoWrapper">
                    <iframe width="100%" height="400"
                    src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
                    </iframe>
                </div>
             </div>
        </div>
    `
}

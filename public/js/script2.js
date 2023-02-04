let grid_category_topic = document.querySelectorAll(".grid-category-topic");
let grid_category_image = document.querySelectorAll(".grid-category-image");

for (let i = 0; i < grid_category_topic.length; i++) {
    grid_category_topic[i].addEventListener('mouseover', (e) => {
        grid_category_image[i].style.transition = "all 0.12s ease-in"
        grid_category_image[i].style.filter = "brightness(80%)"
    })
    grid_category_topic[i].addEventListener('mouseout', (e) => {
        grid_category_image[i].style.transition = "all 0.12s ease-in"
        grid_category_image[i].style.filter = "brightness(50%)"
    })
}
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.product-item button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Item added to cart');
        });
    });
});

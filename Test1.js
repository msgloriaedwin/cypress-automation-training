/// <reference types="Cypress" />

describe('Website Launch and View Products', function() {

it('should navigate to the website and display products', function() {

cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')

cy.get('.search-keyword').type('ca')    //.type is a command for typing inputs into a field.
cy.wait(2000)   //pausing test for specified period of time.

//cy.get('.product').should('have.length',4) - This threw an error cos 1 item was not visible and there five products.

// to get only visible products use the method below...
cy.get('.product:visible').should('have.length',4)

//parent-child chaining
// .find is a command use to look for a element(child e.g .product) inside another element (parent e.g .products)
cy.get('.products').find('.product').should('have.length',4)

//to target an element by their index use the method (.eq) and to find element with a pecific text use (.contains), click() finds the button and clicks it.
cy.get('.products').find('.product').eq(2).contains('ADD TO CART').click()

// Finds all .product elements inside .products., Iterates over each .product element.
cy.get('.products').find('.product').each(($el, index, $list) => {

// Looks inside each .product for an h4.product-name element and get the text inside this 'h4' element and store it in a variable called textVeg.
const textVeg= $el.find('h4.product-name').text()   

//Check if the text inside the 'h4' element includes the words 'Cashews - 1 Kg'.
if (textVeg.includes('Cashews - 1 Kg')) 
{
    //If the text includes 'Cashews - 1 Kg', find a button inside this 'product' element and click it.
     cy.wrap($el).find('button').click()    
}
})
// cy.get('.brand'): Finds the element with the class brand.
// .then(function(logoelement) { ... }): Waits for the cy.get('.brand') command to complete and then executes the function,
// with logoelement as its argument. This function is defined using the function keyword.
cy.get('.brand').then(function(logoelement) { 
    cy.log(logoelement.text()) //Inside the function, logoelement.text() retrieves the text content of the element, 
    // and cy.log() prints this text to the Cypress Command Log.
})
})
})

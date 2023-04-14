/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseUrl = 'https://platzi-avo.vercel.app'
const appNode = document.querySelector('#app'); //Access to HTML Element
//const urlApi = 'https://platzi-avo.vercel.app/api/avo';

// Intl (Internationalization)
// 1 - format dates
// 2 - format currencies (divisas) 
 
const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency: 'USD'
    }).format(price)    
    return newPrice;
}

//Web API
//Connect to server
//Here it uses Promises, but it can be done with async/await too
window
.fetch(`${baseUrl}/api/avo`)
    //Proccess the response and convert it to JSON
    .then(response => response.json())
    // JSON -> Data -> Render info into browser
    .then(responseJson => {
        const allItems = [];
        responseJson.data.forEach(item => {
            // Create image
            const image = document.createElement('img');
            // URL de la imagen
            image.className = 'h-28 w-28 md:h-36 md:w-36 rounded-full'
            image.src = `${baseUrl}${item.image}`;

            //Create title
            const title = document.createElement('h2')
            title.className = 'text-xl text-black font-medium'
            title.textContent = item.name;

            //Create price
            const price = document.createElement('div')
            price.className = 'text-gray-600'
            price.textContent = formatPrice(item.price);

            //Wrap price & title
            const priceAndTitle = document.createElement('div');
            priceAndTitle.className = "text-center mt-3";
            priceAndTitle.append(title, price);

            //Wrap img and priceAndTitle
            const card = document.createElement('div');
            card.className = 'flex flex-col items-center bg-green-300 rounded-lg p-6 hover:bg-gray-300';
            card.append(image, priceAndTitle)
/*           
            const container = document.createElement('div');
            container.append(image, title, price) */

            allItems.push(card);
        });
        appNode.append(...allItems);
    });

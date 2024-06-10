const carta = [
    {
        container: '.primeros',
        platos: [
            { id: 0, imgSrc: './img/gazpacho.jpg', nombre: 'Gazpacho Andaluz', alergenos: ['Gluten', 'Lácteos'], precio: '9'},
            { id: 1, imgSrc: './img/salad.jpg', nombre: 'Ensalada Mediterránea', alergenos: ['Apio'], precio: '8'},
            { id: 2, imgSrc: './img/croquetas_pollo.jpg', nombre: 'Croquetas de Pollo', alergenos: ['Gluten', 'Lácteos'], precio: '7'},
            { id: 3, imgSrc: './img/tostada.jpg', nombre: 'Tostada de Aguacate', alergenos: ['Gluten'], precio: '6'},
            { id: 4, imgSrc: './img/nachos.jpg', nombre: 'Nachos con Queso', alergenos: ['Gluten', 'Lácteos'], precio: '10'},
            { id: 5, imgSrc: './img/empanadillas.jpg', nombre: 'Empanadillas', alergenos: ['Gluten'], precio: '5'}
        ]
    },
    {
        container: '.segundos',
        platos: [
            { id: 6, imgSrc: './img/steak.jpg', nombre: 'Entrecot de Ternera', alergenos: ['Gulten'], precio: '20'},
            { id: 7, imgSrc: './img/spaghetti.jpg', nombre: 'Espaguetis a la Boloñesa', alergenos: ['Gluten', 'Lácteos'], precio: '14'},
            { id: 8, imgSrc: './img/salmon.jpg', nombre: 'Salmón a la Plancha', alergenos: ['Pescado'], precio: '18'},
            { id: 9, imgSrc: './img/fideua.jpg', nombre: 'Fideuá', alergenos: ['Crustáceos', 'Gluten'], precio: '21'},
            { id: 10, imgSrc: './img/tacos.jpg', nombre: 'Tacos de Carne', alergenos: ['Gluten', 'Lácteos'], precio: '15'},
            { id: 11, imgSrc: './img/ravioli.jpg', nombre: 'Raviolis de Queso', alergenos: ['Gluten', 'Lácteos'], precio: '13'}
        ]
    },
    {
        container: '.postres',
        platos: [
            { id: 12, imgSrc: './img/brownie.jpg', nombre: 'Brownie de Chocolate', alergenos: ['Gluten', 'Lácteos'], precio: '6'},
            { id: 13, imgSrc: './img/tarta.jpg', nombre: 'Tarta de Manzana', alergenos: ['Huevo', 'Lácteos'], precio: '5'},
            { id: 14, imgSrc: './img/mousse.jpg', nombre: 'Mousse de Limón', alergenos: ['Gluten', 'Lácteos'], precio: '7'},
            { id: 15, imgSrc: './img/sorbet.jpg', nombre: 'Sorbete de Mango', alergenos: ['Gulten'], precio: '4'},
            { id: 16, imgSrc: './img/macaron.jpg', nombre: 'Macarons', alergenos: ['Gluten'], precio: '5'},
            { id: 17, imgSrc: './img/cupcake.jpg', nombre: 'Cupcake de Vainilla', alergenos: ['Gluten', 'Lácteos'], precio: '5'}
        ]
    },
    {
        container: '.bebidas',
        platos: [
            { id: 18, imgSrc: './img/jugo.jpg', nombre: 'Jugo de Naranja', alergenos: ['Gulten'], precio: '3'},
            { id: 19, imgSrc: './img/limonada.jpg', nombre: 'Limonada', alergenos: ['Gulten'], precio: '3'},
            { id: 20, imgSrc: './img/vodka.jpg', nombre: 'Vodka', alergenos: ['Gluten'], precio: '6'},
            { id: 21, imgSrc: './img/whisky.jpg', nombre: 'Whisky', alergenos: ['Gulten'], precio: '7'},
            { id: 22, imgSrc: './img/chocolate.jpg', nombre: 'Chocolate Caliente', alergenos: ['Cafeína'], precio: '3'},
            { id: 23, imgSrc: './img/infusion.jpg', nombre: 'Infusión de Hierbas', alergenos: ['Gulten'], precio: '2'}
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    carta.forEach(categoria => {
        const container = document.querySelector(categoria.container);
        const platosContainer = container.querySelector('.platos-container');
        categoria.platos.forEach(plato => {
            const item = document.createElement('plato-rest');
            item.setAttribute('id', plato.id);
            item.setAttribute('imgSrc', plato.imgSrc);
            item.setAttribute('nombre', plato.nombre);
            item.setAttribute('alergenos', plato.alergenos.join(','));
            item.setAttribute('precio', plato.precio);
            platosContainer.appendChild(item);
        });
    });
});

class Plat extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    get id (){
        return Number(this.getAttribute('id'))
    }
    get imgSrc (){
        return this.getAttribute('imgSrc');
    }
    get nombre (){
        return this.getAttribute('nombre');
    }
    get alergenos (){
        return this.getAttribute('alergenos')?.split(',');
    }
    get precio (){
        return Number(this.getAttribute('precio'));
    }
    set imgSrc (imgSrc){
        this.setAttribute('imgSrc', imgSrc)
    }
    set nombre (nombre){
        this.setAttribute('nombre', nombre)
    }
    set alergenos (alergenos){
        this.setAttribute('alergenos', alergenos.join(','))
    }
    set precio (precio){
        this.setAttribute('precio', precio)
    }

    render() {
        const style = 
            `
            .plato-container{
                display: flex;
                gap: 30px;
                width: 100%;
                height: 150px;
                overflow: hidden;
            }
            
            .plato-img-container{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 30%;
                height: 100%;
            }
            
            .plato-img{
                object-fit: cover;
                height: 100%;
                width: 100%
            }
            
            .plato-info-frame{
                display: flex;
                justify-content: space-between;
                align-items: end;
                width: 100%;
            }
            
            .plato-info-container{
                display: flex;
                flex-direction: column;
            }
            
            .plato-nombre{
                font-size: 40px;
                font-weight: 700;
            }
            
            .plato-alergenos-container{
                display: flex;
                gap: 3px;
            }
            
            .plato-alergeno{
                font-weight: 500;
            }
            
            
            .precio-container{
                display: flex;
                flex-direction: column;
                align-items: end;
            }
            
            .plato-precio{
                font-size: 30px;
            }
            
            .plato-add{
                background-color: black;
                color: white;
                border: none;
                outline: none;
                padding: 5px 20px;
                cursor: pointer;
            }
            
            .plato-alergeno:not(:last-child)::after {
                content: ',';
            }
            .plato-alergenos-container::before{
                content: 'Alergenos: ';
            }
            
            .plato-precio::after{
                content: '€';
            }
        `

        this.shadow.innerHTML = `
            <style>${style}</style>
            <div class="plato-container">
                <div class="plato-img-container">
                    <img class="plato-img" src="${this.imgSrc}">
                </div>
                <div class="plato-info-frame">
                    <div class="plato-info-container">
                        <div class="plato-nombre">${this.nombre}</div>
                        <div class="plato-alergenos-container">
                            ${this.alergenos.map(alergeno => `<div class="plato-alergeno">${alergeno}</div>`).join('')}
                        </div>
                    </div>
                    <div class="precio-container">
                        <div class="plato-precio">${this.precio.toFixed(2)}</div>
                        <button class="plato-add">Añadir</button>
                    </div>
                </div>
            </div>
        `;
    }

    connectedCallback(){
        this.render();
        const platoDetail = { //informacion que se le pasa a la comanda para engancharlo en el otro componente
            id: this.id,
            imgSrc: this.imgSrc,
            nombre: this.nombre,
            alergenos: this.alergenos,
            precio: this.precio,
        }
        this.shadow.querySelector('.plato-add').addEventListener('click', () => document.dispatchEvent(new CustomEvent('añadir', { detail: platoDetail })))
    }
}

customElements.define('plato-rest', Plat);
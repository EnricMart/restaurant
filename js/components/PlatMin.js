class PlatMin extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    get id (){
        return Number(this.getAttribute('itemID'))
    }
    get nombre (){
        return this.getAttribute('nombre');
    }
    get precio (){
        return Number(this.getAttribute('precio'));
    }
    get cantidad (){
        return Number(this.getAttribute('cantidad'))
    }
    set nombre (nombre){
        this.setAttribute('nombre', nombre)
    }
    set precio (precio){
        this.setAttribute('precio', precio)
    }
    set cantidad (cantidad){
        this.setAttribute('cantidad', cantidad)
    }

    render() {
        const style = `
        
        .platos-min-container {
            display: flex;
            flex-direction: column;
            gap: 5px;
            height: 50vh;
        }
        
        .plato-min-container{
            display: flex;
            align-items: end;
            width: 100%;
            gap: 10px;
        }
        
        .plato-precio::after{
            content: '€';
        }
        
        .plato-nombre {
            margin-right: -5px;
        }
        
        .plato-cantidad::before{
            content: 'x';
        }
        
        .btn-action-container *{
            background-color: #FF6B6B; /* Rojo claro */
            color: white;
            padding: 0px 10px;
            font-size: 10px;
            cursor: pointer;
            border-radius: 10px;
             
        }
        
        .btn-action-container *:hover{
            background-color: #991B1B; /* Rojo oscuro */
        }
    `

        this.shadow.innerHTML = `
        <style>${style}</style>
        <div class="plato-min-container">
            <div class="plato-nombre">${this.nombre}</div>
            <div class="plato-cantidad">${this.cantidad}</div>
            <div class="plato-precio">${this.precio * this.cantidad}</div>
            <div class="btn-action-container">
                <div class="add-btn">+</div>
                <div class="remove-btn">-</div>
            </div>
        </div>
        `;

        this.shadow.querySelector('.add-btn').addEventListener('click', e => {
            document.dispatchEvent(new CustomEvent('añadir', { detail: 
                {
                    id: this.id,
                    nombre: this.nombre,
                    precio: this.precio,
                    cantidad: this.cantidad
                }
            }))
        });
        this.shadow.querySelector('.remove-btn').addEventListener('click', () => {
            document.dispatchEvent(new CustomEvent('remove', { detail:
                {
                    id: this.id,
                    nombre: this.nombre,
                    precio: this.precio,
                    cantidad: this.cantidad
                } 
            }))
        });
    }

    static get observedAttributes(){
        return ['cantidad']
    }

    attributeChangedCallback(att, oldValue, newValue){
        this.render();
    }

    connectedCallback(){
        this.render();
        document.addEventListener('añadir', e => e.detail.id == this.id && (this.cantidad+=1))
        document.addEventListener('remove', e => {
            if (e.detail.id == this.id) {
                this.cantidad == 1 ? this.remove() : this.cantidad--;
            }

        })
    }
}

customElements.define('plato-min', PlatMin);
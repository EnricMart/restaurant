class Comanda extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' })
        this.selectedPlatesID = [];
    }

    get total (){
        return Number(this.getAttribute('total'));
    }
    set total (total){
        this.setAttribute('total', total);
    }

    render() {
        const style = `
            .comanda-title{
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 40px;
                font-weight: 800;
                color: #5a5a5a;
            }
            
            .total-precio-container{
                display: flex;
                align-items: baseline;
                gap: 9px;
            }
            
            .total-precio-title{
                font-size: 30px;
            }
            
            .total-precio::after{
                content: '€';
            }
            
            .comanda-divider{
                flex: 1;
                border-bottom: 1px solid black;
            }
            
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
                background-color: black;
                color: white;
                padding: 0px 10px;
                font-size: 10px;
                cursor: pointer;
            }
            
            .btn-action-container *:hover{
                background-color: rgb(59, 59, 59);
            }
        `

        this.shadow.innerHTML = `
            <style>${style}</style>
            <div class="comanda-title">COMANDA</div>
            <div class="platos-min-container">

            </div>
            <div class="total-precio-container">
                <div class="total-precio-title">TOTAL</div>
                <div class="comanda-divider"></div>
                <div class="total-precio">${this.total.toFixed(2)}</div>
            </div>
        `;
    }


    static get observedAttributes(){
        return ['total']
    }

    attributeChangedCallback(att, oldValue, newValue){
        switch(att){
            case 'total':
                this.shadow.querySelector('.total-precio').textContent = this.total.toFixed(2)
                break;
        }
    }

    connectedCallback(){
        this.render();
        document.addEventListener('añadir', e => {
            if (!this.selectedPlatesID.includes(e.detail.id)){
                this.selectedPlatesID.push(e.detail.id)
                const container = this.shadow.querySelector('.platos-min-container')
                const plato = document.createElement('plato-min')
                plato.setAttribute('itemID', e.detail.id)
                plato.setAttribute('nombre', e.detail.nombre)
                plato.setAttribute('cantidad', '1');
                plato.setAttribute('precio', e.detail.precio)
                container.appendChild(plato);
            }
            this.total+=e.detail.precio
        })
        document.addEventListener('remove', e => {
            e.detail.cantidad == 1 && this.selectedPlatesID.splice(this.selectedPlatesID.indexOf(e.detail.id),1);
            this.total-=e.detail.precio
        })
    }    
}

customElements.define('comanda-rest', Comanda);
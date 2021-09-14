const app = Vue.createApp({
    data() {
      return {
        datos: {},
        jueguetes: [], //las cosas de los juguetes
        medicina: [], //las cosas de la farmacia
        cosasdecompra: [], //guardo aca las compras
      };
    },
    created() {
      let endpoint = "https://apipetshop.herokuapp.com/api/articulos";
      fetch(endpoint)
        .then((r) => r.json())
        .then((data) => {
          this.datos = data.response;
          this.serparador(this.datos);
          this.addcarrito();
        })
        .catch((err) => console.error(err.message));
    },
    // metodo para hacer
    methods: {
      // aca separdo los juguetes de los medicamentos.
      serparador(array) {
        this.jueguetes = array.filter((member) => member.tipo == "Juguete");
        this.medicina = array.filter((miembro) => miembro.tipo === "Medicamento");
      },
      addcarrito(producto) {
        let cosa = this.cosasdecompra.filter(
          (miembro) => miembro._id == producto._id
        )[0];
        if (cosa != undefined) {
          cosa.cant++;
        } else {
          let cosa = {
            _id: producto._id,
            name: producto.nombre,
            descripcion: producto.descripcion,
            imagen: producto.imagen,
            precio: producto.precio,
            tipo: producto.tipo,
            cant: 1,
          };
          this.cosasdecompra.push(cosa);
        }
        producto.stock -- ;
      },
      eliminarmedicina(producto){
        let cosa = this.medicina.filter(
          miembro => miembro._id == producto._id
        )[0];
        cosa.stock += producto.stock  
        let index = 0
        this.cosasdecompra.forEach((product,i)=>{
          product._id == producto._id ? (index = i) : null
        })
        this.cosasdecompra.splice(index,1)
      }
    },
    computed: {
      cantidaddecarrito(){
       return this.cosasdecompra.reduce((accumulador,string)=>accumulador+ string.cant,0)
      },
      totaldecarrito(){
        return this.cosasdecompra.reduce((accumulador,string)=>accumulador + string.cant * string.precio,0)
      }
  
  
  
    },
  });
  let cosas = app.mount("#app");
const app = Vue.createApp({
  data() {
    return {
      datos: {},
      juguetes: [], //las cosas de los juguetes
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
        this.realizarcompra(this.cosasdecompra)
      })
      .catch((err) => console.error(err.message));
  },
  // metodo para hacer
  methods: {
    // aca separdo los juguetes de los medicamentos.
   
    addcarrito(producto) {
      let cosa = this.cosasdecompra.filter(
        (miembro) => miembro._id === producto._id
      )[0];
      if (cosa != undefined) {
        cosa.stock > cosa.cant ? cosa.cant ++ : null
      } else{
        let cosa = {
          _id: producto._id,
          name: producto.nombre,
          descripcion: producto.descripcion,
          imagen: producto.imagen,
          precio: producto.precio,
          tipo: producto.tipo,
          stock:producto.stock,
          cant: 1,
        };
        this.cosasdecompra.push(cosa);
      }
    },
    eliminarmedicina(producto) {
      let index = 0;
      this.cosasdecompra.forEach((product, i) =>
        product._id === producto._id ? (index = i) : null
      );
      this.cosasdecompra.splice(0,1)
    },
    // realizarcompra(array){
    // return array.stock --  
    // }  
  },
  computed: {
    cantidaddecarrito() {
      return this.cosasdecompra.reduce(
        (accumulador, string) => accumulador + string.cant,
        0
      );
    },
    totaldecarrito() {
      return this.cosasdecompra.reduce(
        (accumulador, string) => accumulador + string.cant * string.precio,
        0
      );
    },
    serparador() {
      this.juguetes = this.datos.filter((member) => member.tipo == "Juguete"); 
      this.medicina = this.datos.filter((miembro) => miembro.tipo === "Medicamento");
    },
  },
});
let cosas = app.mount("#app");

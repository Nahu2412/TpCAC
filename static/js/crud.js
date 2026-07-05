const{ createApp } = Vue;

createApp({
  data() {
    return {
        productos : [],
        api_backend:"http://localhost:8080",
        id_producto:'',
        name:'',
        price:'',
        description:'',
        image:''
    };
  },
  methods: {
    sendFormData(url, formData,methodParam) {
        fetch(url, {
          method: methodParam,
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(formData),
        })
        .then((response) => response.text())
        .then((data) => {
            this.name='';
            this.price='';
            this.description='';
            this.image='';
            this.getProductos();
        })
        .catch((error) => {
            console.error("Error al enviar el formulario:", error);
        });
    },
    getProductos() {
        fetch(`${this.api_backend}/api/v1/product/all`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                this.productos = data;
            })
            .catch((err) => {
                console.error(err);
            });
    },
    getProducto(id_producto) {
         fetch(`${this.api_backend}/api/v1/product/${id_producto}`, {
             method: 'GET',
         })
         .then((response) => response.json())
         .then((data) => {
             this.id_producto = data.id;
             this.name = data.name;
             this.price = data.price;
             this.description = data.description;
             this.image = data.image;
         })
         .catch((error) => {
             console.error("Error al enviar el formulario:", error);
         });
     },
    saveProducto() {
        const productData = {
            name: this.name,
            price: parseInt(this.price),
            description: this.description,
            image: this.image
        };

        if(this.id_producto){
            this.sendFormData(`${this.api_backend}/api/v1/product/edit/${this.id_producto}`, productData,'PUT');
        }else{
            this.sendFormData(`${this.api_backend}/api/v1/product/create`, productData,'POST');
        }
    },
    deleteProducto(id_producto) {
        fetch(`${this.api_backend}/api/v1/product/delete/${id_producto}`, {
            method: 'DELETE',
        })
        .then((response) => response.text())
        .then((data) => {
            this.getProductos();
        })
        .catch((error) => {
            console.error("Error al eliminar", error);
        });
    },
  },
  created() {
    this.getProductos();
  },
}).mount("#app");
const{ createApp } = Vue;
createApp({
  data() {
    return {
        productos : [],
        api_server:"http://127.0.0.1:8000",
        id_producto:'',
        nombre:'',
        talle:'',
        circunferencia:'',
        banner:null,
        material:'',
        tamaniocopa:'',
        tamanioala:'',
        descripcion:'',
        precio:''
    };
  },
  methods: {
    sendFormData(url, formData,method) {
        fetch(url, {
          method: method,
          body: formData,
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("datos recibidos:",data)
            this.nombre='',
            this.talle='',
            this.circunferencia='',
            this.banner=null,
            this.material='',
            this.tamaniocopa='',
            this.tamanioala='',
            this.descripcion='',
            this.precio=''
            if(method==='POST'){
                this.getProductos(`${this.api_server}/api/productos`);
            }
        })
        .catch((error) => {
            console.error("Error al enviar el formulario:", error);
        });
    },
    onFileChange(event) {
        this.banner = event.target.files[0];
    },
    getProductos() {
        fetch(`${this.api_server}/api/productos/`)
            .then((response) => response.json())
            .then((data) => {
                this.productos = data;
            })
            .catch((err) => {
                console.error(err);
            });
    },
     getProducto(id_producto) {
         fetch(`${this.api_server}/api/producto/${id_producto}/`, {
             method: 'GET',
         })
         .then((response) => response.json())
         .then((data) => {
             this.id_producto = data.id;
             this.nombre = data.nombre;
             this.talle = data.talle;
             this.circunferencia = data.circunferencia;
             this.material = data.material;
             this.tamaniocopa = data.tamaniocopa;
             this.tamanioala = data.tamanioala;
             this.descripcion = data.descripcion;
             this.precio = data.precio;
             console.log(data);
         })
         .catch((error) => {
             console.error("Error al enviar el formulario:", error);
         });
     },
   
    saveProducto() {
        const formData = new FormData();
        formData.append('nombre', this.nombre);
        formData.append('talle', this.talle);
        formData.append('circunferencia', this.circunferencia);
        formData.append('material', this.material);
        formData.append('tamaniocopa', this.tamaniocopa);
        formData.append('tamanioala', this.tamanioala);
        formData.append('descripcion',this.descripcion);
        formData.append('precio',this.precio);
        formData.append('banner', this.banner);

        console.log(formData.values);

        if(this.id_producto){ 
            //this.sendFormData(`${this.api_server}/api/actualizar_producto/${this.id_producto}/`, formData,'PUT');
            this.sendFormData(`${this.api_server}/api/update_producto/${this.id_producto}/`, formData,'PUT');
            alert("Producto actualizado");
        }else{// Si no creo el registro en el backend
            this.sendFormData(`${this.api_server}/api/crear_producto/`, formData,'POST');
            alert("Producto Creado");
        }
    },
    deleteProducto(id_producto) {
        fetch(`${this.api_server}/api/eliminar_producto/${id_producto}`, {
            method: 'DELETE',
        })
        .then((response) => response.json())
        .then((data) => {
            alert("Producto Eliminado");

            this.getProductos(`${this.api_server}/api/productos/`);
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
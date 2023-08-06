class ProductManager {
    constructor() {
        this.products = []
    }

    addProduct(product) {
        const prod = this.products.find((prod) => prod.code === product.code)
    
        if (prod) {
            console.log("Producto ya encontrado")
        } else if (!product.title || !product.description || !product.price || !product.code || !product.stock || !product.thumbnail) {
            throw new Error("Todos los campos obligatorios deben ser proporcionados.")
        } else {
            this.products.push(product)
        }  
    }
    

    getProducts() {
        console.log(this.products)
    }

    getProductById(id) {
        const prod = this.products.find((prod) => prod.id === id)

        if (prod) {
            console.log(prod)
        } else {
            console.log("Producto no encontrado")
        }
    }

    deleteProduct(id) {
        const index = this.products.findIndex((prod) => prod.id === id);

        if (index !== -1) {
            this.products.splice(index, 1);
            console.log("Producto eliminado");
        } else {
            console.log("Producto no encontrado");
        }
    }

    updateProduct(id, updatedFields) {
        const prod = this.products.find((prod) => prod.id === id);

        if (prod) {
            Object.assign(prod, updatedFields);
            console.log("Producto actualizado:", prod);
        } else {
            console.log("Producto no encontrado");
        }
    }
}

class Product {
    constructor(title, description, price, code, stock, thumbnail) {
        if (!title || !description || !price || !code || !stock || !thumbnail) {
            throw new Error("Todos los campos obligatorios deben ser proporcionados.")
        }
        if (typeof title !== "string") {
            throw new Error("El título debe ser una cadena de texto.")
        }
        if (typeof description !== "string") {
            throw new Error("La descripción debe ser una cadena de texto.")
        }
        if (typeof price !== "number") {
            throw new Error("El precio debe ser un número.")
        }
        if (typeof code !== "string") {
            throw new Error("El código debe ser una cadena de texto.")
        }
        if (typeof stock !== "number") {
            throw new Error("El stock debe ser un número.")
        }
        /*if (typeof thumbnail !== "string") {
            throw new Error("La URL de la imagen (thumbnail) debe ser una cadena de texto.")
        }*/ 

        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = Product.incrementarId()
    }
    static incrementarId() {
        if (this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }
}

const papa = new Product("Papa", "Es un tuberculo", 200, "PAPA200", 137, [])
const zanahoria = new Product("Zanahoria", "Es una verdura, creo", 350, "ZAZA350", 112, [])
const tomate = new Product("Tomate", "Es una fruta", 400, "TMTE400", 666, [])
const pera = new Product("Pera", "La mejor fruta lejos", 1200, "PERA120", 73, [])

const productManager = new ProductManager()

productManager.addProduct(papa)
productManager.addProduct(zanahoria)
productManager.addProduct(tomate)
productManager.addProduct(pera)

productManager.getProducts()

productManager.getProductById(4)
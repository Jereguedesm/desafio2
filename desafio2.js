/*import {promises as fs} from "fs"



const path = "./products.json"

const getProducts = async () => {
    const prods = JSON.parse(await fs.readFile(path, "utf-8"))
    console.log(prods)
}


const getProductsById = async () => {
    const prods = JSON.parse(await fs.readFile(path, "utf-8"))
    const producto = prods.find(prod => prod.id === id)

    if (producto){
        console.log(produdto)
    }else{
        console.log("Producto no encontrado")
    }
}


const addProduct = async (product) => {
    const prods = JSON.parse(await fs.readFile(path, "utf-8"))
    const product = prods.find(prod => prod.id === id)

    if(product){
        console.log("Producto ya existente")
    }else{
        prods.push(product)
        await fs.writeFile(path, JSON.stringify(prods))
    }
}


const updateProducts = async (id, producto) => {
    const prods = JSON.parse(await fs.readFile(path, "utf-8"))
    const index = prods.findIndex(prod => prod.id === id)

    if (index != -1){
        prods[index].nombre = producto.nombre
        prods[index].descripcion = producto.descripcion
        prods[index].categoria = producto.categoria
        prods[index].stock = producto.stock
        await fs.writeFile(path, JSON.stringify(prods))
    }else{
        console.log("Producto no encontrado")
    }
}


const deleteProduct = async (id) => {
    const prods = JSON.parse(await fs.readFile(path, "utf-8"))
    const product = prods.find(prod => prod.id === id)

    if(product){
        await fs.writeFile(path, JSON.stringify(prods.filter(prod => prod.id != id)))
    }else{
        console.log("Producto no encontrado")
    }
}
*/




import {promises as fs} from "fs"
const path = "./products.json"

class ProductManager {
    constructor() {
        this.products = [];
    }

    async addProduct(product) {
        const prods = JSON.parse(await fs.readFile(path, "utf-8"));
        const prod = this.products.find((prod) => prod.code === product.code);

        if (prod) {
            console.log("Producto ya existente");
        } else if (!product.title || !product.description || !product.price || !product.code || !product.stock || !product.thumbnail) {
            throw new Error("Todos los campos obligatorios deben ser proporcionados.");
        } else {
            this.products.push(product);
            await fs.writeFile(path, JSON.stringify(prods));
        }  
    }

    async getProducts() {
        const prods = JSON.parse(await fs.readFile(path, "utf-8"));
        console.log(prods);
    }

    async getProductsById(id) {
        const prods = JSON.parse(await fs.readFile(path, "utf-8"));
        const producto = prods.find(prod => prod.id === id);

        if (producto){
            console.log(producto);
        } else {
            console.log("Producto no encontrado");
        }
    }

    async deleteProduct(id) {
        const prods = JSON.parse(await fs.readFile(path, "utf-8"));
        const product = prods.find(prod => prod.id === id);

        if (product){
            await fs.writeFile(path, JSON.stringify(prods.filter(prod => prod.id !== id)));
            console.log("Producto eliminado");
        } else {
            console.log("Producto no encontrado");
        }
    }

    async updateProducts(id, producto) {
        const prods = JSON.parse(await fs.readFile(path, "utf-8"));
        const index = prods.findIndex(prod => prod.id === id);

        if (index !== -1){
            prods[index].nombre = producto.nombre;
            prods[index].descripcion = producto.descripcion;
            prods[index].categoria = producto.categoria;
            prods[index].stock = producto.stock;
            await fs.writeFile(path, JSON.stringify(prods));
            console.log("Producto actualizado:", prods[index]);
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
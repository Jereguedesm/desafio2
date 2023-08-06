import { promises as fs } from "fs"
const path = "./products.json"

class ProductManager {
    constructor() {
        this.products = []
    }

    async readProductsFromFile() {
        try {
            const prodsData = await fs.readFile(path, "utf-8")
            return JSON.parse(prodsData)
        } catch (error) {
            // Si ocurre algún error al leer el archivo, podrías retornar un valor por defecto o lanzar una excepción.
            // Aquí simplemente retornamos un array vacío para iniciar.
            return []
        }
    }

    async writeProductsToFile() {
        try {
            await fs.writeFile(path, JSON.stringify(this.products))
        } catch (error) {
            console.error("Error al escribir en el archivo:", error)
            throw new Error("Error al guardar los productos.")
        }
    }

    async addProduct(product) {
        const prods = await this.readProductsFromFile()
        const prod = prods.find((prod) => prod.code === product.code)

        if (prod) {
            console.log("Producto ya existente")
        } else if (!product.title || !product.description || !product.price || !product.code || !product.stock || !product.thumbnail) {
            throw new Error("Todos los campos obligatorios deben ser proporcionados.")
        } else {
            this.products.push(product)
            await this.writeProductsToFile()
        }
    }

    async getProducts() {
        const prods = await this.readProductsFromFile()
        console.log(prods)
    }

    async getProductById(id) {
        const prods = await this.readProductsFromFile()
        const producto = prods.find(prod => prod.id === id)

        if (producto) {
            console.log(producto)
        } else {
            console.log("Producto no encontrado")
        }
    }

    async deleteProduct(id) {
        const prods = await this.readProductsFromFile()
        const product = prods.find(prod => prod.id === id)

        if (product) {
            this.products = this.products.filter(prod => prod.id !== id)
            await this.writeProductsToFile()
            console.log("Producto eliminado")
        } else {
            console.log("Producto no encontrado")
        }
    }

    async updateProducts(id, producto) {
        const prods = await this.readProductsFromFile()
        const index = prods.findIndex(prod => prod.id === id)

        if (index !== -1) {
            this.products[index].nombre = producto.nombre
            this.products[index].descripcion = producto.descripcion
            this.products[index].categoria = producto.categoria
            this.products[index].stock = producto.stock
            await this.writeProductsToFile()
            console.log("Producto actualizado:", this.products[index])
        } else {
            console.log("Producto no encontrado")
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
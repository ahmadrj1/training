enum Category {
  Electronics,
  Clothing,
  Grocery,
  Books,
}

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: Category;
  description?: string;
}

const products: Product[] = [
  { id: 1, name: "Laptop", price: 1000, quantity: 5, category: Category.Electronics },
  { id: 2, name: "T-Shirt", price: 20, quantity: 10, category: Category.Clothing },
  { id: 3, name: "Apple", price: 2, quantity: 0, category: Category.Grocery },
  { id: 4, name: "Phone", price: 500, quantity: 3, category: Category.Electronics },
  { id: 5, name: "Book", price: 15, quantity: 7, category: Category.Books },
  { id: 6, name: "Headphones", price: 100, quantity: 4, category: Category.Electronics },
];

type SearchValue = string | number;

type ProductWithStatus = Product & {
  isAvailable: boolean;
  discount: number;
  featured: boolean;
};

function returnProductsOfCategory(category: Category, list: Product[]): Product[] {
  return list.filter(product => product.category === category);
}

function inStockProducts(list: ProductWithStatus[]): ProductWithStatus[] {
  return list.filter(product => product.isAvailable === true);
}

function returnProductsOverPrice(basePrice: number, list: Product[]): Product[] {
  return list.filter(product => product.price > basePrice);
}

function returnProductsByID(id: number, list: Product[]): Product | undefined {
  return list.find(product => product.id === id);
}

function searchProduct(list: Product[], value: SearchValue): Product {
  return list.find(product => typeof value === "string" ? product.name.toLowerCase() === value.toLowerCase() : product.id === value) as Product;
}

function sortProductsByPrice(list: Product[], ascending: boolean = true): Product[] {
  if (ascending) {
    return list.sort((a, b) => a.price - b.price);
  }
  else {
    return list.sort((a, b) => b.price - a.price);
  }
}

function sortProductsByName(list: Product[], ascending: boolean = true): Product[] {
  if (ascending) {
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }
  else {
    return list.sort((a, b) => b.name.localeCompare(a.name));
  }
}

function calculateTotalInventoryValue(list: Product[]): number {
  return list.reduce((total, product) => total + (product.price * product.quantity), 0);
}

function calculateAveragePrice(list: Product[]): number {
  const totalPrice = list.reduce((total, product) => total + product.price, 0);
  return totalPrice / list.length;
}

function outOfStockProducts(list: Product[]): Product[] {
  return list.filter(product => product.quantity === 0);
}

function calculateTotalQuantity(list: Product[]): number {
  return list.reduce((total, product) => total + product.quantity, 0);
}

function getFirstItem<T>(list: T[]): T {
  return list[0];
}

function getLength<T>(list: T[]): number {
  return list.length;
}

function updateProduct(id: number, updatedData: Partial<Product>): Product {
  const searchedProduct = returnProductsByID(id, products);
  if (!searchedProduct) {
    throw new Error(`Product with id ${id} not found`);
  }

  const updatedProduct = { ...searchedProduct, ...updatedData };
  products.splice(products.indexOf(searchedProduct), 1, updatedProduct);
  return updatedProduct;
}

type ProductToDisplay = Pick<Product, "name" | "price">;
type ProductWithQuantity = Omit<Product, "quantity">;
type ProductWithDescription = Required<Product>;
type ProductRecord = Record<keyof Product, string | number | Category>;


// used AI for this display function to make the output more readable and structured with `map`.
function testAndDisplayAllWork(): void {
  const electronicsProducts = returnProductsOfCategory(Category.Electronics, products);
  const pricedProducts = returnProductsOverPrice(100, products);
  const productById = returnProductsByID(4, products);
  const searchedProduct = searchProduct(products, "Laptop");
  const sortedByPriceAsc = sortProductsByPrice([...products]);
  const sortedByPriceDesc = sortProductsByPrice([...products], false);
  const sortedByNameAsc = sortProductsByName([...products]);
  const sortedByNameDesc = sortProductsByName([...products], false);
  const inventoryValue = calculateTotalInventoryValue(products);
  const averagePrice = calculateAveragePrice(products);
  const outOfStock = outOfStockProducts(products);
  const totalQuantity = calculateTotalQuantity(products);
  const firstProduct = getFirstItem(products);
  const productCount = getLength(products);

  const statusProducts: ProductWithStatus[] = products.map((product) => ({
    ...product,
    isAvailable: product.quantity > 0,
    discount: product.quantity === 0 ? 0 : 10,
    featured: product.price > 100,
  }));

  const availableProducts = inStockProducts(statusProducts);
  const updatedProduct = updateProduct(2, {
    price: 25,
    description: "Updated T-Shirt",
  });

  const displayProduct: ProductToDisplay = {
    name: updatedProduct.name,
    price: updatedProduct.price,
  };

  const productWithoutQuantity: ProductWithQuantity = {
    id: updatedProduct.id,
    name: updatedProduct.name,
    price: updatedProduct.price,
    category: updatedProduct.category,
    description: updatedProduct.description,
  };

  const productWithDescription: ProductWithDescription = {
    ...updatedProduct,
    description: updatedProduct.description ?? "No description provided",
  };

  const productRecord: ProductRecord = {
    id: updatedProduct.id,
    name: updatedProduct.name,
    price: updatedProduct.price,
    quantity: updatedProduct.quantity,
    category: updatedProduct.category,
    description: updatedProduct.description ?? "No description provided",
  };

  console.log("=== Product Analysis Demo ===");
  console.log("\nProducts in Electronics:");
  console.table(electronicsProducts.map(({ id, name, price, quantity }) => ({ id, name, price, quantity })));

  console.log("\nProducts over $100:");
  console.table(pricedProducts.map(({ id, name, price }) => ({ id, name, price })));

  console.log("\nProduct by ID 4:");
  console.table([productById]);

  console.log("\nSearch result for Laptop:");
  console.table([searchedProduct]);

  console.log("\nSorted by price (ascending):");
  console.table(sortedByPriceAsc.map(({ id, name, price }) => ({ id, name, price })));

  console.log("\nSorted by price (descending):");
  console.table(sortedByPriceDesc.map(({ id, name, price }) => ({ id, name, price })));

  console.log("\nSorted by name (ascending):");
  console.table(sortedByNameAsc.map(({ id, name }) => ({ id, name })));

  console.log("\nSorted by name (descending):");
  console.table(sortedByNameDesc.map(({ id, name }) => ({ id, name })));

  console.log("\nInventory summary:");
  console.table([
    {
      totalValue: inventoryValue,
      averagePrice,
      outOfStockCount: outOfStock.length,
      totalQuantity,
    },
  ]);

  console.log("\nOut of stock items:");
  console.table(outOfStock.map(({ id, name }) => ({ id, name })));

  console.log("\nAvailable products:");
  console.table(availableProducts.map(({ id, name, isAvailable, discount, featured }) => ({ id, name, isAvailable, discount, featured })));

  console.log("\nFirst product and count:");
  console.table([{ firstProductName: firstProduct.name, productCount }]);

  console.log("\nUtility types examples:");
  console.table([{ displayProduct, productWithoutQuantity, productWithDescription, productRecord }]);
}

testAndDisplayAllWork();
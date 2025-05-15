import data from './data/data.json'; 
import watch from '../../../public/watch.png';
import headphones from '../../../public/headphones.png';
interface Product {
  id: number;
  variant?: 'small' | 'large';
  price: number;
  currency: string;
  title: string;
  deliveryDate: Date;
  imageUrl: string | StaticImageData;
}

export async function getProduct(id: string) {
  const products = (await import('@/lib/fake-api/data/data.json')).products;
  return products.find(product => product.product_id === id);
}

function organizeProductsByCategory(userCountry: string = 'PL', currency: string = '$'): {
  categoryName: string;
  products: Product[];
}[] {
  const today = new Date();
  const categoriesMap: { [key: string]: Array<object> } = {};

  // Initialize categories structure
  data.categories.forEach((category) => {
    if (category.subcategories) {
      category.subcategories.forEach((subcat) => {
        categoriesMap[subcat.name] = [];
      });
    }
    categoriesMap[category.name] = [];
  });

  // Process each product
  data.products.forEach((product) => {
    // Find category name
    let categoryName = '';
    data.categories.forEach((category) => {
      const subcat = category.subcategories?.find((sc) => sc.category_id === product.category_id);
      if (subcat) {
        categoryName = subcat.name;
      } else if (category.category_id === product.category_id) {
        categoryName = category.name;
      }
    });

    if (!categoryName) return;

    // Find warehouse
    const warehouse = data.warehouses.find((w) => w.warehouse_id === product.warehouse_id);
    if (!warehouse) return;

    // Calculate delivery date
    let deliveryDays = 7; // Default fallback
    const deliveryTerm = product.delivery_terms?.find((dt) =>
      dt.destination_country === userCountry || dt.destination_country === '*'
    );

    if (deliveryTerm) {
      // Average between min and max days, rounded
      deliveryDays = Math.round((deliveryTerm.min_days + deliveryTerm.max_days) / 2);
    } else if (warehouse.country === userCountry) {
      // Domestic default
      deliveryDays = 3;
    }

    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + deliveryDays);

    // Determine image URL
    const imageUrl = product.category_id.includes('watch') ? watch : headphones;

    // Create product entry
    const productEntry = {
      id: product.product_id,
      price: product.price,
      currency,
      title: product.title,
      deliveryDate: deliveryDate, // YYYY-MM-DD format
      imageUrl
    };

    // Add to category
    if (!categoriesMap[categoryName]) {
      categoriesMap[categoryName] = [];
    }
    categoriesMap[categoryName].push(productEntry);
  });
  const categories = Object.entries(categoriesMap).map(([categoryName, products]) => {
    if (products.length === 0) return null; // Skip empty categories
    return {
      categoryName,
      products 
    } 
  }).filter((cat) => cat !== null); // Filter out null values
  return categories
}

export {organizeProductsByCategory};

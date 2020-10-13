import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import {
  createSingleProduct,
  deleteSingleProduct,
  getAllProducts,
  updateSingleProduct,
} from '../../services/Products.service';
import Table, { TableHeader } from '../../shared/Table';
import { Product } from '../../shared/Table/Table.mockdata';
import ProductForm, { ProductCreator } from './ProductForm';

const headers: TableHeader[] = [
  { key: 'id', value: '#' },
  { key: 'name', value: 'Product' },
  { key: 'price', value: 'Price', right: true },
  { key: 'stock', value: 'Available Stock', right: true },
];

const ProductsCRUD = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [updatingProduct, setUpdatingProduct] = useState<Product | undefined>(
    undefined
  );

  async function fetchData() {
    const _products = await getAllProducts();
    setProducts(_products);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleProductSubmit = async (product: ProductCreator) => {
    try {
      await createSingleProduct(product);
      fetchData();
    } catch (err) {
      Swal.fire('Ooops!', err.message, 'error');
    }
  };

  const handleProductUpdate = async (newProduct: Product) => {
    try {
      await updateSingleProduct(newProduct);
      setUpdatingProduct(undefined); // clear the form
      fetchData();
    } catch (err) {
      Swal.fire('Ooops!', err.message, 'error');
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await deleteSingleProduct(id);
      fetchData();
      Swal.fire('Uhul!', 'Product successfully deleted!', 'success');
    } catch (err) {
      Swal.fire('Ooops!', err.message, 'error');
    }
  };

  const handleProductDelete = (product: Product) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#09F',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, delete ${product.name}!`,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(product._id);
      }
    });
  };

  const handleProductDetail = (product: Product) => {
    Swal.fire(
      'Product details',
      `${product.name} costs ${product.price}. There are ${product.stock} available.`,
      'info'
    );
  };

  const handleProductEdit = (product: Product) => {
    setUpdatingProduct(product);
  };
  return (
    <>
      <Table
        headers={headers}
        data={products}
        enableActions
        onDelete={handleProductDelete}
        onDetail={handleProductDetail}
        onEdit={handleProductEdit}
      />

      <ProductForm
        form={updatingProduct}
        onSubmit={handleProductSubmit}
        onUpdate={handleProductUpdate}
      />
    </>
  );
};

export default ProductsCRUD;

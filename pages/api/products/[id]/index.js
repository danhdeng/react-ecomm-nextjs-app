import nc from 'next-connect';
import Product from '../../../../models/Product';
import db from '../../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  res.send(product);
});

handler.put(async (req, res) => {
  await db.connect();
  cosnt product =await Product.findById(req.query.id);
  if(product){
    product.name=req.query.name;
    product.slug=req.query.slug;
    product.price=req.query.price;
    product.category=req.query.category;
    product.image=req.query.image;
    product.featuredImage=req.query.featuredImage;
    product.isFeatured=req.query.isFeatured;
    product.brand=req.query.brand;
    product.countInStock=req.query.countInStock;
    product.description=req.query.description;
    await product.save();
    await db.disconnect();
    res.send({message: 'Product updated Successfully'});
  }
  else{
    await db.disconnect();
    res.status(404).send({ message: 'Product not found'});
  }
});

handler.delete(async (req, res) => {
  await db.connect();
  cosnt product =await Product.findById(req.query.id);
  if(product){
    await product.remove();
    await db.disconnect();
    res.send({message: 'Product deleted Successfully'});
  }
  else{
    await db.disconnect();
    res.status(404).send({ message: 'Product not found'});
  }
});

export default handler;

import nc from 'next-connect';
import User from '../../../../models/User';
import db from '../../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const User = await User.findById(req.query.id);
  res.send(User);
});

handler.put(async (req, res) => {
  await db.connect();
  cosnt User =await User.findById(req.query.id);
  if(User){
    User.name=req.query.name;
    User.slug=req.query.slug;
    User.price=req.query.price;
    User.category=req.query.category;
    User.image=req.query.image;
    User.featuredImage=req.query.featuredImage;
    User.isFeatured=req.query.isFeatured;
    User.brand=req.query.brand;
    User.countInStock=req.query.countInStock;
    User.description=req.query.description;
    await User.save();
    await db.disconnect();
    res.send({message: 'User updated Successfully'});
  }
  else{
    await db.disconnect();
    res.status(404).send({ message: 'User not found'});
  }
});

handler.delete(async (req, res) => {
  await db.connect();
  cosnt User =await User.findById(req.query.id);
  if(User){
    await User.remove();
    await db.disconnect();
    res.send({message: 'User deleted Successfully'});
  }
  else{
    await db.disconnect();
    res.status(404).send({ message: 'User not found'});
  }
});

export default handler;

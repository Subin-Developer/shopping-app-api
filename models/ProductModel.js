import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a product name'],
    },
    price: {
      type: Number,
      required: [true, 'Please enter a product price'],
    },
    image: {
      type: String,
      required: [true, 'Please provide an image URL for the product'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Product', productSchema);

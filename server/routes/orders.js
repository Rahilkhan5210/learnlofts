const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Course = require('../models/Course');
const Certification = require('../models/Certification');
const { auth } = require('../middleware/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

// Create order
router.post('/', auth, async (req, res) => {
  try {
    const { items } = req.body;
    const user = await User.findById(req.user.userId);

    // Calculate total amount
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      let product;
      if (item.type === 'Course') {
        product = await Course.findById(item.id);
      } else {
        product = await Certification.findById(item.id);
      }

      if (!product) {
        return res.status(404).json({ message: `${item.type} not found` });
      }

      totalAmount += product.price;
      orderItems.push({
        item: product._id,
        itemType: item.type,
        price: product.price
      });
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        userId: user._id.toString(),
        orderItems: JSON.stringify(orderItems)
      }
    });

    // Create order in database
    const order = {
      items: orderItems,
      totalAmount,
      status: 'Pending',
      paymentMethod: 'Stripe',
      orderDate: new Date()
    };

    user.orders.push(order);
    await user.save();

    res.json({
      clientSecret: paymentIntent.client_secret,
      order
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
});

// Get user orders
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
});

// Get single order
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns the order
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status (protected, admin only)
router.put('/:id/status', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update order status' });
    }

    order.status = req.body.status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update order status (webhook)
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const userId = paymentIntent.metadata.userId;
    const orderItems = JSON.parse(paymentIntent.metadata.orderItems);

    // Update user's enrolled courses/certifications
    const user = await User.findById(userId);
    for (const item of orderItems) {
      if (item.itemType === 'Course') {
        user.enrolledCourses.push({
          course: item.item,
          enrolledDate: new Date()
        });
      } else {
        user.enrolledCertifications.push({
          certification: item.item,
          enrolledDate: new Date()
        });
      }
    }

    // Update order status
    const order = user.orders.find(o => 
      o.items.every(i => orderItems.some(oi => oi.item === i.item.toString()))
    );
    if (order) {
      order.status = 'Completed';
    }

    await user.save();
  }

  res.json({ received: true });
});

module.exports = router; 
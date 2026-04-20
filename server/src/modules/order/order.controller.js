// src/modules/order/order.controller.js
import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import Order from "./order.model.js";

export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate("user", "name email")
    .sort({ createdAt: -1 });
  
  ApiResponse.success(res, "Orders retrieved successfully", orders);
});

export const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");
  
  if (!order) {
    throw new Error("Order not found");
  }
  
  ApiResponse.success(res, "Order retrieved successfully", order);
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  
  const order = await Order.findById(req.params.id);
  
  if (!order) {
    throw new Error("Order not found");
  }
  
  order.status = status;
  
  if (status === "delivered") {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
  }
  
  const updatedOrder = await order.save();
  
  ApiResponse.success(res, "Order status updated", updatedOrder);
});

export const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  
  if (!order) {
    throw new Error("Order not found");
  }
  
  await order.deleteOne();
  
  ApiResponse.success(res, "Order deleted successfully");
});
import { createOrderService } from "../../services/standard-capture/v2/orders/post.js";

export const createOrderHandler = async (req, _) => createOrderService(req.body);

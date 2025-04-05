import CartRepository from "../repositories/cart.repository.js";

class CartService {
    async findCarts() {
        return await CartRepository.findCarts();
    }

    async findCartById(id) {
        return await CartRepository.findCartById(id);
    }

    async createCart() {
        return await CartRepository.createCart();
    }

    async addProductToCart(cartId, productId, quantity) {
        return await CartRepository.addProductToCart(cartId, productId, quantity);
    }

    async updateCart(cartId, updatedProducts) {
        return await CartRepository.updateCart(cartId, updatedProducts);
    }

    async updateProductQuantity(cartId, productId, newQuantity) {
        return await CartRepository.updateProductQuantity(cartId, productId, newQuantity);
    }

    async clearCart(cartId) {
        return await CartRepository.clearCart(cartId);
    }

    async deleteProductFromCart(cartId, productId) {
        return await CartRepository.deleteProductFromCart(cartId, productId);
    }
}

export default new CartService;
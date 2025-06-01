import { useCallback } from "react"
import { useCartStore } from "../store/use-cart-store"
import { useShallow } from "zustand/react/shallow"

export const useCart = (tenantSlug: string) => {

    const addProduct = useCartStore((state) => state.addProduct)
    const removeProduct = useCartStore((state) => state.removeProduct)
    const clearCart = useCartStore((state) => state.clearCart)
    const clearAllCarts = useCartStore((state) => state.clearAllCarts)

    const productIds = useCartStore(useShallow((state) => state.tenantCarts[tenantSlug]?.productIds || []))

    const toggleProducts = useCallback((productId: string) => {

        if (productIds.includes(productId)) {
            removeProduct(tenantSlug, productId)
        } else {
            addProduct(tenantSlug, productId)
        }

    }, [addProduct, removeProduct, productIds, tenantSlug]
    )

    const isProductInCart = useCallback((productId: string) => {
        return productIds.includes(productId)
    },
        [productIds]
    )

    const clearTenantCart = useCallback(() => {
        clearCart(tenantSlug)
    },
        [tenantSlug, clearCart]
    )

    const handleAddProducts = useCallback((productIds: string) => {
        addProduct(tenantSlug, productIds)
    },
        [addProduct, tenantSlug]
    )

    const handleRemoveProducts = useCallback((productIds: string) => {
        removeProduct(tenantSlug, productIds)
    },
        [removeProduct, tenantSlug]
    )

    return {
        productIds,
        addProduct: handleAddProducts,
        removeProduct: handleRemoveProducts,
        clearCart: clearTenantCart,
        clearAllCarts,
        toggleProducts,
        isProductInCart,
        totalItems: productIds.length
    }

}
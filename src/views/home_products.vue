<template>
    <div class="container">

        <div class="row mt-4">
            <div class="col-md-4 mb-3">
                <label for="category" class="form-label">Category</label>
                <select class="form-select custom-select" v-model="selectedCategoryId" @change="filterProductsByCategory">
                    <option value="">Select category</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                        {{ category.name }}
                    </option>
                </select>
            </div>

            <div class="col-md-8">
                <div class="row">
                    <div v-if="!filteredProducts.length" v-for="index in 12" :key="index" class="col-md-4 mb-4">
                        <div class="card h-100 skeleton-loader">
                            <div class="skeleton-loader-image"></div>
                            <div class="card-body">
                                <div class="skeleton-loader-title"></div>
                                <div class="skeleton-loader-category"></div>
                                <div class="skeleton-loader-price"></div>
                            </div>
                            <div class="card-footer">
                                <div class="skeleton-loader-add-to-cart"></div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4 mb-4" v-for="(product, index) in filteredProducts" :key="index">
                        <div class="card h-100"
                            style="background-color: #f7f7f7; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                            <img :src="product.image" class="card-img-top card-hover" alt="Product Image"
                                style="height: 200px; object-fit: cover; width: 100%; transition: transform 0.3s ease;">
                            <div class="card-body">
                                <h4 class="card-title">{{ product.title }}</h4>
                                <p class="card-text "><strong class="text-primary">Category:</strong> {{ product.category }}
                                </p>
                                <p class="card-text "><strong class="card-text text-success ">Price (USD):</strong> {{
                                    formatCurrency(product.price, 'USD') }}</p>
                            </div>
                            <div class="card-footer">
                                <button class="btn btn-success btn-block"
                                    @click="cart_store.add_cart(product.id, product.price)">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";

//currencyTHB
import { formatCurrency } from "../currency/currency";

//useProductStore
import { useProductStore } from "../store/product";
const product_store = useProductStore();

const list = computed(() => product_store.list_products);

//useCartStore
import { useCartStore } from "../store/cart";
const cart_store = useCartStore();

const selectedCategoryId = ref("");
const categories = computed(() => {
    const uniqueCategories = new Set(list.value.map((product) => product.category));
    return Array.from(uniqueCategories).map((category) => ({
        id: category,
        name: category,
    }));
});

const filteredProducts = computed(() => {
    if (selectedCategoryId.value === "") {
        return list.value;
    } else {
        return list.value.filter((product) => product.category === selectedCategoryId.value);
    }
});

</script>
<style  scoped>
/* Center the product cards */
.container {
    margin-top: 20px;
}

.card {
    border: 1px solid #ddd;
    border-radius: 5px;
    transition: box-shadow 0.3s;
}

.card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-img-top {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.btn {
    font-size: 16px;
    font-weight: bold;
}

/* Custom styles for the select dropdown */
.form-select {
    padding: 10px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    width: 100%;
    font-size: 16px;
    background-color: #fff;
    cursor: pointer;
}

/* Styling for the dropdown arrow */
.form-select:after {
    content: '\f078';
    /* Unicode for FontAwesome down-arrow icon */
    font-family: 'Font Awesome 5 Free';
    /* Make sure you have Font Awesome installed */
    font-weight: 900;
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    pointer-events: none;
}

/* Styling for option hover effect */
.form-select option:hover {
    background-color: #f0f0f0;
}

/* Styling for selected option */
.form-select option:checked {
    font-weight: bold;
}

.skeleton-loader {
    background-color: #f5f5f5;
    animation: shimmer 5s infinite;
}

.skeleton-loader-image {
    height: 200px;
}

.skeleton-loader-title,
.skeleton-loader-category,
.skeleton-loader-price,
.skeleton-loader-add-to-cart {
    height: 20px;
}

@keyframes shimmer {
    0% {
        background-position: -200px 0;
    }

    100% {
        background-position: 200px 0;
    }
}

.card-hover:hover {
    transform: scale(1.2);
}
</style>

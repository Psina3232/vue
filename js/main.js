Vue.component('product-details',{
    props: {
        details: {
          type: Array,
          required: true
}
    },
    template:`
    <ul>
   <li v-for="detail in details">{{ detail }}</li>
</ul>
`
}),
    
Vue.component('product', {
    props: {
      premium: {
        type: Boolean,
        required: true
      }
    },
    template: `
    <div class="product">

            <div class="product-image">
                <img :src="image" :alt="altText" />
            </div>
     
            <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="inStock">In stock</p>
            <p v-else>Out of Stock</p>
            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>
           <p>Shipping: {{ shipping }}</p>
            <div
                    class="color-box"
                    v-for="(variant, index) in variants"
                    :key="variant.variantId"
                    :style="{ backgroundColor:variant.variantColor }"
                    @mouseover="updateProduct(index)"
            ></div>
 

                 <ul>
                    <li v-for="size in sizes">{{size}}</li>
                 </ul>
                 <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Add to cart</button>
                 <button v-on:click="removeFromCart">Remove from cart</button>
                 
                 
               
               
                 
            </div>
     
            <a :href="link">More products like this.</a>
        </div>
  `,
  data() {
    return {
        product: "Socks",
        brand: 'Vue Mastery',
        link:"https://www.amazon.com/s?k=socks&ref=nb_sb_noss",
        selectedVariant: 0,
        altText: "A pair of socks",
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: "./assets/vmSocks-green-onWhite.jpg",
                variantQuantity: 10
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                variantQuantity: 0
            }
        ],
        cart: 0
    }
},

methods: {
    addToCart: function() {
        this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
    },
    updateProduct: function(index) {  
        this.selectedVariant = index
    },
    removeFromCart: function() {
         this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
    }
  },
  computed: {
      title() {
          return this.brand + ' ' + this.product  
      },
      image(){
          return this.variants[this.selectedVariant].variantImage
      },
      inStock(){
          return this.variants[this.selectedVariant].variantQuantity
      },
      shipping() {
        if (this.premium) {
          return "Free"
        }
          return 2.99
      }
  }
})

var app = new Vue({
  el: '#app',
  data: {
    premium: true,
    cart: []
  },
  methods: {
    updateCart(id) {
      this.cart.push(id)
    },
    removeItem(id) {
      for(var i = this.cart.length - 1; i >= 0; i--) {
        if (this.cart[i] === id) {
           this.cart.splice(i, 1);
        }
      }
    }
  }
})
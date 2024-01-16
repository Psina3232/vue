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

                <p v-if="inventory > 10">In stock</p>
                <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
                <p v-else :class="{ outOfStock: !inStock }">Out of stock</p>
                <p>{{sale}}</p>
                
                <span v-if="onSale">On Sale!</span>

                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                 </ul>
                 <p>Shipping: {{ shipping }}</p>

                 <div class="color-box"
                 v-for="(variant, index) in variants"
                 :key="variant.variantId"
                 :style="{ backgroundColor:variant.variantColor }"
                 @mouseover="updateProduct(index)"
          >
          </div>

                 <ul>
                    <li v-for="size in sizes">{{size}}</li>
                 </ul>
                 <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Add to cart</button>
                 <button v-on:click="deleteToCart">Delete to cart</button>
                 <div class="cart">
                    <p>Cart({{ cart }})</p>
                 </div>
                 
               
               
                 
            </div>
     
            <a :href="link">More products like this.</a>
        </div>
  `,
    data() {
        return {
            product: "Socks",
            brand: "Vue Mastery",
            selectedVariant: 0,
            image: "./assets/vmSocks-blue-onWhite.jpg",
            altText: "A pair of socks",
            link:"https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
            inStock: true,
            inventory: 100,
            onSale: true,
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
             
             
             sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
             cart: 0
        }
    },
    methods: {
        addToCart() {
            this.cart += 1
        },deleteToCart() {
            this.cart -= 1
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
         }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
         },
         inStock(){
            return this.variants[this.selectedVariant].variantQuantity
         },
         shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
         },
         sale(){
            if (this.onSale){
            return this.brand + '' + this.product + 'are on sale!'
            }
            return this.brand + '' + rhis.product + 'are not on sale'
         }
    }
 })
 

 let app = new Vue({
    el: '#app',
    data: {
        premium: true
    }
 })
 
 
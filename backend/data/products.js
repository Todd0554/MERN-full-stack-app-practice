const products = [
    {
      name: 'iphone 12 mini 64G',
      image: '/images/iphone-12mini.jpg',
      description:
        'The ‌iPhone 12‌ and ‌iPhone 12 mini‌ share virtually all of the same key features. Both phones have the same OLED Super Retina XDR display technology, A14 Bionic processor, 5G connectivity, dual and 12MP Ultra Wide and Wide cameras, and are available in the same colors.',
      brand: 'Apple',
      category: 'electronic product',
      price: 5499,
      countInStock: 7,
      rating: 4.0,
      numReviews: 5,
    },
    {
      name: 'iphone 12  128G',
      image: '/images/iphone-12.jpg',
      description:
        'The iPhone 12 features a 6.1-inch (15 cm) display with Super Retina XDR OLED technology at a resolution of 2532 × 1170 pixels and a pixel density of about 460 ppi. The iPhone 12 Mini features a 5.4-inch (14 cm) display with the same technology at a resolution of 2340 × 1080 pixels and a pixel density of about 476 ppi.',
      brand: 'Apple',
      category: 'electronic product',
      price: 6799,
      countInStock: 7,
      rating: 4.0,
      numReviews: 5,
    },
    {
      name: 'iphone 12 Pro 128G',
      image: '/images/iphone-12pro.jpg',
      description:
        "The iPhone 12 Pro is the smaller of two pro-level phones in Apple's 2020 iPhone lineup. It has a glass and stainless-steel design with flat edges. The three-camera system and LiDAR sets this model apart from the standard edition.",
      brand: 'Apple',
      category: 'electronic product',
      price: 8499,
      countInStock: 10,
      rating: 4.5,
      numReviews: 8,
    },
    {
      name: 'iphone 12 Pro Max 128G',
      image: '/images/iphone-12-pro-max.jpg',
      description:
        "The iPhone 12 Pro Max is the larger of two pro-level phones in Apple's 2020 iPhone lineup. It has a glass and stainless-steel design with flat edges. The camera system is best-in-class with better stabilization and larger sensors.",
      brand: 'Apple',
      category: 'electronic product',
      price: 9299,
      countInStock: 7,
      rating: 4.0,
      numReviews: 5,
    },
    {
      name: 'Huawei Mate 40 Pro',
      image: '/images/huawei-mate-40-pro.jpg',
      description:
        "Huawei Mate 40 , Huawei Mate 40 Pro , Huawei Mate 40 Pro Plus and Huawei Mate 40 RS Porsche Design is an high-end Android and HarmonyOS based phablets developed by Huawei for its Mate series, succeeding the Huawei Mate 30 range.[6] They were released on October 22, 2020 at Huawei's Online Global Launch Event.",
      brand: 'Huawei',
      category: 'electronic product',
      price: 9500,
      countInStock: 5,
      rating: 4.6,
      numReviews: 10,
    },
    {
      name: 'Huawei P40 Pro',
      image: '/images/huawei-p40-pro.jpg',
      description:
        "Huawei P40 is a line of high-end Android-based smartphones manufactured by Huawei. Unveiled on 26 March 2020, they succeed the Huawei P30 in the company's P series line.",
      brand: 'Huawei',
      category: 'electronic product',
      price: 5988,
      countInStock: 11,
      rating: 4,
      numReviews: 7,
    },
    {
      name: 'OnePlus 8T',
      image: '/images/one-plus-8t.jpg',
      description:
        "The OnePlus 8T has four rear cameras. It features a primary 48MP sensor, a 16MP wide-angle lens, a 5MP macro camera, and a 2MP monochrome sensor. Around the front, the selfie snapper comes in at 16MP. The camera system is sound, but it's far from great.",
      brand: 'samsung',
      category: 'electronic product',
      price: 3399,
      countInStock: 7,
      rating: 3.8,
      numReviews: 10,
    },
    {
      name: 'Xiaomi 10',
      image: '/images/xiaomi-10.jpg',
      description:
        "The phone comes with a 6.67-inch touchscreen display offering a resolution of 1080x2340 pixels. The display sports Gorilla Glass for protection. Xiaomi Mi 10 Pro is powered by a 2.84GHz octa-core Qualcomm Snapdragon 865 processor. It comes with 12GB of RAM.",
      brand: 'Xiaomi',
      category: 'electronic product',
      price: 5299,
      countInStock: 0,
      rating: 4.3,
      numReviews: 12,
    },
    {
      name: 'vivo NEX 3S',
      image: '/images/vivo-nex-3s.jpg',
      description:
        "vivo NEX 3S 5G is released in March 2020 and the device is equipped with a super big screen that sizes 6.89 inches along with Super AMOLED capacitive touchscreen. While it provides a resolution of 1080 x 2256 pixels, the PPI is 363 with HDR10+.",
      brand: 'vivo',
      category: 'electronic product',
      price: 4998,
      countInStock: 7,
      rating: 3.8,
      numReviews: 9,
    },
    {
      name: 'OPPO Find X2 ',
      image: '/images/oppo-find-x2.jpg',
      description:
        "120Hz QHD+ Ultra Vision Screen. True Billion Colour Display. O1 Ultra Vision Engine. Ultra Vision Camera System. 65W SuperVOOC 2.0 Flash Charge. Snapdragon™ 865+5G",
      brand: 'oppo',
      category: 'electronic product',
      price: 5499,
      countInStock: 15,
      rating: 3.6,
      numReviews: 5,
    },
  ]
  
  module.exports = products
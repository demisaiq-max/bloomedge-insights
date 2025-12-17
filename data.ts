import { Product } from './types';

export const products: Product[] = [
  {
    id: 1,
    name: "Organic Whole Grain Rolled Oats",
    category: "Organic",
    price: 12.50,
    originalPrice: 15.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVPwEz9HIpXlLgrD70yLDfiTvQdCwdUSC29oRtLzeo9mxnPoiaJVzRIw2Yenmax8_dD0T0cC27WMD5s9C76l9R5BDH5XJLU8uH5oA4J7BNPTNNJtGRL8P5s_Xx8uPJy0J3PD6dx2V0velo-snwwz_jSlnqdXqynL2lSzit3_assyLYpZjmICV-jOKDpv2Bq1WgekX5Yuvx82t4fUGWTviNfLfR8Y45AS8Uye3BNyJ1cKaD-jyrJ1kuNC-y6jgH_9fLwLf26Goj3Ihb",
    rating: 4.5,
    reviews: 128,
    isOrganic: true
  },
  {
    id: 2,
    name: "Organic Fresh Milk",
    category: "Dairy",
    price: 3.50,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBu0TRxCLyRubCPO5KB3Ob6aelrHbdPr7OTdekJ4SmKoPcLvmHu-U09bnxEUmoFTxoG0X3EGCn90nIKCPJ35sidNBW49FdBbim3EisVqQquU2FoF7clorXusyt-zb5lYV8ZgcUsWs1NA460wM6MQVHhN05x_V2IKTUltfbN1Bm8PdgWhQV7U-UD6j9x75-goOS4oe8aXecWIHnykUMwRt3kakkanNa8yh-wH_y0q79VElSW6GLMNAeidZ_DD_d83G96qxHn1L1r_AR3"
  },
  {
    id: 3,
    name: "Strawberry Yogurt",
    category: "Dairy",
    price: 1.25,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5amjCp3STLegR0dXQ1Rx97pN7S9ZEZEz8gO_92CrLOHLmVcxAtLGzjvePq5XdEtUr5dXRVWmc7XGe-C7bO_NkScy86DzT0FPwVjwol3B5poMOe98whwinSmF6dWtbLwg1dWM08PZw281y3i9TADAvUEJVguQaMtly4VkJowPwonv1mTXABn4IYO7SBhgZTf_SxGQ-fFVRch3zYFW4waAz0h2U3lJVZgK3QyMdQg-lWMnU7t7ru51cnf4t8vmqCJIoJZPr6cYvwN_R"
  },
  {
    id: 4,
    name: "Baby Asparagus Fresh 125 GM",
    category: "Vegetables",
    price: 1650,
    originalPrice: 1800,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWjvGMK4ZgxKBbywxnLx6AgFegs6NK0NRdz1qbfswsYkZG6qfYL6k_xkmuhuvr9OQ60FbFZyT8j-J0hsAJaTl8yoKFembW0LwhzT0Z-rpJQe0jdoUyC6UInEm2TUd4IMA34Rdcbc2B6ilDXLo8O42iT2I8K8Ab-gjHfLyhiKJwjacGIQC49wWlsTMKsifUsuVAi5LyRVqfUHde4HwciZp0YWVTZWqouppC1Vdq9twvvexKnRBMsw52czc5wZM31wzVk4YZsrgUV5nh"
  },
  {
    id: 5,
    name: "Baby Carrot",
    category: "Vegetables",
    price: 1550,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYKSVcf1a-LOaERldnZRL6k0AmLt3WYRC5UcLpXd9sV4N7YK1jHZXBDM9RX3eK5l-5lywdETW8DNRxlk_bUgN1OinGFntKJIDaWy3F_o3lz3eWZ0olhkbQ53Le987cWtDm4JuzLeeYUdEDC_jH1wQG4QExYvY-Dc1SymJTAiuoKn2-z8wN0Y-tsZx_RRjInRO9jUnvBVHRNchhEA69oohFcmDMvaOCDKn3N6lA51goMkrzOGH08VzSJWhwbXl5j_3A7G0S3A_Ww-0G"
  },
  {
    id: 6,
    name: "Baby Paksoy 200GM",
    category: "Vegetables",
    price: 2200,
    lowStock: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiYQRxrq57qZ2umiDathcdQFXVb8rEjwJx6mE8jqUP-atyRBVLu2kyMs_YCYEaXjnZk3gvQWvTANDUidCSudWqZ0z37uO22w2JnwXP2UMcEbl_2jXF5xzOVblN7iLIAdy-1dT6XWFKwlTN6Yfzd5XsNsRd7JouH18-G78BmWthVSz_5-fFNt8CLk9iuFByV0XF0iyMLM_Vd3NLOCL57CG51P-sBMpuslofIb2U7QlLUS6bTqnOLhNLm6LHUZ-JKO-aZ9yhQf3DFn94"
  },
  {
    id: 7,
    name: "Greek Style Yogurt",
    category: "Yogurt",
    price: 1.50,
    isNew: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeVxqtQD95iX1beVUWX8Z7lRcTAivwZlB62o7jKZUK4rjB-Qk0qOFnuY4XDFil6KAlxgfj5NRaf9_Wd2Z4ZDwj-uttR82JGq3ibo_OVl0Q0n9wDgwQX9Xpt4sjXlvofkKy3sj_LGgunP3KdBmogNxNm8LKvqrV_-1XqNGdLy3u1_GZ29RhMd1M6oMHf5IhStCCOlEaRlHWFXW2i3dnzVgit3XDvjggOUjRw__tdzVU_CaCh9ka5xiXwF3SKU6VuH7694Fo8RYueixL"
  },
  {
    id: 8,
    name: "Premium Couscous",
    category: "Pantry",
    price: 2.99,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmFkigmDdkuWRopRT89GVZDZ1pY-eDQbm_GFIckf9xh-GNr8qoQNy4BAyymPBnf0wCJnYA8VGum-RLYcn20LX6y9-O9W-U2GH6D7FAHRWMLR7vnRDrs9P-UjU5rcpkwdRpE26XPoo8LCKLHkS_wyRWBfYl-PsCyDZ3TyirAA5VQjDCmQjvvCk1bIXTNwMBFeT0R90GPLN0S3-wIXimayvVf6n94zfTO5nSUjKfwUOvHASCDE0QVmFI0A2wN04-NlHSDXN0vIRQELpJ"
  }
];
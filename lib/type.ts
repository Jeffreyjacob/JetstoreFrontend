

export type SignUpInputType = {
    email: string,
    password: string,
    fullName: string,
    role: string
}

export type LoginInputType = {
    email: string,
    password: string
}

export type ResetPasswordType = {
    password: string,
    resetToken: string
}

export type AddressType = {
    id: number
    lineOne: string
    lineTwo: string
    city: string
    country: string
    userId: string
    createdAt: string
    updatedAt: string
}

export type UserType = {
    id: number,
    fullname: string,
    email: string,
    role: string,
    profilePicture: string,
    resetToken: string,
    createdAt: string,
    updatedAt: string,
    address: AddressType[]
    store: StoreType[]
    cart:CartItemType[]
}

export type StoreType = {
    id: number
    storeName: string
    storeDescription: string
    storeImage: string
    storeOwnerId: string
    storeOwner: UserType
    //    product:Product[]
}

export type ReviewType = {
    createdAt: string
    id: number
    productId: number
    reviewText: string
    updatedAt: string
    user: UserType
    userId: number
}


export type ProductType = {
    id: number
    name: string
    description: string
    category: string
    color: string[]
    images: string[]
    price: string
    quantityAvaliable: number
    size: string[]
    storeId: number
    userId: number
    reviews: ReviewType[]
}


export type ProductByUser = {
    currentpage: number
    product: ProductType[]
    totalPage: number | undefined
    totalProduct: number | undefined
}

export type CartItemType = {
    createdAt: string
    id: number
    product: ProductType
    productId: number
    quantity: number
    selectedColor: string
    selectedSize: string
    userId: number
}




"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { API_BASE_URL } from "./AuthApi"
import { toast } from "sonner"
import { SearchTermType } from "@/app/(authUser)/sellerdashboard/(tabs)/ProductTab"
import { ProductByUser, ProductType, ReviewType } from "@/lib/type"


type SearchInput = {
    searchTerm: string,
    page: string
}

type SearchResponse = {
    product:ProductType[],
    currentPage:number,
    totalProduct:number,
    totalPage:number
}


export const useCreateProduct = () => {
    const token = localStorage.getItem('token')
    const queryClient = useQueryClient()
    const CreateProduct = async (productInput: FormData) => {
        const res = await fetch(`${API_BASE_URL}/api/product/createProduct`, {
            method: "POST",
            credentials: "include",
            body: productInput,
            headers:{
                 "Authorization": `Bearer ${token}`
            }
        })

        const data = await res.json()
        if (!res.ok) {
            console.log(data)
            throw new Error(data.error.map((error: any) => error.path + error.error))
        }
        return data
    }

    const { mutateAsync: createProduct, isPending } = useMutation({
        mutationFn: CreateProduct,
        onSuccess: () => {
            toast.success("Product created!")
            queryClient.invalidateQueries({ queryKey: ["getProductbyUser"] })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    return { createProduct, isPending }
}


export const useGetProductByUserId = (searchTerm: SearchTermType) => {
    const token = localStorage.getItem('token')
    const params = new URLSearchParams();
    params.set("search", searchTerm.search)
    params.set("page", searchTerm.page.toString())
    const GetProductByUser = async (): Promise<ProductByUser> => {
        const res = await fetch(`${API_BASE_URL}/api/product/getProductbyUserId?${params.toString()}`, {
            method: "GET",
            credentials: "include",
            headers:{
                 "Authorization": `Bearer ${token}`
            }
        })

        const data = await res.json()
        if (!res.ok) {
            throw new Error(data.message)
        }
        return data
    }

    const { data: getProductByuser, isLoading } = useQuery({
        queryKey: ["getProductbyUser", searchTerm.search, searchTerm.page],
        queryFn: GetProductByUser,
        enabled: !!searchTerm
    })

    return { getProductByuser, isLoading }
}

export const useDeleteProduct = () => {
    const token = localStorage.getItem('token')
    const queryClient = useQueryClient()
    const DeleteProduct = async (id: string) => {
        const res = await fetch(`${API_BASE_URL}/api/product/deleteProduct/${id}`, {
            method: "DELETE",
            credentials: "include",
            headers:{
                 "Authorization": `Bearer ${token}`
            }
        })

        const data = await res.json()
        if (!res.ok) {
            throw new Error(data.message)
        }
        return data
    }

    const { mutateAsync: deleteProduct, isPending } = useMutation({
        mutationFn: DeleteProduct,
        onSuccess: () => {
            toast.success("Product deleted")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    return { deleteProduct, isPending }
}


export const useGetAllProduct = () => {
    const GetAllProduct = async (): Promise<{ product: ProductType[] }> => {
        const res = await fetch(`${API_BASE_URL}/api/product/getAllProduct`, {
            method: "GET",
            credentials: "include",
        });

        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message);
        }
        return data;
    };

    const { data: getAllProducts, isLoading: fetchingProduct } = useQuery({
        queryKey: ["getAllProduct"],
        queryFn: GetAllProduct,
    });
    return { getAllProducts, fetchingProduct };
};

export const useGetProductById = (id: string) => {
    const GetProductById = async (): Promise<{ product: ProductType }> => {
        const res = await fetch(`${API_BASE_URL}/api/product/getProductbyId/${id}`, {
            method: "GET",
            credentials: "include"
        })
        const data = await res.json()
        if (!res.ok) {
            throw new Error(data.message)
        }
        return data
    }

    const { data: getProductById, isLoading } = useQuery({
        queryKey: ["getProductById"],
        queryFn: GetProductById
    })

    return { getProductById, isLoading }
}

export const useGetProductReview = ({ id, sortBy }: { id: string, sortBy: string }) => {
    const token = localStorage.getItem('token')
    const params = new URLSearchParams()
    params.set("sortBy", sortBy)
    const GetProductReview = async (): Promise<{ review: ReviewType[] }> => {
        const res = await fetch(`${API_BASE_URL}/api/product/getProductReview/${id}?${params.toString()}`, {
            method: "GET",
            credentials: "include",
            headers:{
                 "Authorization": `Bearer ${token}`
            }
        })

        const data = await res.json()
        if (!res.ok) {
            throw new Error(data.message)
        }
        return data
    }

    const { data: getProductReview, isLoading: reviewLoading } = useQuery({
        queryKey: ["getProductReview", sortBy],
        queryFn: GetProductReview
    })

    return { getProductReview, reviewLoading }
}

export const useAddReview = (id: string) => {
    const token = localStorage.getItem('token')
    const queryClient = useQueryClient()
    const AddReview = async ({ reviewText }: { reviewText: string }) => {
        const res = await fetch(`${API_BASE_URL}/api/product/addReview/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                 "Authorization": `Bearer ${token}`
            },
            credentials: "include",
            body: JSON.stringify({ reviewText })
        })

        const data = await res.json()
        if (!res.ok) {
            throw new Error(data.message)
        }
        return data
    }

    const { mutateAsync: addReview, isPending } = useMutation({
        mutationFn: AddReview,
        onSuccess: () => {
            toast.success("Review Added")
            queryClient.invalidateQueries({ queryKey: ["getProductReview"] })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    return { addReview, isPending }
}

export const useDeleteProductReview = () => {
    const token = localStorage.getItem('token')
    const queryClient = useQueryClient()
    const DeleteProductReview = async (id: string) => {
        const res = await fetch(`${API_BASE_URL}/api/product/removeReview/${id}`, {
            method: "DELETE",
            credentials: "include",
            headers:{
                 "Authorization": `Bearer ${token}`
            }
        })

        const data = await res.json()
        if (!res.ok) {
            throw new Error(data.message)
        }
        return data
    }

    const { mutateAsync: deleteProductReview, isPending } = useMutation({
        mutationFn: DeleteProductReview,
        onSuccess: () => {
            toast.success("Review Removed")
            queryClient.invalidateQueries({ queryKey: ["getProductReview"] })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    return { deleteProductReview, isPending }
}


export const useRelatedProduct = (id: string) => {
    const RelatedProduct = async (): Promise<{ productByCategory: ProductType[] }> => {
        const res = await fetch(`${API_BASE_URL}/api/product/relatedProduct/${id}`, {
            method: "GET",
            credentials: "include"
        })

        const data = await res.json()
        if (!res.ok) {
            throw new Error(data.message)
        }
        return data
    }

    const { data: relatedProduct, isLoading } = useQuery({
        queryKey: ["getRelatedProduct"],
        queryFn: RelatedProduct
    })

    return { relatedProduct, isLoading }
}

export const useSearchProduct = (searchInput: SearchInput) => {
    const params = new URLSearchParams()
    params.set("search", searchInput.searchTerm)
    params.set("page", searchInput.page)
    const SearchProduct = async (): Promise<SearchResponse> => {
        const res = await fetch(`${API_BASE_URL}/api/product/searchProduct?${params.toString()}`, {
            method: "GET",
            credentials: "include"
        })

        const data = await res.json()
        if (!res.ok) {
            throw new Error(data.message)
        }
        return data
    }

    const { data: searchProduct, isLoading } = useQuery({
        queryKey: ["getSearchProduct", searchInput],
        queryFn: SearchProduct
    })

    return { searchProduct, isLoading }
}
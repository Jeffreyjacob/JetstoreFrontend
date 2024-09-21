import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import React from 'react'

type Props = {
    onPageChange: (page: number) => void
    page: number
    pages: number
}

const PaginationSelector = ({ onPageChange, page, pages }: Props) => {
    const pageNumber = []

    for (let i = 1; i <= pages; i++) {
        pageNumber.push(i)
    }
    return (
        <Pagination>
            <PaginationContent>
                {
                    page !== 1 && <PaginationItem>
                        <PaginationPrevious href="#" onClick={() => onPageChange(page - 1)} />
                    </PaginationItem>
                }
                {
                    pageNumber.map((pages,index) => (
                        <PaginationItem key={index}>
                            <PaginationLink href="#" isActive={pages === page}>
                                {pages}
                            </PaginationLink>
                        </PaginationItem>
                    ))
                }

                {
                    page !== pageNumber.length && <PaginationItem>
                        <PaginationNext href="#" onClick={() => onPageChange(page + 1)} />
                    </PaginationItem>

                }
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationSelector
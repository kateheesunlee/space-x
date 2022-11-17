import { useEffect, useCallback, useState, useRef } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Drawer from '@mui/material/Drawer'
import ItemCard from './ItemCard'
import ItemDetails from './ItemDetails'
import { Launch } from '../types'

type Props = {
    items: Partial<Launch>[]
    loadMore: () => void
}

export default function ItemList({ items, loadMore }: Props) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [selectedId, setSelectedId] = useState<string | undefined | null>()
    const containerRef = useRef(null)
    const loadMoreRef = useRef(null)

    const toggleDrawer = (id?: string | null) => {
        setSelectedId(id)
        setIsDrawerOpen(!isDrawerOpen)
    }

    const handleLoadMore = (entries: any) => {
        const target = entries[0]
        if (target.isIntersecting) {
            loadMore()
        }
    }
    const goPrev = () => {
        const currentIndex = items.findIndex((item) => item.id === selectedId)
        const prevItem = items[currentIndex - 1]
        setSelectedId(prevItem.id)
    }

    const goNext = () => {
        const currentIndex = items.findIndex((item) => item.id === selectedId)
        const nextItem = items[currentIndex + 1]
        setSelectedId(nextItem.id)
    }

    // loadmore observer
    useEffect(() => {
        const option = {
            root: containerRef.current,
            rootMargin: '0px',
            threshold: 0.2,
        }
        const observer = new IntersectionObserver(handleLoadMore, option)
        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current)
        }

        // cancel observation
        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current)
            }
        }
    }, [loadMoreRef, handleLoadMore])

    return (
        <Box sx={{ flex: 1, overflowY: 'auto' }} padding={2} ref={containerRef}>
            <Grid container spacing={2}>
                {items.map((item: Launch, index: number) => {
                    // TODO: need to find if there is more items or not (total), and show loading only when there is more items
                    return index === items.length - 1 ? (
                        <Grid item xs={12} key={item.id} ref={loadMoreRef}>
                            Loading...
                        </Grid>
                    ) : (
                        <Grid item xs={12} key={item.id}>
                            <ItemCard
                                item={item}
                                selectCard={toggleDrawer}
                                selectedId={selectedId}
                            />
                        </Grid>
                    )
                })}
            </Grid>
            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={() => toggleDrawer()}
            >
                {selectedId ? (
                    <ItemDetails
                        id={selectedId}
                        goPrev={goPrev}
                        goNext={goNext}
                    />
                ) : null}
            </Drawer>
        </Box>
    )
}

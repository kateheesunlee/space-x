import { useRef } from 'react'
import moment from 'moment'

import ItemRow from './ItemRow'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { blue } from '@mui/material/colors'
import { Launch } from '../types'

type Props = {
    item: Partial<Launch>
    selectCard: (id?: string | null) => void
    selectedId?: string | null
}

const ItemCard = ({ item, selectCard, selectedId }: Props) => {
    const selected = item.id === selectedId
    let mappedItem = useRef([])

    const style = {
        ...(selected ? { backgroundColor: blue[200] } : null),
        '&:hover': {
            backgroundColor: blue[100],
        },
    }

    return (
        <Card variant="outlined" onClick={() => selectCard(item.id)}>
            <CardContent sx={style}>
                <ItemRow label="Mission Name" value={item.mission_name} />
                <ItemRow
                    label="Launch Date"
                    value={moment(item.launch_date_local).format(
                        'MMMM Do YYYY, h:mm a'
                    )}
                />
                <ItemRow
                    label="Launch Site"
                    value={item.launch_site?.site_name}
                />
                <ItemRow
                    label="Launch Success"
                    value={item.launch_success ? '🚀' : '❌'}
                />
            </CardContent>
        </Card>
    )
}

export default ItemCard

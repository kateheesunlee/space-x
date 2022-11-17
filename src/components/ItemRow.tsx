import React from 'react'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

import { grey } from '@mui/material/colors'

type Props = {
    label: string
    value?: string | null
    stack?: boolean
    type?: 'image' | 'link' | 'video'
}

const TypeComponent = ({ type, value }: Partial<Props>) => {
    const mediaStyles: React.CSSProperties = {
        width: '50%',
        alignSelf: 'center',
    }

    if (!value) return null

    switch (type) {
        case 'image':
            return <img src={value} alt="launch image" style={mediaStyles} />
        case 'link':
        case 'video':
            return <Link href={value}>{value}</Link>
        default:
            return <Typography>{value}</Typography>
    }
}

export default function ItemRow({ label, value, stack, type }: Props) {
    const boxStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: stack ? 'column' : 'row',
        alignItems: stack ? 'flex-start' : 'center',
        marginBottom: stack ? '1rem' : '.25rem',
    }

    const labelStyles: React.CSSProperties = {
        color: grey[700],
        fontWeight: '600',
        flexBasis: stack ? 'unset' : 200,
    }
    if (!value) return null

    return (
        <div style={boxStyle}>
            <Typography variant="subtitle1" sx={labelStyles}>
                {label}:
            </Typography>
            <TypeComponent type={type} value={value} />
        </div>
    )
}

import useLaunchById from '../hooks/useLaunchedById'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ItemRow from './ItemRow'

type Props = {
    id: string
    goPrev?: () => void
    goNext?: () => void
}

const ItemDetails = ({ id, goPrev, goNext }: Props) => {
    const { loading, error, data } = useLaunchById({ id: id })
    const launch = data?.launch

    const footerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }

    return (
        <Box sx={{ width: 600 }} padding={2}>
            {loading ? <div>Loading...</div> : ''}
            {error ? <div>Error: {error.message}</div> : ''}
            {launch ? (
                <>
                    <Typography variant="h4">{launch.mission_name}</Typography>
                    <>
                        <ItemRow
                            stack
                            label="Launch Dates"
                            value={launch.launch_date_local}
                        />
                        <ItemRow
                            stack
                            label="Launch Site"
                            value={launch.launch_site.site_name}
                        />
                        <ItemRow
                            stack
                            label="Launch Success"
                            value={launch.launch_success ? '🚀' : '❌'}
                        />
                        <ItemRow stack label="Details" value={launch.details} />
                        <ItemRow
                            stack
                            label="Article"
                            value={launch.links.article_link}
                            type="link"
                        />
                        <ItemRow
                            stack
                            label="Image"
                            value={launch.links.mission_patch_small}
                            type="image"
                        />
                        <ItemRow
                            stack
                            label="Video"
                            value={launch.links.video_link}
                            type="video"
                        />
                    </>
                    <div style={footerStyle}>
                        <Button variant="text" onClick={goPrev}>
                            Prev
                        </Button>
                        <Button variant="text" onClick={goNext}>
                            Next
                        </Button>
                    </div>
                </>
            ) : (
                ''
            )}
        </Box>
    )
}

export default ItemDetails

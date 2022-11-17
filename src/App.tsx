import { useCallback } from 'react'
// TODO: update the Launch Type from the query not from the generated type from the endpoint
import './App.css'
import usePastLaunched from './hooks/usePastLaunched'
import ItemList from './components/ItemList'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { createTheme, ThemeProvider } from '@mui/material/styles'

// Tasks
// ✅ render 20 items
// ✅ when selecting an item open a drawer
// ✅ pass id to the drawer and get details
// ✅ add more fields to card display
// ✅ add more fields to detail display
// ✅ make list infinity scrollable
// implement virtualization
// tests

const theme = createTheme()

const LIMIT = 20

function App() {
    const { loading, error, data, fetchMore } = usePastLaunched({
        limit: LIMIT,
        offset: 0,
    })

    const handleLoadMore = useCallback(() => {
        fetchMore({
            variables: {
                offset: data.launchesPast.length,
            },
        })
    }, [data])

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh',
                }}
            >
                <Box padding={2}>
                    <Typography variant="h3">SPACE X PAST Launched</Typography>
                </Box>
                {loading ? <p>Loading...</p> : null}
                {error ? <p>Error: {error.message}</p> : null}
                {data ? (
                    <ItemList
                        items={data.launchesPast}
                        loadMore={handleLoadMore}
                    />
                ) : null}
            </Box>
        </ThemeProvider>
    )
}

export default App

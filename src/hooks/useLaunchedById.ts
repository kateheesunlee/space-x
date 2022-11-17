import { useQuery, gql } from '@apollo/client'

// date/time, location, launch video, media coverage, rockets, the astronauts, and more.
const GET_LAUNCHED_BY_ID = gql`
    query GetLaunchedById($id: ID!) {
        launch(id: $id) {
            id
            mission_name
            launch_date_local
            launch_site {
                site_name
            }
            launch_success
            rocket {
                rocket_name
                rocket_type
            }
            details
            links {
                article_link
                video_link
                mission_patch_small
            }
        }
    }
`

interface GetPastLaunched {
    id: string
}

const useLaunchById = ({ id }: GetPastLaunched) => {
    const { loading, error, data } = useQuery(GET_LAUNCHED_BY_ID, {
        variables: { id },
    })
    return { loading, error, data }
}

export default useLaunchById

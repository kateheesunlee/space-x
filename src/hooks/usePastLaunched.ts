import { useQuery, gql } from '@apollo/client'

// date/time, location, launch video, media coverage, rockets, the astronauts, and more.
const GET_PAST_LAUNCHED = gql`
    query GetPastLaunched($limit: Int, $offset: Int) {
        launchesPast(limit: $limit, offset: $offset) {
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
        }
    }
`

interface GetPastLaunched {
    limit: number
    offset: number
}

const usePastLaunched = ({ limit, offset = 0 }: GetPastLaunched) => {
    const initialVariables = {
        limit,
        offset,
    }

    const { loading, error, data, fetchMore } = useQuery(GET_PAST_LAUNCHED, {
        variables: initialVariables,
    })

    return { loading, error, data, fetchMore }
}

export default usePastLaunched

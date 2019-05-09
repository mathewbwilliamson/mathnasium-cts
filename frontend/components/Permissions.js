import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Error from '../components/ErrorMessage'
import Table from './styles/Table'
import SickButton from './styles/SickButton'

// Needs to be a mirror of the Permissions Enum on the backend
const possiblePermissions = [
    'ADMIN',
    'USER',
    'CENTERDIRECTOR',
    'LEADCREATE',
    'LEADUPDATE',
    'LEADDELETE',
    'PERMISSIONUPDATE',
]

const ALL_USERS_QUERY = gql`
    query {
        users {
            id
            name
            email
            permissions
        }
    }
`

const Permissions = props => (
    <Query query={ALL_USERS_QUERY}>
        {({ data, loading, error }) => {
            console.log('[matt] error', error)
            console.log('[matt] data', data)

            return (
                <div>
                    <Error error={error} />
                    <div>
                        <h2>Manage Permissions</h2>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    {possiblePermissions.map(permission => (
                                        <th>{permission}</th>
                                    ))}
                                    <th>Update?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.users.map(user => (
                                    <User user={user} />
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            )
        }}
    </Query>
)

class User extends React.Component {
    render() {
        const user = this.props.user

        return (
            <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {possiblePermissions.map(permission => (
                    <td>
                        <label htmlFor={`${user.id}-permission-${permission}`}>
                            <input type="checkbox" />
                        </label>
                    </td>
                ))}
                <td>
                    <SickButton>Update</SickButton>
                </td>
            </tr>
        )
    }
}

export default Permissions

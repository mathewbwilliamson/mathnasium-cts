import PleaseSignIn from '../components/PleaseSignIn'
import BasicPageStyles from '../components/styles/BasicPageStyles'
import Permissions from '../components/Permissions'

const PermissionsPage = props => (
    <BasicPageStyles>
        <PleaseSignIn>
            <div className="container">
                <Permissions />
            </div>
        </PleaseSignIn>
    </BasicPageStyles>
)

export default PermissionsPage

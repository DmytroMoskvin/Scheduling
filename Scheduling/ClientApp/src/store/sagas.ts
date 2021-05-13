import { all } from 'redux-saga/effects'
import userManagementSagas from './UserManagement/sagas'

export default function* rootSaga() {
    yield all([
        userManagementSagas(),
    ])
}

import Cookies from "js-cookie";
import { put, takeEvery } from "redux-saga/effects";
import { getUsersData } from "../../webAPI/users";
import { UserData } from "../User/types";
import { actionCreators } from "./actions";
import { ReceivedUsersDataAction } from "./actions"

export default function* getUserDataSaga() {
    yield takeEvery('REQUESTED_USERS', sagaWorker);
}

function* sagaWorker(action: ReceivedUsersDataAction) {
    const token = Cookies.get('token');
    console.log(token);
    if (token) {
        try {
            const response: UserData[] = yield getUsersData(token).then(response => response.data.getUsers);
            console.log(response);
            yield put(actionCreators.receivedUsersData(response));
        } catch {
            yield put(actionCreators.accessDenied());
        }
        
    }
    else
        yield put(actionCreators.accessDenied());
}

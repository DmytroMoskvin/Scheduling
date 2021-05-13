import Cookies from "js-cookie";
import { put, takeEvery, all } from "redux-saga/effects";
import { getUsersData } from "../../webAPI/users";
import { createUser } from "../../webAPI/createUser";
import { removeUser } from "../../webAPI/removeUser";
import { UserData } from "../User/types";
import { actionCreators } from "./actions";
import * as actions from "./actions"

export default function* watchUserManagementSagas() {
    yield all([
        takeEvery('REQUESTED_USERS', receiveUsersSaga),
        takeEvery('REQUESTED_CREATE_USER', createUserSaga),
        takeEvery('REQUESTED_DELETE_USER', removeUserSaga),
    ]);
}

function* receiveUsersSaga(action: actions.ReceivedUsersDataAction) {
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

function* createUserSaga(action: actions.UserCreatedAction) {
    const token = Cookies.get('token');
    if (token) {
        try {
            const response: UserData = yield createUser(
                action.payload!.name, action.payload!.surname,
                action.payload!.email, action.payload!.position, action.payload!.password, ["TIME_TRACKING"],
                1, token).then(response => response.data);
            console.log(response);
            yield put(actionCreators.createUser(response));
        } catch {
            yield put(actionCreators.accessDenied());
        }
    }
    else
        yield put(actionCreators.accessDenied());
}

function* removeUserSaga(action: actions.UserDeletedAction) {
    const token = Cookies.get('token');
    if (token) {
        try {
            const response: UserData = yield removeUser(action.payload, token);
            console.log(response);
            yield put(actionCreators.deleteUser(action.payload));
        } catch {
            yield put(actionCreators.accessDenied());
        }
    }
    else
        yield put(actionCreators.accessDenied());
}

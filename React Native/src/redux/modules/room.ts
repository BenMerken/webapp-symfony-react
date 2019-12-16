import {Room} from "../../data";
import {Reducer} from "react";
import axios from "axios";
import {getAssetList} from "./asset";

// --- API ---

const BASE_URL = 'http://localhost:8000/rooms/';

// --- Action Types ---

export const LOAD_ROOM_LIST = 'PXLAssetManagementTool/room/LOAD_ROOM_LIST';
export const LOAD_ROOM_LIST_SUCCESS = 'PXLAssetManagementTool/room/LOAD_ROOM_LIST_SUCCESS';
export const LOAD_ROOM_LIST_FAIL = 'PXLAssetManagementTool/room/LOAD_ROOM_LIST_FAIL';

export const LOAD_ROOM_DETAIL = 'PXLAssetManagementTool/room/LOAD_ROOM_DETAIL';
export const LOAD_ROOM_DETAIL_SUCCESS = 'PXLAssetManagementTool/room/LOAD_ROOM_DETAIL_SUCCESS';
export const LOAD_ROOM_DETAIL_FAIL = 'PXLAssetManagementTool/room/LOAD_ROOM_DETAIL_FAIL';

type GetRoomListAction = {
    type: typeof LOAD_ROOM_LIST;
    payload: any;
};

type GetRoomListActionSuccess = {
    type: typeof LOAD_ROOM_LIST_SUCCESS;
    payload: Room[];
};

type GetRoomListActionFail = {
    type: typeof LOAD_ROOM_LIST_FAIL;
    payload: [];
};

type GetRoomDetailAction = {
    type: typeof LOAD_ROOM_DETAIL;
    payload: { name: string }
};

type GetRoomDetailActionSuccess = {
    type: typeof LOAD_ROOM_DETAIL_SUCCESS;
    payload: Room
};

type GetRoomDetailActionFail = {
    type: typeof LOAD_ROOM_DETAIL_FAIL;
    payload: {}
};

type ActionTypes =
    | GetRoomListAction
    | GetRoomListActionSuccess
    | GetRoomListActionFail
    | GetRoomDetailAction
    | GetRoomDetailActionSuccess
    | GetRoomDetailActionFail

// --- State Type ---

type RoomState = {
    list: Room[];
    isLoadingList: boolean;
    detail: Room;
    isLoadingDetail: boolean;
};

// --- Action Creators ---

export const getRoomList = () => {
    return async dispatch => {
        dispatch(setIsLoadingList());
        try {
            const response = await axios.get(BASE_URL);
            dispatch(getRoomListSuccess(response.data));
        } catch (error) {
            dispatch(getRoomListFail());
        }
    }
};

const setIsLoadingList = () => ({
    type: LOAD_ROOM_LIST,
    payload: {}
});

const getRoomListSuccess = (rooms: Room[]) => ({
    type: LOAD_ROOM_LIST_SUCCESS,
    payload: rooms
});

const getRoomListFail = () => ({
    type: LOAD_ROOM_LIST_FAIL,
    payload: {}
});

export const getRoom = (name: string) => {
    return async dispatch => {
        dispatch(setIsLoadingDetail());
        try {
            const response = await axios.get(BASE_URL + name);
            dispatch(getRoomDetailSuccess(response.data));
        } catch (error) {
            dispatch(getRoomDetailFail())
        }
    };
};

const setIsLoadingDetail = () => ({
    type: LOAD_ROOM_DETAIL,
    payload: {}
});

const getRoomDetailSuccess = (room: Room) => ({
    type: LOAD_ROOM_DETAIL_SUCCESS,
    payload: room
});

const getRoomDetailFail = () => ({
    type: LOAD_ROOM_DETAIL_FAIL,
    payload: {}
});

// --- Reducer ---

const reducer: Reducer<RoomState, ActionTypes> = (
    state = {
        list: [],
        isLoadingList: true,
        detail: null,
        isLoadingDetail: true
    },
    action
) => {
    switch (action.type) {
        case LOAD_ROOM_LIST:
            return {...state, isLoadingList: true};
        case LOAD_ROOM_LIST_SUCCESS:
            return {...state, list: action.payload, isLoadingList: false};
        case LOAD_ROOM_LIST_FAIL:
            return {...state, isLoadingList: false};
        case LOAD_ROOM_DETAIL:
            return {...state, isLoadingDetail: true};
        case LOAD_ROOM_DETAIL_SUCCESS:
            return {...state, detail: action.payload, isLoadingDetail: false};
        case LOAD_ROOM_DETAIL_FAIL:
            return {...state, isLoadingDetail: false};
        default:
            return state;
    }
};

export default reducer;
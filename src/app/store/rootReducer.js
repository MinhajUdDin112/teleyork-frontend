import notification from "./notification/NotificationSllice";
import login from "./auth/AuthSlice";
import { lifelineOrdersReducer } from "./lifelineOrders/LifelineOrdersSlice";
import { customerAddressReducer } from "./lifelineOrders/LifelineOrdersSlice";
import { question1Reducer } from "./lifelineOrders/LifelineOrdersSlice";
import { planListReducer } from "./lifelineOrders/LifelineOrdersSlice";
import { addTermReducer } from "./lifelineOrders/LifelineOrdersSlice";
import zip from './zipcodeSlice'


import  addRoles  from "./addRoles/addRolesSlice";
const rootReducer = {
    login,
    notification,
    lifelineOrdersReducer,
    customerAddressReducer,
    question1Reducer,
    planListReducer,
    zip,
    addTermReducer,
    addRoles
};

export default rootReducer;

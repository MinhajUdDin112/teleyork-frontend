import notification from "./notification/NotificationSllice";
import login from "./auth/AuthSlice";
import lifelineOrder from "./lifelineOrders/LifelineOrdersSlice";
import  addRoles  from "./addRoles/addRolesSlice";
const rootReducer = {
    login,
    notification,
    lifelineOrder,
    addRoles
};

export default rootReducer;

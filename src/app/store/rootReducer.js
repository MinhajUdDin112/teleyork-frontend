import notification from "./notification/NotificationSllice";
import login from "./auth/AuthSlice";
import lifelineOrder from "./lifelineOrders/LifelineOrdersSlice";

const rootReducer = {
    login,
    notification,
    lifelineOrder,
};

export default rootReducer;

const TransferException = [
    {
        label: "No coverage",
        value: "No coverage",
    },
    {
        label: "Customer request",
        value: "Customer request",
    },
    {
        label: "Customer changed address",
        value: "Customer changed address",
    },
    {
        label: "Other",
        value: "Other",
    },
];
const prospectStatusOptions = [
    {
        label: "Active",
        value: "active",
    },
    {
        label: "Disconnect",
        value: "disconnected",
    },
];
const activeStatusOptions = [
    {
        label: "Suspend",
        value: "suspended",
    },
    {
        label: "Disconnect",
        value: "disconnected",
    },
];
const suspendStatusOptions = [
    {
        label: "Active",
        value: "active",
    },
    {
        label: "Disconnect",
        value: "disconnected",
    },
];
const disconnectStatusOptions = [
    {
        label: "Reconnect",
        value: "reconnect",
    },
];
const statusOption = [
    { label: "Select Status", value: "" },
    // {
    //     label: "Label Printed",
    //     value: "labelPrinted",
    // },
    {
        label: "Pre-Shipment",
        value: "preShipment",
    },
    // {
    //     label: "In-Transit",
    //     value: "inTransit",
    // },
    {
        label: "Evaluation",
        value: "evaluation",
    },
    // {
    //     label: "Delivered",
    //     value: "delivered",
    // },
    {
        label: "Active",
        value: "active",
    },

    // {
    //     label: "Reconnect",
    //     value: "reconnect",
    // },
    {
        label: "Suspend",
        value: "suspended",
    },
    {
        label: "Disconnect",
        value: "disconnected",
    },
];
const connectionExternally = [
    {
        label: "Externally",
        value: "Externally",
    },
];
const connection = [
    {
        label: "Select Account Type",
        value: "",
    },
    {
        label: "Externally",
        value: "Externally",
    },
    {
        label: "Internally",
        value: "Internally",
    },
];
export { TransferException, statusOption, prospectStatusOptions, activeStatusOptions, suspendStatusOptions, disconnectStatusOptions, connection, connectionExternally };

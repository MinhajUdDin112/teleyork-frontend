const TransferException = [
    {
        label: "Imporper Transfer-(TE1)",
        value: "TE1",
    },
    {
        label: "Operations Ceased-(TE2)",
        value: "TE2",
    },
    {
        label: "Rule Violation-(TE3)",
        value: "TE3",
    },
    {
        label: "Move Outside Service Area-(TE4)",
        value: "TE4",
    },
];
const statusOption = [
    { label: "Select Status", value: "" },
    {
        label: "Label Printed",
        value: "labelPrinted",
    },
    {
        label: "Pre-Shipment",
        value: "preShipment",
    },
    {
        label: "In-Transit",
        value: "inTransit",
    },
    {
        label: "Active",
        value: "active",
    },
    {
        label: "Evaluation",
        value: "evaluation",
    },
    {
        label: "Delivered",
        value: "delivered",
    },
    {
        label: "Reconnect",
        value: "reconnect",
    },
    {
        label: "Suspend",
        value: "suspend",
    },
];
const connection = [
    {
        label: "Select Account Type",
        value: "",
    },
    {
        label: "Electronically",
        value: "Electronically",
    },
    {
        label: "Non Electronically",
        value: "Non Electronically",
    },
];
export { TransferException, statusOption, connection };
